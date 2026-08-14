# FASE 6 — HOME COMERCIAL DEFINITIVA

Estado: CERRADA / HOME V1 PROMOVIDA
Rama de laboratorio: `feat/home-3d-lab`
Home pública: `src/pages/index.astro` = HOME V1
Entrada estable protegida: `/lab-3d-entry-v1/`
Ecosistema estable protegido: `/lab-3d-ecosystem-v1/`

## Resultado

FASE 6 convierte el sistema visual y técnico construido en FASES 1–5 en una Home comercial autónoma, en español y orientada a explicar IsiVoltPro antes de profundizar en producto y 3D.

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

La entrada cinematográfica `ENTRY V1` continúa protegida y disponible como experiencia independiente. `ECOSYSTEM BASE V1` continúa congelado y se reutiliza con carga diferida desde la Home.

## Checkpoints

- 6.1 — Base comercial — `/lab-3d-phase61/` — `77b1167c8ba1dac06ab454fe45fd2c08bb99d493`
- 6.2 — Qué es el Ecosistema — `/lab-3d-phase62/` — `a821011afefe189554aaafc5a6c67a6fff83f2cf`
- 6.3 — Qué ofrecemos — `/lab-3d-phase63/` — `5f6acf793dab80eca1d9f3068e6b9e4f02836769`
- 6.4 — Cómo funciona — `/lab-3d-phase64/` — `f041443f095d7646f049b6ddfe3e06c878d97290`
- 6.5 — Interfaz de producto — `/lab-3d-phase65/` — `b1207f334681c34bab226a805ace759f16276074`
- 6.6 — Instalación física — `/lab-3d-phase66/` — `c87226bd6a797edd175e08526b592de82d8b1026`
- 6.7 — Ecosistema visual / Core — `/lab-3d-phase67/` — `d3a86af74ba85fac5a13b27e8ef91b015be67489`
- 6.8 — Aplicaciones IsiVoltPro — `/lab-3d-phase68/` — `79740d7035818337a1684eb5c8175834c51af7a0`
- 6.9 — Sectores / casos de uso — `/lab-3d-phase69/` — `63484210f9dc0cfa68d230e76c2168a7eb6c85a1`
- 6.10 — Conversión comercial — `/lab-3d-phase610/` — `0085105bfa157e3d3935e2eb31785a8ae132fd36`
- 6.11 — Home V1 autónoma — `/lab-3d-phase611/` — `fa160f752ae37573ce8b55fd4132dd5e9b37150e`

## 6.11 — HOME V1 AUTÓNOMA

La arquitectura final no encadena checkpoints. Los pasos 6.3–6.10 sirvieron como capas de laboratorio para proteger cada revisión, pero la Home V1 fue consolidada en un único archivo Astro antes de promoverla.

Arquitectura final:

`HOME V1 AUTÓNOMA → imagen industrial local + carga diferida de ECOSYSTEM BASE V1`

No existe en producción la cadena:

`HOME → 6.10 → 6.9 → 6.8 → ...`

La Home conserva:

- navegación `Ecosistema · Cómo funciona · Producto · Sectores`;
- Hero `TODA TU INSTALACIÓN. UN SOLO SISTEMA.`;
- lógica `INSTALACIÓN → ACTIVOS → TRABAJO → DOCUMENTACIÓN → HISTÓRICO → INTELIGENCIA`;
- flujo `ACTIVO → INCIDENCIA → OT → TÉCNICO → ACTUACIÓN → CIERRE → HISTÓRICO`;
- interfaz conceptual con datos ilustrativos;
- contexto industrial de Electricidad, HVAC y Agua/Infraestructura;
- visor de `ECOSYSTEM BASE V1` con un único iframe same-origin y carga diferida;
- Activos, Mantenimiento, OT, Inspecciones, Documentación, Usuarios/Organizaciones e IsiVoltPro AI;
- sectores como contextos de uso, sin clientes ni métricas inventadas;
- IsiVoltPro AI identificada como capacidad en desarrollo;
- demo/contacto/acceso sin fingir canales todavía no conectados;
- responsive y `prefers-reduced-motion`.

## Promoción a Home pública

Aprobación recibida mediante `continúa` tras la revisión del candidato 6.11.

La promoción se valida de forma separada colocando exactamente el blob de 6.11 en `src/pages/index.astro` y ejecutando CI sobre la ruta Home real antes de actualizar `main`.

Blob esperado de `src/pages/index.astro` tras la promoción:

`fa160f752ae37573ce8b55fd4132dd5e9b37150e`

`ENTRY V1` y `ECOSYSTEM BASE V1` permanecen sin modificar.
