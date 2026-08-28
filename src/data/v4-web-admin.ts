export type V4AdminAreaState = 'ready-preview' | 'partial' | 'backend-required';
export type V4AdminRole = 'owner' | 'admin' | 'editor' | 'marketing';
export type V4BackendCapability =
  | 'content-write'
  | 'media-upload'
  | 'form-intake'
  | 'social-publish'
  | 'release-publish'
  | 'identity-access'
  | 'audit-log';

export type V4AdminArea = {
  id: string;
  label: string;
  description: string;
  route?: string;
  controls: string[];
  roles: V4AdminRole[];
  state: V4AdminAreaState;
  backendCapabilities: V4BackendCapability[];
};

export const v4AdminAreas: V4AdminArea[] = [
  {
    id: 'pages',
    label: 'Páginas públicas',
    description: 'Control editorial de Home, Producto, Sectores, Precios, Empresa, Contacto y páginas comerciales.',
    route: '/gestion-contenido/#contenido',
    controls: ['textos', 'CTAs', 'estado editorial', 'historial'],
    roles: ['owner', 'admin', 'editor'],
    state: 'ready-preview',
    backendCapabilities: ['content-write', 'audit-log'],
  },
  {
    id: 'blog',
    label: 'Blog y noticias',
    description: 'Artículos, borradores, revisión, publicación y reutilización de medios.',
    route: '/gestion-contenido/blog/',
    controls: ['artículos', 'categorías', 'SEO', 'estado editorial'],
    roles: ['owner', 'admin', 'editor'],
    state: 'ready-preview',
    backendCapabilities: ['content-write', 'audit-log'],
  },
  {
    id: 'resources',
    label: 'Recursos y guías',
    description: 'Biblioteca práctica, fichas evergreen y material de apoyo comercial.',
    route: '/gestion-contenido/#contenido',
    controls: ['guías', 'resúmenes', 'medios', 'publicación'],
    roles: ['owner', 'admin', 'editor'],
    state: 'partial',
    backendCapabilities: ['content-write', 'audit-log'],
  },
  {
    id: 'media',
    label: 'Biblioteca multimedia',
    description: 'Imágenes, ilustraciones, vídeo y documentos con alt, procedencia, etiquetas y trazabilidad.',
    route: '/gestion-contenido/#medios',
    controls: ['subidas', 'alt', 'etiquetas', 'uso'],
    roles: ['owner', 'admin', 'editor', 'marketing'],
    state: 'ready-preview',
    backendCapabilities: ['media-upload', 'content-write', 'audit-log'],
  },
  {
    id: 'navigation',
    label: 'Navegación y estructura',
    description: 'Cabecera, footer, breadcrumbs, CTAs globales y jerarquía de rutas V4.',
    controls: ['menú principal', 'footer', 'migas', 'enlaces'],
    roles: ['owner', 'admin', 'editor'],
    state: 'partial',
    backendCapabilities: ['content-write', 'audit-log'],
  },
  {
    id: 'catalog',
    label: 'Producto, módulos y sectores',
    description: 'Fichas comerciales, módulos, sectores y relaciones entre páginas.',
    controls: ['producto', 'módulos', 'sectores', 'CTA'],
    roles: ['owner', 'admin', 'editor'],
    state: 'partial',
    backendCapabilities: ['content-write', 'audit-log'],
  },
  {
    id: 'pricing',
    label: 'Precios y planes',
    description: 'Presentación comercial de Autónomo, Equipo, Empresa y piloto sin publicar cifras no aprobadas.',
    controls: ['planes', 'copy', 'CTA', 'visibilidad'],
    roles: ['owner', 'admin'],
    state: 'partial',
    backendCapabilities: ['content-write', 'audit-log'],
  },
  {
    id: 'seo',
    label: 'SEO y descubrimiento',
    description: 'Metadatos, canonical, Open Graph, sitemap, RSS, indexación y redirecciones.',
    controls: ['title', 'description', 'canonical', 'redirecciones'],
    roles: ['owner', 'admin', 'editor'],
    state: 'partial',
    backendCapabilities: ['content-write', 'audit-log'],
  },
  {
    id: 'forms',
    label: 'Contactos y solicitudes',
    description: 'Contacto, demo y piloto con estados, validación, privacidad y seguimiento.',
    controls: ['formularios', 'estado', 'destino', 'seguimiento'],
    roles: ['owner', 'admin'],
    state: 'backend-required',
    backendCapabilities: ['form-intake', 'identity-access', 'audit-log'],
  },
  {
    id: 'social',
    label: 'Redes sociales',
    description: 'Preparación de piezas reutilizadas desde la web con aprobación previa obligatoria.',
    route: '/gestion-contenido/#publicacion',
    controls: ['copy', 'medios', 'aprobación', 'programación'],
    roles: ['owner', 'admin', 'marketing'],
    state: 'backend-required',
    backendCapabilities: ['social-publish', 'identity-access', 'audit-log'],
  },
  {
    id: 'release',
    label: 'Publicación de la web',
    description: 'Preview, validaciones y promoción controlada de una versión aprobada a producción.',
    route: '/gestion-contenido/#publicacion',
    controls: ['preview', 'QA', 'estado CI', 'publicar versión'],
    roles: ['owner', 'admin'],
    state: 'backend-required',
    backendCapabilities: ['release-publish', 'identity-access', 'audit-log'],
  },
  {
    id: 'security',
    label: 'Usuarios y seguridad',
    description: 'Roles, sesiones, auditoría y límites de acceso del centro administrativo.',
    route: '/gestion-contenido/#seguridad',
    controls: ['usuarios', 'roles', 'sesiones', 'auditoría'],
    roles: ['owner'],
    state: 'backend-required',
    backendCapabilities: ['identity-access', 'audit-log'],
  },
];

export const v4AdminPolicy = {
  publicSiteStoresSecrets: false,
  publicSiteCanWriteAdminData: false,
  publicSiteCanPublish: false,
  adminRequiresAuthentication: true,
  adminRequiresAuthorization: true,
  revisionsRequired: true,
  socialApprovalRequired: true,
  releaseRequiresGreenChecks: true,
  backendMustAuthenticateWrites: true,
  backendMustAuditPrivilegedActions: true,
  formDataMustNotPersistInPublicFrontend: true,
  mediaUploadsRequireAuthenticatedBackend: true,
  releaseAndSocialNeedExplicitApproval: true,
  productionReleaseRoles: ['owner', 'admin'] as const,
} as const;

export const v4BackendBoundary = {
  publicLayer: 'github-pages-static',
  publiclyWritable: false,
  authenticatedBackendRequired: true,
  capabilities: {
    'content-write': { publicAllowed: false, requiresAuth: true, requiresAudit: true },
    'media-upload': { publicAllowed: false, requiresAuth: true, requiresAudit: true },
    'form-intake': { publicAllowed: false, requiresAuth: false, requiresServerValidation: true, requiresAudit: true },
    'social-publish': { publicAllowed: false, requiresAuth: true, requiresAudit: true, requiresApproval: true },
    'release-publish': { publicAllowed: false, requiresAuth: true, requiresAudit: true, requiresApproval: true, requiresGreenChecks: true },
    'identity-access': { publicAllowed: false, requiresAuth: true, requiresAudit: true },
    'audit-log': { publicAllowed: false, requiresAuth: true },
  },
} as const;

export const v4AdminSummary = {
  totalAreas: v4AdminAreas.length,
  previewReady: v4AdminAreas.filter((area) => area.state === 'ready-preview').length,
  partial: v4AdminAreas.filter((area) => area.state === 'partial').length,
  backendRequired: v4AdminAreas.filter((area) => area.state === 'backend-required').length,
};
