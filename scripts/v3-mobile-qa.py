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

ROUTES = [
    ("", "home"),
    ("producto/", "producto"),
    ("soluciones/", "soluciones"),
    ("app-mantenimiento/", "app-mantenimiento"),
    ("aplicaciones/", "modulos"),
    ("apps-especializadas/", "apps-especializadas"),
    ("alcance/", "alcance"),
    ("experiencia/", "experiencia"),
    ("demo/", "demo"),
    ("selector/", "selector"),
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


def capture_entry(browser) -> None:
    width, height = 390, 844
    page = browser.new_page(viewport={"width": width, "height": height}, device_scale_factor=1)
    response = page.goto(BASE_URL, wait_until="networkidle")
    if response is None or response.status >= 400:
        failures.append("entrada 3D móvil: HTTP inválido")
        page.close()
        return
    page.wait_for_timeout(1000)
    metrics = page.evaluate(
        """() => {
          const root = document.documentElement;
          const intro = document.querySelector('.entry3d');
          const canvas = document.querySelector('#entry3d-canvas');
          const h1 = document.querySelector('.entry3d__heading h1');
          const actions = [...document.querySelectorAll('.entry3d__actions a')].map((el) => {
            const r = el.getBoundingClientRect(); return {w:r.width,h:r.height};
          });
          return {
            introVisible: !!intro && getComputedStyle(intro).visibility !== 'hidden' && !intro.classList.contains('is-done'),
            canvasW: canvas?.width || 0,
            canvasH: canvas?.height || 0,
            headline: h1?.textContent?.trim() || '',
            scrollWidth: root.scrollWidth,
            clientWidth: root.clientWidth,
            actions,
          };
        }"""
    )
    if not metrics["introVisible"]:
        failures.append("entrada 3D móvil: la escena no está visible al cargar")
    if metrics["canvasW"] < 120 or metrics["canvasH"] < 120:
        failures.append(f"entrada 3D móvil: canvas WebGL sin tamaño útil · {metrics['canvasW']}x{metrics['canvasH']}")
    if "Conectando" not in metrics["headline"]:
        failures.append("entrada 3D móvil: falta el titular aprobado")
    if metrics["scrollWidth"] > metrics["clientWidth"] + 1:
        failures.append(f"entrada 3D móvil: overflow horizontal {metrics['scrollWidth']} > {metrics['clientWidth']}")
    if any(action["h"] < 43 for action in metrics["actions"]):
        failures.append(f"entrada 3D móvil: CTA táctil menor de 43 px · {metrics['actions']}")
    page.screenshot(path=str(OUT / "entrada-3d-390.png"), full_page=False)
    page.close()


def render_full_page(page, label: str, width: int) -> None:
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
            .map((el) => { const r = el.getBoundingClientRect(); return {tag: el.tagName, cls: String(el.className || '').slice(0, 90), left: r.left, right: r.right, width: r.width}; })
            .filter((x) => x.width > 0 && (x.left < -2 || x.right > document.documentElement.clientWidth + 2)).slice(0, 12),
          smallControls: [...document.querySelectorAll('.btn, .v3-mobile-nav summary, .footer-group summary, .contact-back')]
            .map((el) => { const r = el.getBoundingClientRect(); return {tag: el.tagName, cls: String(el.className || ''), text: (el.textContent || '').trim().slice(0, 60), width: r.width, height: r.height}; })
            .filter((x) => x.width > 0 && x.height > 0 && x.height < 43)
        })"""
    )
    if metrics["scrollWidth"] > metrics["clientWidth"] + 1:
        failures.append(f"{label} ({width}px): scroll horizontal {metrics['scrollWidth']} > {metrics['clientWidth']} · {metrics['offenders']}")
    if metrics["smallControls"]:
        failures.append(f"{label} ({width}px): controles táctiles <43px · {metrics['smallControls']}")


def audit_mobile_footer(page, label: str, width: int) -> None:
    if width != 390 or label != "home":
        return
    groups = page.locator(".footer-group")
    if groups.count() != 3:
        failures.append(f"footer móvil (390px): se esperaban 3 grupos desplegables y hay {groups.count()}")
        return
    states = page.evaluate("""() => [...document.querySelectorAll('.footer-group')].map((el) => ({open: el.open, links: el.querySelectorAll('a').length}))""")
    if any(item["open"] for item in states):
        failures.append(f"footer móvil (390px): los grupos deben arrancar cerrados · {states}")
    if any(item["links"] < 4 for item in states):
        failures.append(f"footer móvil (390px): faltan enlaces de navegación · {states}")
    first_summary = page.locator(".footer-group summary").first
    first_summary.scroll_into_view_if_needed()
    first_summary.click()
    page.wait_for_timeout(80)
    opened = page.locator(".footer-group").first.evaluate("el => el.open")
    visible_links = page.locator(".footer-group").first.locator("a:visible").count()
    if not opened or visible_links < 4:
        failures.append(f"footer móvil (390px): el primer grupo no despliega enlaces correctamente · open={opened}, visibles={visible_links}")
    first_summary.click()


def full_screenshot(page, path: Path) -> None:
    style = page.add_style_tag(content=""".reveal { opacity: 1 !important; transform: none !important; }.section, .page-section { content-visibility: visible !important; contain-intrinsic-size: auto !important; }""")
    page.screenshot(path=str(path), full_page=True)
    style.evaluate("el => el.remove()")


def capture_route(browser, route: str, name: str, viewport_name: str, width: int, height: int) -> None:
    page = browser.new_page(viewport={"width": width, "height": height}, device_scale_factor=1)
    page.add_init_script("""try { sessionStorage.setItem('isivoltpro-intro-seen', '1'); } catch (_) {}""")
    url = urljoin(BASE_URL, route)
    response = page.goto(url, wait_until="networkidle")
    if response is None or response.status >= 400:
        failures.append(f"{name} ({width}px): HTTP inválido en {url}")
        page.close(); return
    page.wait_for_timeout(180)
    render_full_page(page, name, width)
    audit_layout(page, name, width)
    audit_mobile_footer(page, name, width)
    # Audits may scroll to off-screen controls (notably the compact footer). Reset
    # deterministically so every *-top.png really represents the page top.
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(140)
    page.screenshot(path=str(OUT / f"{name}-{viewport_name}-top.png"), full_page=False)
    if width == 390 and name in {"home", "contacto", "app-mantenimiento", "apps-especializadas", "alcance", "experiencia", "demo", "selector", "piloto", "implantacion", "seguridad", "transicion-whatsapp-excel"}:
        full_screenshot(page, OUT / f"{name}-390-full.png")
    if name == "home" and width == 390:
        menu = page.locator(".v3-mobile-nav summary")
        if menu.count() == 1:
            menu.click(); page.wait_for_timeout(100)
            panel = page.locator(".v3-mobile-nav__panel")
            if panel.count() == 1:
                rect = panel.bounding_box()
                if rect and (rect["x"] < -1 or rect["x"] + rect["width"] > width + 1): failures.append(f"menú móvil (390px): panel fuera del viewport · {rect}")
                page.screenshot(path=str(OUT / "home-390-menu.png"), full_page=False)
            else: failures.append("home (390px): no aparece el panel de navegación móvil")
        else: failures.append("home (390px): no existe el control de navegación móvil")
    page.close()


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    capture_entry(browser)
    for viewport_name, width, height in VIEWPORTS:
        for route, name in ROUTES:
            capture_route(browser, route, name, viewport_name, width, height)
    browser.close()

if failures:
    print("\nQA móvil V3: FALLÓ", file=sys.stderr)
    for item in failures: print(f"- {item}", file=sys.stderr)
    raise SystemExit(1)

print("QA móvil V3: OK · entrada 3D + 23 rutas representativas a 360 / 390 / 430 px")