export type V3SocialChannel = 'instagram' | 'facebook' | 'linkedin';

export type V3MediaAsset = {
  id: string;
  title: string;
  alt: string;
  kind: 'photo' | 'illustration' | 'video';
  source: 'upload' | 'generated' | 'library';
  file: string;
  focalPoint?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  tags: string[];
  published: boolean;
};

export type V3ContentEntry = {
  id: string;
  route: string;
  section: string;
  title: string;
  summary: string;
  mediaIds: string[];
  status: 'draft' | 'review' | 'published';
  updatedAt: string;
};

export type V3ContentRevision = {
  id: string;
  contentEntryId: string;
  version: number;
  actor: string;
  action: 'created' | 'edited' | 'media_changed' | 'published' | 'restored';
  summary: string;
  createdAt: string;
  restorable: boolean;
};

export type V3SocialPublication = {
  id: string;
  contentEntryId: string;
  channels: V3SocialChannel[];
  mode: 'manual' | 'scheduled';
  status: 'draft' | 'ready' | 'approved' | 'scheduled' | 'published' | 'blocked';
  caption: string;
  mediaIds: string[];
  scheduledFor?: string;
  approvedBy?: string;
  approvedAt?: string;
};

export type V3AdminPreview = {
  media: V3MediaAsset[];
  entries: V3ContentEntry[];
  revisions: V3ContentRevision[];
  social: V3SocialPublication[];
};

/**
 * Contract for the future authenticated content API.
 *
 * The commercial Astro site must never receive PocketBase superuser credentials.
 * The authenticated platform/backend will expose role-scoped endpoints for
 * content and media management. Until that contract exists, the public V3 only
 * renders this model as a non-persistent preview.
 */
export const v3ContentAdminContract = {
  roles: ['owner', 'admin', 'content_editor'] as const,
  collections: {
    media: 'public_media',
    content: 'public_content',
    revisions: 'public_content_revisions',
    social: 'social_publications',
  },
  permissions: {
    publishContent: ['owner', 'admin'] as const,
    approveSocial: ['owner', 'admin'] as const,
    editContent: ['owner', 'admin', 'content_editor'] as const,
  },
  limits: {
    imageMaxBytes: 8 * 1024 * 1024,
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
    altRequired: true,
  },
  safeguards: {
    revisionOnPublish: true,
    revisionOnMediaChange: true,
    socialApprovalRequired: true,
    scheduledPublishingRequiresBackendWorker: true,
  },
};

export const v3AdminPreview: V3AdminPreview = {
  media: [
    { id: 'media-home-dashboard', title: 'Dashboard IsiVoltPro', alt: 'Vista conceptual del panel de IsiVoltPro con órdenes, preventivos e incidencias.', kind: 'illustration', source: 'generated', file: '/media/home-dashboard.svg', tags: ['home', 'producto'], published: true },
    { id: 'media-hvac-equipment', title: 'Equipo HVAC UTA-02', alt: 'Ilustración conceptual de una unidad HVAC industrial identificada como UTA-02.', kind: 'illustration', source: 'generated', file: '/media/equipo-hvac-isivoltpro.svg', tags: ['home', 'producto', 'activos', 'climatizacion'], published: true },
    { id: 'media-field-mobile', title: 'Trabajo técnico desde móvil', alt: 'Técnico consultando un activo y su orden de trabajo desde el móvil.', kind: 'illustration', source: 'generated', file: '/media/tecnico-movil.svg', tags: ['home', 'producto', 'empresa', 'sectores', 'app'], published: true },
    { id: 'media-sector-operation', title: 'Escenarios de operación', alt: 'Cuatro escenarios conceptuales: autónomo, pequeño equipo, instalaciones propias y operación multisede.', kind: 'illustration', source: 'generated', file: '/media/sectores-operacion.svg', tags: ['home', 'sectores', 'autonomos', 'equipos', 'multisede'], published: true },
    { id: 'media-sector-scenes', title: 'Escenas diferenciadas por sector', alt: 'Seis escenas conceptuales para autónomos, mantenedoras, instalaciones propias, climatización y frío, electricidad y multisede.', kind: 'illustration', source: 'generated', file: '/media/sectores-escenas.svg', tags: ['sectores', 'autonomos', 'mantenedoras', 'climatizacion', 'electricidad', 'multisede'], published: true },
    { id: 'media-plans-growth', title: 'Crecimiento por etapas', alt: 'Tres etapas conceptuales de crecimiento en IsiVoltPro: Autónomo, Equipo y Empresa, conectadas sobre una misma base de trabajo.', kind: 'illustration', source: 'generated', file: '/media/planes-crecimiento.svg', tags: ['planes', 'autonomos', 'equipos', 'empresa'], published: true },
    { id: 'media-home-cta-mesh', title: 'Malla luminosa de cierre', alt: 'Trama abstracta de líneas luminosas para el bloque final de la Home de IsiVoltPro.', kind: 'illustration', source: 'generated', file: '/media/cta-mesh-isivoltpro.svg', tags: ['home', 'cta', 'marca'], published: true },
    { id: 'media-contact-team', title: 'Equipo revisando un proyecto', alt: 'Dos personas revisando en una tablet una interfaz conceptual de IsiVoltPro.', kind: 'illustration', source: 'generated', file: '/media/contact-team-isivoltpro.svg', tags: ['contacto', 'empresa', 'demo'], published: true },
    { id: 'media-resources-journey', title: 'Ruta práctica de recursos', alt: 'Ruta visual en cuatro pasos: avisos claros, órdenes de trabajo útiles, activos y QR, y piloto pequeño.', kind: 'illustration', source: 'generated', file: '/media/ruta-recursos-isivoltpro.svg', tags: ['recursos', 'guias', 'avisos', 'ot', 'qr', 'piloto'], published: true },
    { id: 'media-field-workflow', title: 'Flujo de trabajo de campo', alt: 'Flujo conceptual entre aviso, orden de trabajo, activo identificado por QR y cierre con histórico útil.', kind: 'illustration', source: 'generated', file: '/media/flujo-campo-isivoltpro.svg', tags: ['recursos', 'app', 'campo', 'avisos', 'ot', 'qr', 'historico'], published: true },
  ],
  entries: [
    { id: 'content-home-hero', route: '/', section: 'Hero', title: 'Menos papeleo. Más trabajo bajo control.', summary: 'Mensaje principal, CTA y visual de producto.', mediaIds: ['media-home-dashboard', 'media-hvac-equipment'], status: 'published', updatedAt: '2026-08-24' },
    { id: 'content-home-proof', route: '/', section: 'Trabajo real', title: 'Mantenimiento desde el móvil', summary: 'Bloque visual para autónomos y pequeños equipos.', mediaIds: ['media-field-mobile'], status: 'review', updatedAt: '2026-08-24' },
    { id: 'content-home-operation', route: '/', section: 'Para quién', title: 'La misma base, cuatro formas de trabajar', summary: 'Reutilización en Home de la composición visual de escenarios operativos.', mediaIds: ['media-sector-operation'], status: 'published', updatedAt: '2026-08-24' },
    { id: 'content-home-cta', route: '/', section: 'Cierre visual', title: 'Empieza por un problema concreto', summary: 'Cierre de Home con malla propia y CTA hacia la experiencia comercial.', mediaIds: ['media-home-cta-mesh'], status: 'published', updatedAt: '2026-08-24' },
    { id: 'content-sectors-operation', route: '/sectores/', section: 'Escenarios de operación', title: 'Una plataforma, cuatro formas de trabajar', summary: 'Composición visual propia para autónomos, pequeños equipos, instalaciones propias y multisede.', mediaIds: ['media-sector-operation', 'media-sector-scenes'], status: 'published', updatedAt: '2026-08-24' },
    { id: 'content-plans-growth', route: '/precios/', section: 'Estructura comercial prevista', title: 'Tres niveles. Una misma base.', summary: 'Visual conceptual de crecimiento progresivo sin publicar precios ni condiciones ficticias.', mediaIds: ['media-plans-growth'], status: 'published', updatedAt: '2026-08-24' },
    { id: 'content-company-field-work', route: '/empresa/', section: 'Trabajo de campo', title: 'Del equipo físico al histórico útil', summary: 'Historia visual sobre el uso de IsiVoltPro desde el lugar donde ocurre el trabajo.', mediaIds: ['media-field-mobile'], status: 'published', updatedAt: '2026-08-24' },
    { id: 'content-contact-project', route: '/contacto/', section: 'Recorrido comercial', title: 'Hablemos de tu proyecto', summary: 'Entrada segura al recorrido demo → piloto → contacto, todavía sin recogida real de datos.', mediaIds: ['media-contact-team'], status: 'review', updatedAt: '2026-08-24' },
    { id: 'content-resources-library', route: '/recursos/', section: 'Biblioteca práctica', title: 'Problemas cotidianos. Respuestas aplicables.', summary: 'Guías y rutas visuales para ordenar mantenimiento antes de digitalizar el proceso.', mediaIds: ['media-resources-journey', 'media-field-workflow'], status: 'published', updatedAt: '2026-08-25' },
    { id: 'content-ecosystem-map', route: '/ecosistema/', section: 'Mapa de producto', title: 'Un activo, todo su contexto conectado', summary: 'Relación visual entre aviso, OT, fotos, documentos e histórico.', mediaIds: ['media-hvac-equipment', 'media-home-dashboard'], status: 'published', updatedAt: '2026-08-24' },
  ],
  revisions: [
    { id: 'revision-home-hero-v4', contentEntryId: 'content-home-hero', version: 4, actor: 'Admin web', action: 'media_changed', summary: 'Se sustituyó la miniatura abstracta del activo por una ilustración propia de la UTA-02.', createdAt: '2026-08-24T12:51:00+02:00', restorable: true },
    { id: 'revision-home-hero-v3', contentEntryId: 'content-home-hero', version: 3, actor: 'Admin web', action: 'published', summary: 'Se aprobó el mensaje principal y el visual del dashboard.', createdAt: '2026-08-24T00:12:00+02:00', restorable: true },
    { id: 'revision-home-proof-v2', contentEntryId: 'content-home-proof', version: 2, actor: 'Editor de contenido', action: 'media_changed', summary: 'Se propuso una ilustración propia de trabajo técnico desde móvil.', createdAt: '2026-08-24T00:18:00+02:00', restorable: true },
    { id: 'revision-home-proof-v1', contentEntryId: 'content-home-proof', version: 1, actor: 'Editor de contenido', action: 'created', summary: 'Se creó el bloque visual de prueba social para Home.', createdAt: '2026-08-24T00:08:00+02:00', restorable: false },
    { id: 'revision-home-operation-v1', contentEntryId: 'content-home-operation', version: 1, actor: 'Admin web', action: 'published', summary: 'Se reutilizó el visual de escenarios operativos en Home sin duplicar el recurso multimedia.', createdAt: '2026-08-24T09:04:00+02:00', restorable: false },
    { id: 'revision-sectors-operation-v2', contentEntryId: 'content-sectors-operation', version: 2, actor: 'Admin web', action: 'media_changed', summary: 'Se añadieron seis escenas específicas para diferenciar visualmente cada perfil de Sectores.', createdAt: '2026-08-24T12:50:00+02:00', restorable: true },
    { id: 'revision-sectors-operation-v1', contentEntryId: 'content-sectors-operation', version: 1, actor: 'Admin web', action: 'published', summary: 'Se publicó la composición visual propia de escenarios de operación.', createdAt: '2026-08-24T08:48:00+02:00', restorable: false },
    { id: 'revision-plans-growth-v1', contentEntryId: 'content-plans-growth', version: 1, actor: 'Admin web', action: 'published', summary: 'Se añadió un visual propio para explicar el crecimiento de planes sin inventar precios.', createdAt: '2026-08-24T09:08:00+02:00', restorable: false },
    { id: 'revision-company-field-work-v1', contentEntryId: 'content-company-field-work', version: 1, actor: 'Admin web', action: 'published', summary: 'Se reutilizó el visual móvil en Empresa y se marcó el recurso como publicado.', createdAt: '2026-08-24T09:12:00+02:00', restorable: false },
    { id: 'revision-contact-project-v2', contentEntryId: 'content-contact-project', version: 2, actor: 'Editor de contenido', action: 'edited', summary: 'Se alineó el recorrido comercial con Demo, Piloto y Seguridad sin activar formularios.', createdAt: '2026-08-24T15:26:00+02:00', restorable: true },
    { id: 'revision-resources-library-v2', contentEntryId: 'content-resources-library', version: 2, actor: 'Admin web', action: 'media_changed', summary: 'Se añadieron dos ilustraciones propias para explicar la ruta de aprendizaje y el flujo real de campo.', createdAt: '2026-08-25T10:31:00+02:00', restorable: true },
    { id: 'revision-resources-library-v1', contentEntryId: 'content-resources-library', version: 1, actor: 'Admin web', action: 'published', summary: 'Se convirtió Recursos en una biblioteca editorial visual y reutilizable.', createdAt: '2026-08-24T15:40:00+02:00', restorable: false },
    { id: 'revision-ecosystem-map-v1', contentEntryId: 'content-ecosystem-map', version: 1, actor: 'Admin web', action: 'published', summary: 'Se sustituyó el hero orbital por un mapa conectado del producto.', createdAt: '2026-08-24T16:05:00+02:00', restorable: false },
  ],
  social: [
    { id: 'social-home-launch', contentEntryId: 'content-home-proof', channels: ['instagram', 'facebook', 'linkedin'], mode: 'scheduled', status: 'blocked', caption: 'Del aviso al cierre, todo el contexto del mantenimiento en el mismo sitio.', mediaIds: ['media-field-mobile'], scheduledFor: '2026-08-26T10:00:00+02:00' },
    { id: 'social-sectors-story', contentEntryId: 'content-sectors-operation', channels: ['instagram', 'linkedin'], mode: 'manual', status: 'ready', caption: 'Una plataforma, distintas formas de trabajar: autónomos, equipos, instalaciones y multisede.', mediaIds: ['media-sector-scenes'] },
    { id: 'social-resources-guide', contentEntryId: 'content-resources-library', channels: ['facebook', 'linkedin'], mode: 'manual', status: 'approved', caption: 'Antes de digitalizar mantenimiento, ordena el proceso. Ocho guías prácticas para empezar.', mediaIds: ['media-resources-journey'], approvedBy: 'Admin web', approvedAt: '2026-08-24T16:30:00+02:00' },
    { id: 'social-contact-preview', contentEntryId: 'content-contact-project', channels: ['linkedin'], mode: 'manual', status: 'draft', caption: 'Demo, piloto y decisión: un recorrido comercial sin obligarte a dejar datos antes de entender el producto.', mediaIds: ['media-contact-team'] },
  ],
};