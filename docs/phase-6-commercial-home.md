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

## 6.2 — Qué es el Ecosistema IsiVoltPro — COMPLETADO TÉCNICAMENTE / PENDIENTE DE REVISIÓN VISUAL

Ruta de revisión: `/lab-3d-phase62/`
Blob validado: `a821011afefe189554aaafc5a6c67a6fff83f2cf`

### Objetivo

Conseguir que una persona que no conoce IsiVoltPro entienda claramente:

1. qué es el Ecosistema IsiVoltPro;
2. en qué se basa;
3. para qué sirve;
4. qué sistemas conecta.

### Implementado

- toda la narrativa visible pasa a español;
- `PHYSICAL / DIGITAL / INTELLIGENCE` se sustituye por `CAPA FÍSICA / CAPA DIGITAL / CAPA DE INTELIGENCIA`;
- hero redefinido como `ECOSISTEMA DE OPERACIÓN TÉCNICA`;
- explicación principal: IsiVoltPro parte de la instalación real y conecta activos, mantenimiento, OT, documentación e histórico;
- bloque `Qué es el Ecosistema IsiVoltPro` con tres preguntas:
  - qué es;
  - en qué se basa;
  - para qué sirve;
- principio central: `EL ACTIVO COMO CENTRO DEL CONTEXTO`;
- cadena visual completa:
  `INSTALACIÓN → ACTIVOS → TRABAJO TÉCNICO → DOCUMENTACIÓN → HISTÓRICO → INTELIGENCIA`;
- bloque `Qué conecta` con cuatro familias iniciales:
  - Electricidad;
  - Climatización y HVAC;
  - Agua e instalaciones;
  - Activos y equipos;
- capa común de operación mostrada como:
  `ACTIVOS · MANTENIMIENTO · OT · DOCUMENTACIÓN · HISTÓRICO · IA`;
- CTA hacia la experiencia 3D estable;
- responsive móvil y `prefers-reduced-motion`;
- sin modificar `index.astro`;
- sin modificar ENTRY V1;
- sin modificar ECOSYSTEM BASE V1;
- sin añadir todavía nuevas fotografías ni una interfaz de producto más densa.

### Criterio de revisión

6.2 debe permitir responder rápidamente:

- ¿Qué es el Ecosistema IsiVoltPro?
- ¿Por qué empieza en la instalación real?
- ¿Cuál es la relación entre activo, trabajo, documentación e histórico?
- ¿Qué disciplinas técnicas puede organizar bajo una estructura común?

## Feedback visual reservado para siguientes fases

Se deja fijado para no perderlo:

- la interfaz comercial necesita progresivamente más detalle y sensación de producto real;
- se incorporarán estados, OTs, activos, histórico, documentación y otros elementos funcionales en FASE 6.5;
- se incorporarán fotografías/fondos industriales fuera de las interfaces en FASE 6.6;
- más detalle no debe significar más ruido: la interfaz debe seguir siendo técnica, clara y premium.

## 6.3 — Qué ofrecemos — SIGUIENTE SOLO TRAS APROBACIÓN DE 6.2

Alcance previsto:

- Gestión de activos;
- Mantenimiento;
- Órdenes de trabajo;
- Documentación técnica;
- Histórico y trazabilidad;
- IsiVoltPro AI;
- explicar cada capacidad con beneficios concretos sin entrar todavía en una interfaz completa.

## 6.4 — Cómo funciona

Flujo operativo previsto:

`ACTIVO → INCIDENCIA → OT → TÉCNICO → ACTUACIÓN → CIERRE → HISTÓRICO`

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