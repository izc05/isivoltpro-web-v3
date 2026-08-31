from __future__ import annotations

import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

DIST = Path(sys.argv[1] if len(sys.argv) > 1 else "dist")
BASE = "/isivoltpro-web-v3"
ROUTES = [
    "preview-v4", "preview-v4/home", "preview-v4/producto", "preview-v4/soluciones",
    "preview-v4/apps", "preview-v4/sectores", "preview-v4/recursos", "preview-v4/blog",
    "preview-v4/empresa", "preview-v4/demo", "preview-v4/precios", "preview-v4/contacto",
    "preview-v4/acceso", "preview-v4/seguridad", "preview-v4/privacidad", "preview-v4/social",
    "preview-v4/fase-10",
]
TELEMETRY = re.compile(r"posthog(?:-js)?|sentry\.io|@sentry/|googletagmanager|google-analytics|gtag\s*\(", re.I)


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.h1 = 0
        self.robots = ""
        self.images: list[tuple[str, str | None, bool]] = []
        self.links: list[str] = []
        self.scripts: list[str] = []
        self.forms_with_transport = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        raw = dict(attrs)
        data = {key: value or "" for key, value in attrs}
        if tag == "h1":
            self.h1 += 1
        elif tag == "meta" and data.get("name", "").lower() == "robots":
            self.robots = data.get("content", "").lower().replace(" ", "")
        elif tag == "img":
            decorative = data.get("aria-hidden", "").lower() == "true" or data.get("role", "").lower() in {"presentation", "none"}
            self.images.append((data.get("src", ""), raw.get("alt"), decorative))
        elif tag == "a":
            self.links.append(data.get("href", ""))
        elif tag == "script" and data.get("src"):
            self.scripts.append(data["src"])
        elif tag == "form" and (data.get("action") or data.get("method")):
            self.forms_with_transport += 1


def local_path(raw: str) -> str | None:
    if not raw or raw.startswith(("#", "mailto:", "tel:", "javascript:")):
        return None
    parsed = urlparse(raw)
    if parsed.scheme or parsed.netloc:
        return None
    path = parsed.path
    if path.startswith(BASE):
        path = path[len(BASE):]
    return "/" + path.lstrip("/")


def exists_in_dist(path: str) -> bool:
    rel = path.lstrip("/")
    if not rel:
        return (DIST / "index.html").is_file()
    candidate = DIST / rel
    return candidate.is_file() or (candidate / "index.html").is_file() or (not candidate.suffix and (DIST / f"{rel}.html").is_file())


def main() -> int:
    errors: list[str] = []
    checked_images: set[str] = set()
    checked_links: set[str] = set()
    if not DIST.is_dir():
        print(f"V4 final readiness: no existe {DIST}", file=sys.stderr)
        return 1

    for route in ROUTES:
        page = DIST / route / "index.html"
        if not page.is_file():
            errors.append(f"falta pantalla V4: /{route}/")
            continue
        body = page.read_text(encoding="utf-8")
        parser = PageParser(); parser.feed(body)
        if parser.h1 != 1:
            errors.append(f"/{route}/ debe tener exactamente un H1; tiene {parser.h1}")
        if "noindex" not in parser.robots or "nofollow" not in parser.robots:
            errors.append(f"/{route}/ debe permanecer noindex,nofollow")
        if TELEMETRY.search(body):
            errors.append(f"/{route}/ contiene referencia a telemetría externa")

        for src, alt, decorative in parser.images:
            if alt is None:
                errors.append(f"/{route}/ contiene imagen sin atributo ALT: {src or '(sin src)'}")
            elif not decorative and not alt.strip():
                errors.append(f"/{route}/ contiene imagen informativa con ALT vacío: {src or '(sin src)'}")
            path = local_path(src)
            if path and path not in checked_images:
                checked_images.add(path)
                if not exists_in_dist(path):
                    errors.append(f"imagen local inexistente: {path}")

        for href in parser.links:
            path = local_path(href)
            if path and path not in checked_links:
                checked_links.add(path)
                if not exists_in_dist(path):
                    errors.append(f"enlace interno inexistente: {path}")
        for src in parser.scripts:
            path = local_path(src)
            if path and not exists_in_dist(path):
                errors.append(f"script local inexistente: {path}")

    stable_home = DIST / "index.html"
    if not stable_home.is_file():
        errors.append("falta Home estable")
    else:
        stable = stable_home.read_text(encoding="utf-8")
        if "scripts/v4-analytics-contract.js" in stable:
            errors.append("la Home estable no debe cargar el contrato analítico V4")
        if "noindex,nofollow" in stable.lower():
            errors.append("la Home estable no debe heredar noindex,nofollow del laboratorio")

    preview_home = DIST / "preview-v4/home/index.html"
    if preview_home.is_file() and "scripts/v4-analytics-contract.js" not in preview_home.read_text(encoding="utf-8"):
        errors.append("la Home V4 no carga el contrato local 10E.1")

    contact = DIST / "preview-v4/contacto/index.html"
    if contact.is_file():
        parser = PageParser(); parser.feed(contact.read_text(encoding="utf-8"))
        if parser.forms_with_transport:
            errors.append("Contacto V4 no debe activar transporte de formularios")

    robots = DIST / "robots.txt"
    if not robots.is_file():
        errors.append("falta robots.txt")
    else:
        robots_text = robots.read_text(encoding="utf-8")
        if "Disallow: /preview-v4" not in robots_text:
            errors.append("robots.txt no bloquea /preview-v4")
        if f"Disallow: {BASE}/preview-v4" not in robots_text:
            errors.append("robots.txt no bloquea la ruta base de /preview-v4")

    if errors:
        print("V4 final readiness: FAIL", file=sys.stderr)
        for item in errors:
            print(f"- {item}", file=sys.stderr)
        return 1
    print(f"V4 final readiness: OK · {len(ROUTES)} pantallas · {len(checked_links)} enlaces internos · {len(checked_images)} imágenes locales")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
