# IsiVoltPro Web V3 — Staging seguro

Este procedimiento valida `feat/v3-smb-commercial-redesign` en el Mini PC sin tocar `main`, sin sustituir la web actualmente publicada y sin intervenir en `/acceso/`.

## Objetivo

Levantar una copia temporal de la Web V3 comercial con:

- build limpio desde la rama;
- `PUBLIC_SITE_URL` y `PUBLIC_BASE_PATH` propios de staging;
- puerto local independiente;
- acceso opcional mediante un hostname de Cloudflare Tunnel dedicado a staging;
- smoke test HTTP sobre las rutas comerciales críticas.

## 1. Preparar un directorio separado

No reutilizar el directorio de producción ni otro checkout activo.

```bash
mkdir -p ~/staging
cd ~/staging
git clone https://github.com/izc05/isivoltpro-web-v3.git isivoltpro-web-v3-staging
cd isivoltpro-web-v3-staging
git fetch origin
git checkout feat/v3-smb-commercial-redesign
```

Si el repositorio ya existe en el Mini PC, se puede usar un `git worktree` separado en lugar de clonar de nuevo.

## 2. Confirmar el commit exacto

```bash
git status --short --branch
git rev-parse HEAD
```

El working tree debe estar limpio. El SHA debe coincidir con el head del PR #1 que se quiere revisar.

## 3. Instalar dependencias

Requiere Node 22 o superior.

```bash
node --version
npm --version
npm install --no-audit --no-fund
```

## 4. Configurar staging

No guardar dominios reales ni secretos dentro del repositorio.

Para un hostname de staging en la raíz:

```bash
export PUBLIC_SITE_URL="https://HOSTNAME-DE-STAGING"
export PUBLIC_BASE_PATH="/"
```

Si staging vive bajo una subruta, ajustar `PUBLIC_BASE_PATH` a esa subruta.

## 5. Validar y construir

```bash
npm run check
```

Debe terminar con `astro check` y `astro build` correctos. No continuar si falla.

## 6. Levantar el preview en un puerto independiente

Ejemplo usando 4322 para no interferir con otro servicio:

```bash
npm run preview -- --host 127.0.0.1 --port 4322
```

El proceso de preview es solo para staging/QA. Producción deberá servirse con la infraestructura definitiva.

## 7. Ejecutar smoke test

En otra terminal del Mini PC:

```bash
cd ~/staging/isivoltpro-web-v3-staging
STAGING_ORIGIN="http://127.0.0.1:4322" STAGING_BASE_PATH="/" npm run smoke:staging
```

Resultado esperado:

```text
Smoke test V3: OK (10 rutas + sitemap)
```

La prueba comprueba, entre otras cosas:

- Home;
- Producto;
- Módulos;
- Órdenes de trabajo;
- Mantenimiento preventivo;
- Autónomos;
- Planes;
- Recursos;
- FAQ;
- Contacto;
- sitemap;
- presencia de CSP;
- ausencia de Three.js en las páginas comerciales;
- ausencia de copy interno de desarrollo.

## 8. Cloudflare Tunnel de staging

Si se quiere revisar desde móvil/tablet fuera de la red local, crear o reutilizar únicamente un hostname de staging que apunte al puerto local de preview, por ejemplo al servicio:

```text
http://127.0.0.1:4322
```

No cambiar el hostname de producción durante esta revisión.

## 9. Matriz visual obligatoria

Revisar al menos:

### Escritorio

- 1440 px;
- 1280 px;
- navegación, hero, dashboard, cards y footer;
- hover/focus;
- intro primera visita y segunda visita.

### Tablet

- alrededor de 768–1024 px;
- transición a navegación móvil;
- grids de cards;
- dashboard sin overflow.

### Móvil

- 360 px;
- 390 px;
- 430 px;
- menú móvil;
- botones a ancho completo cuando corresponde;
- textos sin cortes;
- cards flotantes sin overflow horizontal;
- formulario de Contacto claramente deshabilitado;
- scroll completo después de la intro.

### Accesibilidad / movimiento

- navegación solo con teclado;
- foco visible;
- `aria-current` correcto;
- `prefers-reduced-motion`;
- contenido usable sin JavaScript;
- contraste de textos secundarios.

## 10. Qué NO validar todavía como terminado

Mientras falten decisiones externas, staging no debe convertirlas en contenido ficticio:

- envío real del formulario de demo;
- datos jurídicos definitivos;
- precios finales;
- testimonios/clientes/métricas;
- destino definitivo de `Acceder` si la plataforma aún no está preparada.

## 11. Salida del staging

Registrar cada hallazgo como uno de estos tipos:

- `VISUAL`;
- `RESPONSIVE`;
- `A11Y`;
- `COPY`;
- `PERFORMANCE`;
- `SEO`;
- `BLOCKER-PRODUCTION`.

Corregir en `feat/v3-smb-commercial-redesign`, volver a ejecutar CI y repetir el smoke test.

Solo cuando la matriz visual y el smoke test estén aprobados se debe valorar preparar el merge a `main`.
