from __future__ import annotations

import os
import sys
from pathlib import Path
from urllib.parse import urljoin

from playwright.sync_api import sync_playwright

BASE_URL = os.environ.get("V3_PREVIEW_URL", "http://127.0.0.1:4321/")
OUT = Path(os.environ.get("V3_MOBILE_QA_DIR", "mobile-qa"))
OUT.mkdir(parents=True, exist_ok=True)

VIEWPORTS=[("360",360,800),("390",390,844),("430",430,932)]
ROUTES=[
    ("","home"),("producto/","producto"),("soluciones/","soluciones"),("app-mantenimiento/","app-mantenimiento"),
    ("aplicaciones/","modulos"),("apps-especializadas/","apps-especializadas"),("alcance/","alcance"),("experiencia/","experiencia"),
    ("demo/","demo"),("selector/","selector"),("piloto/","piloto"),("implantacion/","implantacion"),("seguridad/","seguridad"),
    ("de-whatsapp-excel-a-isivoltpro/","transicion-whatsapp-excel"),("sectores/","sectores"),("precios/","planes"),("recursos/","recursos"),
    ("empresa/","empresa"),("faq/","faq"),("contacto/","contacto"),("modulos/ordenes-de-trabajo/","modulo-ot"),
    ("sectores/autonomos-tecnicos/","sector-autonomos"),("recursos/orden-trabajo-util/","guia-ot"),
]
failures:list[str]=[]


def capture_entry(browser)->None:
    width,height=390,844
    page=browser.new_page(viewport={"width":width,"height":height},device_scale_factor=1)
    response=page.goto(BASE_URL,wait_until="networkidle")
    if response is None or response.status>=400: failures.append("entrada estática móvil: HTTP inválido");page.close();return
    page.wait_for_timeout(500)
    metrics=page.evaluate("""()=>{const root=document.documentElement;const visible=(el)=>{if(!el)return false;const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.display!=='none'&&s.visibility!=='hidden'&&r.width>0&&r.height>0};const intro=document.querySelector('.entry3d'),art=document.querySelector('.entry3d__static-art'),skip=document.querySelector('#skip-intro');const ar=art?.getBoundingClientRect(),kr=skip?.getBoundingClientRect(),style=intro?getComputedStyle(intro):null;return{introVisible:visible(intro)&&!intro.classList.contains('is-done'),artVisible:visible(art),artW:ar?.width||0,artH:ar?.height||0,artComplete:art?.complete===true,artNaturalW:art?.naturalWidth||0,artNaturalH:art?.naturalHeight||0,skipVisible:visible(skip),skipH:kr?.height||0,oldEffectCount:document.querySelectorAll('#entry3d-scene,.entry3d__logo,.entry3d__halo,.entry3d__cube-frame,.entry3d__premium-cube,#entry3d-canvas').length,bgColor:style?.backgroundColor||'',scrollWidth:root.scrollWidth,clientWidth:root.clientWidth}}""")
    if not metrics["introVisible"]: failures.append("entrada estática móvil: no está visible al cargar")
    if not metrics["artVisible"] or metrics["artW"]<width-1 or metrics["artH"]<height-1: failures.append(f"entrada estática móvil: imagen no cubre viewport · {metrics['artW']}x{metrics['artH']}")
    # El master aprobado de la entrada es 1200×617. Mantener 600 px como umbral evita aceptar placeholders pequeños sin rechazar el arte aprobado.
    if not metrics["artComplete"] or metrics["artNaturalW"]<1200 or metrics["artNaturalH"]<600: failures.append(f"entrada estática móvil: imagen aprobada sin píxeles reales · {metrics['artNaturalW']}x{metrics['artNaturalH']}")
    if metrics["oldEffectCount"]!=0: failures.append(f"entrada estática móvil: siguen presentes capas/efectos antiguos · {metrics['oldEffectCount']}")
    if not metrics["skipVisible"] or metrics["skipH"]<43: failures.append(f"entrada estática móvil: Saltar intro menor de 43 px · {metrics['skipH']}")
    if metrics["bgColor"] in {"rgba(0, 0, 0, 0)","transparent"}: failures.append("entrada estática móvil: fondo transparente")
    if metrics["scrollWidth"]>metrics["clientWidth"]+1: failures.append(f"entrada estática móvil: overflow horizontal {metrics['scrollWidth']} > {metrics['clientWidth']}")
    page.screenshot(path=str(OUT/"entrada-3d-390.png"),full_page=False);page.close()


def render_full_page(page,label:str,width:int)->None:
    page.evaluate("""async()=>{const step=Math.max(300,Math.floor(innerHeight*.62));const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));let max=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);for(let y=0;y<=max;y+=step){scrollTo(0,y);await sleep(90);max=Math.max(max,document.body.scrollHeight,document.documentElement.scrollHeight)}scrollTo(0,max);await sleep(720)}""")
    hidden=page.evaluate("""()=>[...document.querySelectorAll('.reveal')].filter(el=>!el.classList.contains('is-visible')).map(el=>({tag:el.tagName,cls:String(el.className||'').slice(0,90)})).slice(0,12)""")
    if hidden: failures.append(f"{label} ({width}px): secciones reveal no activadas tras recorrido · {hidden}")
    page.evaluate("window.scrollTo(0,0)");page.wait_for_timeout(180)


def audit_layout(page,label:str,width:int)->None:
    metrics=page.evaluate("""()=>({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,offenders:[...document.querySelectorAll('body *')].map(el=>{const r=el.getBoundingClientRect();return{tag:el.tagName,cls:String(el.className||'').slice(0,90),left:r.left,right:r.right,width:r.width}}).filter(x=>x.width>0&&(x.left<-2||x.right>document.documentElement.clientWidth+2)).slice(0,12),smallControls:[...document.querySelectorAll('.btn,.v3-mobile-nav summary,.footer-group summary,.contact-back')].map(el=>{const r=el.getBoundingClientRect();return{tag:el.tagName,cls:String(el.className||''),text:(el.textContent||'').trim().slice(0,60),width:r.width,height:r.height}}).filter(x=>x.width>0&&x.height>0&&x.height<43)} )""")
    if metrics["scrollWidth"]>metrics["clientWidth"]+1: failures.append(f"{label} ({width}px): scroll horizontal {metrics['scrollWidth']} > {metrics['clientWidth']} · {metrics['offenders']}")
    if metrics["smallControls"]: failures.append(f"{label} ({width}px): controles táctiles <43px · {metrics['smallControls']}")


def audit_mobile_footer(page,label:str,width:int)->None:
    if width!=390 or label!="home": return
    groups=page.locator('.footer-group')
    if groups.count()!=3: failures.append(f"footer móvil (390px): se esperaban 3 grupos desplegables y hay {groups.count()}");return
    states=page.evaluate("()=>[...document.querySelectorAll('.footer-group')].map(el=>({open:el.open,links:el.querySelectorAll('a').length}))")
    if any(item['open'] for item in states): failures.append(f"footer móvil (390px): los grupos deben arrancar cerrados · {states}")
    if any(item['links']<4 for item in states): failures.append(f"footer móvil (390px): faltan enlaces de navegación · {states}")
    first=page.locator('.footer-group summary').first;first.scroll_into_view_if_needed();first.click();page.wait_for_timeout(80)
    opened=page.locator('.footer-group').first.evaluate('el=>el.open');visible_links=page.locator('.footer-group').first.locator('a:visible').count()
    if not opened or visible_links<4: failures.append(f"footer móvil (390px): el primer grupo no despliega enlaces correctamente · open={opened}, visibles={visible_links}")
    first.click()


def full_screenshot(page,path:Path)->None:
    style=page.add_style_tag(content='.reveal{opacity:1!important;transform:none!important}.section,.page-section{content-visibility:visible!important;contain-intrinsic-size:auto!important}')
    page.screenshot(path=str(path),full_page=True);style.evaluate('el=>el.remove()')


def capture_route(browser,route:str,name:str,viewport_name:str,width:int,height:int)->None:
    page=browser.new_page(viewport={"width":width,"height":height},device_scale_factor=1)
    page.add_init_script("try{sessionStorage.setItem('isivoltpro-intro-seen','1')}catch(_){}")
    url=urljoin(BASE_URL,route);response=page.goto(url,wait_until='networkidle')
    if response is None or response.status>=400: failures.append(f"{name} ({width}px): HTTP inválido en {url}");page.close();return
    page.wait_for_timeout(180);render_full_page(page,name,width);audit_layout(page,name,width);audit_mobile_footer(page,name,width);page.evaluate('window.scrollTo(0,0)');page.wait_for_timeout(140)
    page.screenshot(path=str(OUT/f"{name}-{viewport_name}-top.png"),full_page=False)
    if width==390 and name in {'home','contacto','app-mantenimiento','apps-especializadas','alcance','experiencia','demo','selector','piloto','implantacion','seguridad','transicion-whatsapp-excel'}: full_screenshot(page,OUT/f"{name}-390-full.png")
    if name=='home' and width==390:
        menu=page.locator('.v3-mobile-nav summary')
        if menu.count()==1:
            menu.click();page.wait_for_timeout(100);panel=page.locator('.v3-mobile-nav__panel')
            if panel.count()==1:
                rect=panel.bounding_box()
                if rect and (rect['x']<-1 or rect['x']+rect['width']>width+1): failures.append(f"menú móvil (390px): panel fuera del viewport · {rect}")
                page.screenshot(path=str(OUT/'home-390-menu.png'),full_page=False)
            else: failures.append('home (390px): no aparece el panel de navegación móvil')
        else: failures.append('home (390px): no existe el control de navegación móvil')
    page.close()


with sync_playwright() as p:
    browser=p.chromium.launch(headless=True);capture_entry(browser)
    for viewport_name,width,height in VIEWPORTS:
        for route,name in ROUTES: capture_route(browser,route,name,viewport_name,width,height)
    browser.close()

if failures:
    print('\nQA móvil V4: FALLÓ',file=sys.stderr)
    for item in failures: print(f'- {item}',file=sys.stderr)
    raise SystemExit(1)
print('QA móvil V4: OK · entrada estática aprobada + 23 rutas representativas a 360 / 390 / 430 px')