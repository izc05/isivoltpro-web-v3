export function initLoaderV2() {
  const loader = document.querySelector<HTMLElement>('[data-v2-loader]');
  const value = document.querySelector<HTMLElement>('[data-v2-loader-value]');
  const bar = document.querySelector<HTMLElement>('[data-v2-loader-bar]');
  const light = document.querySelector<HTMLElement>('[data-v2-loader-light]');
  const status = document.querySelector<HTMLElement>('[data-v2-loader-status]');
  const detail = document.querySelector<HTMLElement>('[data-v2-loader-detail]');
  if (!loader || !value || !bar || !light || !status || !detail) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const minimumDuration = reduced ? 260 : 1850;
  let started = false;
  let heroReady = document.documentElement.dataset.heroReady === 'true';
  let startedAt = 0;
  let progress = 0;

  const setCopy = (shown: number) => {
    if (shown < 24) {
      status.textContent = 'INICIALIZANDO ECOSISTEMA';
      detail.textContent = 'CARGANDO RECURSOS';
    } else if (shown < 52) {
      status.textContent = 'CONECTANDO NÚCLEO';
      detail.textContent = 'ACTIVANDO ISIVOLTPRO CORE';
    } else if (shown < 78) {
      status.textContent = 'SINCRONIZANDO SISTEMAS';
      detail.textContent = 'ACTIVOS · OT · MANTENIMIENTO';
    } else if (shown < 100) {
      status.textContent = 'PREPARANDO EXPERIENCIA';
      detail.textContent = 'GESTIÓN TÉCNICA CONECTADA';
    } else {
      status.textContent = 'SISTEMA PREPARADO';
      detail.textContent = 'ISIVOLTPRO ONLINE';
    }
  };

  const render = () => {
    const shown = Math.max(0, Math.min(100, Math.round(progress)));
    value.textContent = `${String(shown).padStart(2, '0')}%`;
    bar.style.transform = `scaleX(${shown / 100})`;
    light.style.left = `${shown}%`;
    setCopy(shown);
  };

  const finish = () => {
    progress = 100;
    render();
    loader.classList.add('is-ready');

    window.setTimeout(() => {
      loader.classList.add('is-leaving');
      document.body.classList.remove('v2-is-loading');
      window.dispatchEvent(new CustomEvent('isivolt:experience-ready'));
      window.setTimeout(() => loader.remove(), reduced ? 80 : 720);
    }, reduced ? 20 : 230);
  };

  const tick = (now: number) => {
    if (!started) return;

    const elapsed = now - startedAt;
    const timeProgress = Math.min(1, elapsed / minimumDuration);
    const eased = 1 - Math.pow(1 - timeProgress, 2.35);
    const cap = heroReady ? 100 : 92;
    progress = Math.max(progress, eased * cap);
    render();

    if (timeProgress >= 1 && heroReady) {
      finish();
      return;
    }

    if (timeProgress >= 1 && !heroReady) {
      progress += (92 - progress) * 0.08;
      render();
    }

    requestAnimationFrame(tick);
  };

  const start = () => {
    if (started) return;
    started = true;
    startedAt = performance.now();
    loader.classList.add('is-active');
    document.body.classList.add('v2-is-loading');
    render();
    requestAnimationFrame(tick);

    window.setTimeout(() => {
      heroReady = true;
    }, reduced ? 100 : 3200);
  };

  window.addEventListener('isivolt:start-loader', start, { once: true });
  window.addEventListener('isivolt:hero-ready', () => {
    heroReady = true;
  }, { once: true });

  render();
}
