# IsiVoltPro Web V3 · Gestión de contenido y media

## Objetivo

Preparar una zona de administración real para contenido público, recursos visuales y reutilización social sin mezclarla con `/acceso/` ni simular persistencia en la web estática.

## Estado actual

La web pública V3 sigue siendo estática. No existe todavía un backend administrativo conectado y, por seguridad, no se expone una ruta pública de administración falsa.

El dominio base vive en `src/lib/v3-content-management.ts` y define:

- contenido con estados `draft`, `review`, `published`, `archived`;
- revisiones numeradas recuperables;
- biblioteca multimedia con ALT, etiquetas, procedencia y rutas de uso;
- publicaciones preparadas para Instagram, Facebook y LinkedIn;
- aprobación explícita antes de poder programar contenido social;
- capacidades runtime desactivadas por defecto.

## Flujo editorial previsto

`draft → review → published → archived`

Una publicación nueva no puede pasar directamente de borrador a publicación desde la web pública. El backend definitivo debe validar permisos, registrar autoría y crear una revisión inmutable antes de cambiar el estado publicado.

## Biblioteca multimedia

Cada recurso deberá conservar como mínimo:

- identificador estable;
- tipo de recurso;
- nombre y MIME;
- texto ALT obligatorio para imágenes de contenido;
- etiquetas;
- procedencia (`owned`, `licensed`, `generated`);
- nota de licencia/procedencia cuando corresponda;
- páginas o bloques donde está reutilizado;
- autor y fecha de alta.

Los archivos no deben sobrescribirse silenciosamente. Una sustitución debe crear una nueva versión o un nuevo asset para mantener trazabilidad.

## Publicación social

Estados previstos:

`draft → awaiting_approval → approved → scheduled → published`

También existe `failed` para registrar errores sin perder el contenido aprobado.

Ninguna integración con Instagram, Facebook o LinkedIn debe publicar desde el cliente. Tokens y credenciales quedan exclusivamente en backend. La programación solo puede habilitarse cuando exista:

1. autenticación administrativa;
2. autorización por rol;
3. credenciales almacenadas fuera del navegador;
4. auditoría de quién aprobó;
5. fecha/hora y zona horaria explícitas;
6. mecanismo de reintento y registro de fallos.

## Separación respecto de IsiVoltPro Platform

La Web V3 no modifica `/acceso/` ni define el sistema de identidad de la plataforma. El futuro gestor debe consumir la identidad/autorización que se acuerde con el backend definitivo, no crear un segundo login independiente dentro del sitio público.

## Prohibiciones hasta backend real

- No persistir contenido en `localStorage` como si fuera el CMS definitivo.
- No subir media directamente a un bucket público sin autorización.
- No introducir claves sociales en Astro/JavaScript cliente.
- No habilitar botones de publicar/programar sin validación backend.
- No presentar datos mock como contenido realmente guardado.

## Siguiente integración

Cuando el backend administrativo esté disponible, la interfaz debe implementar las capacidades definidas en `ContentManagementCapabilities` una a una. Hasta entonces, todas permanecen `false`, lo que deja clara la diferencia entre arquitectura preparada y funcionalidad operativa.
