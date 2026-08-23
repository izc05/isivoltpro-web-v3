# IsiVoltPro Web V3 — Rediseño comercial para autónomos y pequeñas empresas

Estado: IMPLEMENTACIÓN COMERCIAL AVANZADA / PENDIENTE REVISIÓN VISUAL FINAL Y STAGING
Rama: `feat/v3-smb-commercial-redesign`
Base protegida: `main` en `719017c8feba705f17963e3243ce0ba145c6e987`
PR: borrador; no fusionar hasta aprobación visual, técnica y de staging.

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
- mucho espacio en blanco;
- interfaces conceptuales claramente etiquetadas;
- tarjetas con profundidad y microinteracciones;
- experiencia móvil prioritaria;
- intro inmersiva oscura breve antes de Home;
- `prefers-reduced-motion`;
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

## Legal de preproducción

- `/privacidad/`;
- `/cookies/`;
- `/aviso-legal/`.

Las tres rutas están accesibles para revisión, pero están `noindex` y fuera del sitemap hasta completar identidad jurídica, tratamiento de datos y stack definitivo. No se inventan datos legales.

## SEO y estructura técnica

- `V3Seo.astro` compartido;
- canonical, description y robots;
- Open Graph / Twitter básicos;
- favicon SVG;
- sitemap con rutas comerciales, módulos, sectores y recursos;
- `robots.txt`;
- laboratorios `lab-3d` fuera de indexación;
- FAQ con JSON-LD `FAQPage`;
- header/footer reutilizables;
- menú móvil sin JavaScript;
- foco accesible y microinteracciones;
- rutas dinámicas alimentadas desde `src/data/v3-commercial.ts` para compatibilidad con `getStaticPaths()`.

## Rendimiento validado

- CI: `npm run check` + `astro build` en verde;
- rutas comerciales verificadas automáticamente;
- páginas comerciales sin carga de Three.js;
- Home y páginas principales sin JavaScript externo;
- MP4 de la antigua Fase 2 retirados del build comercial y conservados en historial Git;
- `dist` reducido aproximadamente de 12 MB a 2,2 MB sin comprimir;
- artefacto ZIP de CI reducido aproximadamente a 601 KB;
- CI falla si vuelven a entrar MP4 o desaparecen rutas comerciales clave.

Los chunks de Three.js/GSAP restantes pertenecen a laboratorios históricos y no son referenciados por las páginas comerciales.

## Separación con IsiVoltPro Platform

Esta rama trabaja exclusivamente la web pública/comercial.

`/acceso/` queda fuera de alcance. Autenticación, organizaciones, permisos y plataforma SaaS se desarrollan por separado con Codex. No duplicar autenticación aquí.

## Bloqueos reales antes de producción

1. Revisión visual completa en escritorio, tablet y móvil.
2. Conectar formulario de demo a backend/canal comercial real.
3. Definir consentimiento y privacidad definitiva antes de almacenar datos.
4. Completar datos jurídicos.
5. Definir precios finales tras pilotos reales.
6. Integrar destino final de `Acceder` cuando la plataforma esté preparada.
7. Validar en Mini PC como staging.
8. Corregir hallazgos de staging y repetir QA.
9. Solo después, preparar merge a `main` y producción/VPS.

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
