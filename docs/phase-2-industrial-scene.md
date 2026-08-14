# FASE 2 — Escenario industrial real

Estado: EN CURSO
Rama: feat/home-3d-lab

## Regla de trabajo
No usar una fábrica 3D monolítica pesada. La instalación se construirá como un kit modular para controlar composición, cámara, rendimiento, materiales y carga progresiva.

## Formato objetivo
- Preferencia: GLB / glTF.
- Texturas web: 1K o 2K durante integración; subir calidad solo si hace falta.
- Evitar assets 4K/8K en la Home salvo justificación visual.
- Evitar dependencias remotas en producción: los assets finales deben quedar versionados/locales.

## Presupuesto inicial
- Escena base objetivo: <= 150K tris antes del Core definitivo.
- Asset individual preferido: <= 50K tris.
- DPR limitado y postprocesado adaptativo móvil.
- Un asset nuevo cada vez: integrar -> check -> publicar -> revisar.

## Kit CC0 seleccionado

### A — Tuberías industriales
Poly Haven: Modular Industrial Pipes 01
ID: modular_industrial_pipes_01
Formato disponible: glTF
Geometría: ~12K tris
Uso: red hidráulica / mecánica / vapor / infraestructura visual.
Licencia: CC0.

### B — HVAC
Poly Haven: Modular Airduct Circular 01
ID: modular_airduct_circular_01
Formato disponible: glTF
Geometría: ~14K tris
Uso: conductos y ventilación.
Licencia: CC0.

### C — Electricidad
Poly Haven: Utility Box 01
ID: utility_box_01
Formato disponible: glTF
Geometría: ~4K tris
Uso: cuadros / distribución / utility cabinet.
Licencia: CC0.

### D — Climatización exterior
Poly Haven: Exterior Aircon Unit
ID: exterior_aircon_unit
Geometría: ~19K tris
Uso: equipo HVAC / climatización.
Licencia: CC0.

### E — Cableado eléctrico (segunda ronda)
Poly Haven: Modular Electric Cables
ID: modular_electric_cables
Geometría: ~42K tris
Uso: cableado, cajas, conexiones y detalle de infraestructura.
Licencia: CC0.

## Orden de integración
2.1 Selección/licencias/presupuesto — COMPLETADO
2.2 Integrar Modular Industrial Pipes 01 — COMPLETADO
2.3 Validar escala, materiales, iluminación y FPS — COMPLETADO
2.4 Convertir tuberías en infraestructura real — COMPLETADO
2.5 Añadir HVAC circular real — COMPLETADO
2.6 Añadir cuadro/utility box — COMPLETADO
2.7 Añadir unidad HVAC — COMPLETADO
2.8 Componer instalación industrial completa — COMPLETADO
2.9 Optimización final de FASE 2 — COMPLETADO
2.10 Publicar revisión visual y detenerse para aprobación — SIGUIENTE

## Optimización aplicada en 2.9
- Geometría procedural compartida e instanciada para equipos repetidos.
- Menor teselación donde no aporta diferencia visual apreciable.
- Sombras selectivas: equipos y estructura mantienen profundidad; tuberías y conductos finos no consumen shadow pass.
- Shadow map principal limitado y congelable tras resolver los cuatro assets externos.
- DPR adaptativo con suelo y techo controlados para evitar caídas sostenidas de FPS.
- Bloom y partículas reducidos sin eliminar el carácter visual de la escena.
- Métricas visibles de FPS, DPR, draw calls y triángulos para futuras decisiones de calidad.

## Criterio de salida FASE 2
La escena debe dejar de parecer un conjunto de cubos de Three.js y empezar a leerse como una instalación técnica real: tuberías, HVAC, cuadros/equipos y profundidad industrial, manteniendo cámara fluida y carga razonable.
