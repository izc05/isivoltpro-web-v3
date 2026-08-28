#!/usr/bin/env bash
set -euo pipefail

STATE_DIR="${STAGING_STATE_DIR:-.staging-runtime}"
PID_FILE="$STATE_DIR/preview.pid"

if [[ ! -f "$PID_FILE" ]]; then
  printf '[staging] No hay PID de staging registrado. Nada que detener.\n'
  exit 0
fi

pid="$(cat "$PID_FILE" 2>/dev/null || true)"
if [[ -z "$pid" ]]; then
  rm -f "$PID_FILE"
  printf '[staging] PID vacío eliminado.\n'
  exit 0
fi

if ! kill -0 "$pid" 2>/dev/null; then
  rm -f "$PID_FILE"
  printf '[staging] El proceso %s ya no estaba activo. PID limpiado.\n' "$pid"
  exit 0
fi

printf '[staging] Deteniendo preview PID %s…\n' "$pid"
kill "$pid"

for _ in $(seq 1 10); do
  if ! kill -0 "$pid" 2>/dev/null; then
    rm -f "$PID_FILE"
    printf '[staging] Preview detenido correctamente.\n'
    exit 0
  fi
  sleep 1
done

printf '[staging] El proceso no terminó en 10 s; enviando SIGKILL.\n' >&2
kill -9 "$pid" 2>/dev/null || true
rm -f "$PID_FILE"
printf '[staging] Preview detenido.\n'
