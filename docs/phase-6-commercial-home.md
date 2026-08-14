# FASE 6 — HOME COMERCIAL DEFINITIVA

Estado: EN CURSO
Rama de laboratorio: `feat/home-3d-lab`
Home pública actual: PROTEGIDA / SIN MODIFICAR
Entrada estable protegida: `/lab-3d-entry-v1/`
Ecosistema estable protegido: `/lab-3d-ecosystem-v1/`

## Objetivo de FASE 6

Convertir el sistema visual y técnico construido en FASES 1–5 en una Home comercial clara, creíble y útil para un cliente potencial.

La Home debe explicar primero qué es IsiVoltPro, en qué se basa y qué ofrece, y después permitir profundizar en la experiencia 3D.

Narrativa comercial objetivo:

`INSTALACIÓN FÍSICA → ACTIVOS → TRABAJO TÉCNICO → DOCUMENTACIÓN → HISTÓRICO → INTELIGENCIA → ISIVOLTPRO`

Jerarquía visual:

`FÍSICO → DIGITAL → INTELIGENCIA`

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

Ruta de revisión: `/lab-3d-phase61/`
Blob validado: `77b1167c8ba1dac06ab454fe45fd2c08bb99d493`

Resultado:

- hero comercial independiente de la Home pública;
- posicionamiento inicial como plataforma de operación técnica;
- titular `TODA TU INSTALACIÓN. UN SOLO SISTEMA.`;
- puente hacia `ENTRY V1`;
- primer mapa de capas físico/digital/inteligencia;
- primera narrativa activo → OT → histórico;
- sin modificar Home, ENTRY V1 ni ECOSYSTEM BASE V1.

## 6.2 — Qué es el Ecosistema IsiVoltPro — COMPLETADO / APROBADO PARA CONTINUAR

Ruta de revisión: `/lab-3d-phase62/`
Blob validado: `a821011afefe189554aaafc5a6c67a6fff83f2cf`

Resultado:

- toda la narrativa visible pasa a español;
- hero redefinido como `ECOSISTEMA DE OPERACIÓN TÉCNICA`;
- explicación de qué es, en qué se basa y para qué sirve IsiVoltPro;
- principio central: `EL ACTIVO COMO CENTRO DEL CONTEXTO`;
- cadena visual:
  `INSTALACIÓN → ACTIVOS → TRABAJO TÉCNICO → DOCUMENTACIÓN → HISTÓRICO → INTELIGENCIA`;
- bloque `Qué conecta`: Electricidad, Climatización/HVAC, Agua e instalaciones y Activos/equipos;
- capa común de operación:
  `ACTIVOS · MANTENIMIENTO · OT · DOCUMENTACIÓN · HISTÓRICO · IA`;
- sin modificar Home, ENTRY V1 ni ECOSYSTEM BASE V1.

## 6.3 — Qué ofrecemos — COMPLETADO TÉCNICAMENTE / PENDIENTE DE REVISIÓN VISUAL

Ruta de revisión: `/lab-3d-phase63/`
Blob validado: `5f6acf793dab80eca1d9f3068e6b9e4f02836769`

### Objetivo

Traducir el concepto de Ecosistema IsiVoltPro a una oferta concreta y comprensible sin entrar todavía en una interfaz completa de producto.

### Implementado

- conserva íntegramente la narrativa visual de 6.2;
- añade el bloque `QUÉ OFRECEMOS` antes del puente hacia la experiencia 3D;
- presenta seis capacidades conectadas:
  1. Gestión de activos;
  2. Mantenimiento;
  3. Órdenes de trabajo;
  4. Documentación técnica;
  5. Histórico técnico;
  6. IsiVoltPro AI;
- cada capacidad explica:
  - qué organiza;
  - qué información conecta;
  - qué parte del flujo técnico representa;
- lógica común final:
  `ACTIVO → TRABAJO → DOCUMENTACIÓN → HISTÓRICO → CONTEXTO`;
- mensaje central: el valor no está en acumular módulos, sino en evitar que cada parte de la operación viva aislada;
- IsiVoltPro AI se presenta como capa futura de asistencia basada en contexto técnico conectado, sin afirmar que esté ya desplegada en producción;
- responsive móvil incluido;
- sin modificar `index.astro`;
- sin modificar ENTRY V1;
- sin modificar ECOSYSTEM BASE V1;
- sin añadir todavía fotografías nuevas ni una interfaz comercial densa.

### Criterio de revisión

6.3 debe responder rápidamente:

- ¿Qué ofrece IsiVoltPro?
- ¿Qué relación existe entre activos, mantenimiento, OT, documentación e histórico?
- ¿Por qué las capacidades tienen más valor conectadas que aisladas?
- ¿Dónde encaja IsiVoltPro AI sin exagerar su estado actual?

## Feedback visual reservado para siguientes fases

Se mantiene fijado:

- la interfaz comercial necesita progresivamente más detalle y sensación de producto real;
- se incorporarán estados, OTs, activos, histórico, documentación y otros elementos funcionales en FASE 6.5;
- se incorporarán fotografías/fondos industriales fuera de las interfaces en FASE 6.6;
- más detalle no debe significar más ruido: la interfaz debe seguir siendo técnica, clara y premium.

## 6.4 — Cómo funciona — SIGUIENTE SOLO TRAS APROBACIÓN DE 6.3

Flujo operativo previsto:

`ACTIVO → INCIDENCIA → OT → TÉCNICO → ACTUACIÓN → CIERRE → HISTÓRICO`

Objetivo: explicar un caso operativo completo de forma visual y creíble antes de mostrar una interfaz detallada.

## 6.5 — Interfaz de producto V1

Objetivo: aumentar el detalle visual y la sensación de producto real mediante activos, estados, OTs, prioridades, histórico, documentación y paneles operativos.

## 6.6 — Contexto industrial / fotografía

Objetivo: introducir fotografía técnica e industrial fuera de la interfaz para reforzar la relación constante entre software e instalación física.

## 6.7 — Ecosistema visual completo

Unir las capas física, digital e inteligencia con el Core y la experiencia 3D.

## 6.8 — Aplicaciones IsiVoltPro

Presentar los módulos principales y preparar sus futuras subpáginas.

## 6.9 — Sectores / casos de uso

Presentar sectores y contextos de uso sin inventar clientes ni métricas.

## 6.10 — Conversión comercial

Solicitar demo, contacto y acceso.

## 6.11 — HOME V1 COMPLETA

Solo tras aprobar todos los checkpoints se promoverá la Home de laboratorio a `src/pages/index.astro`.