# FASE 6 — HOME COMERCIAL DEFINITIVA

Estado: EN REVISIÓN FINAL
Rama de laboratorio: `feat/home-3d-lab`
Home pública actual: PROTEGIDA / SIN MODIFICAR
Entrada estable protegida: `/lab-3d-entry-v1/`
Ecosistema estable protegido: `/lab-3d-ecosystem-v1/`

## Objetivo

Convertir el sistema visual y técnico construido en FASES 1–5 en una Home comercial clara, creíble y útil para un cliente potencial.

Narrativa principal:

`INSTALACIÓN FÍSICA → ACTIVOS → TRABAJO TÉCNICO → DOCUMENTACIÓN → HISTÓRICO → INTELIGENCIA → ISIVOLTPRO`

Jerarquía visual:

`FÍSICO → DIGITAL → INTELIGENCIA`

## Flujo de la Home V1

1. Hero: `TODA TU INSTALACIÓN. UN SOLO SISTEMA.`
2. Qué es el Ecosistema IsiVoltPro.
3. En qué se basa.
4. Qué ofrece.
5. Cómo funciona sobre un caso real.
6. Interfaz de producto conceptual.
7. Instalación física / fotografía industrial.
8. Ecosistema visual 3D / Core.
9. Aplicaciones IsiVoltPro.
10. Sectores / casos de uso.
11. Conversión comercial: demo, contacto y acceso.

La entrada cinematográfica `ENTRY V1` se mantiene protegida y disponible como experiencia independiente. Su integración definitiva con la Home se decidirá después de aprobar visualmente la Home V1 completa.

## Reglas fijas

- contenido comercial principal en español;
- no modificar directamente `ENTRY V1` ni `ECOSYSTEM BASE V1`;
- `src/pages/index.astro` permanece sin cambios hasta aprobación explícita del candidato 6.11;
- evitar claims no demostrados;
- evitar presentar `Digital Twin` como categoría principal;
- el 3D apoya el mensaje comercial, no lo sustituye;
- la Home debe entenderse aunque el visitante no cargue el 3D;
- lenguaje industrial premium, técnico y sobrio;
- demo/contacto/acceso no deben fingir canales que todavía no estén conectados.

## Checkpoints aprobados para continuar

### 6.1 — Base comercial
Ruta: `/lab-3d-phase61/`
Blob: `77b1167c8ba1dac06ab454fe45fd2c08bb99d493`

### 6.2 — Qué es el Ecosistema IsiVoltPro
Ruta: `/lab-3d-phase62/`
Blob: `a821011afefe189554aaafc5a6c67a6fff83f2cf`

### 6.3 — Qué ofrecemos
Ruta: `/lab-3d-phase63/`
Blob: `5f6acf793dab80eca1d9f3068e6b9e4f02836769`

### 6.4 — Cómo funciona
Ruta: `/lab-3d-phase64/`
Blob: `f041443f095d7646f049b6ddfe3e06c878d97290`

### 6.5 — Interfaz de producto V1
Ruta: `/lab-3d-phase65/`
Blob: `b1207f334681c34bab226a805ace759f16276074`

### 6.6 — Instalación física
Ruta: `/lab-3d-phase66/`
Blob: `c87226bd6a797edd175e08526b592de82d8b1026`

### 6.7 — Ecosistema visual / Core
Ruta: `/lab-3d-phase67/`
Blob: `d3a86af74ba85fac5a13b27e8ef91b015be67489`

### 6.8 — Aplicaciones IsiVoltPro
Ruta: `/lab-3d-phase68/`
Blob: `79740d7035818337a1684eb5c8175834c51af7a0`

### 6.9 — Sectores / casos de uso
Ruta: `/lab-3d-phase69/`
Blob: `63484210f9dc0cfa68d230e76c2168a7eb6c85a1`

Resultado: hospitales, industria, edificios técnicos, multisitio, electricidad, HVAC e infraestructuras se presentan como contextos de uso, no como clientes o implantaciones demostradas.

### 6.10 — Conversión comercial — APROBADO PARA CONTINUAR
Ruta: `/lab-3d-phase610/`
Blob: `0085105bfa157e3d3935e2eb31785a8ae132fd36`

Resultado:
- `Solicitar demo`, `Contactar` y `Acceder` separados por intención;
- sin formularios ficticios, email inventado ni URL de login inventada;
- CTA real hacia `ENTRY V1`;
- cierre comercial completo.

## 6.11 — HOME V1 COMPLETA — COMPLETADO TÉCNICAMENTE / PENDIENTE DE REVISIÓN VISUAL

Ruta: `/lab-3d-phase611/`
Blob validado: `fa160f752ae37573ce8b55fd4132dd5e9b37150e`

### Consolidación estructural

Durante 6.3–6.10 los checkpoints se construyeron como capas de laboratorio para proteger el trabajo aprobado. Esa estrategia era útil para iterar, pero no se considera arquitectura final de producción.

6.11 elimina esa dependencia y crea una Home V1 autónoma en un único archivo Astro.

Arquitectura de 6.11:

`HOME V1 AUTÓNOMA → imagen industrial local + carga diferida de ECOSYSTEM BASE V1`

No existe la cadena:

`6.11 → 6.10 → 6.9 → 6.8 → ...`

### Implementado

- unifica en una sola página la narrativa aprobada de 6.1–6.10;
- elimina loaders y referencias de checkpoint entre fases;
- navegación final simplificada: `Ecosistema · Cómo funciona · Producto · Sectores`;
- mantiene `Solicitar demo` y `Acceder` como anclas internas mientras los destinos reales no estén definidos;
- conserva el Hero `TODA TU INSTALACIÓN. UN SOLO SISTEMA.`;
- conserva la lógica `INSTALACIÓN → ACTIVOS → TRABAJO → DOCUMENTACIÓN → HISTÓRICO → INTELIGENCIA`;
- conserva el flujo operativo `ACTIVO → INCIDENCIA → OT → TÉCNICO → ACTUACIÓN → CIERRE → HISTÓRICO`;
- integra una interfaz conceptual rica con datos expresamente ilustrativos;
- conserva instalación física y encuadres de Electricidad, HVAC y Agua/Infraestructura;
- reutiliza `ECOSYSTEM BASE V1` mediante un único iframe same-origin con carga diferida y limpieza visual de cromado de laboratorio;
- conserva Activos, Mantenimiento, OT, Inspecciones, Documentación, Usuarios/Organizaciones e IsiVoltPro AI;
- conserva sectores/casos de uso sin referencias comerciales inventadas;
- sustituye microcopy interna de desarrollo por lenguaje apto para un candidato público;
- mantiene IsiVoltPro AI como capacidad en desarrollo;
- mantiene demo/contacto/acceso como canales en preparación, sin simular funcionalidad;
- responsive y `prefers-reduced-motion` incluidos;
- `src/pages/index.astro` permanece sin modificar.

### Criterio de revisión final

La revisión visual debe hacerse de arriba abajo como una única experiencia, comprobando:

1. impacto y claridad del Hero;
2. comprensión de qué es IsiVoltPro;
3. ausencia de repeticiones innecesarias;
4. ritmo entre explicación, producto e instalación física;
5. credibilidad de la interfaz conceptual;
6. integración del visor 3D sin dominar toda la Home;
7. claridad de aplicaciones y sectores;
8. cierre comercial;
9. responsive general;
10. sensación de producto industrial premium y no de página de laboratorio.

## Promoción a Home pública

NO promover todavía.

Solo tras aprobación explícita del candidato `/lab-3d-phase611/` se preparará un cambio separado y validado para sustituir `src/pages/index.astro`.
