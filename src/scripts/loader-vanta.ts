import * as THREE from 'three';

type VantaEffect = { destroy?: () => void };
type VantaWindow = Window & typeof globalThis & {
  THREE?: typeof THREE;
  VANTA?: {
    CLOUDS?: (options: Record<string, unknown>) => VantaEffect;
  };
};

const SCRIPT_ID = 'isivolt-vanta-clouds';
const SCRIPT_SRC = 'https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.clouds.min.js';

function loadVanta(): Promise<void> {
  const win = window as VantaWindow;
  win.THREE = THREE;

  if (win.VANTA?.CLOUDS) return Promise.resolve();

  const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    return new Promise((resolve) => {
      if (win.VANTA?.CLOUDS) resolve();
      else existing.addEventListener('load', () => resolve(), { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Vanta Clouds no disponible'));
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
      if (!win.VANTA?.CLOUDS || !document.body.contains(host)) return;

      effect = win.VANTA.CLOUDS({
        el: host,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        backgroundColor: 0x02060a,
        skyColor: 0x06111f,
        cloudColor: 0x17375a,
        cloudShadowColor: 0x01050a,
        sunColor: 0x1769ff,
        sunGlareColor: 0x0b3472,
        sunlightColor: 0x6ea0ff,
        speed: 0.42,
        scale: 1.15,
        scaleMobile: 1.0,
      });

      host.classList.add('is-clouds-ready');
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
