export const prerender = true;

const routes = [
  '',
  'producto/',
  'soluciones/',
  'app-mantenimiento/',
  'aplicaciones/',
  'implantacion/',
  'seguridad/',
  'modulos/ordenes-de-trabajo/',
  'modulos/activos/',
  'modulos/mantenimiento-preventivo/',
  'modulos/qr-nfc/',
  'modulos/inspecciones/',
  'modulos/inventario/',
  'modulos/documentacion/',
  'modulos/avisos-incidencias/',
  'sectores/',
  'sectores/autonomos-tecnicos/',
  'sectores/empresas-mantenedoras/',
  'sectores/instalaciones-propias/',
  'sectores/climatizacion-frio/',
  'sectores/instalaciones-electricas/',
  'sectores/multisede/',
  'precios/',
  'recursos/',
  'recursos/dejar-whatsapp-excel-mantenimiento/',
  'recursos/organizar-avisos-mantenimiento/',
  'recursos/orden-trabajo-util/',
  'recursos/cerrar-ot-historico-util/',
  'recursos/organizar-activos-instalaciones/',
  'recursos/qr-activos-mantenimiento/',
  'recursos/mantenimiento-preventivo-pequena-empresa/',
  'recursos/piloto-mantenimiento-digital/',
  'faq/',
  'empresa/',
  'ecosistema/',
  'contacto/',
];

export function GET({ site }: { site?: URL }) {
  const origin = site ?? new URL('https://isivoltpro.com');
  const base = import.meta.env.BASE_URL;
  const urls = routes.map((route) => new URL(`${base}${route}`, origin).toString());
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((url) => `  <url><loc>${url}</loc></url>`)
    .join('\n')}\n</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
