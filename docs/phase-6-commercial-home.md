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

## 6.7 — Ecosistema visual completo — COMPLETADO / APROBADO PARA CONTINUAR

Ruta: `/lab-3d-phase67/`
Blob: `d3a86af74ba85fac5a13b27e8ef91b015be67489`

Resultado:

- conserva íntegramente 6.6;
- presenta las capas `FÍSICO → DIGITAL → INTELIGENCIA`;
- incorpora `ISIVOLTPRO CORE` como punto de convergencia sin sustituir el Core 3.1 aprobado;
- integra `ECOSYSTEM BASE V1` con carga diferida mediante un único `iframe` same-origin;
- el WebGL no se inicializa al abrir la Home;
- limpia en runtime el cromado de laboratorio sin modificar el archivo congelado;
- conserva escena, cámara, sistemas, Water, rutas digitales y Core aprobados;
- no modifica ENTRY V1 ni `src/pages/index.astro`.

Arquitectura:

`HOME COMERCIAL → carga diferida → 1 iframe same-origin → ECOSYSTEM BASE V1 → runtime cleanup → escena WebGL existente`

## 6.8 — Aplicaciones IsiVoltPro — COMPLETADO TÉCNICAMENTE / PENDIENTE DE REVISIÓN VISUAL

Ruta: `/lab-3d-phase68/`
Blob validado: `79740d7035818337a1684eb5c8175834c51af7a0`

### Objetivo

Presentar las aplicaciones principales como partes de un único Ecosistema IsiVoltPro, evitando que se perciban como herramientas o productos aislados.

### Implementado

- conserva íntegramente 6.7;
- añade el bloque `APLICACIONES ISIVOLTPRO` antes del puente comercial final;
- fija el mensaje `DISTINTAS HERRAMIENTAS. UN MISMO CONTEXTO.`;
- incorpora un mapa común `INSTALACIÓN → ACTIVOS → TRABAJO → HISTÓRICO → INTELIGENCIA`;
- presenta siete aplicaciones/capacidades:
  1. `ACTIVOS` — identidad, ubicación, sistema, estado, criticidad y documentación vinculada;
  2. `MANTENIMIENTO` — preventivo, correctivo, revisiones y próximas actuaciones;
  3. `ÓRDENES DE TRABAJO` — prioridad, asignación, intervención, evidencias y cierre;
  4. `INSPECCIONES` — checklists, observaciones, resultados y evidencias;
  5. `DOCUMENTACIÓN` — planos, manuales, informes, fotografías y versiones ligadas al contexto;
  6. `USUARIOS Y ORGANIZACIONES` — organizaciones, miembros, roles y acceso por contexto;
  7. `ISIVOLTPRO AI` — capa transversal de consulta y asistencia basada en contexto técnico, identificada expresamente como capacidad en desarrollo;
- cada tarjeta explica qué papel cumple y qué relación mantiene con el contexto común;
- añade un ejemplo de relación entre aplicaciones:
  `INSPECCIÓN → OT → ACTIVO → DOCUMENTACIÓN → HISTÓRICO`;
- deja explícito que las páginas individuales de aplicaciones se construirán en fases posteriores y no forman parte todavía de esta Home;
- añade navegación `Aplicaciones`;
- responsive incluido;
- no modifica `src/pages/index.astro`;
- no modifica ENTRY V1;
- no modifica ECOSYSTEM BASE V1.

### Criterio de revisión

6.8 debe transmitir que:

- IsiVoltPro es un ecosistema y no siete herramientas separadas;
- cada persona puede entrar por una tarea distinta sin perder el contexto común;
- Activos funciona como referencia técnica y el Histórico como memoria de la operación;
- Mantenimiento, OT e Inspecciones ejecutan trabajo alrededor del activo;
- Documentación conserva evidencias y conocimiento;
- Usuarios/Organizaciones define quién opera en cada contexto;
- IsiVoltPro AI queda preparada como capa transversal sin prometer funciones aún no desplegadas.

### Regla para futuras páginas

Las tarjetas de esta fase no se convierten todavía en páginas funcionales. Tras cerrar la Home, cada aplicación podrá evolucionar a su propia página comercial y posteriormente conectarse con la plataforma real.

## 6.9 — Sectores / casos de uso — SIGUIENTE SOLO TRAS APROBACIÓN DE 6.8

Presentar sectores y contextos de uso sin inventar clientes, métricas ni casos reales no demostrados.

## 6.10 — Conversión comercial

Solicitar demo, contacto y acceso.

## 6.11 — HOME V1 COMPLETA

Solo tras aprobar todos los checkpoints se promoverá la Home de laboratorio a `src/pages/index.astro`.
