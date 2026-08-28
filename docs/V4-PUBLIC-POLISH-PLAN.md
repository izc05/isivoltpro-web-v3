# IsiVoltPro Web V4 — plan de pulido público

## Objetivo

Convertir la web pública actual en la evolución V4 aprobada visualmente, sin perder las rutas ya construidas y sin volver a promover un checkpoint a GitHub Pages antes de validarlo.

## Contrato visual y de arquitectura

Navegación principal aprobada:

`Producto · Módulos · Sectores · Precios · Recursos · Empresa`

Acciones globales:

`Acceder · Solicitar demo`

La entrada debe conservar la idea `Conectando tu trabajo diario` y la Home debe conservar `Todo tu mantenimiento. Un solo sistema.` con estética blanca premium y acentos violeta, azul, cian y verde.

Las rutas secundarias no desaparecen. Deben seguir accesibles desde el lugar correcto sin saturar la cabecera: Soluciones, App Mantenimiento, Blog/Noticias, Contacto, Demo, Piloto, Implantación, Seguridad, FAQ y páginas legales.

## Fases

### Fase 0 — Auditoría y base segura

- Revisar `main`, Pages, Actions, rutas y navegación.
- Detectar páginas existentes pero ocultas o mal enlazadas.
- Trabajar desde rama segura.
- Mantener una lista de huecos priorizados.

### Fase 1 — Arquitectura y navegación

- Restaurar la navegación principal aprobada.
- Alinear desktop y móvil.
- Mantener rutas secundarias accesibles mediante navegación secundaria, footer y enlaces contextuales.
- Revisar breadcrumbs y estados activos.

### Fase 2 — Entrada + Home premium

- Pulir intro, escena 3D/pseudo-3D, transición y rendimiento.
- Reforzar Home con producto, beneficios y CTAs claros.
- El primer viewport debe explicar el flujo `aviso → contexto → cierre/histórico`.
- Los datos de la intro son demostrativos: no usar porcentajes o claims visuales que puedan confundirse con resultados reales de clientes.

### Fase 3 — Problemas → Soluciones

Desarrollar contenido sobre problemas reales de mantenimiento y su respuesta concreta en IsiVoltPro:

- avisos perdidos entre llamadas y WhatsApp;
- OT sin seguimiento;
- preventivos olvidados;
- equipos sin histórico;
- fotos y documentación dispersas;
- técnicos sin contexto;
- materiales/herramientas difíciles de seguir;
- trabajos difíciles de justificar;
- duplicidad de información;
- falta de trazabilidad.

No inventar clientes, certificaciones, cifras ni resultados reales.

### Fase 4 — Producto, Módulos y Sectores

Cobertura coherente de Activos, Avisos, OT, Preventivos, QR/NFC, Inventario, Inspecciones, Documentación y App Mantenimiento; desarrollar perfiles sectoriales sin duplicar texto.

### Fase 5 — Precios, Empresa, Contacto, Recursos y Blog

Pulido comercial y editorial, contenido evergreen útil y normativa tratada con fuentes y prudencia.

### Fase 6 — Imágenes y multimedia

Crear y optimizar ilustraciones propias para producto, móvil técnico, HVAC, electricidad, QR/NFC, OT, preventivos, documentación y flujos problema→solución.

### Fase 7 — Demo, conversión y confianza

CTAs, formularios, piloto, acceso, privacidad, seguridad y microcopy.

### Fase 8 — Responsive, accesibilidad, SEO y rendimiento

Cerrar 360/390/430, 768/1024 y 1280/1440+, teclado, foco, AA, reduced motion, CLS, metadatos, sitemap, schema e imágenes.

### Fase 9 — QA integral y candidata de publicación

Build/check, enlaces, Actions, capturas reales y revisión end-to-end antes de promover a `main`.

### Fase 10 — Mejora continua

Tras una publicación validada, seguir con mejoras pequeñas de contenido, imágenes, SEO, accesibilidad, rendimiento y conversión.

## Auditoría inicial — 28/08/2026

Estado base: `main@740a685e63ab5b9aa9d20d0f763a3b6abf2df645`.

Rama de trabajo: `feat/v4-public-polish`.

Primer defecto confirmado: la cabecera pública se había alejado del contrato visual y mostraba `Soluciones`, `Apps` y `Blog + noticias` como elementos primarios, mientras `Precios` quedaba fuera de la navegación de escritorio.

Primer checkpoint V4: restaurar `Producto · Módulos · Sectores · Precios · Recursos · Empresa`, conservar `Acceder · Solicitar demo` y mantener Soluciones/Blog como rutas secundarias.

## Checkpoint Fase 2 — 28/08/2026

- `5b876fce…`: Home reescrita para explicar el flujo de trabajo y añadir la microsecuencia `El aviso entra una vez → El técnico recibe contexto → El cierre alimenta el histórico`.
- Ese checkpoint pasó comercial, preview móvil, QA móvil y QA tablet/escritorio.
- `22f633ec…`: segundo pase de confianza de la intro; los porcentajes de rendimiento y crecimiento dejan de ser protagonistas visuales y se sustituyen por estados de trabajo/trazabilidad de una vista demo.
- Este segundo checkpoint debe quedar verde antes de dar Fase 2 por cerrada.

## Regla de publicación

Ningún checkpoint se considera definitivo por estar fusionado. Solo se promoverá a Pages cuando el build, la QA aplicable y la revisión visual real estén verdes y la arquitectura coincida con la referencia aprobada.
