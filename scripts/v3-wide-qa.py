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


def capture_entry(browser, width: int, height: int, name: str) -> None:
    page = browser.new_page(viewport={"width": width, "height": height}, device_scale_factor=1)
    response = page.goto(BASE_URL, wait_until="networkidle")
    if response is None or response.status >= 400:
        failures.append(f"entrada 3D {name}: HTTP inválido")
        page.close(); return
    page.wait_for_timeout(1100)
    metrics = page.evaluate(
        """() => {
          const root = document.documentElement;
          const intro = document.querySelector('.entry3d');
          const canvas = document.querySelector('#entry3d-canvas');
          const scene = document.querySelector('#entry3d-scene');
          const heading = document.querySelector('.entry3d__heading h1');
          const notes = [...document.querySelectorAll('.entry3d__note')].filter((el) => {
            const r = el.getBoundingClientRect(); const s = getComputedStyle(el);
            return s.display !== 'none' && r.width > 0 && r.height > 0;
          }).length;
          return {
            introVisible: !!intro && getComputedStyle(intro).visibility !== 'hidden' && !intro.classList.contains('is-done'),
            canvasW: canvas?.width || 0,
            canvasH: canvas?.height || 0,
            sceneW: scene?.getBoundingClientRect().width || 0,
            sceneH: scene?.getBoundingClientRect().height || 0,
            heading: heading?.textContent?.trim() || '',
            scrollWidth: root.scrollWidth,
            clientWidth: root.clientWidth,
            notes,
          };
        }"""
    )
    if not metrics["introVisible"]:
        failures.append(f"entrada 3D {name}: la escena no está visible")
    if metrics["canvasW"] < 160 or metrics["canvasH"] < 160:
        failures.append(f"entrada 3D {name}: canvas WebGL sin tamaño útil · {metrics['canvasW']}x{metrics['canvasH']}")
    if metrics["sceneW"] < width * 0.8 or metrics["sceneH"] < 420:
        failures.append(f"entrada 3D {name}: escena demasiado pequeña · {metrics['sceneW']}x{metrics['sceneH']}")
    if "Conectando" not in metrics["heading"]:
        failures.append(f"entrada 3D {name}: falta el titular aprobado")
    if metrics["scrollWidth"] > metrics["clientWidth"] + 1:
        failures.append(f"entrada 3D {name}: overflow horizontal {metrics['scrollWidth']} > {metrics['clientWidth']}")
    if width >= 1200 and metrics["notes"] < 6:
        failures.append(f"entrada 3D {name}: faltan tarjetas periféricas visibles · {metrics['notes']}")
    page.screenshot(path=str(OUT / f"entrada-3d-{name}.png"), full_page=False)
    page.close()


def render_full_page(page, label: str, width: int) -> None:
    page.evaluate(
        """async () => {
          const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
          const reveals = [...document.querySelectorAll('.reveal')];
          for (const el of reveals) { el.scrollIntoView({block: 'center', behavior: 'instant'}); await sleep(90); }
          const step = Math.max(300, Math.floor(window.innerHeight * .55));
          let max = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
          for (let y = 0; y <= max; y += step) { window.scrollTo(0, y); await sleep(65); max = Math.max(max, document.body.scrollHeight, document.documentElement.scrollHeight); }
          window.scrollTo(0, max); await sleep(420);
        }"""
    )
    hidden_reveals = page.evaluate("""() => [...document.querySelectorAll('.reveal')].filter((el) => !el.classList.contains('is-visible')).map((el) => ({tag: el.tagName, cls: String(el.className || '').slice(0, 100)})).slice(0, 12)""")
    if hidden_reveals: failures.append(f"{label} ({width}px): reveal sin activar tras recorrido · {hidden_reveals}")
    page.evaluate("window.scrollTo(0, 0)"); page.wait_for_timeout(160)


def audit_page(page, label: str, width: int) -> None:
    metrics = page.evaluate(
        """() => {
          const visible = (el) => { const s=getComputedStyle(el); const r=el.getBoundingClientRect(); return s.display!=='none' && s.visibility!=='hidden' && r.width>0 && r.height>0; };
          const root=document.documentElement;
          const offenders=[...document.querySelectorAll('body *')].map((el)=>{const r=el.getBoundingClientRect();return {tag:el.tagName,cls:String(el.className||'').slice(0,100),left:r.left,right:r.right,width:r.width};}).filter((x)=>x.width>0&&(x.left<-2||x.right>root.clientWidth+2)).slice(0,14);
          const smallControls=[...document.querySelectorAll('.btn, .v3-mobile-nav summary')].filter(visible).map((el)=>{const r=el.getBoundingClientRect();return {text:(el.textContent||'').trim().slice(0,60),width:r.width,height:r.height};}).filter((x)=>x.height<43);
          const desktopNav=document.querySelector('.site-header .nav'); const mobileNav=document.querySelector('.v3-mobile-nav');
          return {scrollWidth:root.scrollWidth,clientWidth:root.clientWidth,offenders,smallControls,desktopNavVisible:desktopNav?visible(desktopNav):false,mobileNavVisible:mobileNav?visible(mobileNav):false};
        }"""
    )
    if metrics["scrollWidth"] > metrics["clientWidth"] + 1: failures.append(f"{label} ({width}px): scroll horizontal {metrics['scrollWidth']} > {metrics['clientWidth']} · {metrics['offenders']}")
    if metrics["smallControls"]: failures.append(f"{label} ({width}px): controles visibles <43px · {metrics['smallControls']}")
    if width == 768:
        if metrics["desktopNavVisible"]: failures.append(f"{label} ({width}px): navegación desktop visible en tablet estrecha")
        if not metrics["mobileNavVisible"]: failures.append(f"{label} ({width}px): navegación móvil no visible en tablet estrecha")
    elif width >= 1024:
        if not metrics["desktopNavVisible"]: failures.append(f"{label} ({width}px): navegación desktop ausente")
        if metrics["mobileNavVisible"]: failures.append(f"{label} ({width}px): navegación móvil visible en escritorio")


def full_screenshot(page, path: Path) -> None:
    style = page.add_style_tag(content=""".reveal { opacity: 1 !important; transform: none !important; }.section, .page-section { content-visibility: visible !important; contain-intrinsic-size: auto !important; }""")
    page.screenshot(path=str(path), full_page=True); style.evaluate("el => el.remove()")


def capture(browser, route: str, name: str, vp_name: str, width: int, height: int) -> None:
    page = browser.new_page(viewport={"width": width, "height": height}, device_scale_factor=1)
    page.add_init_script("""try { sessionStorage.setItem('isivoltpro-intro-seen', '1'); } catch (_) {}""")
    url = urljoin(BASE_URL, route)
    response = page.goto(url, wait_until="networkidle")
    if response is None or response.status >= 400: failures.append(f"{name} ({width}px): HTTP inválido en {url}"); page.close(); return
    page.wait_for_timeout(160); render_full_page(page, name, width); audit_page(page, name, width)
    page.screenshot(path=str(OUT / f"{name}-{vp_name}-top.png"), full_page=False)
    if (width, name) in {(768,"home"),(1440,"home"),(1024,"app-mantenimiento"),(1280,"demo"),(1280,"planes")}: full_screenshot(page, OUT / f"{name}-{vp_name}-full.png")
    page.close()


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    capture_entry(browser, 768, 1024, "tablet")
    capture_entry(browser, 1440, 1000, "wide")
    for vp_name, width, height in VIEWPORTS:
        for route, name in ROUTES: capture(browser, route, name, vp_name, width, height)
    browser.close()

if failures:
    print("\nQA tablet/escritorio V3: FALLÓ", file=sys.stderr)
    for item in failures: print(f"- {item}", file=sys.stderr)
    raise SystemExit(1)

print("QA tablet/escritorio V3: OK · entrada 3D + 14 rutas × 4 viewports")