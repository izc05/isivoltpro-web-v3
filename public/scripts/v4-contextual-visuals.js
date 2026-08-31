(() => {
  const script = document.currentScript;
  const base = script?.dataset.base || '/';
  const pathname = window.location.pathname.replace(/\/+$/, '') + '/';

  const photoData = async (name) => {
    const response = await fetch(`${base}media/v4/${name}.webp.b64`, { cache: 'force-cache' });
    if (!response.ok) throw new Error(`No se pudo cargar ${name}`);
    const payload = (await response.text()).trim();
    if (!payload.startsWith('UklGR')) throw new Error(`Payload visual inválido: ${name}`);
    return `data:image/webp;base64,${payload}`;
  };

  const mountPhoto = async (section, img, asset) => {
    try {
      img.src = await photoData(asset);
      if (img.complete) img.classList.add('is-loaded');
      else img.addEventListener('load', () => img.classList.add('is-loaded'), { once: true });
    } catch (error) {
      console.warn('[V4 visual]', error);
      section.remove();
    }
  };

  const productVisual = () => {
    if (!pathname.endsWith('/preview-v4/producto/')) return;
    const hero = document.querySelector('.v4-hero');
    if (!hero || document.querySelector('[data-v4-contextual="product"]')) return;
    const section = document.createElement('section');
    section.className = 'v4-contextual-visual v4-contextual-visual--soft';
    section.dataset.v4Contextual = 'product';
    section.innerHTML = `<div class="page-shell v4-contextual-visual__grid"><div class="v4-contextual-visual__copy"><span class="eyebrow">Producto en una intervención real</span><h2>El software tiene sentido<br/><span class="gradient-text">cuando acompaña el trabajo.</span></h2><p>Cuadro, activo, aviso, documentación y orden de trabajo deben encontrarse en el mismo contexto. Esta escena representa el tipo de operación para el que estamos diseñando IsiVoltPro; no es una fotografía de cliente.</p><div class="v4-contextual-visual__checks"><span>Activo identificado</span><span>OT con contexto</span><span>Evidencias en campo</span><span>Histórico técnico</span></div><span class="v4-contextual-visual__note">Escena fotorealista generada · demostración V4</span></div><figure class="v4-contextual-visual__media"><img alt="Dos técnicos revisando un cuadro eléctrico durante una intervención de mantenimiento" width="800" height="600" loading="lazy"/><figcaption>Electricidad · coordinación · intervención</figcaption></figure></div>`;
    hero.insertAdjacentElement('afterend', section);
    mountPhoto(section, section.querySelector('img'), 'electrical-team-review');
  };

  const demoVisual = () => {
    if (!pathname.endsWith('/preview-v4/demo/')) return;
    const hero = document.querySelector('main section');
    if (!hero || document.querySelector('[data-v4-contextual="demo"]')) return;
    const section = document.createElement('section');
    section.className = 'v4-contextual-visual';
    section.dataset.v4Contextual = 'demo';
    section.innerHTML = `<div class="page-shell v4-contextual-visual__grid"><figure class="v4-contextual-visual__media"><img alt="Sesión remota de acompañamiento técnico para revisar IsiVoltPro y una implantación de mantenimiento" width="800" height="600" loading="lazy"/><figcaption>Demo · acompañamiento · implantación</figcaption></figure><div class="v4-contextual-visual__copy"><span class="eyebrow">Una demo debe partir de tu operación</span><h2>Ver el producto<br/><span class="gradient-text">con un caso que tenga sentido.</span></h2><p>La futura demo comercial debe enseñar avisos, OT, activos, preventivo y trabajo de campo desde un escenario concreto, sin convertir la conversación en una presentación genérica.</p><div class="v4-contextual-visual__checks"><span>Problema concreto primero</span><span>Flujo reducido y entendible</span><span>Datos siempre de ejemplo</span><span>Siguiente paso claro</span></div><span class="v4-contextual-visual__note">Escena fotorealista generada · demostración V4</span></div></div>`;
    hero.insertAdjacentElement('afterend', section);
    mountPhoto(section, section.querySelector('img'), 'support-demo-call');
  };

  const run = () => { productVisual(); demoVisual(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();
})();
