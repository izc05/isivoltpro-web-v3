# CODEX HANDOFF — IsiVoltPro Home Experience V2

## Objetivo

Construir una nueva Home premium para IsiVoltPro inspirada en el lenguaje de experiencias editoriales 3D/WebGL de estudios como Lusion, pero con diseño, código, recursos y composición propios de IsiVoltPro.

NO copiar código, assets, shaders, textos, modelos, tipografías propietarias ni composición exacta de terceros.

La referencia visual aprobada es:

- fondo negro/grafito;
- instalación técnica / digital twin como protagonista;
- gran tipografía editorial;
- azul IsiVoltPro;
- profundidad real;
- loader de marca;
- scroll narrativo;
- transición continua Hero → Ecosistema;
- interacción de nodos;
- acceso central siempre visible.

## Estado de partida

Repositorio:

`izc05/isivoltpro-web-v3`

Rama base:

`main`

HEAD de referencia antes de este documento:

`d4cd10caf32a2aab1f90bc5540984c08e77be8b2`

Tecnología actual:

- Astro 7.1.4
- TypeScript 5.9.3
- GitHub Pages
- build estático
- Node >= 22

La Home actual contiene una Experience V1 basada principalmente en HTML/CSS. Debe conservarse como referencia/rollback, pero V2 debe sustituirla visualmente en la Home una vez validada.

Documentación existente que debe leerse antes de tocar código:

- `README.md`
- `docs/ROADMAP-V3.md`
- `docs/HOME-EXPERIENCE-V1.md`
- este archivo

## Regla de trabajo

Una fase → validación → revisión de Isi → siguiente fase.

NO abrir PR.
NO mergear a `main`.
NO desplegar cambios finales a `main` sin aprobación de Isi.

Crear rama:

`feat/home-experience-v2-webgl`

Trabajar exclusivamente en esa rama.

## Paso 0 — comprobación inicial

Ejecutar:

```powershell
git status
git branch --show-current
git rev-parse HEAD
git fetch origin --prune --tags
git log --oneline -8
```

Esperado:

- working tree limpio;
- `main` actualizado;
- documentación V1/V2 presente.

Si existen cambios locales no relacionados, DETENERSE y explicarlos.

Después:

```powershell
git switch main
git pull --ff-only
git switch -c feat/home-experience-v2-webgl
```

## Paso 1 — baseline

Ejecutar:

```powershell
npm install --no-audit --no-fund
npm run check
```

Debe pasar antes de modificar nada.

## Paso 2 — dependencias V2

Instalar únicamente:

```powershell
npm install three gsap
```

No añadir React.
No añadir Vue.
No añadir Svelte.
No añadir librerías 3D adicionales salvo necesidad demostrada.

## Arquitectura objetivo

```text
INTRO / LOADER ISIVOLTPRO
        ↓
DIGITAL FACILITY HERO
        ↓
CAMERA / SCROLL TRANSITION
        ↓
ECOSISTEMA INTERACTIVO
        ↓
FLUJO OPERATIVO
        ↓
APLICACIONES
        ↓
ACCESO / DEMO
```

## FASE V2.1 — Loader IsiVoltPro

Crear un loader premium a pantalla completa.

Objetivo visual:

```text
ISIVOLT
    PRO

00 → 100
INICIALIZANDO ECOSISTEMA
```

Requisitos:

- negro/grafito;
- palabra ISIVOLTPRO como protagonista;
- `PRO` en azul IsiVoltPro;
- línea/scan luminosa muy sutil;
- porcentaje ligado al progreso real de assets cuando exista carga WebGL;
- transición de salida limpia;
- duración mínima artificial: ninguna;
- no bloquear al usuario por animaciones innecesarias;
- respetar `prefers-reduced-motion`;
- si WebGL falla, la web debe seguir siendo usable.

La salida del loader debe revelar el Hero, no provocar un flash blanco.

DETENERSE al finalizar V2.1 y mostrar resultado local a Isi antes de continuar si se está trabajando en modo interactivo.

## FASE V2.2 — Digital Facility Hero

Sustituir el Hero CSS actual por una composición de tres capas:

### Capa A — background cinematográfico

Usar una imagen aprobada de una instalación técnica digital/cinematográfica si está disponible en:

`public/images/home/digital-facility-source.*`

Si NO existe, NO usar stock ni inventar otra imagen sin aprobación.
Detenerse y pedir a Isi que coloque el asset aprobado.

La imagen debe contener preferentemente solo:

- instalación;
- arquitectura;
- IsiVoltPro Core;
- luces;
- atmósfera;

NO debe depender de texto rasterizado dentro de la imagen.

### Capa B — HTML real

Conservar como texto HTML:

`TODA TU INSTALACIÓN`

`CONECTADA A UN SOLO SISTEMA`

Navegación:

- Ecosistema
- Aplicaciones
- Cómo funciona
- Acceder
- Solicitar demo

Todo debe ser nítido en 4K y responsive.

### Capa C — WebGL transparente

Crear un canvas Three.js transparente centrado sobre el núcleo.

Primera escena V2:

- Core oscuro metálico;
- bordes/energía azul IsiVoltPro;
- halo;
- partículas discretas;
- haz vertical de luz;
- nodos técnicos;
- líneas de conexión;
- rotación casi imperceptible;
- perspectiva/parallax de ratón muy moderado.

No hacer estética de videojuego.
No neon cyberpunk.
No exceso de bloom.
No hologramas gratuitos.

## FASE V2.3 — Scroll narrativo GSAP

Usar `gsap` + `ScrollTrigger`.

El Hero debe permanecer fijado durante una parte del scroll.

Timeline conceptual:

```text
0%   instalación completa
20%  tipografía comienza a separarse
40%  cámara se acerca al Core
60%  arquitectura física pierde presencia
80%  aparecen conexiones de ecosistema
100% transición visual a Ecosistema
```

Requisitos:

- `scrub` suave;
- `pin` únicamente cuando aporte valor;
- evitar saltos de layout;
- no romper scroll en móvil;
- degradar efectos en pantallas pequeñas;
- detener RAF/render cuando la escena no está visible;
- limitar `devicePixelRatio` para rendimiento.

## FASE V2.4 — Ecosistema interactivo

Estructura funcional inicial:

1. IsiVoltPro OT — OPERATIVA
2. Herramientas QR / NFC — OPERATIVA
3. Preinspecciones BT — BETA
4. Activos — PRÓXIMAMENTE
5. Mantenimiento — PRÓXIMAMENTE
6. Inventario — PRÓXIMAMENTE

Diseño:

- gran palabra `ECOSISTEMA` de fondo, baja opacidad;
- listado editorial a la izquierda;
- mapa 3D / isométrico / WebGL a la derecha;
- IsiVoltPro Core en el centro;
- módulos conectados alrededor.

Interacción desktop:

hover/focus sobre una aplicación → iluminar su nodo y conexión → atenuar ligeramente las demás.

Debe funcionar también con teclado.

## FASE V2.5 — Flujo operativo

Representar:

`ACTIVO → INCIDENCIA → ORDEN DE TRABAJO → ACTUACIÓN → CIERRE → HISTÓRICO`

No usar seis cards genéricas.

Usar una línea/recorrido visual ligado al scroll.

Ejemplo de contenido realista:

- Activo: `QGBT-01`
- Incidencia: `Disparo de protección`
- OT: `Asignada a electricidad`
- Actuación: `Revisión y sustitución`
- Cierre: `Evidencia + material`
- Histórico: `Intervención registrada`

## FASE V2.6 — Acceso

Mantener siempre visible en navegación:

- `Acceder`
- `Solicitar demo`

Ruta de acceso:

`/acceso/`

Esta fase NO implementa todavía autenticación real si no está conectada al backend correspondiente.

Debe preparar visualmente:

```text
LOGIN
  ↓
ORGANIZACIÓN
  ↓
LANZADOR DE APLICACIONES
```

No inventar seguridad en GitHub Pages.

## Responsive

Desktop >= 1200:

- experiencia completa Three.js + GSAP;
- parallax;
- hover;
- scroll camera.

Tablet:

- escena simplificada;
- menos partículas;
- menos parallax.

Móvil:

- priorizar rendimiento;
- background estático/cinemático;
- canvas simplificado o desactivado si el coste es alto;
- sin scroll horizontal;
- tipografía legible;
- CTA accesibles.

## Rendimiento

Objetivos:

- no renderizar Three.js fuera de viewport;
- DPR máximo aproximadamente 1.5–1.75;
- no cargar modelos enormes;
- preferir geometría simple y texturas comprimidas;
- evitar assets innecesarios;
- lazy load de escenas posteriores;
- fallback visual si WebGL no está disponible.

## Accesibilidad

- `prefers-reduced-motion` obligatorio;
- contenido principal accesible sin WebGL;
- canvas decorativo cuando corresponda;
- navegación por teclado;
- focus visible;
- texto importante nunca únicamente rasterizado en imagen/canvas.

## Archivos sugeridos

No es obligatorio usar exactamente estos nombres, pero separar responsabilidades:

```text
src/components/home-v2/
  HomeLoader.astro
  DigitalFacilityHero.astro
  EcosystemScene.astro
  OperationalFlow.astro
  AccessCTA.astro

src/scripts/home-v2/
  digital-facility.ts
  ecosystem-scene.ts
  home-scroll.ts

src/styles/home-v2/
  loader.css
  hero.css
  ecosystem.css
  flow.css
  access.css

public/images/home/
public/models/home/
public/textures/home/
```

## NO HACER

- no modificar V2 antiguo;
- no introducir vídeo como solución principal;
- no meter Base64 de imágenes/vídeos en código;
- no copiar Lusion;
- no usar una captura completa como página web;
- no poner todos los textos dentro de una imagen;
- no hacer dashboards ficticios;
- no añadir librerías sin justificar;
- no hacer merge a main;
- no abrir PR;
- no continuar a backend/login real en esta fase.

## Validación técnica obligatoria

Al acabar cada bloque importante:

```powershell
npm run check
npm run build
```

Además probar manualmente:

- Chrome desktop;
- viewport 1920x1080;
- viewport 1440x900;
- móvil aproximado 390x844;
- `prefers-reduced-motion`;
- navegación con teclado;
- recarga directa en GitHub Pages con base `/isivoltpro-web-v3/`.

## Entrega de Codex antes de parar

Mostrar:

1. rama actual;
2. HEAD;
3. archivos creados/modificados;
4. dependencias añadidas;
5. resultado de `npm run check`;
6. resultado de `npm run build`;
7. URL local de preview/dev;
8. capturas o descripción exacta de Hero desktop y móvil;
9. cualquier limitación real encontrada;
10. NO hacer merge ni PR.

## Criterio de éxito V2

La Home debe dejar de parecer una composición CSS estática y empezar a sentirse como una experiencia digital premium:

- loader de marca;
- instalación cinematográfica;
- Core WebGL real;
- profundidad;
- movimiento controlado;
- transformación mediante scroll;
- ecosistema interactivo;
- rendimiento aceptable;
- identidad inequívocamente IsiVoltPro.
