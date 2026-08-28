import { readFile } from 'node:fs/promises';

const header = await readFile(new URL('../src/components/V3CommercialHeader.astro', import.meta.url), 'utf8');
const footer = await readFile(new URL('../src/components/V3CommercialFooter.astro', import.meta.url), 'utf8');

const fail = (message) => {
  console.error(`V4 information architecture: ${message}`);
  process.exitCode = 1;
};

const primary = ['Producto', 'Módulos', 'Sectores', 'Precios', 'Recursos', 'Empresa'];
const primaryNav = header.match(/<nav class="nav" aria-label="Navegación principal">([\s\S]*?)<\/nav>/)?.[1] ?? '';
const labels = [...primaryNav.matchAll(/>([^<>]+)<\/a>/g)].map((match) => match[1].trim());
if (JSON.stringify(labels) !== JSON.stringify(primary)) {
  fail(`la navegación principal debe ser exactamente ${primary.join(' · ')}; recibida: ${labels.join(' · ') || 'vacía'}`);
}

const requiredHeaderRoutes = [
  ['Producto', 'href={product}'],
  ['Módulos', 'href={modules}'],
  ['Sectores', 'href={sectors}'],
  ['Precios', 'href={pricing}'],
  ['Recursos', 'href={resources}'],
  ['Empresa', 'href={company}'],
  ['Soluciones', 'href={solutions}'],
  ['App Mantenimiento', 'href={appMaintenance}'],
  ['Blog + noticias', 'href={blog}'],
  ['Acceder', 'href={access}'],
  ['Solicitar demo', 'href={demo}'],
];
for (const [label, route] of requiredHeaderRoutes) {
  if (!header.includes(route) || !header.includes(`>${label}</a>`)) fail(`falta ${label} en la cabecera/móvil`);
}

const requiredFooterGroups = ['Producto y módulos', 'Soluciones', 'Recursos, noticias y empresa'];
for (const label of requiredFooterGroups) {
  if (!footer.includes(`<summary>${label}</summary>`)) fail(`falta el grupo ${label} en el footer`);
}

const requiredFooterRoutes = [
  'producto/', 'aplicaciones/', 'app-mantenimiento/', 'apps-especializadas/', 'alcance/', 'precios/',
  'soluciones/', 'sectores/', 'implantacion/', 'piloto/', 'demo/', 'seguridad/',
  'recursos/', 'blog/', 'faq/', 'empresa/', 'contacto/', 'acceso/',
  'aviso-legal/', 'privacidad/', 'cookies/',
];
for (const route of requiredFooterRoutes) {
  if (!footer.includes(`${baseToken}${route}`)) fail(`falta la ruta ${route} en el footer`);
}

if (!process.exitCode) console.log('V4 INFORMATION ARCHITECTURE OK');

function baseToken(strings, ...values) {
  return String.raw({ raw: strings }, ...values);
}
