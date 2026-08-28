import { readFileSync, existsSync } from 'node:fs';

const requiredBuildFiles = [
  'dist/admin/index.html',
  'dist/gestion-contenido/index.html',
  'dist/gestion-contenido/blog/index.html',
];

const fail = (message) => {
  console.error(`V4 admin safety: ${message}`);
  process.exit(1);
};

for (const file of requiredBuildFiles) {
  if (!existsSync(file)) fail(`falta ${file}`);
  const html = readFileSync(file, 'utf8');
  if (!/noindex/i.test(html)) fail(`${file} debe permanecer noindex`);
  if (/<form\b[^>]*(?:action|method)\s*=/i.test(html)) fail(`${file} no puede enviar formularios desde la web pública`);
}

const contract = readFileSync('src/data/v4-web-admin.ts', 'utf8');
const workspaceSource = readFileSync('src/pages/gestion-contenido.astro', 'utf8');
const adminSource = readFileSync('src/pages/admin.astro', 'utf8');

for (const label of [
  'Páginas públicas',
  'Blog y noticias',
  'Recursos y guías',
  'Biblioteca multimedia',
  'Navegación y estructura',
  'Producto, módulos y sectores',
  'Precios y planes',
  'SEO y descubrimiento',
  'Contactos y solicitudes',
  'Redes sociales',
  'Publicación de la web',
  'Usuarios y seguridad',
]) {
  if (!contract.includes(`label: '${label}'`)) fail(`falta el dominio administrativo «${label}» en el contrato`);
}

for (const policy of [
  'publicSiteStoresSecrets: false',
  'publicSiteCanWriteAdminData: false',
  'publicSiteCanPublish: false',
  'adminRequiresAuthentication: true',
  'adminRequiresAuthorization: true',
  'socialApprovalRequired: true',
  'releaseRequiresGreenChecks: true',
]) {
  if (!contract.includes(policy)) fail(`política ausente: ${policy}`);
}

for (const role of ["'owner'", "'admin'", "'editor'", "'marketing'"]) {
  if (!contract.includes(role)) fail(`rol V4 ausente: ${role}`);
}

if (!workspaceSource.includes('Preview seguro')) fail('el workspace debe declarar su modo seguro');
if (!workspaceSource.includes('disabled')) fail('el workspace debe conservar controles de escritura desactivados');
if (!adminSource.includes('PUBLIC_V3_CONTENT_ADMIN_PREVIEW')) fail('el centro de control debe permanecer detrás del flag de preview administrativo');

const forbidden = [
  /pb_superuser/i,
  /superuser.*password/i,
  /private[_-]?key/i,
  /access[_-]?token\s*[:=]\s*["'][^"']+/i,
];
const publicAdminSurface = requiredBuildFiles.map((file) => readFileSync(file, 'utf8')).join('\n');
for (const pattern of forbidden) {
  if (pattern.test(publicAdminSurface)) fail(`posible secreto expuesto: ${pattern}`);
}

console.log('V4 admin safety OK: rutas noindex, contrato único, sin escrituras públicas y release gate protegido.');
