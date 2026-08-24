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
