export type V4IntentEvent = 'intent_demo' | 'intent_plans' | 'intent_apps' | 'intent_contact' | 'intent_blog';
export type V4IntentPlacement = 'header' | 'footer' | 'main' | 'unknown';

export type V4IntentPayload = {
  event: V4IntentEvent;
  path: string;
  targetPath: string;
  placement: V4IntentPlacement;
};

export const v4AnalyticsContract = {
  mode: 'local_contract_only',
  transportEnabled: false,
  cookies: false,
  localStorage: false,
  sessionStorage: false,
  capturesFormValues: false,
  capturesQueryString: false,
  capturesReferrer: false,
  allowedFields: ['event', 'path', 'targetPath', 'placement'] as const,
  forbiddenFields: ['email', 'name', 'phone', 'message', 'query', 'referrer', 'userId', 'ip'] as const,
  events: ['intent_demo', 'intent_plans', 'intent_apps', 'intent_contact', 'intent_blog'] as const,
  futureTransportRequiresPrivacyReview: true,
} as const;
