from __future__ import annotations

import os
import sys
from pathlib import Path
from urllib.parse import urljoin

from playwright.sync_api import sync_playwright

BASE_URL = os.environ.get("V3_PREVIEW_URL", "http://127.0.0.1:4322/")
OUT = Path(os.environ.get("V3_CONTENT_ADMIN_QA_DIR", "content-admin-qa"))
OUT.mkdir(parents=True, exist_ok=True)

failures: list[str] = []

ROUTES = (
    {
        "slug": "admin",
        "route": "admin/",
        "title": "Centro de control web",
        "shell": ".layout",
        "off": ".off",
        "nav": ".side",
        "workspace": False,
    },
    {
        "slug": "gestion-contenido",
        "route": "gestion-contenido/",
        "title": "Gestión de contenido y control V4",
        "shell": ".admin-grid",
        "off": ".preview-off",
        "nav": ".admin-nav",
        "workspace": True,
    },
)


def audit_viewport(browser, spec: dict[str, object], label: str, width: int, height: int) -> None:
    page = browser.new_page(viewport={"width": width, "height": height}, device_scale_factor=1)
    response = page.goto(urljoin(BASE_URL, str(spec["route"])), wait_until="networkidle")
    prefix = f"{spec['slug']} {label}"
    if response is None or response.status >= 400:
        failures.append(f"{prefix}: HTTP inválido")
        page.close()
        return

    page.wait_for_timeout(350)
    metrics = page.evaluate(
        """({ shellSelector, offSelector, navSelector }) => {
          const root = document.documentElement;
          const robots = document.querySelector('meta[name="robots"]')?.getAttribute('content') || '';
          const disabledButtons = [...document.querySelectorAll('button[disabled]')].length;
          const enabledButtons = [...document.querySelectorAll('button:not([disabled])')].length;
          const enabledFileInputs = [...document.querySelectorAll('input[type="file"]:not([disabled])')].length;
          const forms = [...document.querySelectorAll('form')].length;
          const shell = document.querySelector(shellSelector);
          const previewOff = document.querySelector(offSelector);
          const capabilityStates = [...document.querySelectorAll('.capability-state')].map((el) => ({
            text: el.textContent?.trim() || '',
            enabled: el.classList.contains('enabled'),
          }));
          const nav = document.querySelector(navSelector);
          return {
            title: document.title,
            robots,
            disabledButtons,
            enabledButtons,
            enabledFileInputs,
            forms,
            shellVisible: !!shell && getComputedStyle(shell).display !== 'none',
            previewOffVisible: !!previewOff && getComputedStyle(previewOff).display !== 'none',
            scrollWidth: root.scrollWidth,
            clientWidth: root.clientWidth,
            navDisplay: nav ? getComputedStyle(nav).display : 'missing',
            capabilityStates,
          };
        }""",
        {
            "shellSelector": spec["shell"],
            "offSelector": spec["off"],
            "navSelector": spec["nav"],
        },
    )

    if str(spec["title"]) not in metrics["title"]:
        failures.append(f"{prefix}: título administrativo inesperado")
    if "noindex" not in metrics["robots"].lower():
        failures.append(f"{prefix}: falta noindex")
    if not metrics["shellVisible"] or metrics["previewOffVisible"]:
        failures.append(f"{prefix}: el preview aislado no muestra la superficie administrativa")
    if metrics["forms"] != 0:
        failures.append(f"{prefix}: hay formularios administrativos activos")
    if metrics["enabledFileInputs"] != 0:
        failures.append(f"{prefix}: la subida de archivos está activa")
    if any(item["enabled"] for item in metrics["capabilityStates"]):
        failures.append(f"{prefix}: hay capacidades sensibles marcadas como activas")
    if metrics["scrollWidth"] > metrics["clientWidth"] + 1:
        failures.append(f"{prefix}: overflow horizontal {metrics['scrollWidth']} > {metrics['clientWidth']}")
    if width <= 840 and metrics["navDisplay"] != "none":
        failures.append(f"{prefix}: la navegación lateral no se repliega en móvil")

    if spec["workspace"]:
        if metrics["disabledButtons"] < 4:
            failures.append(f"{prefix}: faltan controles sensibles desactivados")
        if metrics["enabledButtons"] != 0:
            failures.append(f"{prefix}: hay botones administrativos activos ({metrics['enabledButtons']})")

    page.screenshot(path=str(OUT / f"{spec['slug']}-{label}-top.png"), full_page=False)
    page.screenshot(path=str(OUT / f"{spec['slug']}-{label}-full.png"), full_page=True)
    page.close()


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    for spec in ROUTES:
        audit_viewport(browser, spec, "390", 390, 844)
        audit_viewport(browser, spec, "1440", 1440, 1000)
    browser.close()

if failures:
    print("QA administrativa V4 falló:")
    for failure in failures:
        print(f"- {failure}")
    sys.exit(1)

print("QA administrativa V4 OK: /admin/ y /gestion-contenido/ noindex, seguras y responsive en 390/1440.")
