# FASE 5 — ENTRADA / PORTADA ISIVOLTPRO

Estado: EN CURSO
Rama de laboratorio: `feat/home-3d-lab`
Home comercial: PROTEGIDA / SIN MODIFICAR
Base técnica protegida: `/lab-3d-ecosystem-v1/`
Blob ECOSYSTEM BASE V1: `d87ed4d07d43eaee110e9c37bd1d42688d95e27e`

## Objetivo de FASE 5

Crear una entrada cinematográfica ligera que prepare al usuario antes de abrir la experiencia 3D, sin duplicar ni modificar ECOSYSTEM BASE V1.

Secuencia objetivo:

`ECLIPSE / INSTALACIÓN DORMIDA → ENTRAR → PRELOAD REAL → APERTURA CONTINUA → ECOSYSTEM BASE V1`

La entrada debe sentirse premium, industrial y técnica. No debe convertirse en una escena sci-fi independiente ni competir visualmente con la instalación 3D.

## Reglas protegidas

- `src/pages/index.astro` no se modifica durante los checkpoints de FASE 5 hasta aprobación visual explícita.
- `lab-3d-ecosystem-v1.astro` permanece congelada.
- La entrada es una capa ligera; no crea un segundo mundo 3D.
- No se añaden vídeos ni assets pesados en FASE 5.
- El eclipse se construye con CSS y la imagen industrial existente.
- El loader debe representar trabajo real cuando sea posible y nunca fingir una descarga con un contador arbitrario.
- Debe existir salida segura hacia ECOSYSTEM BASE V1 si la precarga o el handoff fallan.
- Debe respetarse `prefers-reduced-motion`.

## 5.1 — Eclipse + entrada + preload real — APROBADO COMO DIRECCIÓN

Ruta: `/lab-3d-phase51/`
Blob validado: `579f154dbf3c6fc36d5e373aa6e362c865356873`

Resultado:

- portada fullscreen independiente de la Home actual;
- instalación existente muy oscurecida al inicio;
- eclipse técnico CSS con corona cyan/azul contenida;
- CTA único `ENTRAR`;
- loader basado en precarga real con `fetch(..., cache: force-cache)`;
- calentamiento de ECOSYSTEM BASE V1 y de los cuatro GLTF principales;
- progreso ligado a recursos resueltos;
- salida segura `ENTRAR SIN PRECARGA`;
- despertar visual antes de abrir el ecosistema;
- sin Three.js adicional, sin vídeo y sin modificar Home ni la base congelada.

Lectura aprobada:

`instalación dormida → señal de energía → decisión de entrar → preparación técnica → instalación activa`.

## 5.2 — Handoff continuo hacia ECOSYSTEM V1 — COMPLETADO TÉCNICAMENTE / PENDIENTE DE REVISIÓN VISUAL

Ruta de revisión: `/lab-3d-phase52/`
Blob candidato validado: `9d91a55c5059c2afb8caeb4c5af89614149fda04`

Objetivo:

Eliminar la sensación de recarga/cambio de página entre la portada y la experiencia 3D.

Implementado:

- conserva el lenguaje visual de 5.1;
- ECOSYSTEM BASE V1 se carga en un `iframe` same-origin situado detrás de la portada;
- el iframe no empieza a cargar hasta que el usuario pulsa `ENTRAR`;
- la portada sigue siendo la única capa visible durante la preparación;
- el loader combina dos señales reales: inicialización de la ruta viva de ECOSYSTEM V1 y calentamiento de los cuatro GLTF principales;
- el progreso se calcula por pasos realmente resueltos, no por un temporizador ficticio;
- el iframe es la única escena WebGL durante el handoff: la portada es CSS/HTML y no añade renderer 3D;
- cuando la escena está preparada, el ecosistema pasa de oscuro/ligeramente ampliado a escala y brillo normales;
- simultáneamente la portada, eclipse, copy y loader desaparecen mediante crossfade;
- tras el handoff, `pointer-events` y foco pasan al iframe para permitir scroll e interacción normal;
- se mantiene el scroll inicial del ecosistema en 0;
- si la escena embebida no queda disponible dentro del timeout de seguridad, se navega directamente a la ruta estable ECOSYSTEM V1;
- `ENTRAR SIN TRANSICIÓN` mantiene un escape directo;
- `prefers-reduced-motion` reduce el handoff a cambio prácticamente inmediato;
- no se modifica el blob congelado de ECOSYSTEM BASE V1;
- no se modifica Home.

Arquitectura de 5.2:

`LIGHT ENTRY (CSS/HTML) → LOAD ONE LIVE WEBGL SCENE BEHIND → CROSSFADE → TRANSFER CONTROL`

No es equivalente a los experimentos 4.1/4.2: allí convivían capas de laboratorio para construir la narrativa 3D; aquí existe una sola escena WebGL y una portada CSS ligera que desaparece.

## 5.3 — SIGUIENTE SOLO SI 5.2 SE APRUEBA

- afinar únicamente continuidad visual entre eclipse y primer fotograma del ecosistema;
- decidir si ocultamos el chrome de laboratorio durante los primeros instantes del handoff;
- preparar una ruta estable `ENTRY V1`;
- cerrar FASE 5 antes de integrar entrada y Home comercial.

No empezar todavía la Home comercial definitiva hasta cerrar la entrada.