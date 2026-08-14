# FASE 6 — HOME COMERCIAL DEFINITIVA

Estado: EN CURSO
Rama de laboratorio: `feat/home-3d-lab`
Home pública actual: PROTEGIDA / SIN MODIFICAR
Entrada estable protegida: `/lab-3d-entry-v1/`
Ecosistema estable protegido: `/lab-3d-ecosystem-v1/`

## Objetivo de FASE 6

Convertir el sistema visual y técnico construido en FASES 1–5 en una Home comercial clara, creíble y útil para un cliente potencial.

La Home debe explicar primero qué problema resuelve IsiVoltPro y después permitir profundizar en la experiencia 3D.

Narrativa comercial objetivo:

`INSTALACIÓN FÍSICA → ACTIVOS → TRABAJO / MANTENIMIENTO → HISTÓRICO / DOCUMENTACIÓN → INTELIGENCIA → ISIVOLTPRO`

La jerarquía visual protegida sigue siendo:

`PHYSICAL → DIGITAL → INTELLIGENCE`

## Reglas

- `ENTRY V1` no se modifica directamente.
- `ECOSYSTEM BASE V1` no se modifica directamente.
- `src/pages/index.astro` permanece sin cambios mientras se validan checkpoints 6.x.
- evitar claims no demostrados como “tiempo real” si no forman parte todavía del producto funcional desplegado;
- evitar usar “Digital Twin” como categoría principal si puede generar expectativas superiores al alcance actual;
- la experiencia 3D debe apoyar el mensaje comercial, no sustituirlo;
- la Home debe ser comprensible aunque el visitante no abra el recorrido 3D;
- mantener lenguaje industrial premium, técnico y sobrio.

## 6.1 — Hero comercial + propuesta de valor + puente a ENTRY V1 — COMPLETADO TÉCNICAMENTE / PENDIENTE DE REVISIÓN VISUAL

Ruta de revisión: `/lab-3d-phase61/`
Blob validado: `77b1167c8ba1dac06ab454fe45fd2c08bb99d493`

### Objetivo

Validar el primer tramo comercial antes de construir el resto de la Home.

### Implementado

- hero comercial independiente de la Home pública actual;
- reutilización de la imagen industrial existente, sin nuevo vídeo ni renderer 3D;
- posicionamiento principal: `PLATAFORMA DE OPERACIÓN TÉCNICA`;
- titular: `TODA TU INSTALACIÓN. UN SOLO SISTEMA.`;
- descripción centrada en activos, mantenimiento, órdenes de trabajo, documentación e histórico técnico;
- CTA principal `Explorar IsiVoltPro` conectado a `ENTRY V1`;
- CTA secundario hacia el primer bloque `Cómo funciona`;
- mapa lateral comercial dividido en tres capas: Physical / Digital / Intelligence;
- capa Physical: Electricidad, HVAC, Agua y Equipos;
- capa Digital: Activos, Mantenimiento, OT e Histórico;
- capa Intelligence: Documentación, Datos e IsiVoltPro AI;
- primer bloque de narrativa comercial: `El software empieza en el equipo real`;
- tres pilares: identificar activo → convertir estado en trabajo → conservar contexto;
- CTA final del checkpoint hacia la experiencia 3D estable;
- responsive móvil incluido;
- soporte de `prefers-reduced-motion`;
- sin modificar `index.astro`;
- sin modificar ENTRY V1;
- sin modificar ECOSYSTEM BASE V1.

### Criterio de revisión

6.1 debe responder en pocos segundos a tres preguntas:

1. ¿Qué es IsiVoltPro?
2. ¿Qué conecta?
3. ¿Por qué merece la pena explorar la experiencia 3D?

No se construirán todavía las secciones completas de aplicaciones, sectores, prueba social, precios, contacto ni acceso hasta validar este tono y jerarquía.

## 6.2 — SIGUIENTE SOLO TRAS APROBACIÓN DE 6.1

Posible alcance:

- ampliar `Qué es IsiVoltPro` con el Core como concepto de convergencia;
- sección `Cómo funciona` más operativa: activo → incidencia → OT → actuación → cierre → histórico;
- integrar visualmente aplicaciones/módulos sin saturar la Home;
- decidir en qué momento reaparece el recorrido 3D dentro de la narrativa comercial.
