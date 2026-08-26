# IsiVoltPro Web V3 — Cloudflare Pages como origen de producción

## Objetivo

La web pública V3 se desplegará desde GitHub mediante Cloudflare Pages. El Mini PC no será el origen de la web corporativa: se reserva para autenticación, autorización, API, datos y servicios privados de IsiVoltPro Platform.

```text
GitHub · isivoltpro-web-v3
  -> CI
  -> Cloudflare Pages preview
  -> QA
  -> rama de producción aprobada
  -> Cloudflare Pages
      -> isivoltpro.com
      -> www.isivoltpro.com

Cloudflare
  -> api.isivoltpro.com
  -> Tunnel
  -> Mini PC / IsiVoltPro Platform
```

## Estado actual

La V3 sigue en `feat/v3-smb-commercial-redesign` y PR #1 permanece en borrador. Esta configuración prepara el destino; no autoriza todavía el merge a `main` ni el cambio del dominio de producción.

## Configuración de Pages

Valores objetivo para el proyecto conectado al repositorio:

```text
Framework preset: Astro
Production branch: main   # solo cuando la V3 esté aprobada
Build command: npm run check
Build output directory: dist
Root directory: /
```

`npm run check` ya ejecuta `astro check`, build y los safety gates comerciales del repositorio, por lo que un fallo debe impedir el despliegue.

## Variables de build

Producción:

```text
PUBLIC_SITE_URL=https://isivoltpro.com
PUBLIC_BASE_PATH=/
```

Node debe cumplir `package.json` (`>=22`). Puede fijarse explícitamente una versión Node 22 validada en Cloudflare para evitar cambios inesperados del entorno de build.

No introducir en Pages secretos de PocketBase, credenciales administrativas, tokens de Tunnel ni claves de proveedores si el frontend no necesita conocerlos. Toda credencial privilegiada permanece server-side.

## Preview y staging

Antes de producción:

1. conectar el repositorio a Pages;
2. permitir deploy previews del PR V3;
3. ejecutar QA móvil/tablet/escritorio contra la URL real de preview;
4. mantener `main` como producción actual hasta aprobación;
5. si se usa `staging.isivoltpro.com`, apuntarlo únicamente al entorno de staging/preview aprobado;
6. no indexar accidentalmente contenido de gestión o staging.

El staging local del Mini PC descrito en `docs/STAGING-V3.md` puede mantenerse como herramienta de diagnóstico, pero deja de ser el origen objetivo de la web pública.

## Relación con IsiVoltPro Platform

La web comercial no implementa autenticación ni duplica usuarios. Cuando el acceso central esté listo:

```text
Web pública
  -> Acceder
  -> app.isivoltpro.com
  -> autenticación central
  -> api.isivoltpro.com
  -> access-context
  -> aplicaciones permitidas
```

Las funciones dinámicas futuras de Blog, contacto u otras proyecciones deben consumir endpoints públicos explícitos del backend. Nunca deben acceder a `pb_data` o SQLite directamente.

## Disponibilidad

La separación es intencionada:

- si el Mini PC/API cae, la web corporativa debe seguir sirviéndose desde Cloudflare Pages;
- las funciones que necesiten API deben degradar de forma controlada;
- un fallo de API no debe convertir una página pública estática en un error general;
- el frontend no debe cachear ni fingir autorización cuando `access-context` no está disponible.

## DNS objetivo

```text
isivoltpro.com      -> Cloudflare Pages
www.isivoltpro.com  -> Cloudflare Pages / redirección canónica
app.isivoltpro.com  -> portal central (Pages preferente)
api.isivoltpro.com  -> Cloudflare Tunnel -> Mini PC
```

No crear registros que expongan directamente la IP del Mini PC como origen de Platform.

## Go-live de V3

Antes de asociar `isivoltpro.com` a la V3:

```text
[ ] PR V3 visualmente aprobado
[ ] CI verde
[ ] Pages preview verde
[ ] QA 360/390/430
[ ] QA 768/1024/1280/1440
[ ] SEO/canonical/sitemap validados
[ ] rutas de gestión fuera de indexación y protegidas
[ ] legales/privacidad resueltos para funciones activas
[ ] formulario no recoge datos si backend/privacidad no están listos
[ ] destino de Acceder definido
[ ] rollback de Pages conocido
[ ] dominio validado sin alterar el origen del Mini PC
```

## Principio

**La web sale de GitHub y Cloudflare; los datos y permisos salen de Platform en el Mini PC.**
