export const CONTENT_STATUSES = ['draft', 'review', 'published', 'archived'] as const;
export type ContentStatus = (typeof CONTENT_STATUSES)[number];

export const SOCIAL_CHANNELS = ['instagram', 'facebook', 'linkedin'] as const;
export type SocialChannel = (typeof SOCIAL_CHANNELS)[number];

export type ContentKind = 'page' | 'article' | 'resource' | 'social';
export type MediaKind = 'image' | 'illustration' | 'document' | 'video';

export interface ContentRevision {
  id: string;
  contentId: string;
  revision: number;
  title: string;
  body: string;
  status: ContentStatus;
  createdAt: string;
  createdBy: string;
  note?: string;
}

export interface ManagedContent {
  id: string;
  kind: ContentKind;
  slug: string;
  title: string;
  summary?: string;
  body: string;
  status: ContentStatus;
  mediaIds: string[];
  currentRevision: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface MediaAsset {
  id: string;
  kind: MediaKind;
  fileName: string;
  mimeType: string;
  alt: string;
  tags: string[];
  source: 'owned' | 'licensed' | 'generated';
  sourceNote?: string;
  usagePaths: string[];
  createdAt: string;
  createdBy: string;
}

export interface SocialPublication {
  id: string;
  contentId: string;
  channel: SocialChannel;
  status: 'draft' | 'awaiting_approval' | 'approved' | 'scheduled' | 'published' | 'failed';
  scheduledFor?: string;
  approvedAt?: string;
  approvedBy?: string;
  remoteId?: string;
  error?: string;
}

export interface ContentManagementCapabilities {
  persistence: boolean;
  authentication: boolean;
  authorization: boolean;
  mediaUpload: boolean;
  scheduling: boolean;
  socialPublishing: boolean;
}

export const V3_CONTENT_CAPABILITIES: ContentManagementCapabilities = {
  persistence: false,
  authentication: false,
  authorization: false,
  mediaUpload: false,
  scheduling: false,
  socialPublishing: false,
};

export type ContentCapabilityKey = keyof ContentManagementCapabilities;

export type ContentCapabilitySnapshot = {
  key: ContentCapabilityKey;
  label: string;
  enabled: boolean;
  boundary: string;
};

const CONTENT_CAPABILITY_METADATA: Record<ContentCapabilityKey, { label: string; boundary: string }> = {
  persistence: {
    label: 'Persistencia de contenido',
    boundary: 'Requiere almacenamiento backend autenticado y auditoría de cambios.',
  },
  authentication: {
    label: 'Autenticación administrativa',
    boundary: 'Debe resolverse fuera de la web pública y permanecer separada de /acceso/.',
  },
  authorization: {
    label: 'Permisos por rol',
    boundary: 'Owner, admin y editor deberán validarse en backend antes de cualquier escritura.',
  },
  mediaUpload: {
    label: 'Subida de archivos',
    boundary: 'Los binarios se validarán y almacenarán en backend; el navegador no recibe credenciales privilegiadas.',
  },
  scheduling: {
    label: 'Programación editorial',
    boundary: 'Las tareas programadas requieren worker/backend y zona horaria explícita.',
  },
  socialPublishing: {
    label: 'Publicación en redes',
    boundary: 'Las credenciales de Instagram, Facebook y LinkedIn viven solo en backend y exigen aprobación previa.',
  },
};

export function getContentCapabilitySnapshot(
  capabilities: ContentManagementCapabilities = V3_CONTENT_CAPABILITIES,
): ContentCapabilitySnapshot[] {
  return (Object.keys(CONTENT_CAPABILITY_METADATA) as ContentCapabilityKey[]).map((key) => ({
    key,
    label: CONTENT_CAPABILITY_METADATA[key].label,
    enabled: capabilities[key],
    boundary: CONTENT_CAPABILITY_METADATA[key].boundary,
  }));
}

export function canPublishContent(status: ContentStatus) {
  return status === 'review';
}

export function canScheduleSocial(publication: SocialPublication) {
  return publication.status === 'approved' && Boolean(publication.scheduledFor);
}

export function assertNoRuntimePublishing(capabilities = V3_CONTENT_CAPABILITIES) {
  if (capabilities.persistence || capabilities.scheduling || capabilities.socialPublishing) {
    throw new Error('V3 public web must not persist, schedule or publish content without the authenticated backend.');
  }
}

export function assertSafeContentPreview(capabilities = V3_CONTENT_CAPABILITIES) {
  const unsafe = getContentCapabilitySnapshot(capabilities).filter((item) => item.enabled);
  if (unsafe.length) {
    throw new Error(`V3 content preview must remain read-only until backend activation: ${unsafe.map((item) => item.key).join(', ')}`);
  }
  return true;
}
