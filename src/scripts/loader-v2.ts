export function initLoaderV2() {
  const loader = document.querySelector<HTMLElement>('[data-v2-loader]');
  const value = document.querySelector<HTMLElement>('[data-v2-loader-value]');
  const bar = document.querySelector<HTMLElement>('[data-v2-loader-bar]');
  const light = document.querySelector<HTMLElement>('[data-v2-loader-light]');
  const status = document.querySelector<HTMLElement>('[data-v2-loader-status]');
  if (!loader || !value || !bar || !light || !status) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.body.classList.add('v2-is-loading');

  let progress = 0;
  let target = 18;
  let finished = false;

  const render = () => {
    const shown = Math.max(0, Math.min(100, Math.round(progress)));
    value.textContent = String(shown).padStart(2, '0');
    bar.style.transform = `scaleX(${shown / 100})`;
    light.style.left = `${shown}%`;
    status.textContent = shown < 30 ? 'INICIALIZANDO ECOSISTEMA' : shown < 60 ? 'CONECTANDO NÚCLEO' : shown < 84 ? 'SINCRONIZANDO MÓDULOS' : 'PREPARANDO EXPERIENCIA';
  };

  const finish = () => {
    finished = true;
    target = 100;
  };

  const tick = () => {
    progress += (target - progress) * (finished ? 0.16 : 0.06);
    if (!finished && progress > target - 1) target = Math.min(88, target + 10);
    render();

    if (finished && progress > 99.2) {
      progress = 100;
      render();
      status.textContent = 'SISTEMA PREPARADO';
      loader.classList.add('is-ready');
      window.setTimeout(() => {
        loader.classList.add('is-leaving');
        document.body.classList.remove('v2-is-loading');
        window.setTimeout(() => loader.remove(), reduced ? 80 : 720);
      }, reduced ? 20 : 160);
      return;
    }

    requestAnimationFrame(tick);
  };

  window.addEventListener('isivolt:hero-ready', finish, { once: true });
  window.addEventListener('load', () => window.setTimeout(finish, reduced ? 0 : 400), { once: true });
  window.setTimeout(finish, 4200);
  render();
  requestAnimationFrame(tick);
}
