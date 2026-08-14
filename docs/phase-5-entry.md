# FASE 5 — ENTRADA / PORTADA ISIVOLTPRO

Estado: CERRADA
Rama de laboratorio: `feat/home-3d-lab`
Home comercial: PROTEGIDA / SIN MODIFICAR
Base técnica protegida: `/lab-3d-ecosystem-v1/`
Blob ECOSYSTEM BASE V1: `d87ed4d07d43eaee110e9c37bd1d42688d95e27e`
Entrada estable: `/lab-3d-entry-v1/`

## Objetivo de FASE 5

Crear una entrada cinematográfica ligera que prepare al usuario antes de abrir la experiencia 3D, sin duplicar ni modificar ECOSYSTEM BASE V1.

Secuencia aprobada:

`ECLIPSE / INSTALACIÓN DORMIDA → ENTRAR → PRELOAD REAL → APERTURA CONTINUA → ECOSYSTEM BASE V1`

## Reglas protegidas

- `src/pages/index.astro` permanece sin modificar durante FASE 5.
- `lab-3d-ecosystem-v1.astro` permanece congelada.
- la entrada no crea un segundo mundo 3D;
- no se añaden vídeos ni assets pesados;
- eclipse y despertar se resuelven con CSS + imagen industrial existente;
- el loader representa trabajo real y no un contador ficticio;
- existe fallback seguro hacia ECOSYSTEM BASE V1;
- se respeta `prefers-reduced-motion`.

## 5.1 — Eclipse + entrada + preload real — COMPLETADO

Ruta: `/lab-3d-phase51/`
Blob validado: `579f154dbf3c6fc36d5e373aa6e362c865356873`

Resultado:
- portada fullscreen independiente;
- instalación oscurecida;
- eclipse técnico CSS;
- CTA `ENTRAR`;
- precarga real de escena y GLTF principales;
- salida segura sin precarga;
- sin Three.js adicional;
- Home y base congelada sin modificar.

## 5.2 — Handoff continuo — COMPLETADO

Ruta: `/lab-3d-phase52/`
Blob validado: `9d91a55c5059c2afb8caeb4c5af89614149fda04`

Resultado:
- ECOSYSTEM BASE V1 se carga detrás de la portada tras pulsar `ENTRAR`;
- una sola escena WebGL durante el handoff;
- crossfade de portada hacia escena viva;
- transferencia de foco e interacción al iframe;
- fallback directo si la escena no inicializa;
- Home y ECOSYSTEM BASE V1 sin modificar.

## 5.3 — Polish + ENTRY V1 — COMPLETADO

Checkpoint: `/lab-3d-phase53/`
Referencia estable: `/lab-3d-entry-v1/`
Blob compartido por ambas rutas: `d85152d578758731ae5508c638b40a8a4ccc3efa`

Mejoras:
- conserva la transición continua de 5.2;
- oculta en tiempo de ejecución el chrome de laboratorio de ECOSYSTEM V1 (`topbar`, métricas y botones de comparación) sin modificar su archivo congelado;
- sustituye únicamente durante la experiencia embebida el primer copy de laboratorio por una lectura neutral de instalación conectada;
- mantiene los capítulos, activos, sistemas, Maintenance, Operations y AI;
- suaviza escala, brillo, velo y tiempos del handoff;
- checkpoint y ruta estable usan exactamente el mismo código fuente;
- la ruta estable detecta su pathname y elimina referencias de fase/comparación de la propia entrada;
- la base 3D original permanece reproducible e intacta.

Arquitectura final:

`LIGHT ENTRY → REAL PRELOAD → ONE LIVE WEBGL SCENE → RUNTIME CLEANUP → CROSSFADE → TRANSFER CONTROL`

## FASE 5 — RESULTADO FINAL

`ENTRY V1 + ECOSYSTEM BASE V1` forman ya una experiencia continua protegida.

FASE 5 queda cerrada. El siguiente bloque puede comenzar la Home comercial definitiva utilizando estas dos bases sin modificarlas directamente.