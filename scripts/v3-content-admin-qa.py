from __future__ import annotations

import os
import sys
from pathlib import Path
from urllib.parse import urljoin

from playwright.sync_api import sync_playwright

BASE_URL = os.environ.get("V3_PREVIEW_URL", "http://127.0.0.1:4322/")
OUT = Path(os.environ.get("V3_CONTENT_ADMIN_QA_DIR", "content-admin-qa"))
OUT.mkdir(parents=True, exist_ok=True)
ROUTE = "gestion-contenido/"

failures: list[str] = []


def audit_viewport(browser, label: str, width: int, height: int) -> None:
    page = browser.new_page(viewport={"width": width, "height": height}, device_scale_factor=1)
    response = page.goto(urljoin(BASE_URL, ROUTE), wait_until="networkidle")
    if response is None or response.status >= 400:
        failures.append(f"{label}: HTTP inválido")
        page.close()
        return

    page.wait_for_timeout(350)
    metrics = page.evaluate(
        """() => {
          const root = document.documentElement;
          const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
          const disabledButtons = [...document.querySelectorAll('button[disabled]')].length;
          const enabledButtons = [...document.querySelectorAll('button:not([disabled])')].length;
          const enabledFileInputs = [...document.querySelectorAll('input[type="file"]:not([disabled])')].length;
          const adminGrid = document.querySelector('.admin-grid');
          const previewOff = document.querySelector('.preview-off');
          const capabilityStates = [...document.querySelectorAll('.capability-state')].map((el) => ({
            text: el.textContent?.trim() || '',
            enabled: el.classList.contains('enabled'),
          }));
          const nav = document.querySelector('.admin-nav');
          return {
            title: document.title,
            robots,
            disabledButtons,
            enabledButtons,
            enabledFileInputs,
            adminGridVisible: !!adminGrid && getComputedStyle(adminGrid).display !== 'none',
            previewOffVisible: !!previewOff && getComputedStyle(previewOff).display !== 'none',
            scrollWidth: root.scrollWidth,
            clientWidth: root.clientWidth,
            navDisplay: nav ? getComputedStyle(nav).display : 'missing',
            capabilityStates,
          };
        }"""
    )

    if "Gestión de contenido" not in metrics["title"]:
        failures.append(f"{label}: título administrativo inesperado")
    if "noindex" not in metrics["robots"].lower():
        failures.append(f"{label}: falta noindex")
    if not metrics["adminGridVisible"] or metrics["previewOffVisible"]:
        failures.append(f"{label}: el preview aislado no muestra el gestor")
    if metrics["disabledButtons"] < 4:
        failures.append(f"{label}: faltan controles sensibles desactivados")
    if metrics["enabledButtons"] != 0:
        failures.append(f"{label}: hay botones administrativos activos ({metrics['enabledButtons']})")
    if metrics["enabledFileInputs"] != 0:
        failures.append(f"{label}: la subida de archivos está activa")
    if any(item["enabled"] for item in metrics["capabilityStates"]):
        failures.append(f"{label}: hay capacidades sensibles marcadas como activas")
    if metrics["scrollWidth"] > metrics["clientWidth"] + 1:
        failures.append(f"{label}: overflow horizontal {metrics['scrollWidth']} > {metrics['clientWidth']}")
    if width <= 840 and metrics["navDisplay"] != "none":
        failures.append(f"{label}: la navegación lateral no se repliega en móvil")

    page.screenshot(path=str(OUT / f"gestion-contenido-{label}-top.png"), full_page=False)
    page.screenshot(path=str(OUT / f"gestion-contenido-{label}-full.png"), full_page=True)
    page.close()


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    audit_viewport(browser, "390", 390, 844)
    audit_viewport(browser, "1440", 1440, 1000)
    browser.close()

if failures:
    print("QA de gestión de contenido falló:")
    for failure in failures:
        print(f"- {failure}")
    sys.exit(1)

print("QA de gestión de contenido OK: preview aislado, noindex, controles bloqueados y responsive verificados.")
