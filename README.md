# IsiVoltPro Web V3

Web pública y comercial de IsiVoltPro.

IsiVoltPro se posiciona como una plataforma práctica para autónomos, pequeños equipos y empresas de mantenimiento que necesitan controlar clientes, instalaciones, activos, avisos, órdenes de trabajo, mantenimiento preventivo, QR/NFC, documentación e histórico técnico sin implantar un ERP complejo.

## Rama activa

`feat/v3-smb-commercial-redesign`

Base protegida:

`main` en `719017c8feba705f17963e3243ce0ba145c6e987`

PR #1 permanece en borrador. No hacer merge a `main` hasta revisión visual completa y staging real.

## Mensaje principal

> Menos papeleo. Más trabajo bajo control.

La web vende utilidad cotidiana antes que complejidad técnica.

## Estado real

### Web comercial V3

- Home para autónomos y pequeñas empresas — IMPLEMENTADA EN RAMA
- Entrada inmersiva previa a Home — IMPLEMENTADA
- Producto — IMPLEMENTADO
- Índice + landings de módulos — IMPLEMENTADOS
- Índice + landings de perfiles/sectores — IMPLEMENTADOS
- Planes — IMPLEMENTADOS SIN PRECIOS FICTICIOS
- Recursos — IMPLEMENTADO CON 4 GUÍAS PUBLICADAS
- FAQ — IMPLEMENTADA CON DATOS ESTRUCTURADOS
- Empresa — IMPLEMENTADA
- Ecosistema — IMPLEMENTADO
- Contacto / solicitud de demo — DISEÑADO, ENVÍO BLOQUEADO HASTA BACKEND + PRIVACIDAD
- Privacidad — ESTRUCTURA DE PREPRODUCCIÓN / NOINDEX
- Cookies — ESTRUCTURA DE PREPRODUCCIÓN / NOINDEX
- Aviso legal — ESTRUCTURA DE PREPRODUCCIÓN / NOINDEX
- Ruta heredada `/mantenimiento/` — COMPATIBILIDAD / NOINDEX

### Acceso y plataforma

El acceso real, autenticación, organizaciones, permisos y aplicación SaaS se desarrollan por separado. Esta web pública enlaza a `/acceso/`, pero esta rama comercial no debe implementar ni duplicar la autenticación.

## Dirección visual

- fondo principal ultra blanco;
- azul acompañado de violeta, rosa, naranja, verde y cian;
- gradientes como acento;
- pila tipográfica local del sistema, sin dependencia necesaria de fuentes externas;
- mucho espacio en blanco;
- tarjetas con profundidad, microinteracciones y sombras suaves;
- dashboard conceptual etiquetado como ilustrativo;
- diseño móvil prioritario;
- intro oscura breve antes de Home, una vez por sesión;
- contenido usable sin JavaScript;
- respeto de `prefers-reduced-motion`.

## SEO, privacidad y rendimiento

La web comercial incorpora:

- canonical y `hreflang`;
- Open Graph y Twitter Card grande;
- sitemap comercial;
- `robots.txt`;
- FAQ JSON-LD;
- CSP comercial;
- recursos y fuentes limitados por política de seguridad;
- laboratorios históricos fuera de la navegación/indexación comercial;
- Three.js fuera de las páginas comerciales;
- ausencia de MP4 heredados en `dist`;
- presupuesto máximo automatizado de 3 MiB para el build completo.

El último checkpoint validado mantiene el build alrededor de 2,3 MiB sin comprimir.

## Comandos

```bash
npm install --no-audit --no-fund
npm run check
npm run preview
```

Smoke test HTTP sobre un staging ya levantado:

```bash
STAGING_ORIGIN="https://HOST-DE-STAGING" STAGING_BASE_PATH="/" npm run smoke:staging
```

## CI de la rama

`.github/workflows/v3-commercial-check.yml` valida automáticamente:

- sintaxis del smoke test;
- `astro check` + build;
- rutas comerciales críticas;
- CSP y política de fuentes locales;
- social preview;
- ausencia de copy interno de desarrollo;
- ausencia de MP4;
- ausencia de Three.js en páginas comerciales;
- ruta heredada de mantenimiento en `noindex`;
- presupuesto total de `dist` ≤ 3 MiB;
- generación de artifact `dist`.

## Reglas no negociables

- No inventar clientes, testimonios ni métricas.
- No presentar funcionalidades futuras como terminadas.
- No fijar precios hasta validarlos con pilotos.
- No activar formularios que recojan datos antes de conectar privacidad y backend.
- No duplicar el sistema de autenticación de IsiVoltPro Platform.
- No mezclar trabajo comercial V3 con el desarrollo de acceso.
- Mantener rutas configurables mediante `PUBLIC_SITE_URL` y `PUBLIC_BASE_PATH`.
- Validar cambios con `npm run check` y CI.

## Documentación

- `docs/V3-SMB-COMMERCIAL-REDESIGN.md` — estado y criterios actuales de la V3 comercial.
- `docs/STAGING-V3.md` — procedimiento seguro para revisar la rama en Mini PC.
- `docs/ROADMAP-V3.md` — roadmap histórico; puede contener estados anteriores.
- `docs/phase-6-commercial-home.md` — checkpoint de la Home V1 anterior protegida.

## Flujo de despliegue

```text
RAMA V3 / GITHUB
       ↓
CI + ARTIFACT
       ↓
MINI PC · STAGING AISLADO
       ↓
SMOKE + QA VISUAL
       ↓
APROBACIÓN
       ↓
MERGE CONTROLADO A MAIN
       ↓
PRODUCCIÓN
```

`main` conserva la Home V1 hasta aprobar expresamente el rediseño comercial.
