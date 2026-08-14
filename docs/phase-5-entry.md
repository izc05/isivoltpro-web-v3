# FASE 5 — ENTRADA / PORTADA ISIVOLTPRO

Estado: EN CURSO
Rama de laboratorio: `feat/home-3d-lab`
Home comercial: PROTEGIDA / SIN MODIFICAR
Base técnica protegida: `/lab-3d-ecosystem-v1/`
Blob ECOSYSTEM BASE V1: `d87ed4d07d43eaee110e9c37bd1d42688d95e27e`

## Objetivo de FASE 5

Crear una entrada cinematográfica ligera que prepare al usuario antes de abrir la experiencia 3D, sin duplicar ni modificar ECOSYSTEM BASE V1.

Secuencia objetivo:

`ECLIPSE / INSTALACIÓN DORMIDA → ENTRAR → PRELOAD REAL → APERTURA → ECOSYSTEM BASE V1`

La entrada debe sentirse premium, industrial y técnica. No debe convertirse en una escena sci-fi independiente ni competir visualmente con la instalación 3D.

## Reglas protegidas

- `src/pages/index.astro` no se modifica durante los checkpoints de FASE 5 hasta aprobación visual explícita.
- `lab-3d-ecosystem-v1.astro` permanece congelada.
- La entrada es una capa ligera; no crea un segundo mundo 3D.
- No se añaden vídeos ni assets pesados en 5.1.
- El eclipse se construye con CSS y la imagen industrial existente.
- El loader debe representar trabajo real cuando sea posible y nunca fingir una descarga con un temporizador arbitrario.
- Debe existir salida segura hacia ECOSYSTEM BASE V1 si la precarga de un recurso externo falla.
- Debe respetarse `prefers-reduced-motion`.

## 5.1 — Eclipse + entrada + preload real — COMPLETADO TÉCNICAMENTE / PENDIENTE DE REVISIÓN VISUAL

Ruta de revisión: `/lab-3d-phase51/`
Blob candidato validado: `579f154dbf3c6fc36d5e373aa6e362c865356873`

Implementado:

- portada fullscreen independiente de la Home actual;
- imagen industrial existente como fondo, muy oscurecida al inicio;
- eclipse técnico construido íntegramente con CSS;
- corona cyan/azul y arco luminoso contenidos;
- copy mínimo y CTA único `ENTRAR`;
- estado `idle → loading → ready`;
- loader ligado a precarga real mediante `fetch(..., cache: force-cache)`;
- calentamiento de la ruta `ECOSYSTEM BASE V1`;
- calentamiento de los cuatro GLTF principales ya usados por la escena: mecánica, HVAC, distribución eléctrica y climatización exterior;
- progreso calculado por recursos realmente resueltos, no por un contador ficticio;
- timeout individual de seguridad para evitar bloqueo permanente;
- errores de precarga degradan con gracia y no impiden entrar;
- botón `ENTRAR SIN PRECARGA` como escape directo;
- transición final que reduce el eclipse y despierta la instalación antes de navegar a ECOSYSTEM BASE V1;
- soporte de `prefers-reduced-motion`;
- sin Three.js adicional;
- sin vídeo adicional;
- sin modificar Home;
- sin modificar ECOSYSTEM BASE V1.

## Criterio visual de 5.1

Debe transmitir:

`instalación dormida → señal de energía → decisión de entrar → preparación técnica → instalación activa`

No debe transmitir:

`portal espacial → videojuego → holograma genérico → intro larga sin función`.

## 5.2 — SIGUIENTE SOLO SI 5.1 SE APRUEBA

Posibles ajustes después de revisión:

- afinar posición/tamaño del eclipse;
- afinar oscuridad inicial y despertar final;
- decidir si la entrada debe conservar copy o reducirse todavía más;
- suavizar la continuidad visual entre la imagen estática y el primer fotograma de ECOSYSTEM V1;
- valorar una transición visual entre páginas para reducir el corte de navegación;
- preparar una ruta estable de entrada antes de integrarla en la Home real.

No empezar Home comercial definitiva hasta cerrar esta decisión visual.