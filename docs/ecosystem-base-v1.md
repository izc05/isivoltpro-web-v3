# ISIVOLTPRO — ECOSYSTEM BASE V1

Estado: CONGELADA
Fecha: 2026-08-14
Fuente visual/técnica: `/lab-3d-phase43/`
Ruta estable: `/lab-3d-ecosystem-v1/`
Blob congelado: `d87ed4d07d43eaee110e9c37bd1d42688d95e27e`
Core aprobado: `/lab-3d-phase31/`
Base industrial protegida: `/lab-3d-base-v1/`

## Qué queda aprobado

ECOSYSTEM BASE V1 congela exactamente la escena validada en FASE 4.3:

- una sola escena Three.js;
- un solo canvas WebGL;
- recorrido amplio de instalación recuperado de la lógica de FASE 2.9;
- Core 3.1 como diseño visual aprobado y destino de convergencia;
- Mechanical, HVAC, Climate, Electrical y Water como disciplinas físicas diferenciadas;
- Water representado con geometría física ligera de servicio;
- rutas 3D reales mediante TubeGeometry/CatmullRom;
- Assets anclado a posiciones reales de equipos;
- Maintenance y Operations como capas digitales posteriores a la lectura física;
- AI como última capa, dependiente de contexto técnico previo;
- etiquetas HTML proyectadas desde coordenadas 3D reales;
- jerarquía visual `PHYSICAL → DIGITAL → INTELLIGENCE`.

## Presupuesto de rendimiento congelado

La base conserva las decisiones ya presentes en 4.3:

- `antialias: false`;
- renderer `high-performance`;
- DPR adaptativo con límites diferenciados desktop/móvil;
- bloom contenido;
- geometrías compartidas e InstancedMesh para elementos repetidos;
- una única escena/render pipeline;
- sin nuevos assets externos en FASE 4.4;
- sin segundo renderer para overlays digitales;
- métricas visibles de FPS / DPR / draw calls / tris para revisión.

FASE 4.4 no introduce cambios visuales deliberadamente. La escena 4.3 ya había pasado CI y producción con el presupuesto de rendimiento previsto; la prioridad en este checkpoint es estabilidad y reproducibilidad.

## Reglas de protección

No modificar directamente `/lab-3d-ecosystem-v1/`.

Cambios futuros deben ocurrir en una ruta/fase nueva y solo promoverse después de revisión visual.

No cambiar sin una fase específica:

- arquitectura del Core 3.1;
- zonificación industrial aprobada;
- recorrido amplio de cámara;
- jerarquía PHYSICAL → DIGITAL → INTELLIGENCE;
- separación técnica entre HVAC, Climate, Electrical, Mechanical y Water;
- sistema de anclaje 3D → HTML;
- presupuesto de rendimiento.

## Qué NO está cerrado todavía

- portada/entrada definitiva;
- loader final basado en progreso real de assets;
- Home comercial definitiva;
- copy final de venta;
- nombres comerciales definitivos de módulos;
- subpáginas del ecosistema;
- login/acceso y puente visual con `isivoltpro-platform`;
- adaptación final SEO/accesibilidad/Lighthouse/browsers.

## Regla para la siguiente fase

La siguiente construcción debe tratar ECOSYSTEM BASE V1 como escenario técnico estable.

La portada y la Home comercial pueden cambiar narrativa, tipografía, composición HTML y timing, pero no deben degradar la lectura de la instalación ni volver a encerrar la cámara alrededor del Core.

Orden visual recomendado:

`entrada → instalación → sistemas → activos/datos → mantenimiento/operación → AI → IsiVoltPro`.
