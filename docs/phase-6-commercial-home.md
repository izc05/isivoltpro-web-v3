# FASE 6 — HOME COMERCIAL DEFINITIVA

Estado: EN CURSO
Rama de laboratorio: `feat/home-3d-lab`
Home pública actual: PROTEGIDA / SIN MODIFICAR
Entrada estable protegida: `/lab-3d-entry-v1/`
Ecosistema estable protegido: `/lab-3d-ecosystem-v1/`

## Objetivo de FASE 6

Convertir el sistema visual y técnico construido en FASES 1–5 en una Home comercial clara, creíble y útil para un cliente potencial.

La Home debe explicar primero qué es IsiVoltPro, en qué se basa y qué ofrece, mostrar después cómo trabaja sobre un caso real y, solo entonces, profundizar en interfaz, fotografía industrial, experiencia 3D, aplicaciones, sectores y conversión comercial.

Narrativa comercial objetivo:

`INSTALACIÓN FÍSICA → ACTIVOS → TRABAJO TÉCNICO → DOCUMENTACIÓN → HISTÓRICO → INTELIGENCIA → ISIVOLTPRO`

Jerarquía visual:

`FÍSICO → DIGITAL → INTELIGENCIA`

## Flujo objetivo de la página completa

1. Entrada / Eclipse / ENTRY V1.
2. Hero: `TODA TU INSTALACIÓN. UN SOLO SISTEMA.`
3. Qué es el Ecosistema IsiVoltPro.
4. En qué se basa.
5. Qué conecta.
6. Qué ofrecemos.
7. Cómo funciona sobre un caso real.
8. Interfaz de producto detallada.
9. Contexto y fotografía de instalación real.
10. Ecosistema visual 3D / Core.
11. Aplicaciones IsiVoltPro.
12. Sectores / casos de uso.
13. IsiVoltPro AI dentro de la narrativa de producto.
14. Solicitar demo / Acceder / contacto.

## Reglas fijas

- todo el contenido comercial principal debe estar en español;
- `ENTRY V1` no se modifica directamente;
- `ECOSYSTEM BASE V1` no se modifica directamente;
- `src/pages/index.astro` permanece sin cambios mientras se validan checkpoints 6.x;
- evitar claims no demostrados como “tiempo real” si no forman parte todavía del producto funcional desplegado;
- evitar usar “Digital Twin” como categoría principal si puede generar expectativas superiores al alcance actual;
- la experiencia 3D debe apoyar el mensaje comercial, no sustituirlo;
- la Home debe ser comprensible aunque el visitante no abra el recorrido 3D;
- mantener lenguaje industrial premium, técnico y sobrio;
- una fase por vez: construir → validar CI → publicar checkpoint → revisión visual → siguiente fase.

## 6.1 — Base comercial — COMPLETADO

Ruta: `/lab-3d-phase61/`
Blob: `77b1167c8ba1dac06ab454fe45fd2c08bb99d493`

## 6.2 — Qué es el Ecosistema IsiVoltPro — COMPLETADO / APROBADO

Ruta: `/lab-3d-phase62/`
Blob: `a821011afefe189554aaafc5a6c67a6fff83f2cf`

Resultado: narrativa completamente en español, definición del ecosistema, activo como centro del contexto y cadena `INSTALACIÓN → ACTIVOS → TRABAJO TÉCNICO → DOCUMENTACIÓN → HISTÓRICO → INTELIGENCIA`.

## 6.3 — Qué ofrecemos — COMPLETADO / APROBADO

Ruta: `/lab-3d-phase63/`
Blob: `5f6acf793dab80eca1d9f3068e6b9e4f02836769`

Resultado: Gestión de activos, Mantenimiento, Órdenes de trabajo, Documentación técnica, Histórico técnico e IsiVoltPro AI conectados alrededor del activo.

## 6.4 — Cómo funciona — COMPLETADO / APROBADO

Ruta: `/lab-3d-phase64/`
Blob: `f041443f095d7646f049b6ddfe3e06c878d97290`

Resultado:

- ejemplo conceptual `UTA-02`;
- flujo `ACTIVO → INCIDENCIA → OT → TÉCNICO → ACTUACIÓN → CIERRE → HISTÓRICO`;
- el cierre de una OT alimenta el conocimiento del activo;
- sin modificar Home, ENTRY V1 ni ECOSYSTEM BASE V1.

## 6.5 — Interfaz de producto V1 — COMPLETADO / APROBADO PARA CONTINUAR

Ruta: `/lab-3d-phase65/`
Blob: `b1207f334681c34bab226a805ace759f16276074`

Resultado:

- conserva íntegramente 6.4;
- añade un `shell` completo de plataforma IsiVoltPro;
- navegación conceptual por instalaciones, activos, mantenimiento, OT, documentación, histórico e IsiVoltPro AI;
- indicadores de instalación, activo seleccionado `UTA-02`, OT activa, prioridad, técnico, documentación e histórico;
- toda la información se presenta alrededor del mismo contexto técnico;
- se identifica expresamente como dirección comercial/conceptual de producto y no como aplicación PocketBase terminada;
- sin fotografía industrial nueva ni cambios sobre las bases 3D congeladas.

## 6.6 — Contexto industrial / instalación física — COMPLETADO / APROBADO PARA CONTINUAR

Ruta: `/lab-3d-phase66/`
Blob: `c87226bd6a797edd175e08526b592de82d8b1026`

Resultado:

- conserva íntegramente 6.5;
- añade el bloque `INSTALACIÓN FÍSICA` antes del puente hacia la experiencia 3D;
- mensaje central: `EL SOFTWARE NO ES EL CENTRO. LA INSTALACIÓN SÍ.`;
- utiliza la imagen industrial ya aprobada del proyecto como recurso visual autoritativo;
- presenta un plano industrial amplio y tres encuadres para Electricidad, Climatización / HVAC y Agua e infraestructura;
- cada disciplina vuelve a conectarse con activo, OT, trabajo, documentación e histórico;
- establece el puente `INSTALACIÓN REAL → ACTIVO → TRABAJO → DOCUMENTACIÓN → HISTÓRICO`;
- prepara visualmente la entrada al Core y al ecosistema 3D.

## 6.7 — Ecosistema visual completo — COMPLETADO TÉCNICAMENTE / PENDIENTE DE REVISIÓN VISUAL

Ruta: `/lab-3d-phase67/`
Blob validado: `d3a86af74ba85fac5a13b27e8ef91b015be67489`

### Objetivo

Unir de forma explícita la Home comercial con la experiencia 3D ya aprobada y cerrar la narrativa `FÍSICO → DIGITAL → INTELIGENCIA` sin crear una segunda escena 3D ni modificar las bases congeladas.

### Implementado

- conserva íntegramente 6.6;
- añade el bloque `ECOSISTEMA VISUAL` antes del puente comercial final;
- presenta tres capas conectadas:
  1. `CAPA FÍSICA` — Electricidad, Climatización, Agua, Equipos e Infraestructura;
  2. `CAPA DIGITAL` — Activos, Mantenimiento, OT, Documentación e Histórico;
  3. `CAPA DE INTELIGENCIA` — Contexto, consulta, análisis, asistencia técnica e IsiVoltPro AI;
- añade un bloque específico `ISIVOLTPRO CORE` como punto de convergencia, sin rediseñar ni reemplazar el Core 3.1 aprobado;
- integra `ECOSYSTEM BASE V1` mediante un único `iframe` same-origin;
- la escena 3D se carga de forma diferida al acercarse el visitante a la sección o al pulsar el CTA de carga;
- no se inicializa WebGL al abrir la Home;
- al cargar el iframe se ocultan en runtime `.topbar`, `.metrics` y `.lab-button` para presentar la escena como experiencia comercial y no como laboratorio;
- se neutraliza únicamente el primer texto introductorio del recorrido para adaptarlo al contexto comercial;
- no se modifica el archivo congelado `lab-3d-ecosystem-v1.astro`;
- no se modifica `lab-3d-entry-v1.astro`;
- no se modifica `src/pages/index.astro`;
- conserva la escena, cámara, sistemas, Water, rutas digitales y Core aprobados;
- añade resumen final: Origen físico, Contexto conectado, Memoria operativa e Inteligencia;
- responsive y `prefers-reduced-motion` incluidos.

### Arquitectura de integración

`HOME COMERCIAL → carga diferida → 1 iframe same-origin → ECOSYSTEM BASE V1 → runtime cleanup → escena WebGL existente`

No se crea un segundo renderer dentro de la Home.

### Criterio de revisión

6.7 debe conseguir que el visitante entienda, antes y durante el 3D, esta relación:

`INSTALACIÓN FÍSICA → SISTEMAS / ACTIVOS → ISIVOLTPRO CORE → OPERACIÓN → HISTÓRICO → INTELIGENCIA`

El 3D debe sentirse como demostración visual del mensaje comercial, no como una demo técnica separada.

## 6.8 — Aplicaciones IsiVoltPro — SIGUIENTE SOLO TRAS APROBACIÓN DE 6.7

Presentar los módulos principales y preparar sus futuras subpáginas.

## 6.9 — Sectores / casos de uso

Presentar sectores y contextos de uso sin inventar clientes ni métricas.

## 6.10 — Conversión comercial

Solicitar demo, contacto y acceso.

## 6.11 — HOME V1 COMPLETA

Solo tras aprobar todos los checkpoints se promoverá la Home de laboratorio a `src/pages/index.astro`.
