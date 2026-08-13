import { defineConfig } from 'astro/config';

const site = process.env.PUBLIC_SITE_URL || 'https://izc05.github.io';
const basePath = process.env.PUBLIC_BASE_PATH || '/isivoltpro-web-v3';
const base = basePath.endsWith('/') ? basePath : `${basePath}/`;

export default defineConfig({
  site,
  base,
  output: 'static',
});
