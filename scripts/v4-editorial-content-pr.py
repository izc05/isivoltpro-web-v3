from __future__ import annotations

import json
import math
import os
import re
import sys
from datetime import date, datetime
from pathlib import Path
from urllib.parse import urlparse

INPUT = Path(os.environ.get("V4_EDITORIAL_CONTENT_INPUT", "editorial-content-input/issue.json"))
OUT = Path(os.environ.get("V4_EDITORIAL_CONTENT_DIR", "editorial-content-output"))
OUT.mkdir(parents=True, exist_ok=True)

ALLOWED_SOURCE_DOMAINS = {
    "boe.es", "www.boe.es",
    "miteco.gob.es", "www.miteco.gob.es",
    "insst.es", "www.insst.es",
    "idae.es", "www.idae.es",
    "cnmc.es", "www.cnmc.es",
    "eur-lex.europa.eu",
}
ALLOWED_CATEGORIES = {"actualidad", "normativa", "seguridad", "energia", "curiosidades"}
ALLOWED_STATES = {"consulta", "publicada", "vigente", "modificada", "derogada", "no_aplica"}


def fail(message: str) -> int:
    print(f"Editorial content PR: {message}", file=sys.stderr)
    return 1


def read_issue() -> dict:
    payload = json.loads(INPUT.read_text(encoding="utf-8"))
    if not isinstance(payload, dict):
        raise RuntimeError("issue.json no contiene un objeto")
    return payload


def extract_category(body: str) -> str:
    match = re.search(r"Categoría pública propuesta:\s*`([^`]+)`", body)
    return match.group(1).strip().lower() if match else ""


def extract_metadata(body: str) -> dict:
    match = re.search(r"## Ficha estructurada para PR\s*```json\s*(\{.*?\})\s*```", body, flags=re.S)
    if not match:
        raise RuntimeError("falta el bloque JSON de 'Ficha estructurada para PR'")
    payload = json.loads(match.group(1))
    if not isinstance(payload, dict):
        raise RuntimeError("la ficha estructurada no es un objeto JSON")
    return payload


def gate_pending(body: str) -> list[str]:
    marker = "## Puerta de PR de contenido"
    start = body.find(marker)
    if start < 0:
        return ["Falta la sección Puerta de PR de contenido"]
    tail = body[start:]
    return [line.strip() for line in tail.splitlines() if re.match(r"^- \[ \]", line.strip())]


def article_markdown(body: str) -> str:
    marker = "## Artículo final para PR"
    start = body.find(marker)
    if start < 0:
        raise RuntimeError("falta 'Artículo final para PR'")
    start += len(marker)
    end = body.find("## Puerta de PR de contenido", start)
    text = body[start:end if end >= 0 else len(body)].strip()
    if len(text) < 350:
        raise RuntimeError("el artículo final es demasiado corto")
    return text


def parse_sections(markdown: str) -> list[dict]:
    sections: list[dict] = []
    current: dict | None = None
    paragraph_lines: list[str] = []

    def flush_paragraph() -> None:
        nonlocal paragraph_lines
        if current is not None and paragraph_lines:
            text = " ".join(line.strip() for line in paragraph_lines if line.strip()).strip()
            if text:
                current["paragraphs"].append(text)
        paragraph_lines = []

    for raw in markdown.splitlines():
        line = raw.strip()
        if line.startswith("### "):
            flush_paragraph()
            if current is not None:
                sections.append(current)
            current = {"heading": line[4:].strip(), "paragraphs": []}
            continue
        if current is None:
            if line:
                raise RuntimeError("el artículo debe empezar por un encabezado ###")
            continue
        if not line:
            flush_paragraph()
            continue
        if line.startswith("- "):
            flush_paragraph()
            current.setdefault("bullets", []).append(line[2:].strip())
            continue
        paragraph_lines.append(line)

    flush_paragraph()
    if current is not None:
        sections.append(current)
    if len(sections) < 2 or any(not section["heading"] or not section["paragraphs"] for section in sections):
        raise RuntimeError("se requieren al menos dos secciones ### con párrafos")
    return sections


def require_text(meta: dict, key: str, minimum: int = 3) -> str:
    value = str(meta.get(key, "")).strip()
    if len(value) < minimum:
        raise RuntimeError(f"campo obligatorio incompleto: {key}")
    return value


def validate_date(value: str, key: str) -> str:
    try:
        date.fromisoformat(value)
    except ValueError as exc:
        raise RuntimeError(f"{key} debe usar YYYY-MM-DD") from exc
    return value


def validate_checked_at(value: str) -> str:
    try:
        datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError as exc:
        raise RuntimeError("checkedAt debe ser una fecha ISO 8601") from exc
    return value


def source_authority(url: str) -> str:
    host = (urlparse(url).hostname or "").lower()
    if host not in ALLOWED_SOURCE_DOMAINS:
        raise RuntimeError(f"dominio de fuente no permitido: {host or 'vacío'}")
    return "official_primary" if host in {"boe.es", "www.boe.es", "miteco.gob.es", "www.miteco.gob.es", "eur-lex.europa.eu"} else "institutional"


def validate_image(path: str) -> str:
    if not path.startswith("/media/") or ".." in path:
        raise RuntimeError("image debe apuntar a /media/ dentro del sitio")
    public_file = Path("public") / path.lstrip("/")
    if not public_file.is_file():
        raise RuntimeError(f"la imagen no existe en el repositorio: {public_file}")
    return path


def validate_list(meta: dict, key: str, minimum: int = 1) -> list:
    value = meta.get(key)
    if not isinstance(value, list) or len(value) < minimum:
        raise RuntimeError(f"{key} debe contener al menos {minimum} elemento(s)")
    return value


def slug_exists(slug: str) -> bool:
    quoted = {f"'{slug}'", f'"{slug}"'}
    for path in Path("src/data").rglob("*.ts"):
        text = path.read_text(encoding="utf-8", errors="ignore")
        if any(token in text for token in quoted):
            return True
    return False


def build_article(issue: dict, category: str, meta: dict, sections: list[dict]) -> dict:
    title = require_text(meta, "title", 12)
    slug = require_text(meta, "slug", 6).lower()
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug):
        raise RuntimeError("slug solo puede contener minúsculas, números y guiones")
    if slug_exists(slug):
        raise RuntimeError(f"el slug ya existe: {slug}")
    if category not in ALLOWED_CATEGORIES:
        raise RuntimeError(f"categoría pública no permitida: {category}")

    source_url = require_text(meta, "sourceUrl", 12)
    authority = source_authority(source_url)
    state = require_text(meta, "regulationState").lower()
    if state not in ALLOWED_STATES:
        raise RuntimeError(f"estado regulatorio no válido: {state}")

    keywords = [str(item).strip() for item in validate_list(meta, "keywords", 2) if str(item).strip()]
    routes_raw = validate_list(meta, "relatedRoutes", 1)
    routes: list[dict[str, str]] = []
    for item in routes_raw:
        if not isinstance(item, dict):
            raise RuntimeError("relatedRoutes debe contener objetos")
        label = str(item.get("label", "")).strip()
        href = str(item.get("href", "")).strip()
        if len(label) < 3 or not href.startswith("/") or href.startswith("//"):
            raise RuntimeError("relatedRoutes contiene un enlace inválido")
        routes.append({"label": label, "href": href})

    word_count = len((require_text(meta, "excerpt", 50) + " " + " ".join(" ".join(s["paragraphs"]) for s in sections)).split())
    published_at = validate_date(require_text(meta, "publishedAt", 10), "publishedAt")
    source_published_at = validate_date(require_text(meta, "sourcePublishedAt", 10), "sourcePublishedAt")
    checked_at = validate_checked_at(require_text(meta, "checkedAt", 16))

    return {
        "slug": slug,
        "title": title,
        "description": require_text(meta, "description", 80),
        "excerpt": require_text(meta, "excerpt", 50),
        "category": category,
        "status": "published",
        "publishedAt": published_at,
        "updatedAt": published_at,
        "readMinutes": max(2, math.ceil(word_count / 220)),
        "author": "Equipo IsiVoltPro",
        "image": validate_image(require_text(meta, "image", 8)),
        "imageAlt": require_text(meta, "imageAlt", 20),
        "keywords": keywords,
        "source": {
            "name": require_text(meta, "sourceName", 3),
            "url": source_url,
            "publishedAt": source_published_at,
            "checkedAt": checked_at,
            "authority": authority,
        },
        "regulationState": state,
        "sections": sections,
        "takeaway": require_text(meta, "takeaway", 20),
        "relatedRoutes": routes,
    }


def main() -> int:
    try:
        issue = read_issue()
        title = str(issue.get("title", ""))
        body = str(issue.get("body", ""))
        if not title.startswith("Propuesta de publicación · radar #"):
            return fail("el issue no es una propuesta editorial")
        pending = gate_pending(body)
        if pending:
            return fail("quedan checks de PR sin aprobar: " + " | ".join(pending[:8]))
        category = extract_category(body)
        metadata = extract_metadata(body)
        sections = parse_sections(article_markdown(body))
        article = build_article(issue, category, metadata, sections)

        ts = (
            "import type { V3DailyPublishedPost } from '../v3-daily-published';\n\n"
            "export const v3DailyGeneratedPost = "
            + json.dumps(article, ensure_ascii=False, indent=2)
            + " satisfies V3DailyPublishedPost;\n"
        )
        (OUT / "article.ts").write_text(ts, encoding="utf-8")
        (OUT / "slug.txt").write_text(article["slug"] + "\n", encoding="utf-8")
        (OUT / "title.txt").write_text(article["title"] + "\n", encoding="utf-8")
        (OUT / "article.json").write_text(json.dumps(article, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        pr_body = (
            f"Contenido generado desde la propuesta editorial #{issue.get('number')}.\n\n"
            "Este PR añade un artículo al feed mediante `src/data/generated/`. "
            "No hace merge automático, no publica en redes y debe pasar build + QA + revisión humana antes de llegar a `main`.\n\n"
            f"Slug: `{article['slug']}`\nFuente: {article['source']['url']}\n"
        )
        (OUT / "pr-body.md").write_text(pr_body, encoding="utf-8")
        print(f"Editorial content PR: OK · {article['slug']} · {category}")
        return 0
    except Exception as exc:
        return fail(f"{type(exc).__name__}: {exc}")


if __name__ == "__main__":
    sys.exit(main())
