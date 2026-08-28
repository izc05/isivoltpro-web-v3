const origin = process.env.STAGING_ORIGIN;
const basePathRaw = process.env.STAGING_BASE_PATH ?? '/';

if (!origin) {
  console.error('Falta STAGING_ORIGIN. Ejemplo: STAGING_ORIGIN=https://staging.tudominio.example npm run smoke:staging');
  process.exit(2);
}

const normalizeBase = (value) => {
  const withLeading = value.startsWith('/') ? value : `/${value}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
};

const basePath = normalizeBase(basePathRaw);
const root = new URL(basePath, origin);

const routes = [
  '',
  'producto/',
  'aplicaciones/',
  'modulos/ordenes-de-trabajo/',
  'modulos/mantenimiento-preventivo/',
  'sectores/autonomos-tecnicos/',
  'precios/',
  'recursos/',
  'faq/',
  'contacto/',
];

const failures = [];

for (const route of routes) {
  const url = new URL(route, root);
  let response;
  try {
    response = await fetch(url, { redirect: 'follow' });
  } catch (error) {
    failures.push(`${url}: no responde (${error.message})`);
    continue;
  }

  if (!response.ok) {
    failures.push(`${url}: HTTP ${response.status}`);
    continue;
  }

  const html = await response.text();
  if (!/IsiVoltPro/i.test(html)) failures.push(`${url}: falta marca IsiVoltPro en HTML`);
  if (!/Content-Security-Policy/i.test(html)) failures.push(`${url}: falta CSP en HTML`);
  if (/three\.module/i.test(html)) failures.push(`${url}: carga Three.js en ruta comercial`);
  if (/Web V3 en desarrollo comercial/i.test(html)) failures.push(`${url}: conserva copy interno de desarrollo`);
}

const sitemapUrl = new URL('sitemap.xml', root);
try {
  const sitemap = await fetch(sitemapUrl);
  if (!sitemap.ok) failures.push(`${sitemapUrl}: HTTP ${sitemap.status}`);
  else {
    const xml = await sitemap.text();
    if (!xml.includes('<urlset')) failures.push(`${sitemapUrl}: contenido de sitemap no reconocido`);
  }
} catch (error) {
  failures.push(`${sitemapUrl}: no responde (${error.message})`);
}

if (failures.length) {
  console.error('\nSmoke test V3: FALLA');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Smoke test V3: OK (${routes.length} rutas + sitemap)`);
console.log(`Origen: ${root}`);
