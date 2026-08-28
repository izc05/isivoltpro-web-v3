export const CONTENT_STATUSES = ['draft', 'review', 'published', 'archived'] as const;
export type ContentStatus = (typeof CONTENT_STATUSES)[number];

export const SOCIAL_CHANNELS = ['instagram', 'facebook', 'linkedin'] as const;
export type SocialChannel = (typeof SOCIAL_CHANNELS)[number];
export type ContentRole = 'owner' | 'admin' | 'content_editor';

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

export interface MediaUploadCandidate {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  alt: string;
  source: MediaAsset['source'];
  sourceNote?: string;
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

export const V3_CONTENT_POLICY = {
  imageMaxBytes: 8 * 1024 * 1024,
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'] as const,
  publishingRoles: ['owner', 'admin'] as const,
  socialApprovalRoles: ['owner', 'admin'] as const,
  editingRoles: ['owner', 'admin', 'content_editor'] as const,
  altRequired: true,
  revisionRequiredOnPublish: true,
  revisionRequiredOnMediaChange: true,
  socialApprovalRequired: true,
} as const;

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

const CONTENT_TRANSITIONS: Record<ContentStatus, readonly ContentStatus[]> = {
  draft: ['review', 'archived'],
  review: ['draft', 'published', 'archived'],
  published: ['draft', 'archived'],
  archived: ['draft'],
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

export function canEditContent(role: ContentRole) {
  return (V3_CONTENT_POLICY.editingRoles as readonly ContentRole[]).includes(role);
}

export function canTransitionContent(from: ContentStatus, to: ContentStatus, role: ContentRole) {
  if (!canEditContent(role) || !CONTENT_TRANSITIONS[from].includes(to)) return false;
  if (to === 'published') return (V3_CONTENT_POLICY.publishingRoles as readonly ContentRole[]).includes(role);
  return true;
}

export function canPublishContent(status: ContentStatus, role: ContentRole = 'admin') {
  return status === 'review' && (V3_CONTENT_POLICY.publishingRoles as readonly ContentRole[]).includes(role);
}

export function canApproveSocial(role: ContentRole) {
  return (V3_CONTENT_POLICY.socialApprovalRoles as readonly ContentRole[]).includes(role);
}

export function canScheduleSocial(publication: SocialPublication) {
  return publication.status === 'approved'
    && Boolean(publication.scheduledFor)
    && Boolean(publication.approvedBy)
    && Boolean(publication.approvedAt);
}

export function validateMediaUpload(candidate: MediaUploadCandidate) {
  const errors: string[] = [];
  const allowedTypes = V3_CONTENT_POLICY.allowedImageTypes as readonly string[];

  if (!candidate.fileName.trim()) errors.push('file_name_required');
  if (!allowedTypes.includes(candidate.mimeType)) errors.push('unsupported_mime_type');
  if (candidate.sizeBytes <= 0) errors.push('empty_file');
  if (candidate.sizeBytes > V3_CONTENT_POLICY.imageMaxBytes) errors.push('file_too_large');
  if (V3_CONTENT_POLICY.altRequired && !candidate.alt.trim()) errors.push('alt_required');
  if (candidate.source === 'licensed' && !candidate.sourceNote?.trim()) errors.push('license_source_required');

  return { valid: errors.length === 0, errors } as const;
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
