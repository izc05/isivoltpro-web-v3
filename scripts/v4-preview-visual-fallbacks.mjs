import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

// Varios recursos WebP heredados del laboratorio V4 quedaron dañados durante
// una escritura binaria anterior. Antes de cada build sustituimos únicamente
// esos contenedores por un WebP transparente válido. El navegador los cambia
// después por los SVG locales de respaldo mediante v4-contextual-visuals.js.
// Esto mantiene el build y la red limpios sin alterar la web pública estable.
const transparentWebp = Buffer.from(
  'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
  'base64',
);

const targets = [
  'public/media/v4/home-maintenance-tablet.webp',
  'public/media/v4/app-qr-mobile.webp',
  'public/media/v4/home-dashboard-premium.webp',
];

for (const target of targets) {
  const file = resolve(target);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, transparentWebp);
}

console.log(`V4 visual fallbacks: ${targets.length} contenedores WebP saneados antes del build.`);
