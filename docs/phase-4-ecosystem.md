# FASE 4 — ECOSISTEMA ISIVOLTPRO

Estado: CERRADA
Rama de laboratorio: `feat/home-3d-lab`
Base industrial protegida: `/lab-3d-base-v1/`
Core visual aprobado: `/lab-3d-phase31/`
Base de ecosistema congelada: `/lab-3d-ecosystem-v1/`

## Decisión de narrativa visual

La instalación domina la mayor parte del recorrido. El Core no es el objetivo permanente de cámara: funciona como punto de convergencia y cierre.

Secuencia aprobada:

1. vista general de la instalación;
2. mecánica;
3. ventilación/HVAC;
4. climatización y equipo exterior;
5. distribución eléctrica;
6. agua/servicios;
7. activos identificables;
8. mantenimiento y operación;
9. AI como capa de inteligencia;
10. convergencia final en Core 3.1.

Lectura visual:

`instalación física → sistemas técnicos → activos/datos → mantenimiento/operación → inteligencia → IsiVoltPro`

## Reglas aprobadas

### Cámara
- conservar amplitud y desplazamiento de la lógica validada en FASE 2.9;
- aproximarse a equipos cuando se cuenta cada sistema;
- volver a planos abiertos entre capítulos;
- usar Core 3.1 como destino/convergencia, no como target permanente.

### Capas
- sistemas físicos pegados a la instalación;
- software después y por encima del contexto físico;
- AI como última capa;
- color como jerarquía/estado, no como decoración;
- no activar todas las conexiones simultáneamente.

## 4.1 — Recorrido amplio — COMPLETADO
Ruta: `/lab-3d-phase41/`
Blob validado: `1bb202ea1258153388478be822e13202b4a4bd8f`

Resultado: recuperación del recorrido amplio por instalación, Mechanical, HVAC, Climate y Electrical, con Core 3.1 al final.

## 4.2 — Mapa visual del ecosistema — COMPLETADO
Ruta: `/lab-3d-phase42/`
Blob validado: `780a7c82f63dbe3f03ffd037161fdef2fe963eda`

Resultado: incorporación conceptual de Water, Assets, Maintenance, Operations y AI con jerarquía `PHYSICAL → DIGITAL → INTELLIGENCE`.

## 4.3 — Escena consolidada — COMPLETADO
Ruta: `/lab-3d-phase43/`
Blob validado: `d87ed4d07d43eaee110e9c37bd1d42688d95e27e`

Resultado:
- una escena Three.js;
- un canvas WebGL;
- sin iframes de laboratorio;
- Core 3.1 conservado;
- recorrido amplio recuperado;
- Mechanical, HVAC, Climate, Electrical y Water con rutas 3D reales;
- Water con geometría física ligera;
- Assets anclado a coordenadas 3D;
- Maintenance, Operations y AI en HTML proyectado sin segundo renderer;
- DPR adaptativo, bloom contenido, antialias desactivado, instancing y geometrías compartidas;
- Home sin modificar.

## 4.4 — Performance + freeze — COMPLETADO

Decisión: no introducir cambios visuales artificiales sobre 4.3. La escena ya conserva el presupuesto de rendimiento previsto y ha pasado CI/Pages limpia.

FASE 4.4 congela literalmente el blob validado de 4.3 para garantizar reproducibilidad.

Rutas:
- checkpoint 4.4: `/lab-3d-phase44/`
- referencia estable: `/lab-3d-ecosystem-v1/`

Blob congelado para ambas rutas:
`d87ed4d07d43eaee110e9c37bd1d42688d95e27e`

Documento de congelación:
`docs/ecosystem-base-v1.md`

## Presupuesto de rendimiento congelado

- un renderer / un canvas;
- `antialias: false`;
- renderer high-performance;
- DPR adaptativo con límites desktop/móvil;
- bloom contenido;
- geometrías compartidas;
- InstancedMesh en elementos repetidos;
- sin assets externos nuevos en 4.4;
- métricas FPS / DPR / calls / tris visibles para revisión.

## FASE 4 — RESULTADO FINAL

`ECOSYSTEM BASE V1 = ONE WEBGL SCENE → PHYSICAL → DIGITAL → INTELLIGENCE`

FASE 4 queda cerrada. La siguiente fase puede trabajar en entrada/portada y Home comercial usando ECOSYSTEM BASE V1 como escenario técnico protegido.
