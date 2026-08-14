# FASE 4 — ECOSISTEMA ISIVOLTPRO

Estado: EN CURSO
Rama: feat/home-3d-lab
Base industrial protegida: `/lab-3d-base-v1/`
Core visual aprobado: `/lab-3d-phase31/`

## Decisión de narrativa visual
La instalación debe dominar la mayor parte del recorrido. El Core no será el objetivo permanente de cámara.

Secuencia base:
1. vista general de la instalación;
2. mecánica;
3. ventilación/HVAC;
4. climatización y equipo exterior;
5. distribución eléctrica;
6. regreso a una lectura global;
7. convergencia final en el Core 3.1 aprobado.

La idea que debe entenderse sin texto comercial definitivo es:
`instalación física → sistemas técnicos → datos/estado → convergencia → IsiVoltPro`.

## Regla de cámara
- recuperar amplitud y desplazamiento de FASE 2.9;
- evitar mantener el target sobre el Core durante todo el scroll;
- aproximarse a equipos cuando se cuenta su sistema;
- utilizar el Core como destino/convergencia al final;
- conservar planos abiertos entre capítulos para que el usuario no pierda la orientación espacial;
- no sustituir el recorrido por zooms decorativos.

## 4.1 — Recorrido amplio de ecosistema — COMPLETADO
Ruta de revisión: `/lab-3d-phase41/`
Blob candidato validado: `1bb202ea1258153388478be822e13202b4a4bd8f`

Implementado:
- siete capítulos con más longitud de scroll;
- recuperación del recorrido amplio validado en FASE 2.9 durante la mayor parte de la experiencia;
- capítulos dedicados a instalación, mecánica, HVAC, climatización y electricidad;
- transición progresiva al Core 3.1 solo en la parte final;
- Core 3.1 se conserva como referencia visual aprobada;
- métricas narrativas VIEW / SYSTEM / SCALE / JOURNEY para validar el recorrido;
- no se añade ningún asset 3D nuevo;
- no se modifica Home.

Nota técnica de laboratorio:
4.1 reutiliza las rutas estables 2.9 y 3.1 como capas sincronizadas para validar rápidamente la dirección de cámara y narrativa antes de consolidar el montaje definitivo en una única escena.

## 4.2 — SIGUIENTE: mapa visual del ecosistema
Sin cambiar todavía textos comerciales definitivos:
- hacer visibles conexiones de cada disciplina solo cuando corresponde;
- introducir Water como sistema técnico adicional;
- preparar nodos conceptuales para Assets, Maintenance, Operations y AI;
- separar claramente sistemas físicos de capas de software;
- mantener el recorrido amplio aprobado en 4.1;
- evitar saturación de líneas, etiquetas o color.

## Criterio de salida FASE 4
El usuario debe entender visualmente que IsiVoltPro no es un Core aislado: es una plataforma que conecta una instalación completa, sus sistemas, activos, operación, mantenimiento y datos, manteniendo una lectura técnica creíble.