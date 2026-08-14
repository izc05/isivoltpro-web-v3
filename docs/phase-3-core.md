# FASE 3 — ISIVOLTPRO CORE

Estado: EN CURSO
Rama: feat/home-3d-lab
Base protegida: `/lab-3d-base-v1/`

## Regla de trabajo
La BASE INDUSTRIAL V1 no se modifica ni se sustituye. Cada evolución del Core se publica en una ruta nueva y debe compararse contra la base estable.

## Objetivo del Core
Crear una pieza 3D propia de IsiVoltPro que represente visualmente el punto donde convergen los sistemas técnicos de una instalación sin caer en una estética de ciencia ficción exagerada.

El Core debe leerse como:
- equipo físicamente instalado;
- centro de integración y operación;
- elemento de marca reconocible;
- nodo común entre electricidad, HVAC, climatización, agua/servicios y futuros módulos;
- tecnología contenida dentro de arquitectura industrial.

## Principios de diseño
1. Realismo de ingeniería antes que efectos.
2. Metal oscuro y vidrio técnico como cuerpo principal.
3. Azul eléctrico concentrado dentro del dispositivo, no bañando toda la planta.
4. Base pesada y estructural: nada flotante.
5. Puertos físicos visibles antes de representar conexiones digitales.
6. Animación lenta y funcional.
7. Mantener el presupuesto de rendimiento fijado en FASE 2.9.

## 3.1 — Arquitectura CORE V1 — COMPLETADO
Ruta de revisión: `/lab-3d-phase31/`
Blob candidato validado: `4827c50065fe226711c2d76dd5cbd234766a62e1`

Arquitectura implementada:
- zócalo octogonal multicapa;
- cuatro montantes estructurales;
- arriostramiento inferior y superior;
- cámara exterior de vidrio técnico;
- cámara interior de contención;
- bus energético vertical;
- emisores inferior/superior;
- cuatro anillos de campo internos;
- corona superior de servicio;
- anillo de estado;
- cuatro puertos bajos orientados hacia sistemas reales de la planta;
- conexiones digitales que nacen en esos puertos;
- animación contenida del bus, emisores, anillos y pulsos.

No se añadió ningún asset externo nuevo en 3.1.

## 3.2 — Acabado físico CORE V2 — COMPLETADO
Ruta de revisión: `/lab-3d-phase32/`
Blob candidato validado: `bc1b5573dfae4919ab928ffaf4a5ad88123604f2`

3.2 conserva literalmente la arquitectura y cámara de Core 3.1 y añade una capa de ensamblaje/acabado sincronizada sobre esa referencia.

Detalle implementado:
- juntas de elastómero en las transiciones vidrio/estructura;
- anillos metálicos de retención del vidrio;
- ocho apoyos de aislamiento/antivibración bajo el zócalo;
- tornillería de base instanciada;
- cuatro registros de inspección en el cuerpo inferior;
- paneles de acceso en los cuatro montantes;
- cierres/latches de servicio;
- tornillería de panel instanciada;
- retenedores del vidrio instanciados;
- banda de ventilación técnica en la corona;
- pequeños indicadores de estado cian y servicio ámbar;
- collares físicos en los cuatro puertos de conexión;
- placa neutra de servicio preparada para branding/texto posterior;
- materiales con clearcoat controlado para mejorar lectura de metal sin incrementar bloom.

Decisiones de rendimiento:
- tornillería, retenedores, apoyos, ventilación e indicadores repetidos usan InstancedMesh;
- la capa 3.2 no usa postprocesado ni bloom propio;
- no proyecta sombras adicionales;
- reutiliza exactamente la curva de cámara y target de 3.1;
- se mantiene el control de FPS del render base y se muestran draw calls/triángulos específicos del detalle;
- no se añadió ningún asset externo nuevo en 3.2.

## 3.3 — SIGUIENTE: Integración final del Core
Objetivo: convertir Core V2 en el nodo funcional y visual que explicará el ecosistema IsiVoltPro sin cambiar de nuevo su arquitectura básica.

Siguiente alcance previsto:
- cerrar el lenguaje físico/digital de cada puerto;
- definir estados normal, atención, mantenimiento y alarma sin abuso de color;
- mejorar cómo las conexiones llegan a mecánica, HVAC, climatización y electricidad;
- preparar extensiones posteriores hacia agua, activos, mantenimiento, operaciones y AI;
- hacer que la convergencia de sistemas sea comprensible antes de añadir textos comerciales definitivos;
- mantener BASE INDUSTRIAL V1 y Core 3.1 disponibles como referencias A/B.

## Criterio de salida FASE 3
El Core debe ser reconocible como una pieza propia de IsiVoltPro, estar físicamente integrado en la planta, aportar identidad de marca, explicar visualmente la convergencia del ecosistema y mantener la fluidez de BASE INDUSTRIAL V1.
