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
6. agua/servicios como disciplina física adicional;
7. activos identificables;
8. mantenimiento y operación como capas de software;
9. AI como capa de inteligencia;
10. convergencia final en el Core 3.1 aprobado.

La idea que debe entenderse sin texto comercial definitivo es:
`instalación física → sistemas técnicos → activos/datos → mantenimiento/operación → inteligencia → IsiVoltPro`.

## Regla de cámara
- recuperar amplitud y desplazamiento de FASE 2.9;
- evitar mantener el target sobre el Core durante todo el scroll;
- aproximarse a equipos cuando se cuenta su sistema;
- utilizar el Core como destino/convergencia al final;
- conservar planos abiertos entre capítulos para que el usuario no pierda la orientación espacial;
- no sustituir el recorrido por zooms decorativos.

## Regla de capas
- sistemas físicos se representan pegados a la instalación;
- capas de software aparecen por encima y después de los sistemas físicos;
- AI nunca sustituye el contexto técnico: es la última capa;
- no mostrar todas las conexiones simultáneamente si no aportan información;
- el color se usa como estado/jerarquía, no como decoración.

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

## 4.2 — Mapa visual del ecosistema — COMPLETADO
Ruta de revisión: `/lab-3d-phase42/`
Blob candidato validado: `780a7c82f63dbe3f03ffd037161fdef2fe963eda`

Implementado:
- conserva el recorrido amplio de 4.1 como capa base;
- Mechanical, HVAC, Climate, Electrical y Water se presentan como sistemas físicos diferenciados;
- Water entra como quinta disciplina física sin añadir un asset 3D pesado todavía;
- rutas SVG aparecen de forma contextual y no permanente;
- Assets introduce identidad visual de equipos de distintas disciplinas;
- Maintenance demuestra la relación activo → OT/tarea → técnico;
- Operations agrega estados sin borrar la independencia de cada sistema;
- AI se presenta como última capa, alimentada por contexto de activos, estado, historial y documentación;
- convergencia final mantiene el Core 3.1 aprobado;
- la capa nueva utiliza HTML/SVG y no añade otro renderer Three.js;
- no se añade ningún asset 3D externo nuevo;
- no se modifica Home.

Jerarquía visual validada en 4.2:
`PHYSICAL → DIGITAL → INTELLIGENCE`.

## 4.3 — SIGUIENTE: consolidación del ecosistema en una escena
Objetivo:
- llevar el recorrido amplio y el mapa 4.2 a un montaje técnico único y mantenible;
- reducir la dependencia de iframes de laboratorio;
- anclar rutas/estados a posiciones reales de la escena 3D;
- mantener Core 3.1 como diseño aprobado;
- integrar Water de forma más física cuando aporte valor;
- conservar la jerarquía PHYSICAL → DIGITAL → INTELLIGENCE;
- revisar rendimiento después de consolidar;
- dejar una base preparada para la futura portada/Home comercial.

## Criterio de salida FASE 4
El usuario debe entender visualmente que IsiVoltPro no es un Core aislado: es una plataforma que conecta una instalación completa, sus sistemas, activos, operación, mantenimiento y datos, manteniendo una lectura técnica creíble y una jerarquía visual clara antes de entrar en la narrativa comercial final.
