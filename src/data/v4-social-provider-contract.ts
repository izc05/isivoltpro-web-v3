export type V4SocialChannel = 'linkedin' | 'instagram' | 'facebook';
export type V4SocialProvider = 'linkedin' | 'meta';
export type V4ProviderConnectionState = 'disconnected' | 'configured' | 'ready';
export type V4ProviderDeliveryState = 'queued' | 'sending' | 'scheduled' | 'published' | 'failed';

export type V4SocialProviderDefinition = {
  provider: V4SocialProvider;
  channels: V4SocialChannel[];
  connectionState: V4ProviderConnectionState;
  credentialLocation: 'backend_secret_store';
  secretNames: string[];
  approvalRequired: true;
  idempotencyRequired: true;
  providerConfirmationRequired: true;
};

export type V4SocialPublicationReceipt = {
  queueId: string;
  channel: V4SocialChannel;
  provider: V4SocialProvider;
  state: V4ProviderDeliveryState;
  providerPublicationId?: string;
  requestedAt: string;
  confirmedAt?: string;
  publishedUrl?: string;
  errorCode?: string;
};

export const v4SocialProviders: V4SocialProviderDefinition[] = [
  {
    provider: 'linkedin',
    channels: ['linkedin'],
    connectionState: 'disconnected',
    credentialLocation: 'backend_secret_store',
    secretNames: ['LINKEDIN_ACCESS_TOKEN', 'LINKEDIN_AUTHOR_URN'],
    approvalRequired: true,
    idempotencyRequired: true,
    providerConfirmationRequired: true,
  },
  {
    provider: 'meta',
    channels: ['instagram', 'facebook'],
    connectionState: 'disconnected',
    credentialLocation: 'backend_secret_store',
    secretNames: ['META_ACCESS_TOKEN', 'META_FACEBOOK_PAGE_ID', 'META_INSTAGRAM_ACCOUNT_ID'],
    approvalRequired: true,
    idempotencyRequired: true,
    providerConfirmationRequired: true,
  },
];

export const v4SocialPublicationRules = {
  credentialsInFrontend: false,
  credentialsInRepository: false,
  automaticApproval: false,
  scheduledMeansPublished: false,
  providerReceiptRequiredForPublished: true,
  failedRequestMayBecomePublished: false,
} as const;
