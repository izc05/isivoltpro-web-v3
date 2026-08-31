#!/usr/bin/env bash
set -euo pipefail

EXPECTED_BRANCH="${EXPECTED_BRANCH:-feat/v3-smb-commercial-redesign}"
EXPECTED_SHA="${EXPECTED_SHA:-}"
STAGING_PORT="${STAGING_PORT:-4322}"
PUBLIC_SITE_URL="${PUBLIC_SITE_URL:-}"
PUBLIC_BASE_PATH="${PUBLIC_BASE_PATH:-/}"

fail() {
  printf '\n[staging] ERROR: %s\n' "$1" >&2
  exit 1
}

info() {
  printf '[staging] %s\n' "$1"
}

command -v git >/dev/null 2>&1 || fail "git no está instalado"
command -v node >/dev/null 2>&1 || fail "Node.js no está instalado"
command -v npm >/dev/null 2>&1 || fail "npm no está instalado"

repo_root="$(git rev-parse --show-toplevel 2>/dev/null)" || fail "Ejecuta este script dentro del repositorio de IsiVoltPro Web V3"
cd "$repo_root"

branch="$(git branch --show-current)"
[[ "$branch" == "$EXPECTED_BRANCH" ]] || fail "rama actual '$branch'; se esperaba '$EXPECTED_BRANCH'"

[[ -z "$(git status --porcelain)" ]] || fail "el working tree no está limpio; no desplegar staging con cambios locales"

head_sha="$(git rev-parse HEAD)"
info "Rama segura: $branch"
info "HEAD: $head_sha"

if [[ -n "$EXPECTED_SHA" && "$head_sha" != "$EXPECTED_SHA" ]]; then
  fail "HEAD distinto del esperado. Actual: $head_sha · esperado: $EXPECTED_SHA"
fi

node_major="$(node -p "Number(process.versions.node.split('.')[0])")"
(( node_major >= 22 )) || fail "se requiere Node 22 o superior; detectado $(node --version)"
info "Node: $(node --version)"
info "npm: $(npm --version)"

if [[ -z "$PUBLIC_SITE_URL" ]]; then
  info "PUBLIC_SITE_URL no definido: el build servirá para prueba local, pero no para validar URLs canónicas de un hostname público."
else
  export PUBLIC_SITE_URL
  info "PUBLIC_SITE_URL: $PUBLIC_SITE_URL"
fi

export PUBLIC_BASE_PATH
info "PUBLIC_BASE_PATH: $PUBLIC_BASE_PATH"
info "Puerto de preview reservado: $STAGING_PORT"

info "Instalando dependencias sin auditoría interactiva…"
npm install --no-audit --no-fund

info "Ejecutando check + build + safety gates…"
npm run check

cat <<EOF

[staging] PREPARACIÓN OK

Para levantar el preview SOLO en localhost:
  PUBLIC_SITE_URL="${PUBLIC_SITE_URL}" PUBLIC_BASE_PATH="${PUBLIC_BASE_PATH}" npm run preview -- --host 127.0.0.1 --port ${STAGING_PORT}

En otra terminal, ejecutar smoke test:
  STAGING_ORIGIN="http://127.0.0.1:${STAGING_PORT}" STAGING_BASE_PATH="${PUBLIC_BASE_PATH}" npm run smoke:staging

Para exponerlo mediante Cloudflare Tunnel, apunta un hostname DE STAGING a:
  http://127.0.0.1:${STAGING_PORT}

No reutilices el hostname de producción y no hagas merge a main para esta prueba.
EOF
