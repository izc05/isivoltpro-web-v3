(() => {
  const script = document.currentScript;
  const base = script?.dataset.base || '/';
  const pathname = window.location.pathname.replace(/\/+$/, '') + '/';
  const cleanPayload = (value) => value.replace(/\s+/g, '');

  const photoData = async (name) => {
    const response = await fetch(`${base}media/v4/${name}.webp.b64`, { cache: 'force-cache' });
    if (!response.ok) throw new Error(`No se pudo cargar ${name}`);
    const payload = cleanPayload(await response.text());
    if (!payload.startsWith('UklGR')) throw new Error(`Payload visual inválido: ${name}`);
    return `data:image/webp;base64,${payload}`;
  };

  const mountPhoto = async (section, img, asset) => {
    try {
      img.src = await photoData(asset);
      if (img.complete && img.naturalWidth > 0) img.classList.add('is-loaded');
      else img.addEventListener('load', () => img.classList.add('is-loaded'), { once: true });
    } catch (error) {
      console.warn('[V4 visual]', error);
      section.remove();
    }
  };

  const repairExistingVisuals = async () => {
    document.querySelectorAll('img[src^="data:image/webp;base64,"]').forEach((img) => {
      const raw = img.getAttribute('src');
      if (raw) img.src = cleanPayload(raw);
    });

    document.querySelectorAll('img').forEach((img) => {
      try {
        const url = new URL(img.getAttribute('src') || '', window.location.href);
        if (url.pathname.endsWith('/media/home-dashboard.svg')) {
          img.src = `${base}media/v4/home-dashboard-premium.webp`;
        }
      } catch {}
    });

    const repairs = [
      ['/media/v4/home-maintenance-tablet.webp', 'hvac-inspection-tablet'],
      ['/media/v4/app-qr-mobile.webp', 'team-plant-review'],
    ];

    await Promise.all(repairs.map(async ([suffix, asset]) => {
      const targets = [...document.querySelectorAll('img')].filter((img) => {
        try { return new URL(img.getAttribute('src') || '', window.location.href).pathname.endsWith(suffix); }
        catch { return false; }
      });
      if (!targets.length) return;
      try {
        const src = await photoData(asset);
        targets.forEach((img) => { img.src = src; });
      } catch (error) {
        console.warn('[V4 visual repair]', error);
      }
    }));
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

  const blogRadar = () => {
    if (!pathname.endsWith('/preview-v4/blog/')) return;
    const hero = document.querySelector('main .hero');
    if (!hero || document.querySelector('[data-v4-contextual="blog-radar"]')) return;
    const section = document.createElement('section');
    section.className = 'v4-radar';
    section.dataset.v4Contextual = 'blog-radar';
    section.innerHTML = `<div class="page-shell"><div class="v4-radar__top"><div><span class="eyebrow" style="color:#9fb7ff">Fase 10B · Radar IsiVoltPro</span><h2>Una noticia útil al día.<br/>No siete artículos de relleno.</h2><p>La automatización prevista revisará fuentes técnicas prioritarias, preparará un borrador con IA y dejará visible qué se ha verificado antes de publicar. La normativa y los cambios regulatorios no se publicarán automáticamente sin control.</p><div class="v4-radar__social"><span>LinkedIn · por conectar</span><span>Instagram · por conectar</span><span>Facebook · por conectar</span></div></div><div class="v4-radar__status"><article><b>Fuentes prioritarias</b><strong>BOE · MITECO · INSST</strong><small>Más IDAE, CNMC y EUR-Lex cuando el tema lo requiera.</small></article><article><b>Cadencia objetivo</b><strong>1 pieza útil / día</strong><small>Si no hay una noticia relevante, no se fuerza una publicación vacía.</small></article><article><b>Estado editorial</b><strong>Borrador → verificado → publicado</strong><small>La IA redacta; las reglas editoriales deciden si el contenido puede salir.</small></article><article><b>Salida social</b><strong>3 adaptaciones</strong><small>Una versión específica para LinkedIn, Instagram y Facebook.</small></article></div></div><div class="v4-radar__week"><div class="v4-radar__day"><b>LUN</b><strong>Normativa</strong></div><div class="v4-radar__day"><b>MAR</b><strong>Actualidad</strong></div><div class="v4-radar__day"><b>MIÉ</b><strong>Seguridad</strong></div><div class="v4-radar__day"><b>JUE</b><strong>Energía</strong></div><div class="v4-radar__day"><b>VIE</b><strong>Práctico</strong></div><div class="v4-radar__day"><b>SÁB</b><strong>Curiosidad técnica</strong></div><div class="v4-radar__day"><b>DOM</b><strong>Radar semanal</strong></div></div><div class="v4-radar__pipeline"><div class="v4-radar__step"><b>01</b><strong>Buscar</strong><small>Fuentes oficiales y técnicas.</small></div><div class="v4-radar__step"><b>02</b><strong>Seleccionar</strong><small>Solo cambios con utilidad real.</small></div><div class="v4-radar__step"><b>03</b><strong>Redactar con IA</strong><small>Resumen, contexto y aplicación.</small></div><div class="v4-radar__step"><b>04</b><strong>Verificar</strong><small>Fuente, fecha, estado y alcance.</small></div><div class="v4-radar__step"><b>05</b><strong>Publicar + redes</strong><small>Web y adaptaciones sociales.</small></div></div><div class="v4-radar__guard"><strong>Regla de seguridad editorial: una IA no declara por sí sola que una norma está vigente, modificada o derogada.</strong><span>Verificación obligatoria</span></div></div>`;
    hero.insertAdjacentElement('afterend', section);
  };

  const run = () => {
    repairExistingVisuals();
    productVisual();
    demoVisual();
    blogRadar();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();
})();
