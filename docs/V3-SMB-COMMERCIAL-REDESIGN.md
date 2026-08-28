# IsiVoltPro Web V3 — Rediseño comercial para autónomos y pequeñas empresas

Estado: IMPLEMENTACIÓN COMERCIAL PRINCIPAL COMPLETADA EN RAMA / PREPARADA PARA STAGING Y QA VISUAL
Rama: `feat/v3-smb-commercial-redesign`
Base protegida: `main` en `719017c8feba705f17963e3243ce0ba145c6e987`
PR #1: borrador; no fusionar hasta aprobación visual, técnica y de staging.

## Objetivo

Presentar IsiVoltPro como una herramienta práctica para autónomos, pequeños equipos y empresas mantenedoras que necesitan centralizar clientes, activos, avisos, órdenes de trabajo, preventivos, QR/NFC, documentación e histórico sin implantar un ERP sobredimensionado.

> Menos papeleo. Más trabajo bajo control.

## Público prioritario

1. Autónomos técnicos.
2. Pequeñas empresas mantenedoras.
3. Equipos técnicos pequeños.
4. Negocios con instalaciones propias.
5. Operaciones multisede de escala pequeña/media.

## Dirección visual

- fondo principal ultra blanco;
- azul + violeta + rosa + naranja + verde + cian;
- gradientes como acento;
- pila tipográfica local del sistema para la interfaz comercial;
- mucho espacio en blanco;
- interfaces conceptuales claramente etiquetadas;
- tarjetas con profundidad y microinteracciones;
- experiencia móvil prioritaria;
- intro inmersiva oscura breve antes de Home;
- `prefers-reduced-motion`;
- contenido completamente utilizable sin JavaScript;
- `content-visibility` en páginas internas.

## Arquitectura pública

### Núcleo comercial

- `/` — Home;
- `/producto/`;
- `/aplicaciones/`;
- `/sectores/`;
- `/precios/`;
- `/recursos/`;
- `/faq/`;
- `/empresa/`;
- `/ecosistema/`;
- `/contacto/`;
- `/404/`.

### Módulos

Generados desde `src/pages/modulos/[slug].astro` y datos en `src/data/v3-commercial.ts`:

- `/modulos/ordenes-de-trabajo/`;
- `/modulos/activos/`;
- `/modulos/mantenimiento-preventivo/`;
- `/modulos/qr-nfc/`;
- `/modulos/inspecciones/`;
- `/modulos/inventario/`;
- `/modulos/documentacion/`;
- `/modulos/avisos-incidencias/`.

### Perfiles / sectores

- `/sectores/autonomos-tecnicos/`;
- `/sectores/empresas-mantenedoras/`;
- `/sectores/instalaciones-propias/`;
- `/sectores/climatizacion-frio/`;
- `/sectores/instalaciones-electricas/`;
- `/sectores/multisede/`.

### Recursos publicados

- `/recursos/orden-trabajo-util/`;
- `/recursos/organizar-activos-instalaciones/`;
- `/recursos/qr-activos-mantenimiento/`;
- `/recursos/mantenimiento-preventivo-pequena-empresa/`.

Los recursos deben aportar utilidad aunque el lector no contrate IsiVoltPro.

### Compatibilidad histórica

- `/mantenimiento/` se conserva para enlaces antiguos, usa diseño V3, dirige al módulo de Mantenimiento preventivo y permanece `noindex`.

## Legal de preproducción

- `/privacidad/`;
- `/cookies/`;
- `/aviso-legal/`.

Las tres rutas están disponibles para revisión, pero permanecen `noindex` y fuera del sitemap hasta completar identidad jurídica, tratamiento de datos y stack definitivo. No se inventan datos legales.

## SEO y navegación

La capa comercial incluye:

- `V3Seo.astro` compartido;
- canonical;
- `hreflang="es"` + `x-default`;
- description y robots;
- Open Graph con imagen social existente;
- Twitter Card `summary_large_image`;
- favicon SVG;
- sitemap limitado a contenido comercial indexable;
- `robots.txt`;
- laboratorios `lab-3d` fuera de la navegación/indexación comercial;
- FAQ con JSON-LD `FAQPage`;
- breadcrumbs automáticos en páginas profundas;
- JSON-LD `BreadcrumbList`;
- `aria-current` en navegación exacta y sección padre;
- menú móvil nativo sin dependencia de framework JS;
- enlace accesible `Saltar al contenido`;
- foco visible.

## Seguridad y privacidad técnica

Las páginas comerciales incorporan una CSP que limita recursos a origen propio y datos embebidos cuando corresponde:

- fuentes locales/self;
- imágenes self/data;
- conexiones self;
- scripts y estilos controlados por la propia web;
- `base-uri` y `form-action` limitados a self.

La interfaz comercial utiliza una pila tipográfica del sistema. El CSS histórico puede conservar referencias heredadas, pero la política comercial impide que sean necesarias para renderizar la V3.

## Progressive enhancement

La Home no depende de JavaScript para mostrar contenido:

- si JS no está disponible, la intro no bloquea la página;
- el body conserva scroll;
- los elementos `.reveal` permanecen visibles;
- la navegación y el contenido principal siguen siendo utilizables.

Con JavaScript disponible, la intro se muestra una vez por sesión y respeta `prefers-reduced-motion`.

## Rendimiento validado

Último presupuesto comercial validado antes del checkpoint final:

- `dist`: aproximadamente **2296 KiB**;
- límite automatizado: **3072 KiB**;
- artifact ZIP de CI: alrededor de 600 KiB;
- 67 páginas estáticas generadas en la validación previa;
- MP4 de la antigua Fase 2 retirados del build comercial y conservados en historial Git;
- Three.js no se carga en las páginas comerciales;
- los chunks 3D restantes pertenecen a laboratorios históricos preservados.

## CI de la rama

`.github/workflows/v3-commercial-check.yml` valida:

- sintaxis del smoke test de staging;
- `astro check` + `astro build`;
- rutas comerciales críticas;
- ruta heredada `/mantenimiento/` en `noindex`;
- CSP y política de fuentes locales;
- ausencia de copy interno de desarrollo;
- enlace `Saltar al contenido`;
- breadcrumb estructurado en una landing profunda;
- sitemap con rutas comerciales obligatorias y sin rutas no indexables;
- social preview;
- ausencia de MP4 heredados;
- ausencia de Three.js en páginas comerciales;
- presupuesto total de `dist` <= 3 MiB;
- generación del artifact `dist`.

## Staging reproducible

Documentación: `docs/STAGING-V3.md`.

Se ha añadido:

```bash
npm run smoke:staging
```

Uso previsto:

```bash
STAGING_ORIGIN="https://HOST-DE-STAGING" STAGING_BASE_PATH="/" npm run smoke:staging
```

El smoke test comprueba por HTTP 10 rutas comerciales + sitemap y verifica marca, CSP, ausencia de Three.js y ausencia de copy interno.

El staging debe levantarse en un checkout/worktree y puerto independientes para no tocar producción ni otro servicio del Mini PC.

## Separación con IsiVoltPro Platform

Esta rama trabaja exclusivamente la web pública/comercial.

`/acceso/` queda fuera de alcance. Autenticación, organizaciones, permisos y plataforma SaaS se desarrollan por separado con Codex. No duplicar autenticación aquí.

## Bloqueos reales antes de producción

1. Levantar esta rama en Mini PC como staging aislado.
2. Ejecutar `npm run smoke:staging` contra ese staging.
3. Revisar visualmente escritorio 1440/1280, tablet 768–1024 y móvil 360/390/430.
4. Revisar primera y segunda visita de la intro, teclado, foco, `aria-current`, breadcrumb, reduced motion y fallback sin JS.
5. Corregir cualquier hallazgo real de staging y repetir CI/smoke.
6. Conectar formulario de demo a backend/canal comercial real.
7. Definir consentimiento y privacidad definitiva antes de almacenar datos.
8. Completar datos jurídicos.
9. Definir precios finales tras pilotos reales.
10. Integrar destino final de `Acceder` cuando IsiVoltPro Platform esté preparada.
11. Solo después, preparar merge a `main` y producción.

## Reglas no negociables

- no inventar clientes, testimonios ni métricas;
- etiquetar interfaces y cifras conceptuales como ilustrativas;
- no fijar precios sin validación;
- no presentar capacidades futuras como terminadas;
- no activar formularios sin privacidad y backend;
- no duplicar autenticación;
- no hacer merge a `main` antes de QA/staging;
- validar cada bloque significativo;
- cuando solo queden bloqueos externos, no inventar funcionalidades para seguir avanzando.
