import { readFileSync, existsSync } from 'node:fs';

const requiredBuildFiles = [
  'dist/admin/index.html',
  'dist/gestion-contenido/index.html',
  'dist/gestion-contenido/blog/index.html',
  'dist/gestion-contenido/estado/index.html',
  'dist/gestion-contenido/formularios/index.html',
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
const formsWorkspaceSource = readFileSync('src/pages/gestion-contenido/formularios.astro', 'utf8');
const adminSource = readFileSync('src/pages/admin.astro', 'utf8');
const headerSource = readFileSync('src/components/V3CommercialHeader.astro', 'utf8');

for (const label of [
  'Páginas públicas','Blog y noticias','Recursos y guías','Biblioteca multimedia','Navegación y estructura','Producto, módulos y sectores','Precios y planes','SEO y descubrimiento','Contactos y solicitudes','Redes sociales','Publicación de la web','Usuarios y seguridad',
]) {
  if (!contract.includes(`label: '${label}'`)) fail(`falta el dominio administrativo «${label}» en el contrato`);
}

for (const policy of [
  'publicSiteStoresSecrets: false','publicSiteCanWriteAdminData: false','publicSiteCanPublish: false','adminRequiresAuthentication: true','adminRequiresAuthorization: true','socialApprovalRequired: true','releaseRequiresGreenChecks: true','backendMustAuthenticateWrites: true','backendMustAuditPrivilegedActions: true','formDataMustNotPersistInPublicFrontend: true','formIntakeMustValidateOnServer: true','formIntakeMustRateLimit: true','formIntakeRequiresConsent: true','formRetentionMustBeDefinedBeforeEnable: true','mediaUploadsRequireAuthenticatedBackend: true','releaseAndSocialNeedExplicitApproval: true',
]) {
  if (!contract.includes(policy)) fail(`política ausente: ${policy}`);
}

for (const role of ["'owner'", "'admin'", "'editor'", "'marketing'"]) {
  if (!contract.includes(role)) fail(`rol V4 ausente: ${role}`);
}

for (const capability of ["'content-write'","'media-upload'","'form-intake'","'social-publish'","'release-publish'","'identity-access'","'audit-log'"]) {
  if (!contract.includes(capability)) fail(`capacidad backend V4 ausente: ${capability}`);
}

for (const boundary of [
  "publicLayer: 'github-pages-static'",'publiclyWritable: false','authenticatedBackendRequired: true',"'form-intake': { publicAllowed: false, requiresAuth: false, requiresServerValidation: true, requiresAudit: true }","'social-publish': { publicAllowed: false, requiresAuth: true, requiresAudit: true, requiresApproval: true }","'release-publish': { publicAllowed: false, requiresAuth: true, requiresAudit: true, requiresApproval: true, requiresGreenChecks: true }",
]) {
  if (!contract.includes(boundary)) fail(`límite backend ausente o debilitado: ${boundary}`);
}

for (const formId of ["id: 'contact'", "id: 'demo'", "id: 'pilot'"]) {
  if (!contract.includes(formId)) fail(`formulario V4 ausente del contrato: ${formId}`);
}
for (const formGuard of ["status: 'preview-disabled'",'consentRequired: true','serverValidationRequired: true','rateLimitRequired: true','auditRequired: true','publicPersistenceAllowed: false','publicSecretsAllowed: false','backendEndpoint: null',"retentionPolicy: 'define-before-enable'"]) {
  if (!contract.includes(formGuard)) fail(`protección de formularios ausente o debilitada: ${formGuard}`);
}
for (const route of ["publicRoute: '/contacto/'", "publicRoute: '/demo/'", "publicRoute: '/piloto/'"]) {
  if (!contract.includes(route)) fail(`ruta pública de intake ausente: ${route}`);
}

for (const handoffGuard of [
  "activation: 'blocked'",
  'endpoint: null',
  "transport: 'https-only'",
  "allowedMethods: ['POST']",
  'schemaRequired: true',
  'rejectUnknownFields: true',
  "status: 'not-defined'",
  'deleteAfterDays: null',
  "status: 'required-not-configured'",
  "keyStrategy: 'privacy-preserving-server-key'",
  'windowSeconds: null',
  'maxRequests: null',
  'actorRequiredForAdminEvents: true',
  'secretsInClient: false',
  'adminReadRequiresAuth: true',
  'adminWriteRequiresAuth: true',
  'persistOnlyAfterValidation: true',
]) {
  if (!contract.includes(handoffGuard)) fail(`handoff backend ausente o prematuramente activado: ${handoffGuard}`);
}
for (const serverField of ['requestId', 'receivedAt', 'sourceFingerprint', 'auditTrail']) {
  if (!contract.includes(`'${serverField}'`)) fail(`campo propiedad del servidor ausente: ${serverField}`);
}
for (const auditEvent of ['received', 'rejected', 'viewed', 'status-changed', 'deleted']) {
  if (!contract.includes(`'${auditEvent}'`)) fail(`evento mínimo de auditoría ausente: ${auditEvent}`);
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
if (!readinessSource.includes('v4PublicFormIntake')) fail('la matriz operativa debe derivar el intake público desde el contrato V4');
if (!readinessSource.includes('Intake público protegido')) fail('la matriz operativa debe mostrar el estado de Contacto/Demo/Piloto');
if (!readinessSource.includes('PUBLIC_V3_CONTENT_ADMIN_PREVIEW')) fail('la matriz operativa debe permanecer detrás del flag de preview administrativo');
for (const marker of ['AUTH', 'SERVER VALIDATION', 'APROBACIÓN', 'CHECKS VERDES']) {
  if (!readinessSource.includes(marker)) fail(`la matriz operativa debe explicar el requisito ${marker}`);
}

if (!formsWorkspaceSource.includes('v4PublicFormIntake')) fail('la activación de formularios debe consumir la fuente única V4');
if (!formsWorkspaceSource.includes('v4FormBackendContract')) fail('la activación de formularios debe consumir el handoff backend V4');
if (!formsWorkspaceSource.includes('PUBLIC_V3_CONTENT_ADMIN_PREVIEW')) fail('la activación de formularios debe permanecer detrás del flag administrativo');
for (const marker of ['Endpoint backend','Política de retención','Validación de servidor','Rate limiting','Consentimiento','Auditoría','PREVIEW · SIN ENVÍO']) {
  if (!formsWorkspaceSource.includes(marker)) fail(`la activación de formularios debe mostrar el bloqueo «${marker}»`);
}
for (const marker of ['Handoff backend definido','ACTIVACIÓN BLOQUEADA','Registro mínimo server-side','Eventos de auditoría','Campos propiedad del servidor','HTTPS only','rechazar campos desconocidos','persistir solo tras validar']) {
  if (!formsWorkspaceSource.includes(marker)) fail(`la vista de intake debe exponer el contrato backend «${marker}»`);
}
if (!formsWorkspaceSource.includes('GitHub Pages no recibe, guarda ni transmite datos personales')) fail('la activación debe explicar el límite de datos públicos');
if (/<form\b/i.test(formsWorkspaceSource)) fail('la vista de activación no debe implementar formularios reales');

if (!headerSource.includes("import { v4PublicFormIntake }")) fail('las rutas públicas de intake deben consumir la fuente única V4');
if (!headerSource.includes('publicIntake')) fail('la cabecera debe resolver el estado de intake según la ruta pública');
if (!headerSource.includes('PREVIEW · SIN ENVÍO')) fail('las rutas públicas de intake deben mostrar que el envío está desactivado');
if (!headerSource.includes('No se envían ni almacenan datos personales')) fail('las rutas públicas de intake deben explicar el límite de datos');

const forbidden = [/pb_superuser/i,/superuser.*password/i,/private[_-]?key/i,/access[_-]?token\s*[:=]\s*["'][^"']+/i];
const publicAdminSurface = requiredBuildFiles.map((file) => readFileSync(file, 'utf8')).join('\n');
for (const pattern of forbidden) {
  if (pattern.test(publicAdminSurface)) fail(`posible secreto expuesto: ${pattern}`);
}

console.log('V4 admin safety OK: rutas noindex, contrato único, intake público desactivado, handoff backend fail-closed, retención/rate-limit/auditoría sin fingir configuración, matriz operativa protegida, sin escrituras públicas y release gate protegido.');