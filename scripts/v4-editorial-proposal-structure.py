from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path

OUT = Path(os.environ.get("V4_EDITORIAL_PROPOSAL_DIR", "editorial-proposal-output"))
PROPOSAL = OUT / "proposal.md"


def fail(message: str) -> int:
    print(f"Editorial proposal structure: {message}", file=sys.stderr)
    return 1


def main() -> int:
    try:
        text = PROPOSAL.read_text(encoding="utf-8")
        if "## Ficha estructurada para PR" in text:
            print("Editorial proposal structure: plantilla ya presente")
            return 0
        category_match = re.search(r"Categoría pública propuesta:\s*`([^`]+)`", text)
        if not category_match:
            return fail("no se pudo recuperar la categoría pública")
        urls = re.findall(r"^- (https?://\S+)$", text, flags=re.M)
        source_url = urls[0].rstrip(".,;:") if urls else ""
        template = {
            "title": "",
            "slug": "",
            "description": "",
            "excerpt": "",
            "publishedAt": "",
            "sourceName": "",
            "sourceUrl": source_url,
            "sourcePublishedAt": "",
            "checkedAt": "",
            "regulationState": "",
            "image": "/media/v4/home-maintenance-tablet.webp",
            "imageAlt": "",
            "keywords": [],
            "takeaway": "",
            "relatedRoutes": [
                {"label": "Ver mantenimiento preventivo", "href": "/modulos/mantenimiento-preventivo/"},
                {"label": "Ver activos", "href": "/modulos/activos/"},
            ],
        }
        block = "\n".join(
            [
                "## Ficha estructurada para PR",
                "",
                "Completar este JSON con los datos finales revisados. Debe seguir siendo JSON válido.",
                "",
                "```json",
                json.dumps(template, ensure_ascii=False, indent=2),
                "```",
                "",
                "## Artículo final para PR",
                "",
                "Sustituir este ejemplo por el texto final. Cada bloque debe empezar por `###`.",
                "",
                "### Qué ha ocurrido realmente",
                "",
                "Texto final revisado y respaldado por la fuente.",
                "",
                "### Qué significa para mantenimiento",
                "",
                "Aplicación práctica diferenciada de los hechos.",
                "",
                "## Puerta de PR de contenido",
                "",
                "- [ ] Ficha JSON completa y válida.",
                "- [ ] Título, slug, descripción y extracto revisados.",
                "- [ ] Fecha y organismo de la fuente confirmados.",
                "- [ ] Estado regulatorio usa un valor canónico del proyecto.",
                "- [ ] Imagen existe en `/public/media/` y ALT revisado.",
                "- [ ] Artículo final contiene al menos dos secciones útiles.",
                "- [ ] Palabras clave y enlaces relacionados revisados.",
                "- [ ] Aprobación humana para crear PR de contenido.",
                "",
                "Cuando todo esté completado, comentar exactamente `/create-content-pr`. Ese comando crea una rama y un PR con QA; no hace merge.",
                "",
            ]
        )
        marker = "## Siguiente puerta"
        position = text.find(marker)
        if position < 0:
            return fail("falta la sección Siguiente puerta")
        text = text[:position] + block + text[position:]
        PROPOSAL.write_text(text, encoding="utf-8")
        print(f"Editorial proposal structure: OK · categoría={category_match.group(1)}")
        return 0
    except Exception as exc:
        return fail(f"{type(exc).__name__}: {exc}")


if __name__ == "__main__":
    sys.exit(main())
