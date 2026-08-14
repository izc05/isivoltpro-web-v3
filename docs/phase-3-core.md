# FASE 3 — ISIVOLTPRO CORE

Estado: EN REVISIÓN FINAL
Rama: feat/home-3d-lab
Base industrial protegida: `/lab-3d-base-v1/`
Base visual Core aprobada por Isi: `/lab-3d-phase31/`

## Regla de trabajo
La BASE INDUSTRIAL V1 no se modifica ni se sustituye. Cada evolución del Core se publica en una ruta nueva y debe compararse contra la base estable.

Decisión visual vigente:
- Core 3.1 es la referencia visual aprobada y la base de evolución.
- Core 3.2 se conserva como experimento de detalle físico, pero NO se promueve como base.
- Core 3.3 parte directamente de Core 3.1.

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

## 3.1 — Arquitectura CORE V1 — APROBADO VISUALMENTE
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

## 3.2 — Acabado físico CORE V2 — EXPERIMENTO CONSERVADO / NO PROMOVIDO
Ruta de revisión: `/lab-3d-phase32/`
Blob candidato validado: `bc1b5573dfae4919ab928ffaf4a5ad88123604f2`

3.2 añadió una capa de ensamblaje, juntas, tornillería, paneles, ventilación, indicadores y otros detalles físicos sobre 3.1.

Decisión posterior de Isi:
- se prefiere visualmente Core 3.1;
- 3.2 se mantiene disponible como referencia y banco de ideas;
- sus detalles NO se incorporan automáticamente a las siguientes fases;
- cualquier detalle de 3.2 que se recupere en el futuro deberá justificarse de forma individual.

## 3.3 — Integración funcional sobre CORE 3.1 — CANDIDATO VALIDADO
Ruta de revisión: `/lab-3d-phase33/`
Blob candidato validado: `5f4a3aeb227612339078948df8c711a848ed4ed3`

3.3 conserva Core 3.1 como base visual exacta y añade únicamente una capa ligera de integración operativa sincronizada con su cámara.

Integración implementada:
- cuatro rutas operativas asociadas a los cuatro puertos existentes;
- Mechanical → zona real de bombas y tuberías;
- HVAC → red real de conductos superiores;
- Climate → cadena de equipos térmicos interior/exterior;
- Electrical → bahía real de distribución eléctrica;
- etiquetas de sistema proyectadas sobre los destinos reales;
- pulsos de señal sobre rutas físicas existentes;
- anillos discretos en puerto y destino;
- selección por capítulo sin modificar el Core;
- lenguaje común de estados NORMAL / ATTENTION / MAINTENANCE / ALARM;
- NORMAL = cian IsiVoltPro;
- ATTENTION = ámbar;
- MAINTENANCE = azul técnico;
- ALARM = rojo, únicamente sobre la ruta afectada;
- capítulo final devuelve todos los sistemas a NORMAL para una lectura limpia de convergencia.

Decisiones visuales y de rendimiento:
- no se utiliza la capa de detalle 3.2;
- no se modifica la geometría de Core 3.1;
- no se añade ningún asset externo;
- no se añade bloom ni postprocesado adicional;
- no se añaden sombras nuevas;
- el overlay usa una cámara y target sincronizados con 3.1;
- las rutas permanecen tenues cuando no están seleccionadas;
- el estado de alarma no contamina el resto de la instalación;
- se mantienen métricas del render base y del overlay por separado.

## CHECKPOINT DE SALIDA FASE 3
Pendiente únicamente de revisión visual de Isi en `/lab-3d-phase33/`.

Si 3.3 se aprueba:
- FASE 3 se considera cerrada;
- Core 3.1 queda como diseño visual definitivo de esta etapa;
- 3.3 queda como lenguaje de integración y estados;
- la siguiente fase será FASE 4 — red digital / ecosistema, ampliando desde estos cuatro sistemas hacia Water, Assets, Maintenance, Operations y AI sin rediseñar otra vez el Core.

## Criterio de salida FASE 3
El Core debe ser reconocible como una pieza propia de IsiVoltPro, estar físicamente integrado en la planta, aportar identidad de marca, explicar visualmente la convergencia del ecosistema y mantener la fluidez de BASE INDUSTRIAL V1.
