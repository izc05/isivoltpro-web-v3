from __future__ import annotations

import html
import json
import os
import re
import sys
import urllib.parse
import urllib.request
from dataclasses import dataclass, asdict
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

MADRID = ZoneInfo("Europe/Madrid")
NOW = datetime.now(MADRID)
TODAY = NOW.date()
OUT = Path(os.environ.get("V4_EDITORIAL_RADAR_DIR", "editorial-radar-output"))
OUT.mkdir(parents=True, exist_ok=True)

CADENCE = {
    0: ("normativa", "Qué ha cambiado, desde cuándo y a quién puede afectar."),
    1: ("actualidad", "Una noticia con impacto real en mantenimiento o instalaciones."),
    2: ("seguridad", "Seguridad y PRL aplicadas al trabajo técnico."),
    3: ("energia", "Energía, eficiencia, climatización y operación de instalaciones."),
    4: ("practico", "Un caso práctico, fallo frecuente o decisión de campo."),
    5: ("curiosidad", "Una curiosidad técnica útil explicada con rigor."),
    6: ("radar", "Resumen semanal y temas que conviene vigilar."),
}

TOPIC_KEYWORDS = {
    "normativa": ["reglamento", "real decreto", "orden", "resolución", "instalaciones", "energía", "seguridad", "industria", "edificios"],
    "actualidad": ["mantenimiento", "instalaciones", "electricidad", "climatización", "energía", "edificios", "industria", "hospital"],
    "seguridad": ["seguridad", "prevención", "riesgo", "trabajo", "eléctrico", "equipos", "mantenimiento", "prl"],
    "energia": ["energía", "eficiencia", "electricidad", "climatización", "bomba de calor", "consumo", "edificios", "renovable"],
    "practico": ["mantenimiento", "avería", "inspección", "preventivo", "equipos", "instalación", "operación", "diagnóstico"],
    "curiosidad": ["técnica", "mantenimiento", "temperatura", "electricidad", "equipos", "energía", "seguridad"],
    "radar": ["mantenimiento", "instalaciones", "seguridad", "energía", "electricidad", "climatización", "industria"],
}

GENERAL_KEYWORDS = ["mantenimiento", "instalación", "instalaciones", "electricidad", "eléctrico", "climatización", "energía", "seguridad", "equipos", "edificios", "industria", "hospital", "eficiencia"]


@dataclass
class Source:
    id: str
    name: str
    url: str
    authority: str


@dataclass
class Candidate:
    source_id: str
    source_name: str
    authority: str
    title: str
    url: str
    score: int


def sources() -> list[Source]:
    day = TODAY.strftime("%Y/%m/%d")
    return [
        Source("boe", "Boletín Oficial del Estado", f"https://www.boe.es/boe/dias/{day}/", "official_primary"),
        Source("miteco", "MITECO", "https://www.miteco.gob.es/es/prensa/ultimas-noticias.html", "official_primary"),
        Source("insst", "INSST", "https://www.insst.es/noticias-insst", "institutional"),
        Source("idae", "IDAE", "https://www.idae.es/noticias", "institutional"),
        Source("cnmc", "CNMC", "https://www.cnmc.es/prensa", "institutional"),
        Source("eurlex", "EUR-Lex", "https://eur-lex.europa.eu/homepage.html?locale=es", "official_primary"),
    ]


def fetch_text(url: str) -> str:
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": "IsiVoltPro-Editorial-Radar/1.0 (+https://isivoltpro.com)",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
    )
    with urllib.request.urlopen(request, timeout=12) as response:
        raw = response.read(900_000)
        charset = response.headers.get_content_charset() or "utf-8"
    return raw.decode(charset, errors="replace")


def clean_text(value: str) -> str:
    value = re.sub(r"<script\b[^>]*>.*?</script>", " ", value, flags=re.I | re.S)
    value = re.sub(r"<style\b[^>]*>.*?</style>", " ", value, flags=re.I | re.S)
    value = re.sub(r"<[^>]+>", " ", value)
    value = html.unescape(value)
    value = re.sub(r"\s+", " ", value).strip()
    return value


def extract_links(source: Source, body: str, topic: str) -> list[Candidate]:
    results: list[Candidate] = []
    seen: set[str] = set()
    keywords = TOPIC_KEYWORDS[topic]
    pattern = re.compile(r"<a\b[^>]*href\s*=\s*['\"]([^'\"]+)['\"][^>]*>(.*?)</a>", re.I | re.S)
    for href, anchor_html in pattern.findall(body):
        title = clean_text(anchor_html)
        if len(title) < 18 or len(title) > 260:
            continue
        url = urllib.parse.urljoin(source.url, html.unescape(href))
        parsed = urllib.parse.urlparse(url)
        if parsed.scheme not in {"http", "https"} or not parsed.netloc:
            continue
        key = f"{title.lower()}|{url}"
        if key in seen:
            continue
        seen.add(key)
        haystack = title.lower()
        score = sum(4 for word in keywords if word in haystack)
        score += sum(1 for word in GENERAL_KEYWORDS if word in haystack)
        if source.authority == "official_primary":
            score += 2
        if score < 3:
            continue
        results.append(Candidate(source.id, source.name, source.authority, title, url, score))
    return sorted(results, key=lambda item: (-item.score, item.source_id, item.title))[:10]


def discover(topic: str) -> tuple[list[Candidate], list[dict[str, str]]]:
    candidates: list[Candidate] = []
    checks: list[dict[str, str]] = []
    for source in sources():
        try:
            body = fetch_text(source.url)
            found = extract_links(source, body, topic)
            candidates.extend(found)
            checks.append({"source": source.name, "url": source.url, "status": "ok", "found": str(len(found))})
        except Exception as exc:  # network failures must not turn into invented facts
            checks.append({"source": source.name, "url": source.url, "status": f"error: {type(exc).__name__}", "found": "0"})
    unique: dict[str, Candidate] = {}
    for item in sorted(candidates, key=lambda candidate: -candidate.score):
        unique.setdefault(item.url, item)
    return list(unique.values())[:12], checks


def build_ai_prompt(topic: str, promise: str, candidates: list[Candidate]) -> str:
    evidence = "\n".join(
        f"- [{item.source_name}] {item.title}\n  URL: {item.url}\n  autoridad: {item.authority}"
        for item in candidates
    ) or "- No se han recuperado candidatos fiables hoy."
    return f"""Eres el asistente editorial de IsiVoltPro, una publicación técnica española de mantenimiento e instalaciones.

OBJETIVO DEL DÍA: {topic}
PROMESA EDITORIAL: {promise}
FECHA DE COMPROBACIÓN: {NOW.isoformat(timespec='minutes')}

EVIDENCIA RECUPERADA DE FUENTES PERMITIDAS:
{evidence}

REGLAS OBLIGATORIAS:
1. No inventes hechos, fechas, obligaciones, clientes, métricas ni citas.
2. Trabaja únicamente con los títulos, organismos y URLs proporcionados. Si faltan datos, dilo.
3. Una consulta/propuesta no es una norma vigente. Si no puedes determinar el estado regulatorio con la evidencia dada, usa literalmente: "pendiente de verificación".
4. No publiques una pieza final. Produce un BORRADOR PARA REVISIÓN HUMANA.
5. No copies texto de las fuentes; resume el tema y propón qué debe comprobar un editor.
6. Prioriza utilidad para responsables y técnicos de mantenimiento en España.
7. La promoción de IsiVoltPro debe ser secundaria y solo si encaja de forma natural.

DEVUELVE MARKDOWN CON ESTAS SECCIONES:
# Borrador editorial
## Candidato recomendado
## Por qué puede importar a mantenimiento
## Hechos que sí están respaldados por la evidencia disponible
## Qué falta verificar antes de publicar
## Estado regulatorio
## Enfoque de artículo propuesto
## Borrador breve (máximo 350 palabras)
## Adaptación LinkedIn
## Adaptación Instagram
## Adaptación Facebook
## Fuentes utilizadas

En "Fuentes utilizadas" conserva las URLs completas de la evidencia elegida.
"""


def ai_draft(topic: str, promise: str, candidates: list[Candidate]) -> tuple[str, str]:
    key = os.environ.get("OPENAI_API_KEY", "").strip()
    if not key:
        return (
            "IA no activada: falta el secreto `OPENAI_API_KEY`. El radar ha realizado únicamente el descubrimiento de fuentes; no se ha generado contenido automático.",
            "discovery_only",
        )
    try:
        from openai import OpenAI

        client = OpenAI(api_key=key)
        response = client.responses.create(
            model=os.environ.get("OPENAI_MODEL", "gpt-5-mini"),
            input=build_ai_prompt(topic, promise, candidates),
            store=False,
        )
        text = (response.output_text or "").strip()
        if not text:
            raise RuntimeError("respuesta IA vacía")
        return text, "ai_draft"
    except Exception as exc:
        return f"La fase IA no pudo ejecutarse ({type(exc).__name__}). No se publicará nada automáticamente.", "ai_error"


def markdown(topic: str, promise: str, candidates: list[Candidate], checks: list[dict[str, str]], draft: str, mode: str) -> str:
    lines = [
        f"# Radar editorial IsiVoltPro · {TODAY.isoformat()}",
        "",
        f"**Tipo del día:** `{topic}`  ",
        f"**Objetivo:** {promise}  ",
        f"**Comprobado:** {NOW.isoformat(timespec='minutes')}  ",
        f"**Modo:** `{mode}`",
        "",
        "> Este documento es un **borrador interno**. No publica en la web ni en redes. Normativa, fechas y estado regulatorio requieren verificación editorial antes de aprobar.",
        "",
        "## Estado de las fuentes",
        "",
    ]
    for check in checks:
        lines.append(f"- **{check['source']}** · {check['status']} · candidatos: {check['found']} · {check['url']}")
    lines.extend(["", "## Candidatos recuperados", ""])
    if candidates:
        for index, item in enumerate(candidates, 1):
            lines.append(f"{index}. **{item.title}** — {item.source_name} · puntuación {item.score}  ")
            lines.append(f"   {item.url}")
    else:
        lines.append("No se recuperó hoy un candidato con suficiente señal. La regla editorial es no forzar una publicación.")
    lines.extend(["", "---", "", draft.strip(), "", "---", "", "## Puerta de publicación", "", "- [ ] Fuente primaria abierta y revisada manualmente.", "- [ ] Fecha de fuente confirmada.", "- [ ] Estado regulatorio confirmado cuando aplique.", "- [ ] Título y resumen no exageran el alcance.", "- [ ] Aplicación práctica diferenciada de los hechos.", "- [ ] Imagen/ALT y procedencia preparados.", "- [ ] Aprobación editorial antes de pasar a la web.", "- [ ] Publicación social confirmada por proveedor; `scheduled` no equivale a `published`."])
    return "\n".join(lines) + "\n"


def main() -> int:
    topic, promise = CADENCE[TODAY.weekday()]
    candidates, checks = discover(topic)
    draft, mode = ai_draft(topic, promise, candidates)
    body = markdown(topic, promise, candidates, checks, draft, mode)
    (OUT / "radar.md").write_text(body, encoding="utf-8")
    payload = {
        "date": TODAY.isoformat(),
        "checkedAt": NOW.isoformat(timespec="minutes"),
        "topic": topic,
        "promise": promise,
        "mode": mode,
        "candidates": [asdict(item) for item in candidates],
        "sourceChecks": checks,
    }
    (OUT / "radar.json").write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (OUT / "title.txt").write_text(f"Radar editorial · {TODAY.isoformat()} · {topic}\n", encoding="utf-8")
    print(f"Radar V4: {len(candidates)} candidatos · modo={mode} · {OUT / 'radar.md'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
