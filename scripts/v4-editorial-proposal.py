from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path
from urllib.parse import urlparse

INPUT = Path(os.environ.get("V4_EDITORIAL_PROPOSAL_INPUT", "editorial-proposal-input/issue.json"))
OUT = Path(os.environ.get("V4_EDITORIAL_PROPOSAL_DIR", "editorial-proposal-output"))
OUT.mkdir(parents=True, exist_ok=True)

ALLOWED_SOURCE_DOMAINS = {
    "boe.es",
    "www.boe.es",
    "miteco.gob.es",
    "www.miteco.gob.es",
    "insst.es",
    "www.insst.es",
    "idae.es",
    "www.idae.es",
    "cnmc.es",
    "www.cnmc.es",
    "eur-lex.europa.eu",
}

PUBLIC_CATEGORY = {
    "normativa": "normativa",
    "actualidad": "actualidad",
    "seguridad": "seguridad",
    "energia": "energia",
    "practico": "actualidad",
    "curiosidad": "curiosidades",
    "radar": "actualidad",
}


def fail(message: str) -> int:
    print(f"Editorial proposal: {message}", file=sys.stderr)
    return 1


def read_issue() -> dict:
    if not INPUT.exists():
        raise RuntimeError(f"no existe {INPUT}")
    payload = json.loads(INPUT.read_text(encoding="utf-8"))
    if not isinstance(payload, dict):
        raise RuntimeError("issue.json no contiene un objeto")
    return payload


def extract_topic(body: str) -> str:
    match = re.search(r"\*\*Tipo del día:\*\*\s*`([^`]+)`", body)
    return match.group(1).strip().lower() if match else ""


def extract_mode(body: str) -> str:
    match = re.search(r"\*\*Modo:\*\*\s*`([^`]+)`", body)
    return match.group(1).strip().lower() if match else ""


def source_urls(body: str) -> list[str]:
    urls = re.findall(r"https?://[^\s)>\]]+", body)
    clean: list[str] = []
    seen: set[str] = set()
    for raw in urls:
        url = raw.rstrip(".,;:")
        host = (urlparse(url).hostname or "").lower()
        if host not in ALLOWED_SOURCE_DOMAINS:
            continue
        if url not in seen:
            seen.add(url)
            clean.append(url)
    return clean


def approved_content(body: str) -> str:
    marker = "# Borrador editorial"
    start = body.find(marker)
    if start < 0:
        raise RuntimeError("falta '# Borrador editorial'")
    gate = body.find("## Puerta de publicación", start)
    section = body[start : gate if gate >= 0 else len(body)].strip()
    if len(section) < 120:
        raise RuntimeError("el borrador editorial es demasiado corto")
    return section


def unchecked_gate_items(body: str) -> list[str]:
    gate = body.find("## Puerta de publicación")
    if gate < 0:
        return ["Falta la sección Puerta de publicación"]
    tail = body[gate:]
    return [line.strip() for line in tail.splitlines() if re.match(r"^- \[ \]", line.strip())]


def build_markdown(issue: dict, topic: str, category: str, urls: list[str], draft: str) -> str:
    number = issue.get("number", "?")
    issue_url = issue.get("url", "")
    title = issue.get("title", "")
    lines = [
        f"# Propuesta de publicación · radar #{number}",
        "",
        "> Estado: **propuesta interna**. Este archivo no publica ni modifica la web ni envía contenido a redes sociales.",
        "",
        "## Origen y aprobación",
        "",
        f"- Radar de origen: [{title}]({issue_url})",
        f"- Tipo editorial: `{topic}`",
        f"- Categoría pública propuesta: `{category}`",
        "- Comando de aprobación requerido: `/prepare-publication` por propietario/colaborador del repositorio.",
        "- Checklist del radar: completado antes de generar esta propuesta.",
        "",
        "## Fuentes oficiales permitidas detectadas",
        "",
    ]
    lines.extend(f"- {url}" for url in urls)
    lines.extend(
        [
            "",
            "## Contenido aprobado de origen",
            "",
            draft,
            "",
            "## Ficha que debe completarse antes de crear un PR de publicación",
            "",
            "- [ ] Título final",
            "- [ ] Slug definitivo",
            "- [ ] Descripción SEO",
            "- [ ] Extracto",
            "- [ ] Fecha de publicación de la fuente",
            "- [ ] Fecha/hora de comprobación",
            "- [ ] Organismo/fuente principal",
            "- [ ] Estado regulatorio definitivo (`vigente`, `consulta`, `propuesta`, `informativo` o el valor canónico aplicable)",
            "- [ ] Imagen editorial y texto ALT",
            "- [ ] Palabras clave",
            "- [ ] Secciones del artículo revisadas",
            "- [ ] Enlaces relacionados de IsiVoltPro",
            "- [ ] Adaptaciones sociales revisadas",
            "",
            "## Siguiente puerta",
            "",
            "Solo después de completar esta ficha se podrá generar un PR que proponga cambios en `src/data/v3-daily-published.ts`. Ese PR deberá volver a pasar build, QA y revisión humana antes de hacer merge.",
        ]
    )
    return "\n".join(lines).strip() + "\n"


def main() -> int:
    try:
        issue = read_issue()
        title = str(issue.get("title", ""))
        body = str(issue.get("body", ""))
        if not title.startswith("Radar editorial ·"):
            return fail("el issue no es un radar editorial")
        mode = extract_mode(body)
        if mode != "ai_draft":
            return fail(f"se exige mode=ai_draft y el radar está en {mode or 'modo desconocido'}")
        pending = unchecked_gate_items(body)
        if pending:
            return fail("quedan checks sin aprobar: " + " | ".join(pending[:6]))
        topic = extract_topic(body)
        if topic not in PUBLIC_CATEGORY:
            return fail(f"tipo editorial no reconocido: {topic or 'vacío'}")
        urls = source_urls(body)
        if not urls:
            return fail("no hay URLs de fuentes oficiales permitidas")
        draft = approved_content(body)
        category = PUBLIC_CATEGORY[topic]
        proposal = build_markdown(issue, topic, category, urls, draft)
        (OUT / "proposal.md").write_text(proposal, encoding="utf-8")
        metadata = {
            "status": "proposal",
            "sourceIssue": issue.get("number"),
            "sourceIssueUrl": issue.get("url"),
            "topic": topic,
            "publicCategory": category,
            "sourceUrls": urls,
            "automaticPublish": False,
            "socialPublish": False,
            "nextGate": "human_review_before_content_pr",
        }
        (OUT / "proposal.json").write_text(json.dumps(metadata, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        (OUT / "title.txt").write_text(f"Propuesta de publicación · radar #{issue.get('number')}\n", encoding="utf-8")
        print(f"Editorial proposal: OK · radar #{issue.get('number')} · {category} · {len(urls)} fuentes")
        return 0
    except Exception as exc:
        return fail(f"{type(exc).__name__}: {exc}")


if __name__ == "__main__":
    sys.exit(main())
