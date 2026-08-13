# IsiVoltPro Web V3

Reinicio limpio de la web comercial de IsiVoltPro.

## Roadmap maestro

La arquitectura completa de la Home, el acceso central, el lanzador de aplicaciones, organizaciones, permisos y administración está documentada en:

`docs/ROADMAP-V3.md`

## Regla de desarrollo

Una fase → build → publicación → revisión → aprobación → siguiente fase.

## Estado actual

- Fase 0 · Foundation + GitHub Pages — COMPLETADA
- Fase 1 · Portada premium — COMPLETADA
- Fase 2 · Hero con vídeo — EN REVISIÓN VISUAL
- Fase 3 · Qué es IsiVoltPro — EN REVISIÓN
- Acceso A0 · Arquitectura de acceso — DEFINIDA
- Admin C0 · Arquitectura superadmin — DEFINIDA

## Siguiente bloque de acceso

- Botón Acceder
- Página de acceso IsiVoltPro
- Preparación para login central

## Primeras aplicaciones a conectar

1. IsiVoltPro OT
2. Herramientas QR / NFC
3. Preinspecciones BT

## Principios

- Sin herencia de V2.
- Sin recursos visuales ficticios presentados como producto real.
- Sin Base64 de vídeo ni reconstrucciones de binarios en CI.
- Sin duplicar sistemas de autenticación.
- Seguridad real fuera de la capa estática de GitHub Pages.
- Motion solo después de aprobar el diseño estático.
