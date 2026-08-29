import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = process.argv[2] || 'dist';

const routes = [
  '', 'producto', 'soluciones', 'app-mantenimiento', 'aplicaciones', 'apps-especializadas',
  'alcance', 'experiencia', 'demo', 'selector', 'piloto', 'implantacion', 'seguridad',
  'de-whatsapp-excel-a-isivoltpro', 'sectores', 'precios', 'recursos', 'blog', 'empresa', 'ecosistema',
  'faq', 'contacto',
];

const deepVisualRoutes = [
  'modulos/ordenes-de-trabajo', 'modulos/activos', 'modulos/mantenimiento-preventivo', 'modulos/qr-nfc',
  'modulos/inspecciones', 'modulos/inventario', 'modulos/documentacion', 'modulos/avisos-incidencias',
  'sectores/autonomos-tecnicos', 'sectores/empresas-mantenedoras', 'sectores/instalaciones-propias',
  'sectores/climatizacion-frio', 'sectores/instalaciones-electricas', 'sectores/multisede',
  'recursos/orden-trabajo-util', 'recursos/mantenimiento-preventivo-pequena-empresa',
  'recursos/qr-activos-mantenimiento', 'recursos/organizar-activos-instalaciones',
  'recursos/dejar-whatsapp-excel-mantenimiento', 'recursos/organizar-avisos-mantenimiento',
  'recursos/cerrar-ot-historico-util', 'recursos/piloto-mantenimiento-digital',
];

const sourcedEditorialRoutes = [
  'blog/agregacion-independiente-flexibilidad-electrica-instalaciones',
];

const sitemapRoutes = routes.filter((route) => route !== '');
const failures = [];
const htmlPath = (route) => route ? join(dist, route, 'index.html') : join(dist, 'index.html');
const label = (route) => route ? `/${route}/` : '/';
const legacyOrbit = /class=(?:"[^"]*\bpage-orbit\b[^"]*"|'[^']*\bpage-orbit\b[^']*')/;

for (const route of routes) {
  const file = htmlPath(route);
  if (!existsSync(file)) { failures.push(`${label(route)} no se ha construido`); continue; }
  const html = readFileSync(file, 'utf8');
  if (!html.includes('Content-Security-Policy')) failures.push(`${label(route)} no contiene Content-Security-Policy`);
  if (!html.includes("font-src 'self' data:")) failures.push(`${label(route)} no restringe las fuentes a recursos locales`);
  if (!html.includes('Saltar al contenido')) failures.push(`${label(route)} no contiene skip link accesible`);
  if (!html.includes('property="og:image"')) failures.push(`${label(route)} no contiene og:image`);
  if (!html.includes('name="twitter:card" content="summary_large_image"')) failures.push(`${label(route)} no contiene Twitter Card grande`);
  if (route && /entry3d-canvas|V3Entry3D|three\.module/.test(html)) failures.push(`${label(route)} está cargando la experiencia de entrada reservada a Home`);
  if (route && legacyOrbit.test(html)) failures.push(`${label(route)} ha reintroducido el hero orbital legacy; usar una composición SaaS visual específica`);
}

for (const route of deepVisualRoutes) {
  const file = htmlPath(route);
  if (!existsSync(file)) { failures.push(`${label(route)} no se ha construido`); continue; }
  const html = readFileSync(file, 'utf8');
  if (legacyOrbit.test(html)) failures.push(`${label(route)} ha reintroducido el hero orbital legacy`);
  if (!html.includes('Saltar al contenido')) failures.push(`${label(route)} no contiene skip link accesible`);
  if (!html.includes('property="og:image"')) failures.push(`${label(route)} no contiene og:image`);
}

for (const route of sourcedEditorialRoutes) {
  const file = htmlPath(route);
  if (!existsSync(file)) { failures.push(`${label(route)} no se ha construido`); continue; }
  const html = readFileSync(file, 'utf8');
  if (!html.includes('Fuente verificada')) failures.push(`${label(route)} no muestra la fuente al lector`);
  if (!html.includes('Ministerio para la Transición Ecológica y el Reto Demográfico')) failures.push(`${label(route)} ha perdido el nombre de la fuente oficial`);
  if (!html.includes('https://www.miteco.gob.es/es/prensa/ultimas-noticias/2026/agosto/el-miteco-avanza-en-la-implantacion-del-agregador-independiente-.html')) failures.push(`${label(route)} ha perdido el enlace a la fuente original`);
  if (!html.includes('consulta')) failures.push(`${label(route)} no conserva el estado regulatorio de consulta`);
  if (!html.includes('"@type":"BlogPosting"')) failures.push(`${label(route)} no contiene BlogPosting estructurado`);
  if (!html.includes('"citation":"https://www.miteco.gob.es/')) failures.push(`${label(route)} no declara citation en los datos estructurados`);
  if (!html.includes('Saltar al contenido')) failures.push(`${label(route)} no contiene skip link accesible`);
}

const home = readFileSync(htmlPath(''), 'utf8');
const entryContract = [
  'class="intro entry3d"',
  'class="entry3d__static-art"',
  'isivoltpro-entry-static-approved.webp',
  'id="skip-intro"',
];
for (const marker of entryContract) {
  if (!home.includes(marker)) failures.push(`Home ha perdido el contrato de entrada estática aprobada: ${marker}`);
}
const forbiddenEntryLayers = [
  'entry3d-canvas', 'entry3d-scene', 'entry3d__logo', 'entry3d__halo',
  'entry3d__cube-frame', 'entry3d__premium-cube', 'isivoltpro-cube-ultrareal-v4.webp',
];
for (const marker of forbiddenEntryLayers) {
  if (home.includes(marker)) failures.push(`Home ha reintroducido una capa/efecto retirado de la entrada estática: ${marker}`);
}

const sitemapPath = join(dist, 'sitemap.xml');
if (!existsSync(sitemapPath)) {
  failures.push('Falta sitemap.xml');
} else {
  const sitemap = readFileSync(sitemapPath, 'utf8');
  for (const route of sitemapRoutes) if (!sitemap.includes(`${route}/`)) failures.push(`/${route}/ falta en sitemap.xml`);
  for (const route of sourcedEditorialRoutes) if (!sitemap.includes(`${route}/`)) failures.push(`/${route}/ falta en sitemap.xml`);
  for (const forbidden of ['/lab-3d', '/acceso/</loc>', '/mantenimiento/</loc>', '/privacidad/</loc>', '/cookies/</loc>', '/aviso-legal/</loc>', '/gestion-contenido/</loc>']) {
    if (sitemap.includes(forbidden)) failures.push(`Ruta no indexable presente en sitemap.xml: ${forbidden}`);
  }
}

const adminPath = join(dist, 'gestion-contenido', 'index.html');
if (existsSync(adminPath)) {
  const admin = readFileSync(adminPath, 'utf8');
  if (!admin.includes('noindex,nofollow')) failures.push('/gestion-contenido/ debe permanecer noindex,nofollow');
  if (!admin.includes('Vista administrativa bloqueada por defecto')) failures.push('/gestion-contenido/ debe permanecer bloqueada por defecto');
}

const editorialAdminPath = join(dist, 'gestion-contenido', 'blog', 'index.html');
if (existsSync(editorialAdminPath)) {
  const editorialAdmin = readFileSync(editorialAdminPath, 'utf8');
  if (!editorialAdmin.includes('noindex,nofollow')) failures.push('/gestion-contenido/blog/ debe permanecer noindex,nofollow');
  if (!editorialAdmin.includes('Publicación externa bloqueada')) failures.push('/gestion-contenido/blog/ debe mostrar el bloqueo de publicación externa');
}

if (failures.length) {
  console.error('\nSeguridad comercial V3: FALLÓ');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Seguridad comercial V3: OK · ${routes.length} rutas públicas + ${deepVisualRoutes.length} landings profundas + ${sourcedEditorialRoutes.length} artículo(s) con fuente + entrada estática aprobada + sitemap + gestor bloqueado + sin heroes orbitales legacy`);
