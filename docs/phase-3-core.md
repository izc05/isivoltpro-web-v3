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

No se ha añadido ningún asset externo nuevo en 3.1.

## 3.2 — SIGUIENTE
Refinar materiales, ensamblajes y detalle físico del CORE V1 sin cambiar su arquitectura general.

Objetivos previstos:
- uniones, tornillería y paneles de acceso;
- mejores transiciones metal/vidrio;
- rejillas o respiración técnica donde tenga sentido;
- mejor lectura de base/corona;
- pequeños indicadores de estado;
- mejorar reflejos y profundidad sin aumentar bloom de forma artificial;
- revisar escala y silueta desde todos los ángulos de cámara.

## 3.3 — Integración final del Core
Después de aprobar 3.2:
- cerrar conexiones físicas/digitales con los sistemas;
- definir lenguaje de estados;
- preparar el Core para storytelling del ecosistema.

## Criterio de salida FASE 3
El Core debe ser reconocible como una pieza propia de IsiVoltPro, estar físicamente integrado en la planta, aportar identidad de marca y mantener la fluidez de BASE INDUSTRIAL V1.
