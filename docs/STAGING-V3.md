# IsiVoltPro Web V3 — Staging seguro

Este procedimiento valida `feat/v3-smb-commercial-redesign` en el Mini PC sin tocar `main`, sin sustituir la web publicada y sin intervenir en `/acceso/`.

## Objetivo

Levantar una copia temporal de la Web V3 comercial con:

- checkout separado;
- commit exacto del PR #1;
- build limpio y safety gates;
- puerto local independiente;
- proceso de preview con PID/log propios;
- hostname de Cloudflare Tunnel dedicado exclusivamente a staging;
- smoke test HTTP sobre rutas comerciales críticas.

## Ruta recomendada: tres comandos

En un checkout limpio de la rama segura:

```bash
cd ~/staging/isivoltpro-web-v3-staging
EXPECTED_SHA="SHA-DEL-HEAD-VALIDADO" \
PUBLIC_SITE_URL="https://HOSTNAME-DE-STAGING" \
PUBLIC_BASE_PATH="/" \
STAGING_PORT="4322" \
npm run staging:prepare

STAGING_PORT="4322" STAGING_BASE_PATH="/" npm run staging:start

# Cuando termine la revisión:
npm run staging:stop
```

`staging:prepare` se niega a continuar si la rama es incorrecta, existen cambios locales, el SHA no coincide, Node es anterior a 22 o falla cualquier gate de build/seguridad.

`staging:start`:

- exige un `dist/` ya construido;
- escucha solo en `127.0.0.1` por defecto;
- rechaza un puerto ocupado;
- guarda PID y log en `.staging-runtime/`;
- espera a que el servidor responda;
- ejecuta automáticamente `smoke:staging`;
- se detiene y limpia el PID si el arranque o el smoke test fallan.

`staging:stop` termina únicamente el proceso cuyo PID fue creado por este staging y limpia su estado local.

Los archivos de runtime están ignorados por Git y ningún script contiene tokens, credenciales ni hostnames de producción.

## 1. Preparar un directorio separado

No reutilizar producción ni otro checkout activo.

```bash
mkdir -p ~/staging
cd ~/staging
git clone https://github.com/izc05/isivoltpro-web-v3.git isivoltpro-web-v3-staging
cd isivoltpro-web-v3-staging
git fetch origin
git checkout feat/v3-smb-commercial-redesign
git pull --ff-only origin feat/v3-smb-commercial-redesign
```

Si el repositorio ya existe en el Mini PC, se puede usar un `git worktree` separado.

## 2. Confirmar el commit exacto

```bash
git status --short --branch
git rev-parse HEAD
```

El working tree debe estar limpio. El SHA debe coincidir exactamente con el HEAD del PR #1 que se quiere revisar.

## 3. Preparar y construir

Requiere Node 22 o superior.

```bash
export PUBLIC_SITE_URL="https://HOSTNAME-DE-STAGING"
export PUBLIC_BASE_PATH="/"
export EXPECTED_SHA="SHA-DEL-HEAD-VALIDADO"
export STAGING_PORT="4322"
npm run staging:prepare
```

El script ejecuta `npm install --no-audit --no-fund` y `npm run check`.

## 4. Levantar el preview y validar automáticamente

```bash
STAGING_PORT="4322" \
STAGING_BASE_PATH="/" \
npm run staging:start
```

Resultado esperado tras el arranque:

```text
Smoke test V3: OK (10 rutas + sitemap)
[staging] STAGING LOCAL ACTIVO
```

El preview escucha únicamente en `127.0.0.1` para que el acceso exterior pase por Cloudflare Tunnel.

Para revisar el log:

```bash
tail -f .staging-runtime/preview.log
```

Para detenerlo:

```bash
npm run staging:stop
```

## 5. Smoke test manual opcional

Si se quiere repetir manualmente el smoke test local:

```bash
STAGING_ORIGIN="http://127.0.0.1:4322" \
STAGING_BASE_PATH="/" \
npm run smoke:staging
```

Comprueba Home, Producto, Módulos, landings críticas, Planes, Recursos, FAQ, Contacto, sitemap, CSP, ausencia de Three.js en rutas comerciales y ausencia de copy interno.

## 6. Cloudflare Tunnel de staging

Crear o reutilizar únicamente un hostname dedicado a staging que apunte a:

```text
http://127.0.0.1:4322
```

Reglas:

- no modificar el hostname de producción;
- no exponer directamente el puerto 4322 a Internet;
- no introducir secretos en este repositorio;
- mantener `/gestion-contenido/` bloqueado por defecto;
- no activar formulario, telemetría ni publicación social real.

Una vez conectado el hostname, repetir el smoke test por HTTPS:

```bash
STAGING_ORIGIN="https://HOSTNAME-DE-STAGING" \
STAGING_BASE_PATH="/" \
npm run smoke:staging
```

## 7. Matriz visual obligatoria

### Escritorio

- 1440 y 1280 px;
- navegación, hero, dashboards, cards y footer;
- hover/focus;
- intro primera visita y segunda visita.

### Tablet

- 768–1024 px;
- transición a navegación móvil;
- grids de cards;
- dashboards sin overflow.

### Móvil

- 360, 390 y 430 px;
- menú y footer móvil;
- botones y textos sin cortes;
- tarjetas flotantes sin overflow horizontal;
- Contacto claramente deshabilitado;
- recorrido completo después de la intro.

### Accesibilidad / movimiento

- navegación con teclado;
- foco visible;
- `aria-current` correcto;
- `prefers-reduced-motion`;
- contenido usable sin JavaScript;
- contraste de textos secundarios.

## 8. Qué NO validar todavía como terminado

Mientras falten decisiones externas, staging no debe convertirlas en contenido ficticio:

- envío real del formulario de demo;
- datos jurídicos definitivos;
- precios finales;
- testimonios/clientes/métricas reales;
- destino definitivo de `Acceder` si la plataforma aún no está preparada.

## 9. Salida del staging

Registrar cada hallazgo como:

- `VISUAL`;
- `RESPONSIVE`;
- `A11Y`;
- `COPY`;
- `PERFORMANCE`;
- `SEO`;
- `BLOCKER-PRODUCTION`.

Corregir únicamente hallazgos reales en `feat/v3-smb-commercial-redesign`, volver a ejecutar CI y repetir smoke test.

Solo cuando la revisión humana de staging y los smoke tests estén aprobados se debe valorar preparar el merge a `main`.
