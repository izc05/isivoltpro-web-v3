import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = process.argv[2] || 'dist';

const routes = [
  '',
  'producto',
  'soluciones',
  'app-mantenimiento',
  'aplicaciones',
  'apps-especializadas',
  'alcance',
  'experiencia',
  'demo',
  'selector',
  'piloto',
  'implantacion',
  'seguridad',
  'de-whatsapp-excel-a-isivoltpro',
  'sectores',
  'precios',
  'recursos',
  'empresa',
  'ecosistema',
  'faq',
  'contacto',
];

const sitemapRoutes = routes.filter((route) => route !== '');
const failures = [];

const htmlPath = (route) => route ? join(dist, route, 'index.html') : join(dist, 'index.html');
const label = (route) => route ? `/${route}/` : '/';

for (const route of routes) {
  const file = htmlPath(route);
  if (!existsSync(file)) {
    failures.push(`${label(route)} no se ha construido`);
    continue;
  }

  const html = readFileSync(file, 'utf8');

  if (!html.includes('Content-Security-Policy')) {
    failures.push(`${label(route)} no contiene Content-Security-Policy`);
  }
  if (!html.includes("font-src 'self' data:")) {
    failures.push(`${label(route)} no restringe las fuentes a recursos locales`);
  }
  if (!html.includes('Saltar al contenido')) {
    failures.push(`${label(route)} no contiene skip link accesible`);
  }
  if (!html.includes('property="og:image"')) {
    failures.push(`${label(route)} no contiene og:image`);
  }
  if (!html.includes('name="twitter:card" content="summary_large_image"')) {
    failures.push(`${label(route)} no contiene Twitter Card grande`);
  }

  if (route && /entry3d-canvas|V3Entry3D|three\.module/.test(html)) {
    failures.push(`${label(route)} está cargando la experiencia 3D reservada a Home`);
  }

  if (route && /class=(?:"[^"]*\bpage-orbit\b[^"]*"|'[^']*\bpage-orbit\b[^']*')/.test(html)) {
    failures.push(`${label(route)} ha reintroducido el hero orbital legacy; usar una composición SaaS visual específica`);
  }
}

const home = readFileSync(htmlPath(''), 'utf8');
if (!home.includes('entry3d-canvas')) {
  failures.push('Home ha perdido la entrada 3D aprobada');
}

const sitemapPath = join(dist, 'sitemap.xml');
if (!existsSync(sitemapPath)) {
  failures.push('Falta sitemap.xml');
} else {
  const sitemap = readFileSync(sitemapPath, 'utf8');
  for (const route of sitemapRoutes) {
    if (!sitemap.includes(`${route}/`)) {
      failures.push(`/${route}/ falta en sitemap.xml`);
    }
  }
  for (const forbidden of ['/lab-3d', '/acceso/</loc>', '/mantenimiento/</loc>', '/privacidad/</loc>', '/cookies/</loc>', '/aviso-legal/</loc>', '/gestion-contenido/</loc>']) {
    if (sitemap.includes(forbidden)) {
      failures.push(`Ruta no indexable presente en sitemap.xml: ${forbidden}`);
    }
  }
}

const adminPath = join(dist, 'gestion-contenido', 'index.html');
if (existsSync(adminPath)) {
  const admin = readFileSync(adminPath, 'utf8');
  if (!admin.includes('noindex,nofollow')) failures.push('/gestion-contenido/ debe permanecer noindex,nofollow');
  if (!admin.includes('Vista administrativa bloqueada por defecto')) failures.push('/gestion-contenido/ debe permanecer bloqueada por defecto');
}

if (failures.length) {
  console.error('\nSeguridad comercial V3: FALLÓ');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Seguridad comercial V3: OK · ${routes.length} rutas públicas + sitemap + gestor bloqueado + sin heroes orbitales legacy`);
