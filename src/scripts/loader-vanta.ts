import * as THREE from 'three';

type VantaEffect = { destroy?: () => void };
type VantaWindow = Window & typeof globalThis & {
  THREE?: typeof THREE;
  VANTA?: {
    FOG?: (options: Record<string, unknown>) => VantaEffect;
  };
};

const SCRIPT_ID = 'isivolt-vanta-fog';
const SCRIPT_SRC = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.fog.min.js';

function loadVanta(): Promise<void> {
  const win = window as VantaWindow;
  win.THREE = THREE;

  if (win.VANTA?.FOG) return Promise.resolve();

  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    return new Promise((resolve) => {
      if (win.VANTA?.FOG) resolve();
      else existing.addEventListener('load', () => resolve(), { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Vanta no disponible'));
    document.head.appendChild(script);
  });
}

export function initLoaderVanta() {
  const host = document.querySelector<HTMLElement>('[data-v2-vanta]');
  if (!host) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  let effect: VantaEffect | null = null;
  let starting = false;

  const start = async () => {
    if (starting || effect) return;
    starting = true;

    try {
      await loadVanta();
      const win = window as VantaWindow;
      if (!win.VANTA?.FOG || !document.body.contains(host)) return;

      effect = win.VANTA.FOG({
        el: host,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        highlightColor: 0x1769ff,
        midtoneColor: 0x082a61,
        lowlightColor: 0x020a15,
        baseColor: 0x02060a,
        blurFactor: 0.58,
        speed: 0.55,
        zoom: 1.28,
        scale: 1.35,
        scaleMobile: 1.0,
      });
    } catch {
      host.classList.add('is-fallback');
    }
  };

  const destroy = () => {
    effect?.destroy?.();
    effect = null;
  };

  window.addEventListener('isivolt:start-loader', start, { once: true });
  window.addEventListener('isivolt:experience-ready', destroy, { once: true });
}
