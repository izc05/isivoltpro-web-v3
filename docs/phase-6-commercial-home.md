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

Resultado: narrativa en español, definición del ecosistema, activo como centro del contexto y cadena `INSTALACIÓN → ACTIVOS → TRABAJO TÉCNICO → DOCUMENTACIÓN → HISTÓRICO → INTELIGENCIA`.

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
- el cierre de una OT alimenta el conocimiento del activo.

## 6.5 — Interfaz de producto V1 — COMPLETADO / APROBADO PARA CONTINUAR

Ruta: `/lab-3d-phase65/`
Blob: `b1207f334681c34bab226a805ace759f16276074`

Resultado:

- conserva íntegramente 6.4;
- añade un `shell` completo de plataforma IsiVoltPro;
- navegación conceptual por instalaciones, activos, mantenimiento, OT, documentación, histórico e IsiVoltPro AI;
- activo `UTA-02`, OT activa, prioridad, técnico, documentación e histórico;
- se identifica como dirección comercial/conceptual de producto, no como aplicación PocketBase terminada.

## 6.6 — Contexto industrial / instalación física — COMPLETADO / APROBADO PARA CONTINUAR

Ruta: `/lab-3d-phase66/`
Blob: `c87226bd6a797edd175e08526b592de82d8b1026`

Resultado:

- mensaje central: `EL SOFTWARE NO ES EL CENTRO. LA INSTALACIÓN SÍ.`;
- plano industrial amplio y tres encuadres para Electricidad, Climatización / HVAC y Agua e infraestructura;
- puente `INSTALACIÓN REAL → ACTIVO → TRABAJO → DOCUMENTACIÓN → HISTÓRICO`.

## 6.7 — Ecosistema visual completo — COMPLETADO / APROBADO PARA CONTINUAR

Ruta: `/lab-3d-phase67/`
Blob: `d3a86af74ba85fac5a13b27e8ef91b015be67489`

Resultado:

- capas `FÍSICO → DIGITAL → INTELIGENCIA`;
- `ISIVOLTPRO CORE` como punto de convergencia;
- `ECOSYSTEM BASE V1` con carga diferida mediante un único `iframe` same-origin;
- sin modificar la escena 3D congelada, ENTRY V1 ni `src/pages/index.astro`.

Arquitectura:

`HOME COMERCIAL → carga diferida → 1 iframe same-origin → ECOSYSTEM BASE V1 → runtime cleanup → escena WebGL existente`

## 6.8 — Aplicaciones IsiVoltPro — COMPLETADO / APROBADO PARA CONTINUAR

Ruta: `/lab-3d-phase68/`
Blob: `79740d7035818337a1684eb5c8175834c51af7a0`

Resultado:

- presenta siete aplicaciones/capacidades: Activos, Mantenimiento, Órdenes de trabajo, Inspecciones, Documentación, Usuarios/Organizaciones e IsiVoltPro AI;
- fija el mensaje `DISTINTAS HERRAMIENTAS. UN MISMO CONTEXTO.`;
- añade la relación `INSPECCIÓN → OT → ACTIVO → DOCUMENTACIÓN → HISTÓRICO`;
- IsiVoltPro AI queda identificada como capacidad en desarrollo;
- las páginas individuales de aplicaciones quedan reservadas para fases posteriores.

## 6.9 — Sectores / casos de uso — COMPLETADO / APROBADO PARA CONTINUAR

Ruta: `/lab-3d-phase69/`
Blob: `63484210f9dc0cfa68d230e76c2168a7eb6c85a1`

Resultado:

- mensaje `UNA MISMA LÓGICA. DISTINTOS ENTORNOS.`;
- Hospitales y centros sanitarios como ejemplo destacado de alta complejidad técnica;
- Industria, Edificios técnicos, Mantenimiento multisitio, Instalaciones eléctricas, HVAC e Infraestructuras como contextos de aplicación;
- contraste `LO QUE CAMBIA` / `LO QUE PERMANECE`;
- nota expresa `CASOS DE USO, NO REFERENCIAS COMERCIALES`;
- sin clientes, implantaciones ni métricas inventadas.

## 6.10 — Conversión comercial — COMPLETADO TÉCNICAMENTE / PENDIENTE DE REVISIÓN VISUAL

Ruta: `/lab-3d-phase610/`
Blob validado: `0085105bfa157e3d3935e2eb31785a8ae132fd36`

### Objetivo

Cerrar la narrativa comercial de la Home con rutas claras para `Solicitar demo`, `Contactar` y `Acceder`, sin simular formularios, correos o URLs de login que todavía no estén definidos.

### Implementado

- conserva íntegramente 6.9;
- sustituye el antiguo puente final hacia el 3D por un cierre comercial completo;
- fija el mensaje `DE LA INSTALACIÓN A UNA DEMO CON CONTEXTO.`;
- presenta tres caminos:
  1. `SOLICITAR DEMO` — una demo orientada por tipo de instalación, disciplinas prioritarias, personas/organización y problema principal;
  2. `CONTACTAR` — conversación técnica/comercial para alcance, integraciones, caso de uso y próximos pasos;
  3. `ACCEDER` — acceso reservado para la plataforma real cuando la URL de producción esté definida;
- el bloque de demo no envía ni simula ningún formulario;
- el bloque de contacto no inventa un email comercial;
- el bloque de acceso no inventa una ruta de login;
- los botones superiores `Acceder` y `Solicitar demo` se redirigen dentro del checkpoint a `#acceso` y `#demo`, evitando rutas falsas;
- mantiene un CTA funcional a `ENTRY V1` para explorar la experiencia 3D ya validada;
- añade el recorrido de conversión:
  `ENTENDER → VER → RECORRER → CONVERSAR → ACCEDER`;
- añade footer comercial con navegación resumida y la jerarquía `FÍSICO → DIGITAL → INTELIGENCIA`;
- responsive incluido;
- no modifica `src/pages/index.astro`;
- no modifica ENTRY V1;
- no modifica ECOSYSTEM BASE V1.

### Criterio de revisión

6.10 debe cerrar la Home con una acción clara sin aparentar que existen canales comerciales o de acceso que todavía no han sido conectados. En la integración final se sustituirán los estados pendientes por destinos reales.

## 6.11 — HOME V1 COMPLETA — SIGUIENTE SOLO TRAS APROBACIÓN DE 6.10

Unificar y revisar el recorrido completo de FASE 6 como candidato final de Home. La promoción a `src/pages/index.astro` solo ocurrirá después de una revisión visual completa y aprobación explícita.
