# IsiVoltPro Web V3 — Rediseño comercial para autónomos y pequeñas empresas

Estado: EN DESARROLLO
Rama: `feat/v3-smb-commercial-redesign`
Base protegida: `main` en `719017c8feba705f17963e3243ce0ba145c6e987`

## Objetivo

Transformar la Home V3 en una web comercial de nueva generación que comunique con claridad que IsiVoltPro resuelve problemas cotidianos de autónomos, pequeños equipos y empresas mantenedoras.

Mensaje principal:

> Menos papeleo. Más trabajo bajo control.

IsiVoltPro debe presentarse como una herramienta práctica para centralizar:

- clientes y ubicaciones;
- activos y equipos;
- avisos e incidencias;
- órdenes de trabajo;
- mantenimiento preventivo;
- QR / NFC;
- fotos y documentación;
- histórico técnico;
- coordinación de pequeños equipos.

## Público prioritario

1. Autónomos técnicos.
2. Pequeñas empresas de mantenimiento.
3. Equipos técnicos pequeños.
4. Negocios que necesitan controlar sus propias instalaciones sin implantar un ERP complejo.

## Dirección visual

- Home ultra blanca y luminosa.
- Tipografía corporativa de alta legibilidad.
- Azul como color de confianza, acompañado por violeta, rosa, naranja, verde y cian.
- Gradientes usados como acento, no como fondo permanente.
- Dashboard conceptual como pieza visual principal.
- Tarjetas flotantes con profundidad y movimiento moderado.
- Mucho espacio en blanco y jerarquía clara.
- Diseño móvil prioritario para el trabajo de campo.

## Entrada previa a la Home

La nueva Home incorpora una intro cinematográfica breve:

`CLIENTES + ACTIVOS + AVISOS + OT + MANTENIMIENTO → ISIVOLTPRO`

Características:

- fondo oscuro;
- núcleo IsiVoltPro animado;
- nodos orbitando;
- mensaje "Conectando tu trabajo diario";
- duración aproximada de 3,2 segundos;
- botón para saltarla;
- solo una reproducción por sesión mediante `sessionStorage`;
- respeto de `prefers-reduced-motion`.

## Estructura Home V3

1. Intro inmersiva.
2. Hero comercial para autónomos y pequeñas empresas.
3. Vista conceptual del producto.
4. Problemas cotidianos que simplifica IsiVoltPro.
5. Módulos principales.
6. Para quién está diseñado.
7. Flujo Cliente/Activo → Aviso → OT → Técnico → Cierre → Histórico.
8. Experiencia móvil + QR.
9. Arquitectura comercial Autónomo / Equipo / Empresa sin precios ficticios.
10. CTA final.
11. Footer.

## Separación con la plataforma

Esta rama trabaja exclusivamente la web pública V3.

`/acceso/` queda fuera del alcance de este rediseño porque el acceso real, autenticación, organizaciones y permisos se desarrollan por separado en IsiVoltPro Platform.

La web pública enlaza a `/acceso/`, pero no implementa autenticación.

## Reglas

- No inventar clientes, testimonios o métricas.
- No fijar precios hasta validarlos con pilotos.
- No presentar capacidades futuras como terminadas.
- No hacer merge a `main` hasta revisión visual y validación técnica.
- Mantener responsive y accesibilidad de movimiento.
- La web debe vender utilidad práctica antes que complejidad tecnológica.
