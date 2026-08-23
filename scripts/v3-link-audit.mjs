import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, resolve, sep } from 'node:path';

const DIST = resolve(process.argv[2] || 'dist');
const PUBLIC_BASE = (process.env.PUBLIC_BASE_PATH || '/isivoltpro-web-v3').replace(/\/$/, '');
const failures = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

function cleanHref(raw) {
  const href = raw.trim();
  if (!href || href.startsWith('#') || /^(?:https?:|mailto:|tel:|javascript:|data:)/i.test(href)) return null;
  return href.split('#', 1)[0].split('?', 1)[0];
}

function routeToCandidates(sourceFile, href) {
  let route = href;
  if (route.startsWith(PUBLIC_BASE + '/')) route = route.slice(PUBLIC_BASE.length);
  else if (route === PUBLIC_BASE) route = '/';

  // /acceso/ pertenece al flujo de plataforma y se valida de forma independiente.
  if (route === '/acceso' || route === '/acceso/') return [];

  let diskPath;
  if (route.startsWith('/')) {
    diskPath = join(DIST, route.slice(1));
  } else {
    diskPath = resolve(sourceFile, '..', route);
  }

  return [
    diskPath,
    `${diskPath}.html`,
    join(diskPath, 'index.html'),
  ];
}

async function exists(path) {
  try {
    const info = await stat(path);
    return info.isFile();
  } catch {
    return false;
  }
}

const htmlFiles = (await walk(DIST)).filter((file) => file.endsWith('.html'));

for (const file of htmlFiles) {
  // Los laboratorios históricos no forman parte de la navegación comercial V3.
  const rel = relative(DIST, file).split(sep).join('/');
  if (rel.startsWith('lab-3d-') || rel.startsWith('mantenimiento/')) continue;

  const html = await readFile(file, 'utf8');
  const hrefs = [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)].map((match) => match[1]);

  for (const rawHref of hrefs) {
    const href = cleanHref(rawHref);
    if (!href) continue;
    const candidates = routeToCandidates(file, href);
    if (!candidates.length) continue;
    if (!(await Promise.any(candidates.map(async (candidate) => {
      if (await exists(candidate)) return true;
      throw new Error('missing');
    })).catch(() => false))) {
      failures.push(`${rel} -> ${rawHref}`);
    }
  }
}

if (failures.length) {
  console.error('Auditoría de enlaces V3: FALLÓ');
  for (const item of [...new Set(failures)].sort()) console.error(`- ${item}`);
  process.exit(1);
}

console.log(`Auditoría de enlaces V3: OK · ${htmlFiles.length} HTML revisados`);
