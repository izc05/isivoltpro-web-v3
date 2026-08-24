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
    {
      id: 'media-home-dashboard',
      title: 'Dashboard IsiVoltPro',
      alt: 'Vista conceptual del panel de IsiVoltPro con órdenes, preventivos e incidencias.',
      kind: 'illustration',
      source: 'generated',
      file: '/media/home-dashboard.svg',
      tags: ['home', 'producto'],
      published: true,
    },
    {
      id: 'media-field-mobile',
      title: 'Trabajo técnico desde móvil',
      alt: 'Técnico consultando un activo y su orden de trabajo desde el móvil.',
      kind: 'illustration',
      source: 'generated',
      file: '/media/tecnico-movil.svg',
      tags: ['home', 'sectores', 'app'],
      published: false,
    },
    {
      id: 'media-sector-operation',
      title: 'Escenarios de operación',
      alt: 'Cuatro escenarios conceptuales: autónomo, pequeño equipo, instalaciones propias y operación multisede.',
      kind: 'illustration',
      source: 'generated',
      file: '/media/sectores-operacion.svg',
      tags: ['sectores', 'autonomos', 'equipos', 'multisede'],
      published: true,
    },
  ],
  entries: [
    {
      id: 'content-home-hero',
      route: '/',
      section: 'Hero',
      title: 'Menos papeleo. Más trabajo bajo control.',
      summary: 'Mensaje principal, CTA y visual de producto.',
      mediaIds: ['media-home-dashboard'],
      status: 'published',
      updatedAt: '2026-08-24',
    },
    {
      id: 'content-home-proof',
      route: '/',
      section: 'Trabajo real',
      title: 'Mantenimiento desde el móvil',
      summary: 'Bloque visual para autónomos y pequeños equipos.',
      mediaIds: ['media-field-mobile'],
      status: 'review',
      updatedAt: '2026-08-24',
    },
    {
      id: 'content-sectors-operation',
      route: '/sectores/',
      section: 'Escenarios de operación',
      title: 'Una plataforma, cuatro formas de trabajar',
      summary: 'Composición visual propia para autónomos, pequeños equipos, instalaciones propias y multisede.',
      mediaIds: ['media-sector-operation'],
      status: 'published',
      updatedAt: '2026-08-24',
    },
  ],
  revisions: [
    {
      id: 'revision-home-hero-v3',
      contentEntryId: 'content-home-hero',
      version: 3,
      actor: 'Admin web',
      action: 'published',
      summary: 'Se aprobó el mensaje principal y el visual del dashboard.',
      createdAt: '2026-08-24T00:12:00+02:00',
      restorable: true,
    },
    {
      id: 'revision-home-proof-v2',
      contentEntryId: 'content-home-proof',
      version: 2,
      actor: 'Editor de contenido',
      action: 'media_changed',
      summary: 'Se propuso una ilustración propia de trabajo técnico desde móvil.',
      createdAt: '2026-08-24T00:18:00+02:00',
      restorable: true,
    },
    {
      id: 'revision-home-proof-v1',
      contentEntryId: 'content-home-proof',
      version: 1,
      actor: 'Editor de contenido',
      action: 'created',
      summary: 'Se creó el bloque visual de prueba social para Home.',
      createdAt: '2026-08-24T00:08:00+02:00',
      restorable: false,
    },
    {
      id: 'revision-sectors-operation-v1',
      contentEntryId: 'content-sectors-operation',
      version: 1,
      actor: 'Admin web',
      action: 'published',
      summary: 'Se publicó la composición visual propia de escenarios de operación.',
      createdAt: '2026-08-24T08:48:00+02:00',
      restorable: false,
    },
  ],
  social: [
    {
      id: 'social-home-launch',
      contentEntryId: 'content-home-proof',
      channels: ['instagram', 'facebook', 'linkedin'],
      mode: 'scheduled',
      status: 'blocked',
      caption: 'Del aviso al cierre, todo el contexto del mantenimiento en el mismo sitio.',
      mediaIds: ['media-field-mobile'],
      scheduledFor: '2026-08-26T10:00:00+02:00',
    },
  ],
};