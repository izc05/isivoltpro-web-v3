from __future__ import annotations

import os
import sys
from pathlib import Path
from urllib.parse import urljoin

from playwright.sync_api import sync_playwright

BASE_URL = os.environ.get("V3_PREVIEW_URL", "http://127.0.0.1:4321/")
OUT = Path(os.environ.get("V3_MOBILE_QA_DIR", "mobile-qa"))
OUT.mkdir(parents=True, exist_ok=True)

VIEWPORTS = [
    ("360", 360, 800),
    ("390", 390, 844),
    ("430", 430, 932),
]

# Rutas representativas de todas las plantillas comerciales públicas.
# /acceso/ queda expresamente fuera: pertenece a IsiVoltPro Platform.
ROUTES = [
    ("", "home"),
    ("producto/", "producto"),
    ("soluciones/", "soluciones"),
    ("app-mantenimiento/", "app-mantenimiento"),
    ("aplicaciones/", "modulos"),
    ("piloto/", "piloto"),
    ("implantacion/", "implantacion"),
    ("seguridad/", "seguridad"),
    ("de-whatsapp-excel-a-isivoltpro/", "transicion-whatsapp-excel"),
    ("sectores/", "sectores"),
    ("precios/", "planes"),
    ("recursos/", "recursos"),
    ("empresa/", "empresa"),
    ("faq/", "faq"),
    ("contacto/", "contacto"),
    ("modulos/ordenes-de-trabajo/", "modulo-ot"),
    ("sectores/autonomos-tecnicos/", "sector-autonomos"),
    ("recursos/orden-trabajo-util/", "guia-ot"),
]

failures: list[str] = []


def render_full_page(page, label: str, width: int) -> None:
    """Recorre la página como una persona para activar lazy/reveal antes del QA."""
    page.evaluate(
        """async () => {
          const step = Math.max(300, Math.floor(window.innerHeight * 0.62));
          const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
          let max = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
          for (let y = 0; y <= max; y += step) {
            window.scrollTo(0, y);
            await sleep(90);
            max = Math.max(max, document.body.scrollHeight, document.documentElement.scrollHeight);
          }
          window.scrollTo(0, max);
          await sleep(720);
        }"""
    )

    hidden_reveals = page.evaluate(
        """() => [...document.querySelectorAll('.reveal')]
          .filter((el) => !el.classList.contains('is-visible'))
          .map((el) => ({tag: el.tagName, cls: String(el.className || '').slice(0, 90)}))
          .slice(0, 12)"""
    )
    if hidden_reveals:
        failures.append(f"{label} ({width}px): secciones reveal no activadas tras recorrido · {hidden_reveals}")

    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(180)


def audit_layout(page, label: str, width: int) -> None:
    metrics = page.evaluate(
        """() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          offenders: [...document.querySelectorAll('body *')]
            .map((el) => {
              const r = el.getBoundingClientRect();
              return {tag: el.tagName, cls: String(el.className || '').slice(0, 90), left: r.left, right: r.right, width: r.width};
            })
            .filter((x) => x.width > 0 && (x.left < -2 || x.right > document.documentElement.clientWidth + 2))
            .slice(0, 12),
          smallControls: [...document.querySelectorAll('.btn, .v3-mobile-nav summary, .contact-back')]
            .map((el) => {
              const r = el.getBoundingClientRect();
              return {tag: el.tagName, cls: String(el.className || ''), text: (el.textContent || '').trim().slice(0, 60), width: r.width, height: r.height};
            })
            .filter((x) => x.width > 0 && x.height > 0 && x.height < 43)
        })"""
    )

    if metrics["scrollWidth"] > metrics["clientWidth"] + 1:
        failures.append(
            f"{label} ({width}px): scroll horizontal {metrics['scrollWidth']} > {metrics['clientWidth']} · {metrics['offenders']}"
        )

    if metrics["smallControls"]:
        failures.append(f"{label} ({width}px): controles táctiles <43px · {metrics['smallControls']}")


def full_screenshot(page, path: Path) -> None:
    style = page.add_style_tag(
        content="""
          .reveal { opacity: 1 !important; transform: none !important; }
          .section, .page-section { content-visibility: visible !important; contain-intrinsic-size: auto !important; }
        """
    )
    page.screenshot(path=str(path), full_page=True)
    style.evaluate("el => el.remove()")


def capture_route(browser, route: str, name: str, viewport_name: str, width: int, height: int) -> None:
    page = browser.new_page(viewport={"width": width, "height": height}, device_scale_factor=1)
    page.add_init_script(
        """try { sessionStorage.setItem('isivoltpro-intro-seen', '1'); } catch (_) {}"""
    )
    url = urljoin(BASE_URL, route)
    response = page.goto(url, wait_until="networkidle")
    if response is None or response.status >= 400:
        failures.append(f"{name} ({width}px): HTTP inválido en {url}")
        page.close()
        return

    page.wait_for_timeout(180)
    render_full_page(page, name, width)
    audit_layout(page, name, width)

    page.screenshot(path=str(OUT / f"{name}-{viewport_name}-top.png"), full_page=False)
    if width == 390 and name in {"home", "contacto", "app-mantenimiento", "piloto", "implantacion", "seguridad", "transicion-whatsapp-excel"}:
        full_screenshot(page, OUT / f"{name}-390-full.png")

    if name == "home" and width == 390:
        menu = page.locator(".v3-mobile-nav summary")
        if menu.count() == 1:
            menu.click()
            page.wait_for_timeout(100)
            panel = page.locator(".v3-mobile-nav__panel")
            if panel.count() == 1:
                rect = panel.bounding_box()
                if rect and (rect["x"] < -1 or rect["x"] + rect["width"] > width + 1):
                    failures.append(f"menú móvil (390px): panel fuera del viewport · {rect}")
                page.screenshot(path=str(OUT / "home-390-menu.png"), full_page=False)
            else:
                failures.append("home (390px): no aparece el panel de navegación móvil")
        else:
            failures.append("home (390px): no existe el control de navegación móvil")

    page.close()


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for viewport_name, width, height in VIEWPORTS:
        for route, name in ROUTES:
            capture_route(browser, route, name, viewport_name, width, height)
    browser.close()

if failures:
    print("\nQA móvil V3: FALLÓ", file=sys.stderr)
    for item in failures:
        print(f"- {item}", file=sys.stderr)
    raise SystemExit(1)

print("QA móvil V3: OK · 18 rutas representativas validadas a 360 / 390 / 430 px con recorrido completo")
