# IsiVoltPro Web V3 — Rediseño comercial para autónomos y pequeñas empresas

Estado: IMPLEMENTACIÓN PRINCIPAL COMPLETADA EN RAMA / PENDIENTE REVISIÓN VISUAL FINAL
Rama: `feat/v3-smb-commercial-redesign`
Base protegida: `main` en `719017c8feba705f17963e3243ce0ba145c6e987`
PR de validación: borrador, sin intención de merge hasta aprobación.

## Objetivo

Presentar IsiVoltPro como una herramienta práctica para autónomos, pequeños equipos y empresas mantenedoras que necesitan centralizar:

- clientes y ubicaciones;
- activos y equipos;
- avisos e incidencias;
- órdenes de trabajo;
- mantenimiento preventivo;
- QR / NFC;
- fotos y documentación;
- histórico técnico;
- coordinación de pequeños equipos.

Mensaje principal:

> Menos papeleo. Más trabajo bajo control.

## Público prioritario

1. Autónomos técnicos.
2. Pequeñas empresas de mantenimiento.
3. Equipos técnicos pequeños.
4. Negocios que controlan instalaciones propias sin necesitar un ERP complejo.

## Dirección visual aprobada

- fondo principal ultra blanco;
- azul acompañado por violeta, rosa, naranja, verde y cian;
- gradientes como acento;
- Manrope + DM Sans;
- mucho espacio en blanco;
- dashboard conceptual y tarjetas con profundidad;
- experiencia móvil prioritaria;
- entrada inmersiva oscura breve antes de Home;
- movimiento moderado y respeto de `prefers-reduced-motion`.

## Implementado

### Home

- intro de aproximadamente 3,2 s;
- botón Saltar intro;
- reproducción una vez por sesión con `sessionStorage`;
- hero orientado a autónomos y pequeñas empresas;
- dashboard conceptual;
- problemas cotidianos;
- módulos principales;
- perfiles de cliente;
- flujo Cliente/Activo → Aviso → OT → Técnico → Cierre → Histórico;
- experiencia móvil + QR;
- estructura Autónomo / Equipo / Empresa sin precios ficticios;
- CTA final.

### Páginas comerciales

- `/producto/`;
- `/aplicaciones/`;
- `/sectores/`;
- `/precios/`;
- `/recursos/`;
- `/empresa/`;
- `/ecosistema/`;
- `/contacto/`;
- `/404/`.

### Legal y privacidad de preproducción

- `/privacidad/`;
- `/cookies/`;
- `/aviso-legal/`.

No se inventan titular, NIF, domicilio ni datos legales no disponibles. Deben completarse antes de producción.

### Infraestructura web

- header y footer comerciales reutilizables;
- navegación móvil real sin JavaScript;
- sitemap generado;
- `robots.txt`;
- exclusión de rutas históricas `lab-3d` de indexación;
- favicon SVG;
- workflow CI exclusivo de la rama;
- `npm run check` validado correctamente durante el desarrollo;
- artifact `dist` preparado en CI para revisiones del build.

## Separación con IsiVoltPro Platform

Esta rama trabaja exclusivamente la web pública/comercial.

`/acceso/` queda fuera del alcance del rediseño. Autenticación, organizaciones, permisos y plataforma SaaS se desarrollan por separado con Codex y no deben duplicarse aquí.

## Pendiente antes de producción

1. Revisión visual completa en escritorio, tablet y móvil.
2. Revisar la Home V3 frente a las páginas internas y decidir si la navegación principal permanece one-page o enlaza también a las páginas detalladas.
3. Conectar el formulario de demo a un backend/canal comercial real.
4. Incorporar consentimiento y política de privacidad definitiva antes de almacenar datos.
5. Completar datos del aviso legal.
6. Definir precios finales tras pilotos reales.
7. Integrar destino real de Acceder cuando el trabajo de plataforma esté preparado.
8. Validar en Mini PC como staging.
9. Solo después, preparar VPS/producción.

## Reglas no negociables

- No inventar clientes, testimonios ni métricas.
- No fijar precios sin validación.
- No presentar capacidades futuras como terminadas.
- No activar formularios que almacenen datos sin privacidad y backend.
- No duplicar autenticación.
- No hacer merge a `main` hasta aprobación visual y técnica.
- Mantener rutas compatibles con GitHub Pages, Mini PC y VPS.
- Validar con `npm run check` en cada bloque.
