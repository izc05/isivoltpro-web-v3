import { v4AdminAreas, v4AdminPolicy } from './v4-web-admin';

/**
 * Compatibility adapter for the detailed content workspace.
 * `v4-web-admin.ts` remains the single source of truth for V4 admin areas,
 * roles, capabilities and publication policy.
 */
export const V4_ADMIN_DOMAINS = v4AdminAreas.map((area) => ({
  key: area.id,
  label: area.label,
  summary: area.description,
  controls: area.controls,
  roles: area.roles,
  backendRequired: area.state === 'backend-required',
}));

export const V4_ADMIN_POLICY = v4AdminPolicy;
