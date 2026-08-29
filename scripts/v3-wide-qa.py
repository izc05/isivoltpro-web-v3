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
    ("", "home"), ("producto/", "producto"), ("soluciones/", "soluciones"),
    ("app-mantenimiento/", "app-mantenimiento"), ("aplicaciones/", "apps"),
    ("apps-especializadas/", "apps-especializadas"), ("alcance/", "alcance"),
    ("experiencia/", "experiencia"), ("demo/", "demo"), ("selector/", "selector"),
    ("de-whatsapp-excel-a-isivoltpro/", "transicion-whatsapp-excel"), ("piloto/", "piloto"),
    ("implantacion/", "implantacion"), ("seguridad/", "seguridad"), ("sectores/", "sectores"),
    ("precios/", "planes"), ("recursos/", "recursos"), ("empresa/", "empresa"),
    ("contacto/", "contacto"),
]

failures: list[str] = []


def capture_entry(browser, width: int, height: int, name: str) -> None:
    page = browser.new_page(viewport={"width": width, "height": height}, device_scale_factor=1)
    response = page.goto(BASE_URL, wait_until="networkidle")
    if response is None or response.status >= 400:
        failures.append(f"entrada V4 {name}: HTTP inválido"); page.close(); return
    page.wait_for_timeout(1200)
    metrics = page.evaluate(
        """() => {
          const root=document.documentElement;
          const visible=(el)=>{if(!el)return false;const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0};
          const intro=document.querySelector('.entry3d');
          const canvas=document.querySelector('#entry3d-canvas');
          const scene=document.querySelector('#entry3d-scene');
          const logo=document.querySelector('.entry3d__logo');
          const skip=document.querySelector('#skip-intro');
          const sr=scene?.getBoundingClientRect(); const lr=logo?.getBoundingClientRect(); const kr=skip?.getBoundingClientRect();
          const introStyle=intro?getComputedStyle(intro):null;
          return {
            introVisible:visible(intro)&&!intro.classList.contains('is-done'),
            canvasW:canvas?.width||0,canvasH:canvas?.height||0,
            sceneW:sr?.width||0,sceneH:sr?.height||0,
            logoVisible:visible(logo),logoW:lr?.width||0,
            skipVisible:visible(skip),skipH:kr?.height||0,
            legacyCount:document.querySelectorAll('.entry3d__heading,.entry3d__note,.entry3d__actions,.entry3d__phone,.entry3d__orders').length,
            bgColor:introStyle?.backgroundColor||'',bgImage:introStyle?.backgroundImage||'',
            scrollWidth:root.scrollWidth,clientWidth:root.clientWidth,
          };
        }"""
    )
    if not metrics["introVisible"]: failures.append(f"entrada V4 {name}: la escena no está visible")
    if metrics["canvasW"] < 240 or metrics["canvasH"] < 240: failures.append(f"entrada V4 {name}: canvas WebGL sin tamaño útil · {metrics['canvasW']}x{metrics['canvasH']}")
    if metrics["sceneW"] < min(width * .75, 680) or metrics["sceneH"] < 460: failures.append(f"entrada V4 {name}: cubo/escena demasiado pequeño · {metrics['sceneW']}x{metrics['sceneH']}")
    if not metrics["logoVisible"] or metrics["logoW"] < 210: failures.append(f"entrada V4 {name}: marca IsiVoltPro ausente o demasiado pequeña")
    if not metrics["skipVisible"] or metrics["skipH"] < 43: failures.append(f"entrada V4 {name}: control Saltar intro no accesible · {metrics['skipH']}px")
    if metrics["legacyCount"] != 0: failures.append(f"entrada V4 {name}: reapareció contenido periférico retirado · {metrics['legacyCount']}")
    if metrics["bgColor"] in {"rgba(0, 0, 0, 0)", "transparent"}: failures.append(f"entrada V4 {name}: fondo de intro transparente")
    if metrics["scrollWidth"] > metrics["clientWidth"] + 1: failures.append(f"entrada V4 {name}: overflow horizontal {metrics['scrollWidth']} > {metrics['clientWidth']}")
    page.screenshot(path=str(OUT / f"entrada-3d-{name}.png"), full_page=False)
    page.close()


def render_full_page(page, label: str, width: int) -> None:
    page.evaluate(
        """async()=>{const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));const reveals=[...document.querySelectorAll('.reveal')];for(const el of reveals){el.scrollIntoView({block:'center',behavior:'instant'});await sleep(90)}const step=Math.max(300,Math.floor(innerHeight*.55));let max=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);for(let y=0;y<=max;y+=step){scrollTo(0,y);await sleep(65);max=Math.max(max,document.body.scrollHeight,document.documentElement.scrollHeight)}scrollTo(0,max);await sleep(420)}"""
    )
    hidden = page.evaluate("""()=>[...document.querySelectorAll('.reveal')].filter(el=>!el.classList.contains('is-visible')).map(el=>({tag:el.tagName,cls:String(el.className||'').slice(0,100)})).slice(0,12)""")
    if hidden: failures.append(f"{label} ({width}px): reveal sin activar tras recorrido · {hidden}")
    page.evaluate("window.scrollTo(0,0)"); page.wait_for_timeout(160)


def audit_page(page, label: str, width: int) -> None:
    metrics=page.evaluate("""()=>{const visible=(el)=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0};const root=document.documentElement;const offenders=[...document.querySelectorAll('body *')].map(el=>{const r=el.getBoundingClientRect();return{tag:el.tagName,cls:String(el.className||'').slice(0,100),left:r.left,right:r.right,width:r.width}}).filter(x=>x.width>0&&(x.left<-2||x.right>root.clientWidth+2)).slice(0,14);const smallControls=[...document.querySelectorAll('.btn,.v3-mobile-nav summary')].filter(visible).map(el=>{const r=el.getBoundingClientRect();return{text:(el.textContent||'').trim().slice(0,60),width:r.width,height:r.height}}).filter(x=>x.height<43);const desktopNav=document.querySelector('.site-header .nav'),mobileNav=document.querySelector('.v3-mobile-nav');return{scrollWidth:root.scrollWidth,clientWidth:root.clientWidth,offenders,smallControls,desktopNavVisible:desktopNav?visible(desktopNav):false,mobileNavVisible:mobileNav?visible(mobileNav):false}}""")
    if metrics["scrollWidth"] > metrics["clientWidth"] + 1: failures.append(f"{label} ({width}px): scroll horizontal {metrics['scrollWidth']} > {metrics['clientWidth']} · {metrics['offenders']}")
    if metrics["smallControls"]: failures.append(f"{label} ({width}px): controles visibles <43px · {metrics['smallControls']}")
    if width == 768:
        if metrics["desktopNavVisible"]: failures.append(f"{label} ({width}px): navegación desktop visible en tablet estrecha")
        if not metrics["mobileNavVisible"]: failures.append(f"{label} ({width}px): navegación móvil no visible en tablet estrecha")
    elif width >= 1024:
        if not metrics["desktopNavVisible"]: failures.append(f"{label} ({width}px): navegación desktop ausente")
        if metrics["mobileNavVisible"]: failures.append(f"{label} ({width}px): navegación móvil visible en escritorio")


def full_screenshot(page, path: Path) -> None:
    style=page.add_style_tag(content=".reveal{opacity:1!important;transform:none!important}.section,.page-section{content-visibility:visible!important;contain-intrinsic-size:auto!important}")
    page.screenshot(path=str(path), full_page=True); style.evaluate("el=>el.remove()")


def capture(browser, route: str, name: str, vp_name: str, width: int, height: int) -> None:
    page=browser.new_page(viewport={"width":width,"height":height},device_scale_factor=1)
    page.add_init_script("try{sessionStorage.setItem('isivoltpro-intro-seen','1')}catch(_){}")
    url=urljoin(BASE_URL,route); response=page.goto(url,wait_until="networkidle")
    if response is None or response.status >= 400: failures.append(f"{name} ({width}px): HTTP inválido en {url}"); page.close(); return
    page.wait_for_timeout(160); render_full_page(page,name,width); audit_page(page,name,width)
    page.screenshot(path=str(OUT/f"{name}-{vp_name}-top.png"),full_page=False)
    if (width,name) in {(768,"home"),(1440,"home"),(1024,"app-mantenimiento"),(1280,"experiencia"),(1280,"demo"),(1280,"selector"),(1280,"sectores"),(1280,"planes"),(1280,"recursos")}: full_screenshot(page,OUT/f"{name}-{vp_name}-full.png")
    page.close()


with sync_playwright() as p:
    browser=p.chromium.launch(headless=True)
    capture_entry(browser,768,1024,"tablet"); capture_entry(browser,1440,1000,"wide")
    for vp_name,width,height in VIEWPORTS:
        for route,name in ROUTES: capture(browser,route,name,vp_name,width,height)
    browser.close()

if failures:
    print("\nQA tablet/escritorio V4: FALLÓ",file=sys.stderr)
    for item in failures: print(f"- {item}",file=sys.stderr)
    raise SystemExit(1)
print("QA tablet/escritorio V4: OK · entrada mínima + 19 rutas × 4 viewports")