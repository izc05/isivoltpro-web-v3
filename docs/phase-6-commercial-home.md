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

## 6.6 — Contexto industrial / instalación física — COMPLETADO TÉCNICAMENTE / PENDIENTE DE REVISIÓN VISUAL

Ruta: `/lab-3d-phase66/`
Blob validado: `c87226bd6a797edd175e08526b592de82d8b1026`

### Objetivo

Romper visualmente la sucesión de interfaces y devolver al visitante al origen físico de IsiVoltPro: la instalación donde realmente ocurre el trabajo técnico.

### Implementado

- conserva íntegramente 6.5;
- añade el bloque `INSTALACIÓN FÍSICA` antes del puente hacia la experiencia 3D;
- mensaje central: `EL SOFTWARE NO ES EL CENTRO. LA INSTALACIÓN SÍ.`;
- utiliza la imagen industrial ya aprobada del proyecto como recurso visual autoritativo;
- presenta un plano industrial amplio con tratamiento cinematográfico oscuro y azul técnico;
- reutiliza el mismo entorno mediante tres encuadres/crops diferenciados para mostrar:
  1. Electricidad;
  2. Climatización / HVAC;
  3. Agua e infraestructura;
- cada disciplina vuelve a conectarse con activo, OT, trabajo, documentación e histórico;
- establece explícitamente el puente:
  `INSTALACIÓN REAL → ACTIVO → TRABAJO → DOCUMENTACIÓN → HISTÓRICO`;
- añade navegación `Instalación real`;
- responsive incluido;
- sin modificar `index.astro`;
- sin modificar ENTRY V1;
- sin modificar ECOSYSTEM BASE V1;
- sin introducir todavía nuevas fuentes de fotografía externa ni alterar el ecosistema 3D.

### Criterio de revisión

6.6 debe conseguir que la Home:

- deje de sentirse como una sucesión continua de pantallas digitales;
- recuerde que IsiVoltPro nace de instalaciones y equipos reales;
- mantenga coherencia visual con el lenguaje industrial aprobado;
- prepare de forma natural la entrada al Core y al ecosistema 3D de 6.7.

### Criterio futuro sobre fotografía

La integración de 6.6 establece la dirección visual usando el recurso industrial ya aprobado. Si se aprueba el ritmo y el tratamiento, futuras iteraciones podrán incorporar fotografías o renders adicionales específicos de cuadros eléctricos, HVAC, bombas, tuberías y técnicos, manteniendo siempre coherencia de estilo y licencia.

## 6.7 — Ecosistema visual completo — SIGUIENTE SOLO TRAS APROBACIÓN DE 6.6

Objetivo: unir visualmente las capas `FÍSICO → DIGITAL → INTELIGENCIA` recuperando el Core y la experiencia 3D ya aprobados, sin modificar directamente `ECOSYSTEM BASE V1`.

## 6.8 — Aplicaciones IsiVoltPro

Presentar los módulos principales y preparar sus futuras subpáginas.

## 6.9 — Sectores / casos de uso

Presentar sectores y contextos de uso sin inventar clientes ni métricas.

## 6.10 — Conversión comercial

Solicitar demo, contacto y acceso.

## 6.11 — HOME V1 COMPLETA

Solo tras aprobar todos los checkpoints se promoverá la Home de laboratorio a `src/pages/index.astro`.
