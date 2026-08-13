(() => {
  const gate = document.querySelector('[data-intro-gate]');
  const art = document.querySelector('.intro-v3__art');
  if (!(gate instanceof HTMLElement) || !(art instanceof HTMLElement)) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  if (reduced || !finePointer) return;

  let frame = 0;

  const reset = () => {
    art.style.setProperty('--eclipse-x', '0px');
    art.style.setProperty('--eclipse-y', '0px');
    art.style.setProperty('--eclipse-tilt-x', '0deg');
    art.style.setProperty('--eclipse-tilt-y', '0deg');
  };

  gate.addEventListener('pointermove', (event) => {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const nx = (event.clientX / window.innerWidth - 0.5) * 2;
      const ny = (event.clientY / window.innerHeight - 0.5) * 2;
      art.style.setProperty('--eclipse-x', `${-nx * 15}px`);
      art.style.setProperty('--eclipse-y', `${-ny * 10}px`);
      art.style.setProperty('--eclipse-tilt-x', `${nx * 2.2}deg`);
      art.style.setProperty('--eclipse-tilt-y', `${-ny * 1.8}deg`);
    });
  });

  gate.addEventListener('pointerleave', reset);
})();
