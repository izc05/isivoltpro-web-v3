from __future__ import annotations

import os
import sys
from pathlib import Path
from urllib.parse import urljoin

from playwright.sync_api import sync_playwright

BASE_URL = os.environ.get("V3_PREVIEW_URL", "http://127.0.0.1:4321/")
OUT = Path(os.environ.get("V3_WIDE_QA_DIR", "wide-qa"))
OUT.mkdir(parents=True, exist_ok=True)

VIEWPORTS = [
    ("tablet", 768, 1024),
    ("laptop", 1024, 768),
    ("desktop", 1280, 900),
    ("wide", 1440, 1000),
]

# Muestra representativa del embudo y de las principales plantillas comerciales.
# /acceso/ queda fuera: lo desarrolla IsiVoltPro Platform por separado.
ROUTES = [
    ("", "home"),
    ("producto/", "producto"),
    ("soluciones/", "soluciones"),
    ("app-mantenimiento/", "app-mantenimiento"),
    ("aplicaciones/", "apps"),
    ("apps-especializadas/", "apps-especializadas"),
    ("alcance/", "alcance"),
    ("demo/", "demo"),
    ("piloto/", "piloto"),
    ("implantacion/", "implantacion"),
    ("seguridad/", "seguridad"),
    ("precios/", "planes"),
    ("empresa/", "empresa"),
    ("contacto/", "contacto"),
]

failures: list[str] = []


def render_full_page(page, label: str, width: int) -> None:
    page.evaluate(
        """async () => {
          const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
          const step = Math.max(360, Math.floor(window.innerHeight * .7));
          let max = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
          for (let y = 0; y <= max; y += step) {
            window.scrollTo(0, y);
            await sleep(70);
            max = Math.max(max, document.body.scrollHeight, document.documentElement.scrollHeight);
          }
          window.scrollTo(0, max);
          await sleep(500);
        }"""
    )
    hidden_reveals = page.evaluate(
        """() => [...document.querySelectorAll('.reveal')]
          .filter((el) => !el.classList.contains('is-visible'))
          .map((el) => ({tag: el.tagName, cls: String(el.className || '').slice(0, 100)}))
          .slice(0, 12)"""
    )
    if hidden_reveals:
        failures.append(f"{label} ({width}px): reveal sin activar tras recorrido · {hidden_reveals}")
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(160)


def audit_page(page, label: str, width: int) -> None:
    metrics = page.evaluate(
        """() => {
          const visible = (el) => {
            const s = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            return s.display !== 'none' && s.visibility !== 'hidden' && r.width > 0 && r.height > 0;
          };
          const root = document.documentElement;
          const offenders = [...document.querySelectorAll('body *')]
            .map((el) => {
              const r = el.getBoundingClientRect();
              return {tag: el.tagName, cls: String(el.className || '').slice(0, 100), left: r.left, right: r.right, width: r.width};
            })
            .filter((x) => x.width > 0 && (x.left < -2 || x.right > root.clientWidth + 2))
            .slice(0, 14);
          const smallControls = [...document.querySelectorAll('.btn, .v3-mobile-nav summary')]
            .filter(visible)
            .map((el) => {
              const r = el.getBoundingClientRect();
              return {text:(el.textContent || '').trim().slice(0,60), width:r.width, height:r.height};
            })
            .filter((x) => x.height < 43);
          const desktopNav = document.querySelector('.site-header .nav');
          const mobileNav = document.querySelector('.v3-mobile-nav');
          return {
            scrollWidth: root.scrollWidth,
            clientWidth: root.clientWidth,
            offenders,
            smallControls,
            desktopNavVisible: desktopNav ? visible(desktopNav) : false,
            mobileNavVisible: mobileNav ? visible(mobileNav) : false,
          };
        }"""
    )

    if metrics["scrollWidth"] > metrics["clientWidth"] + 1:
        failures.append(
            f"{label} ({width}px): scroll horizontal {metrics['scrollWidth']} > {metrics['clientWidth']} · {metrics['offenders']}"
        )
    if metrics["smallControls"]:
        failures.append(f"{label} ({width}px): controles visibles <43px · {metrics['smallControls']}")

    # El breakpoint compartido oculta la navegación desktop por debajo de 860px.
    if width == 768:
        if metrics["desktopNavVisible"]:
            failures.append(f"{label} ({width}px): navegación desktop visible en tablet estrecha")
        if not metrics["mobileNavVisible"]:
            failures.append(f"{label} ({width}px): navegación móvil no visible en tablet estrecha")
    elif width >= 1024:
        if not metrics["desktopNavVisible"]:
            failures.append(f"{label} ({width}px): navegación desktop ausente")
        if metrics["mobileNavVisible"]:
            failures.append(f"{label} ({width}px): navegación móvil visible en escritorio")


def full_screenshot(page, path: Path) -> None:
    style = page.add_style_tag(
        content="""
          .reveal { opacity: 1 !important; transform: none !important; }
          .section, .page-section { content-visibility: visible !important; contain-intrinsic-size: auto !important; }
        """
    )
    page.screenshot(path=str(path), full_page=True)
    style.evaluate("el => el.remove()")


def capture(browser, route: str, name: str, vp_name: str, width: int, height: int) -> None:
    page = browser.new_page(viewport={"width": width, "height": height}, device_scale_factor=1)
    page.add_init_script("""try { sessionStorage.setItem('isivoltpro-intro-seen', '1'); } catch (_) {}""")
    url = urljoin(BASE_URL, route)
    response = page.goto(url, wait_until="networkidle")
    if response is None or response.status >= 400:
        failures.append(f"{name} ({width}px): HTTP inválido en {url}")
        page.close()
        return

    page.wait_for_timeout(160)
    render_full_page(page, name, width)
    audit_page(page, name, width)
    page.screenshot(path=str(OUT / f"{name}-{vp_name}-top.png"), full_page=False)

    if (width, name) in {
        (768, "home"),
        (1440, "home"),
        (1024, "app-mantenimiento"),
        (1280, "demo"),
        (1280, "planes"),
    }:
        full_screenshot(page, OUT / f"{name}-{vp_name}-full.png")
    page.close()


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for vp_name, width, height in VIEWPORTS:
        for route, name in ROUTES:
            capture(browser, route, name, vp_name, width, height)
    browser.close()

if failures:
    print("\nQA tablet/escritorio V3: FALLÓ", file=sys.stderr)
    for item in failures:
        print(f"- {item}", file=sys.stderr)
    raise SystemExit(1)

print("QA tablet/escritorio V3: OK · 14 rutas × 4 viewports (768 / 1024 / 1280 / 1440 px)")
