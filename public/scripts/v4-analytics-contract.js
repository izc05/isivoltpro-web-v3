(() => {
  const script = document.currentScript;
  if (!script) return;

  const routeEvent = (pathname) => {
    const parts = pathname.split('/').filter(Boolean);
    const previewIndex = parts.indexOf('preview-v4');
    const key = previewIndex >= 0 ? (parts[previewIndex + 1] || '') : (parts[parts.length - 1] || '');
    if (key === 'demo') return 'intent_demo';
    if (key === 'precios') return 'intent_plans';
    if (key === 'apps' || key === 'app-mantenimiento' || key === 'aplicaciones') return 'intent_apps';
    if (key === 'contacto') return 'intent_contact';
    if (key === 'blog') return 'intent_blog';
    return '';
  };

  const placementOf = (anchor) => {
    if (anchor.closest('.site-header')) return 'header';
    if (anchor.closest('footer')) return 'footer';
    if (anchor.closest('main')) return 'main';
    return 'unknown';
  };

  const markIntentLinks = () => {
    document.querySelectorAll('a[href]').forEach((anchor) => {
      const raw = anchor.getAttribute('href');
      if (!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:')) return;
      let url;
      try { url = new URL(raw, window.location.origin); } catch { return; }
      if (url.origin !== window.location.origin) return;
      const event = routeEvent(url.pathname);
      if (!event) return;
      anchor.dataset.v4Event = event;
      anchor.dataset.v4Placement = placementOf(anchor);
    });
  };

  const emitIntent = (clickEvent) => {
    const target = clickEvent.target;
    if (!(target instanceof Element)) return;
    const anchor = target.closest('a[data-v4-event]');
    if (!anchor) return;
    let targetUrl;
    try { targetUrl = new URL(anchor.href, window.location.origin); } catch { return; }
    const detail = Object.freeze({
      event: anchor.dataset.v4Event,
      path: window.location.pathname,
      targetPath: targetUrl.pathname,
      placement: anchor.dataset.v4Placement || 'unknown',
    });
    window.dispatchEvent(new CustomEvent('isivoltpro:v4-intent', { detail }));
  };

  window.__ISIVOLTPRO_V4_ANALYTICS__ = Object.freeze({
    mode: 'local_contract_only',
    transportEnabled: false,
    cookies: false,
    localStorage: false,
    sessionStorage: false,
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', markIntentLinks, { once: true });
  } else {
    markIntentLinks();
  }
  document.addEventListener('click', emitIntent, { capture: true });
})();
