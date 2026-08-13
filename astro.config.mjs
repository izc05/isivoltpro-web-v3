import { defineConfig } from 'astro/config';

const site = process.env.PUBLIC_SITE_URL || 'https://izc05.github.io';
const base = process.env.PUBLIC_BASE_PATH || '/isivoltpro-web-v3';

export default defineConfig({
  site,
  base,
  output: 'static',
});
