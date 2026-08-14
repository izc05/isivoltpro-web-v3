export function initLoaderV2() {
  const loader = document.querySelector<HTMLElement>('[data-v2-loader]');
  const value = document.querySelector<HTMLElement>('[data-v2-loader-value]');
  const bar = document.querySelector<HTMLElement>('[data-v2-loader-bar]');
  const light = document.querySelector<HTMLElement>('[data-v2-loader-light]');
  const status = document.querySelector<HTMLElement>('[data-v2-loader-status]');
  if (!loader || !value || !bar || !light || !status) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let started = false;
  let progress = 0;
  let target = 18;
  let heroReady = false;
  let pageLoaded = document.readyState === 'complete';

  const render = () => {
    const shown = Math.max(0, Math.min(100, Math.round(progress)));
    value.textContent = String(shown).padStart(2, '0');
    bar.style.transform = `scaleX(${shown / 100})`;
    light.style.left = `${shown}%`;
    status.textContent = shown < 30
      ? 'INICIALIZANDO ECOSISTEMA'
      : shown < 60
        ? 'CONECTANDO NÚCLEO'
        : shown < 84
          ? 'SINCRONIZANDO SISTEMAS'
          : 'PREPARANDO EXPERIENCIA';
  };

  const finish = () => {
    target = 100;
  };

  const tick = () => {
    if (!started) return;

    progress += (target - progress) * (target === 100 ? 0.16 : 0.06);
    if (target < 100 && progress > target - 1) target = Math.min(88, target + 10);
    render();

    if (target === 100 && progress > 99.2) {
      progress = 100;
      render();
      status.textContent = 'SISTEMA PREPARADO';
      loader.classList.add('is-ready');

      window.setTimeout(() => {
        loader.classList.add('is-leaving');
        document.body.classList.remove('v2-is-loading');
        window.dispatchEvent(new CustomEvent('isivolt:experience-ready'));
        window.setTimeout(() => loader.remove(), reduced ? 80 : 720);
      }, reduced ? 20 : 160);
      return;
    }

    requestAnimationFrame(tick);
  };

  const start = () => {
    if (started) return;
    started = true;
    loader.classList.add('is-active');
    document.body.classList.add('v2-is-loading');
    render();
    requestAnimationFrame(tick);

    if (heroReady || pageLoaded) {
      window.setTimeout(finish, reduced ? 0 : 280);
    } else {
      window.setTimeout(finish, 4200);
    }
  };

  window.addEventListener('isivolt:start-loader', start, { once: true });
  window.addEventListener('isivolt:hero-ready', () => {
    heroReady = true;
    if (started) finish();
  }, { once: true });
  window.addEventListener('load', () => {
    pageLoaded = true;
    if (started) window.setTimeout(finish, reduced ? 0 : 280);
  }, { once: true });

  render();
}
