from __future__ import annotations

import os
import sys
from pathlib import Path
from urllib.parse import urljoin

from playwright.sync_api import sync_playwright

BASE_URL = os.environ.get("V4_PREVIEW_URL", "http://127.0.0.1:4321/isivoltpro-web-v3/")
OUT = Path(os.environ.get("V4_FINAL_VISUAL_QA_DIR", "v4-final-visual-qa"))
OUT.mkdir(parents=True, exist_ok=True)
ROUTES = [
    ("hub", "preview-v4/"), ("home", "preview-v4/home/"), ("producto", "preview-v4/producto/"),
    ("soluciones", "preview-v4/soluciones/"), ("apps", "preview-v4/apps/"), ("sectores", "preview-v4/sectores/"),
    ("recursos", "preview-v4/recursos/"), ("blog", "preview-v4/blog/"), ("empresa", "preview-v4/empresa/"),
    ("demo", "preview-v4/demo/"), ("precios", "preview-v4/precios/"), ("contacto", "preview-v4/contacto/"),
    ("acceso", "preview-v4/acceso/"), ("seguridad", "preview-v4/seguridad/"), ("privacidad", "preview-v4/privacidad/"),
    ("social", "preview-v4/social/"), ("fase-10", "preview-v4/fase-10/"),
]
VIEWPORTS = [("mobile-390", 390, 844), ("desktop-1440", 1440, 1000)]


def main() -> int:
    failures: list[str] = []
    checked = 0
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for viewport_name, width, height in VIEWPORTS:
            context = browser.new_context(viewport={"width": width, "height": height}, device_scale_factor=1)
            for name, route in ROUTES:
                page = context.new_page()
                console_errors: list[str] = []
                page_errors: list[str] = []
                request_failures: list[str] = []
                page.on("console", lambda message: console_errors.append(message.text) if message.type == "error" else None)
                page.on("pageerror", lambda error: page_errors.append(str(error)))
                page.on("requestfailed", lambda request: request_failures.append(f"{request.method} {request.url}"))
                url = urljoin(BASE_URL, route)
                try:
                    response = page.goto(url, wait_until="networkidle", timeout=30_000)
                    if response is None or not response.ok:
                        failures.append(f"{viewport_name} {name}: HTTP inválido en {url}")
                        continue
                    checked += 1
                    h1_count = page.locator("h1").count()
                    if h1_count != 1:
                        failures.append(f"{viewport_name} {name}: H1={h1_count}")
                    elif not page.locator("h1").first.is_visible():
                        failures.append(f"{viewport_name} {name}: H1 no visible")
                    robots = (page.locator('meta[name="robots"]').get_attribute("content") or "").lower().replace(" ", "")
                    if "noindex" not in robots or "nofollow" not in robots:
                        failures.append(f"{viewport_name} {name}: falta noindex,nofollow")
                    metrics = page.evaluate("() => ({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,bodyWidth:document.body.scrollWidth})")
                    widest = max(metrics["scrollWidth"], metrics["bodyWidth"])
                    if widest > metrics["clientWidth"] + 2:
                        offenders = page.evaluate("""() => [...document.querySelectorAll('body *')]
                          .map((el) => { const r=el.getBoundingClientRect(); return {tag:el.tagName.toLowerCase(), cls:(el.className||'').toString().slice(0,80), left:Math.round(r.left), right:Math.round(r.right), width:Math.round(r.width)}; })
                          .filter((x) => x.right > document.documentElement.clientWidth + 2 || x.left < -2)
                          .sort((a,b) => Math.max(b.right-document.documentElement.clientWidth, -b.left)-Math.max(a.right-document.documentElement.clientWidth, -a.left))
                          .slice(0,3)""")
                        failures.append(f"{viewport_name} {name}: overflow horizontal {widest}px > {metrics['clientWidth']}px · {offenders}")
                    broken_images = page.locator("img").evaluate_all("els => els.filter(img => !img.complete || img.naturalWidth < 1).map(img => img.currentSrc || img.src)")
                    if broken_images:
                        failures.append(f"{viewport_name} {name}: imágenes rotas: {broken_images[:3]}")
                    invalid_alt = page.locator("img").evaluate_all("""els => els.filter(img => {
                      if (!img.hasAttribute('alt')) return true;
                      const decorative = img.getAttribute('aria-hidden') === 'true' || ['presentation','none'].includes(img.getAttribute('role'));
                      return !decorative && !img.getAttribute('alt').trim();
                    }).map(img => img.currentSrc || img.src)""")
                    if invalid_alt:
                        failures.append(f"{viewport_name} {name}: ALT inválido: {invalid_alt[:3]}")
                    if page.locator("header.site-header").count() != 1:
                        failures.append(f"{viewport_name} {name}: cabecera comercial ausente")
                    if console_errors:
                        failures.append(f"{viewport_name} {name}: console.error: {console_errors[:2]}")
                    if page_errors:
                        failures.append(f"{viewport_name} {name}: pageerror: {page_errors[:2]}")
                    if request_failures:
                        failures.append(f"{viewport_name} {name}: requestfailed: {request_failures[:2]}")
                    page.screenshot(path=str(OUT / f"{viewport_name}-{name}.jpg"), full_page=True, type="jpeg", quality=72)
                except Exception as exc:
                    failures.append(f"{viewport_name} {name}: {type(exc).__name__}: {exc}")
                finally:
                    page.close()
            context.close()
        browser.close()
    report = OUT / "report.txt"
    if failures:
        report.write_text("FAIL\n" + "\n".join(failures) + "\n", encoding="utf-8")
        print(f"V4 final visual QA: FAIL · {len(failures)} incidencia(s)", file=sys.stderr)
        for failure in failures:
            print(f"- {failure}", file=sys.stderr)
        return 1
    report.write_text(f"OK\n{checked} comprobaciones visuales completadas\n", encoding="utf-8")
    print(f"V4 final visual QA: OK · {checked} comprobaciones · {len(ROUTES)} pantallas × {len(VIEWPORTS)} viewports")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
