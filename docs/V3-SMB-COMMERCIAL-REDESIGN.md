# IsiVoltPro Web V3 — Rediseño comercial para autónomos y pequeñas empresas

Estado: IMPLEMENTACIÓN COMERCIAL AVANZADA / PENDIENTE REVISIÓN VISUAL FINAL Y STAGING
Rama: `feat/v3-smb-commercial-redesign`
Base protegida: `main` en `719017c8feba705f17963e3243ce0ba145c6e987`
PR: borrador; no fusionar hasta aprobación visual, técnica y de staging.

## Objetivo

Presentar IsiVoltPro como una herramienta práctica para autónomos, pequeños equipos y empresas mantenedoras que necesitan centralizar clientes, activos, avisos, órdenes de trabajo, preventivos, QR/NFC, documentación e histórico sin implantar un ERP sobredimensionado.

Mensaje principal:

> Menos papeleo. Más trabajo bajo control.

## Público prioritario

1. Autónomos técnicos.
2. Pequeñas empresas mantenedoras.
3. Equipos técnicos pequeños.
4. Negocios con instalaciones propias.
5. Operaciones multisede de escala pequeña/media.

## Dirección visual

- fondo principal ultra blanco;
- azul acompañado por violeta, rosa, naranja, verde y cian;
- gradientes como acento, no como fondo continuo;
- Manrope + DM Sans;
- mucho espacio en blanco;
- dashboard e interfaces conceptuales claramente etiquetadas;
- tarjetas con profundidad y microinteracciones;
- experiencia móvil prioritaria;
- entrada inmersiva oscura breve antes de Home;
- movimiento moderado y respeto de `prefers-reduced-motion`;
- render progresivo con `content-visibility` en páginas internas.

## Home implementada

- intro aproximada de 3,2 s;
- botón Saltar intro;
- una reproducción por sesión con `sessionStorage`;
- hero orientado a autónomos y pequeñas empresas;
- dashboard conceptual con datos ilustrativos;
- problemas cotidianos;
- módulos principales enlazados a páginas reales;
- perfiles enlazados a páginas de sector;
- flujo Cliente/Activo → Aviso → OT → Técnico → Cierre → Histórico;
- experiencia móvil + QR;
- estructura Autónomo / Equipo / Empresa sin precios ficticios;
- CTA final;
- navegación y footer compartidos con el resto de la web.

## Arquitectura pública actual

### Núcleo comercial

- `/` — Home;
- `/producto/` — visión del producto;
- `/aplicaciones/` — índice de módulos;
- `/sectores/` — índice de perfiles/sectores;
- `/precios/` — arquitectura comercial sin importes ficticios;
- `/recursos/` — biblioteca práctica;
- `/faq/` — preguntas frecuentes + FAQ structured data;
- `/empresa/` — visión y principios;
- `/ecosistema/` — relación instalación/activo/trabajo/histórico;
- `/contacto/` — flujo visual de solicitud de demo, todavía sin envío;
- `/404/`.

### Landings de módulos

Generadas desde `src/pages/modulos/[slug].astro`:

- `/modulos/ordenes-de-trabajo/`;
- `/modulos/activos/`;
- `/modulos/mantenimiento-preventivo/`;
- `/modulos/qr-nfc/`;
- `/modulos/inspecciones/`;
- `/modulos/inventario/`;
- `/modulos/documentacion/`;
- `/modulos/avisos-incidencias/`.

Cada landing se centra en problema → resultado → flujo y aclara que la disponibilidad exacta se confirma según fase del producto.

### Landings de perfiles/sectores

Generadas desde `src/pages/sectores/[slug].astro`:

- `/sectores/autonomos-tecnicos/`;
- `/sectores/empresas-mantenedoras/`;
- `/sectores/instalaciones-propias/`;
- `/sectores/climatizacion-frio/`;
- `/sectores/instalaciones-electricas/`;
- `/sectores/multisede/`.

### Recursos publicados

Generados desde `src/pages/recursos/[slug].astro`:

- `/recursos/orden-trabajo-util/`;
- `/recursos/organizar-activos-instalaciones/`;
- `/recursos/qr-activos-mantenimiento/`;
- `/recursos/mantenimiento-preventivo-pequena-empresa/`.

Los recursos deben aportar utilidad aunque el lector no contrate IsiVoltPro.

### Legal y privacidad de preproducción

- `/privacidad/`;
- `/cookies/`;
- `/aviso-legal/`.

No se inventan titular, NIF, domicilio ni datos legales no disponibles. Deben completarse antes de producción.

## SEO y estructura técnica

- componente compartido `V3Seo.astro`;
- canonical;
- description;
- robots por página;
- Open Graph básico;
- Twitter card básica;
- favicon SVG;
- sitemap generado con páginas comerciales, módulos, sectores y recursos;
- `robots.txt`;
- laboratorios históricos `lab-3d` fuera de indexación;
- FAQ con JSON-LD `FAQPage`;
- header y footer reutilizables;
- navegación móvil real sin JavaScript;
- microinteracciones y foco accesible;
- workflow CI exclusivo de la rama;
- artifact `dist` generado por CI.

## Separación con IsiVoltPro Platform

Esta rama trabaja exclusivamente la web pública/comercial.

`/acceso/` queda fuera del alcance del rediseño. Autenticación, organizaciones, permisos y plataforma SaaS se desarrollan por separado con Codex. La web pública no debe duplicar autenticación.

## Bloqueos reales antes de producción

1. Revisión visual completa del build en escritorio, tablet y móvil.
2. Conectar formulario de demo a un canal comercial/backend real.
3. Definir tratamiento, consentimiento y política de privacidad definitiva antes de almacenar datos.
4. Completar datos jurídicos del aviso legal.
5. Definir precios finales tras pilotos reales.
6. Integrar destino final de `Acceder` cuando la plataforma lo tenga preparado.
7. Validar la rama en Mini PC como staging.
8. Corregir hallazgos de staging y repetir QA.
9. Solo después, preparar merge a `main` y producción/VPS.

## Reglas no negociables

- No inventar clientes, testimonios ni métricas.
- Etiquetar interfaces y cifras conceptuales como ilustrativas.
- No fijar precios sin validación.
- No presentar capacidades futuras como terminadas.
- No activar formularios que almacenen datos sin privacidad y backend.
- No duplicar autenticación.
- No hacer merge a `main` hasta aprobación visual y técnica.
- Mantener rutas compatibles con GitHub Pages, Mini PC y VPS.
- Validar con `npm run check` en cada bloque significativo.
- Cuando solo queden bloqueos externos/decisiones de negocio, no inventar más funcionalidades para "seguir avanzando".
