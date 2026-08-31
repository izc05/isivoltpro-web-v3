#!/usr/bin/env bash
set -euo pipefail

STAGING_HOST="${STAGING_HOST:-127.0.0.1}"
STAGING_PORT="${STAGING_PORT:-4322}"
STAGING_BASE_PATH="${STAGING_BASE_PATH:-${PUBLIC_BASE_PATH:-/}}"
STATE_DIR="${STAGING_STATE_DIR:-.staging-runtime}"
PID_FILE="$STATE_DIR/preview.pid"
LOG_FILE="$STATE_DIR/preview.log"
ORIGIN="http://${STAGING_HOST}:${STAGING_PORT}"
ASTRO_BIN="./node_modules/.bin/astro"

fail(){ printf '\n[staging] ERROR: %s\n' "$1" >&2; exit 1; }
info(){ printf '[staging] %s\n' "$1"; }

repo_root="$(git rev-parse --show-toplevel 2>/dev/null)" || fail "ejecuta este script dentro del repositorio"
cd "$repo_root"

[[ -d dist ]] || fail "no existe dist/. Ejecuta primero: npm run staging:prepare"
[[ -x "$ASTRO_BIN" ]] || fail "no existe el binario local de Astro. Ejecuta primero: npm run staging:prepare"
mkdir -p "$STATE_DIR"

if [[ -f "$PID_FILE" ]]; then
  old_pid="$(cat "$PID_FILE" 2>/dev/null || true)"
  if [[ -n "$old_pid" ]] && kill -0 "$old_pid" 2>/dev/null; then
    fail "ya hay un preview de staging activo con PID $old_pid"
  fi
  rm -f "$PID_FILE"
fi

if command -v ss >/dev/null 2>&1 && ss -ltn "sport = :$STAGING_PORT" 2>/dev/null | grep -q LISTEN; then
  fail "el puerto $STAGING_PORT ya está ocupado"
fi

info "Arrancando preview en $ORIGIN"
: > "$LOG_FILE"
nohup env \
  PUBLIC_SITE_URL="${PUBLIC_SITE_URL:-$ORIGIN}" \
  PUBLIC_BASE_PATH="${PUBLIC_BASE_PATH:-$STAGING_BASE_PATH}" \
  "$ASTRO_BIN" preview --host "$STAGING_HOST" --port "$STAGING_PORT" >>"$LOG_FILE" 2>&1 &
pid=$!
echo "$pid" > "$PID_FILE"

cleanup_on_error(){
  kill "$pid" 2>/dev/null || true
  rm -f "$PID_FILE"
  printf '[staging] Preview detenido por fallo de arranque. Log: %s\n' "$LOG_FILE" >&2
}
trap cleanup_on_error ERR

ready=0
for _ in $(seq 1 30); do
  if ! kill -0 "$pid" 2>/dev/null; then
    tail -n 40 "$LOG_FILE" >&2 || true
    fail "el proceso de preview terminó durante el arranque"
  fi
  if node -e "fetch('${ORIGIN}${STAGING_BASE_PATH}').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"; then
    ready=1
    break
  fi
  sleep 1
done

[[ "$ready" == "1" ]] || fail "el preview no respondió tras 30 segundos"

info "Preview listo. Ejecutando smoke test…"
STAGING_ORIGIN="$ORIGIN" STAGING_BASE_PATH="$STAGING_BASE_PATH" npm run smoke:staging

trap - ERR
cat <<EOF

[staging] STAGING LOCAL ACTIVO
Origen local: $ORIGIN
PID: $pid
Log: $LOG_FILE

Para detenerlo:
  npm run staging:stop

Cloudflare Tunnel debe apuntar únicamente el hostname DE STAGING a:
  $ORIGIN
EOF
