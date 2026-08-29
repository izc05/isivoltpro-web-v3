import { readFileSync, existsSync } from 'node:fs';

const fail = (message) => {
  console.error(`V4 admin crawler safety: ${message}`);
  process.exit(1);
};

const robots = readFileSync('public/robots.txt', 'utf8');
for (const rule of [
  'Disallow: /admin',
  'Disallow: /gestion-contenido',
  'Disallow: /isivoltpro-web-v3/admin',
  'Disallow: /isivoltpro-web-v3/gestion-contenido',
]) {
  if (!robots.includes(rule)) fail(`robots.txt debe conservar «${rule}»`);
}

const sitemapSource = readFileSync('src/pages/sitemap.xml.ts', 'utf8');
for (const forbidden of ["'admin/'", "'gestion-contenido/'", '`gestion-contenido/']) {
  if (sitemapSource.includes(forbidden)) fail(`sitemap fuente no puede incluir ruta administrativa: ${forbidden}`);
}

if (existsSync('dist/sitemap.xml')) {
  const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
  for (const forbidden of ['/admin/', '/gestion-contenido/']) {
    if (sitemap.includes(forbidden)) fail(`sitemap generado expone ruta administrativa: ${forbidden}`);
  }
}

console.log('V4 admin crawler safety OK: robots bloquea superficies administrativas y sitemap no las publica.');
