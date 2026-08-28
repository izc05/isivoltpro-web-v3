export type V4AdminRole = 'owner' | 'admin' | 'editor' | 'marketing';
export type V4AdminDomainKey =
  | 'site'
  | 'catalogue'
  | 'editorial'
  | 'media'
  | 'seo'
  | 'leads'
  | 'social'
  | 'release'
  | 'security';

export type V4AdminDomain = {
  key: V4AdminDomainKey;
  label: string;
  summary: string;
  controls: readonly string[];
  roles: readonly V4AdminRole[];
  backendRequired: boolean;
};

export const V4_ADMIN_DOMAINS: readonly V4AdminDomain[] = [
  {
    key: 'site',
    label: 'Web y navegación',
    summary: 'Home, cabecera, footer, CTAs, orden y visibilidad de secciones.',
    controls: ['Páginas', 'Navegación', 'CTAs', 'Ajustes globales'],
    roles: ['owner', 'admin', 'editor'],
    backendRequired: true,
  },
  {
    key: 'catalogue',
    label: 'Producto y oferta',
    summary: 'Producto, módulos, sectores, precios y mensajes comerciales.',
    controls: ['Producto', 'Módulos', 'Sectores', 'Precios'],
    roles: ['owner', 'admin', 'editor'],
    backendRequired: true,
  },
  {
    key: 'editorial',
    label: 'Blog, noticias y recursos',
    summary: 'Borradores, revisión, publicación, categorías y contenido relacionado.',
    controls: ['Blog', 'Noticias', 'Recursos', 'Estados editoriales'],
    roles: ['owner', 'admin', 'editor'],
    backendRequired: true,
  },
  {
    key: 'media',
    label: 'Biblioteca multimedia',
    summary: 'Fotos, ilustraciones, vídeos, documentos, alt y trazabilidad de uso.',
    controls: ['Subidas', 'Alt', 'Etiquetas', 'Uso por página'],
    roles: ['owner', 'admin', 'editor', 'marketing'],
    backendRequired: true,
  },
  {
    key: 'seo',
    label: 'SEO y descubrimiento',
    summary: 'Metadatos, indexación, canonical, sitemap, RSS y redirecciones.',
    controls: ['SEO por página', 'Open Graph', 'Sitemap', 'Redirecciones'],
    roles: ['owner', 'admin', 'editor'],
    backendRequired: true,
  },
  {
    key: 'leads',
    label: 'Contactos y solicitudes',
    summary: 'Entradas de contacto, demo y piloto, estado y seguimiento.',
    controls: ['Contacto', 'Demo', 'Piloto', 'Seguimiento'],
    roles: ['owner', 'admin'],
    backendRequired: true,
  },
  {
    key: 'social',
    label: 'Redes sociales',
    summary: 'Preparación, aprobación y programación con credenciales solo en backend.',
    controls: ['Borradores', 'Aprobación', 'Programación', 'Historial'],
    roles: ['owner', 'admin', 'marketing'],
    backendRequired: true,
  },
  {
    key: 'release',
    label: 'Publicación de la web',
    summary: 'Vista previa, validaciones y promoción controlada de una versión aprobada.',
    controls: ['Preview', 'QA', 'Estado CI', 'Publicar versión'],
    roles: ['owner', 'admin'],
    backendRequired: true,
  },
  {
    key: 'security',
    label: 'Usuarios y seguridad',
    summary: 'Roles, sesiones, auditoría y límites de acceso administrativo.',
    controls: ['Usuarios', 'Roles', 'Sesiones', 'Auditoría'],
    roles: ['owner'],
    backendRequired: true,
  },
] as const;

export const V4_ADMIN_POLICY = {
  publicSiteStoresSecrets: false,
  publicSiteCanWriteAdminData: false,
  publicSiteCanPublish: false,
  adminRequiresAuthentication: true,
  adminRequiresAuthorization: true,
  revisionsRequired: true,
  socialApprovalRequired: true,
  releaseRequiresGreenChecks: true,
  productionReleaseRoles: ['owner', 'admin'] as const,
} as const;

export function getV4AdminDomain(key: V4AdminDomainKey) {
  return V4_ADMIN_DOMAINS.find((domain) => domain.key === key);
}
