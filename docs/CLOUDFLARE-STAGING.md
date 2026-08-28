# IsiVoltPro Web V3 — Cloudflare staging

Canonical production domain: `https://isivoltpro.com`

Safe staging hostname: `https://staging.isivoltpro.com`

## Goal

Expose the current V3 feature branch through the mini PC without merging to `main` and without using the production hostname until QA is complete.

## Branch

Use only:

`feat/v3-smb-commercial-redesign`

Do not deploy `main` for this staging pass.

## Build environment

Copy `.env.staging.example` to the local environment used for staging, or export:

```bash
export PUBLIC_SITE_URL="https://staging.isivoltpro.com"
export PUBLIC_BASE_PATH="/"
export PUBLIC_TELEMETRY_ENABLED="false"
export PUBLIC_V3_CONTENT_ADMIN_PREVIEW="false"
```

Then prepare the verified build:

```bash
npm run staging:prepare
```

The existing staging script validates the expected branch, clean working tree, Node version, build and commercial safety gates.

## Run staging locally

```bash
PUBLIC_SITE_URL="https://staging.isivoltpro.com" PUBLIC_BASE_PATH="/" npm run preview -- --host 127.0.0.1 --port 4322
```

Smoke test:

```bash
STAGING_ORIGIN="http://127.0.0.1:4322" STAGING_BASE_PATH="/" npm run smoke:staging
```

## Cloudflare Tunnel

Create or reuse a Cloudflare Tunnel on the mini PC and publish only the staging hostname:

`staging.isivoltpro.com` → `http://127.0.0.1:4322`

Keep `isivoltpro.com` unchanged until staging passes visual, responsive, commercial, legal/privacy and accessibility review.

## Production promotion

Only after staging approval:

1. Freeze the validated V3 commit SHA.
2. Run the full CI/QA suite on that SHA.
3. Configure production with `PUBLIC_SITE_URL=https://isivoltpro.com` and `PUBLIC_BASE_PATH=/`.
4. Point the production hostname to the approved service.
5. Keep secrets, social tokens, analytics keys and administrative credentials outside the repository and frontend.

## Content/social roadmap

The production architecture should keep the public Astro site separate from privileged publishing capabilities. Blog/content administration, social scheduling and publishing must be backed by authenticated server-side services before enabling real writes to Instagram, Facebook or LinkedIn.
