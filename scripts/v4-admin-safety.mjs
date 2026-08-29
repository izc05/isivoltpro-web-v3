import { readFileSync, existsSync } from 'node:fs';

const requiredBuildFiles = [
  'dist/admin/index.html',
  'dist/gestion-contenido/index.html',
  'dist/gestion-contenido/blog/index.html',
  'dist/gestion-contenido/estado/index.html',
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
const readinessSource = readFileSync('src/pages/gestion-contenido/estado.astro', 'utf8');
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
  'backendMustAuthenticateWrites: true',
  'backendMustAuditPrivilegedActions: true',
  'formDataMustNotPersistInPublicFrontend: true',
  'mediaUploadsRequireAuthenticatedBackend: true',
  'releaseAndSocialNeedExplicitApproval: true',
]) {
  if (!contract.includes(policy)) fail(`política ausente: ${policy}`);
}

for (const role of ["'owner'", "'admin'", "'editor'", "'marketing'"]) {
  if (!contract.includes(role)) fail(`rol V4 ausente: ${role}`);
}

for (const capability of [
  "'content-write'",
  "'media-upload'",
  "'form-intake'",
  "'social-publish'",
  "'release-publish'",
  "'identity-access'",
  "'audit-log'",
]) {
  if (!contract.includes(capability)) fail(`capacidad backend V4 ausente: ${capability}`);
}

for (const boundary of [
  "publicLayer: 'github-pages-static'",
  'publiclyWritable: false',
  'authenticatedBackendRequired: true',
  "'form-intake': { publicAllowed: false, requiresAuth: false, requiresServerValidation: true, requiresAudit: true }",
  "'social-publish': { publicAllowed: false, requiresAuth: true, requiresAudit: true, requiresApproval: true }",
  "'release-publish': { publicAllowed: false, requiresAuth: true, requiresAudit: true, requiresApproval: true, requiresGreenChecks: true }",
]) {
  if (!contract.includes(boundary)) fail(`límite backend ausente o debilitado: ${boundary}`);
}

if (!workspaceSource.includes('Preview seguro')) fail('el workspace debe declarar su modo seguro');
if (!workspaceSource.includes('disabled')) fail('el workspace debe conservar controles de escritura desactivados');
if (!adminSource.includes('PUBLIC_V3_CONTENT_ADMIN_PREVIEW')) fail('el centro de control debe permanecer detrás del flag de preview administrativo');
if (!adminSource.includes('v4BackendBoundary')) fail('el centro de control debe consumir el límite backend desde la fuente V4');
if (!adminSource.includes('area.backendCapabilities')) fail('el centro de control debe exponer las capacidades backend por área');
if (!adminSource.includes('Backend necesario')) fail('el centro de control debe explicar visualmente qué requiere backend');
if (!adminSource.includes('validación de servidor')) fail('el centro de control debe distinguir formularios públicos de escrituras administrativas autenticadas');
if (!contract.includes("route: '/gestion-contenido/estado/#forms'")) fail('contactos debe enlazar a la matriz operativa protegida');
if (!contract.includes("route: '/gestion-contenido/estado/#security'")) fail('seguridad debe enlazar a la matriz operativa protegida');
if (!readinessSource.includes('v4BackendBoundary')) fail('la matriz operativa debe derivar límites desde el contrato V4');
if (!readinessSource.includes('PUBLIC_V3_CONTENT_ADMIN_PREVIEW')) fail('la matriz operativa debe permanecer detrás del flag de preview administrativo');
for (const marker of ['AUTH', 'SERVER VALIDATION', 'APROBACIÓN', 'CHECKS VERDES']) {
  if (!readinessSource.includes(marker)) fail(`la matriz operativa debe explicar el requisito ${marker}`);
}

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

console.log('V4 admin safety OK: rutas noindex, contrato único, matriz operativa protegida, backend autenticado delimitado y visible, sin escrituras públicas y release gate protegido.');
