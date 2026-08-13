# IsiVoltPro Web V3 — Roadmap maestro

Este documento es la referencia oficial para el desarrollo de IsiVoltPro Web V3.

## Regla de trabajo

> Una fase → un cambio → build → publicación → revisión de Isi → aprobación → siguiente fase.

No se avanza una fase visual importante sin validar la anterior.

---

# 1. Objetivo de V3

IsiVoltPro no se plantea como una única aplicación, sino como la puerta central de un ecosistema técnico.

La V3 debe cumplir dos funciones:

1. **Web pública comercial**: explicar qué es IsiVoltPro, cómo funciona y qué aplicaciones ofrece.
2. **Puerta de acceso**: permitir que usuarios autorizados entren a las aplicaciones IsiVoltPro desde un único entorno.

Concepto central:

> **IsiVoltPro es el sistema operativo de una instalación técnica.**

Áreas que debe poder conectar progresivamente:

- Activos
- Incidencias
- Órdenes de trabajo
- Mantenimiento
- Herramientas
- Inventario
- Revisiones
- Documentación
- Histórico

---

# 2. Arquitectura general

```text
ISIVOLTPRO WEB V3
│
├── WEB PÚBLICA
│   ├── Portada / Intro
│   ├── Hero
│   ├── Qué es IsiVoltPro
│   ├── Cómo funciona
│   ├── Ecosistema
│   ├── Aplicaciones
│   ├── Sectores
│   ├── Ventajas
│   ├── Solicitar demo
│   └── Footer
│
└── ACCESO ISIVOLTPRO
    ├── Login central
    ├── Selección de organización
    ├── Inicio / Centro de control
    ├── Mis aplicaciones
    └── Administración
        ├── Aplicaciones
        ├── Organizaciones
        ├── Usuarios
        └── Permisos
```

La web pública puede permanecer estática en GitHub Pages.

La autenticación, usuarios, organizaciones, permisos y catálogo dinámico de aplicaciones deben conectarse posteriormente al backend central de IsiVoltPro. La seguridad real no debe depender únicamente de GitHub Pages.

---

# 3. RUTA A — Home pública

## FASE 0 — Foundation + GitHub Pages

**Estado:** COMPLETADA

- Astro
- TypeScript
- build estático
- GitHub Actions
- GitHub Pages
- estructura base de estilos

## FASE 1 — Portada premium

**Estado:** COMPLETADA

- Intro IsiVoltPro
- eclipse azul
- entrada a la experiencia
- identidad visual V3

## FASE 2 — Hero con vídeo

**Estado:** EN REVISIÓN VISUAL

- vídeo industrial
- navegación principal
- mensaje principal
- CTA
- vídeo fuente original sin recomprimir como referencia de calidad

## FASE 3 — Qué es IsiVoltPro

**Estado:** EN REVISIÓN

Objetivo:

> Explicar que IsiVoltPro elimina la fragmentación de información técnica.

Elementos:

- núcleo IsiVoltPro
- Activos
- Mantenimiento
- Órdenes de trabajo
- Histórico
- Una fuente de verdad
- Del dato a la acción
- Histórico técnico vivo

## FASE 4 — Cómo funciona

**Estado:** PENDIENTE

Flujo operativo principal:

```text
ACTIVO
  ↓
INCIDENCIA
  ↓
ORDEN DE TRABAJO
  ↓
ACTUACIÓN
  ↓
CIERRE
  ↓
HISTÓRICO
```

Debe representarse como una línea operativa técnica, no como un conjunto de tarjetas genéricas.

## FASE 5 — Ecosistema

**Estado:** PENDIENTE

Mostrar cómo se conectan:

- Activos
- Incidencias
- Órdenes de trabajo
- Mantenimiento
- Herramientas
- Inventario
- Revisiones
- Documentación
- Histórico

## FASE 6 — Aplicaciones

**Estado:** PENDIENTE

La sección pública enseñará solo aplicaciones reales o claramente marcadas como próximas.

Aplicaciones iniciales reales / avanzadas:

1. IsiVoltPro OT
2. Herramientas QR / NFC
3. Preinspecciones BT

Posibles módulos posteriores:

- Activos e instalaciones
- Mantenimiento preventivo
- Inventario / almacén
- Documentación técnica
- Revisiones reglamentarias
- Centro de control
- IsiVoltPro AI
- Energía
- Contratas / proveedores
- Llaves y accesos
- Legionella / ACS
- Climatización

## FASE 7 — Sectores

**Estado:** PENDIENTE

Sectores iniciales:

- Hospitales
- Industria
- Edificios e instalaciones
- Mantenimiento técnico

## FASE 8 — Ventajas

**Estado:** PENDIENTE

Mensajes principales:

- Trazabilidad
- Control
- Contexto
- Escalabilidad

No utilizar métricas o porcentajes inventados.

## FASE 9 — CTA + Footer

**Estado:** PENDIENTE

CTA principal:

> Tu instalación ya genera datos. IsiVoltPro los convierte en control.

Acciones:

- Solicitar demo
- Acceder a IsiVoltPro

## FASE 10 — Responsive

**Estado:** PENDIENTE

- escritorio
- portátil
- tablet
- móvil

## FASE 11 — Motion / polish

**Estado:** PENDIENTE

Añadir solo movimiento que ayude a comprender o aumente la calidad percibida.

Regla:

> Si la animación llama más la atención que el contenido, se elimina.

## FASE 12 — SEO + rendimiento + publicación definitiva

**Estado:** PENDIENTE

- SEO
- metadatos
- accesibilidad
- rendimiento
- vídeo
- caché
- revisión final

---

# 4. RUTA B — Acceso central IsiVoltPro

Esta ruta se desarrolla coordinada con la Home pública, pero se mantiene separada para no mezclar marketing con autenticación y permisos.

## ACCESO A0 — Arquitectura

**Estado:** DEFINIDA

Flujo previsto:

```text
WEB PÚBLICA
    │
    ├── Solicitar demo
    │
    └── Acceder
          ↓
       LOGIN
          ↓
   ORGANIZACIÓN ACTIVA
          ↓
  CENTRO DE CONTROL
          ↓
  MIS APLICACIONES
```

## ACCESO A1 — Botón Acceder + página `/acceso/`

**Estado:** SIGUIENTE BLOQUE DE ACCESO

La cabecera pública debe mostrar:

- **Acceder**
- **Solicitar demo**

La página `/acceso/` debe usar identidad IsiVoltPro y quedar preparada para autenticación central.

## ACCESO A2 — Login central

**Estado:** PENDIENTE

Objetivo:

- una única cuenta IsiVoltPro
- una única sesión
- acceso a diferentes aplicaciones

La autenticación real se conectará al backend central de IsiVoltPro.

## ACCESO A3 — Selector de organización

**Estado:** PENDIENTE

Flujo:

```text
Usuario
  ↓
Organizaciones permitidas
  ↓
Organización activa
```

Un mismo usuario podrá tener acceso a varias organizaciones sin crear cuentas distintas.

Ejemplos:

- Hospital A
- Empresa B
- Cliente C

## ACCESO A4 — Lanzador de aplicaciones

**Estado:** PENDIENTE

Pantalla principal después de entrar:

```text
MIS APLICACIONES

┌──────────────────────────────┐
│ ISIVOLTPRO OT                │
│ Incidencias y órdenes        │
│                    Entrar →  │
└──────────────────────────────┘

┌──────────────────────────────┐
│ HERRAMIENTAS QR / NFC        │
│ Herramientas, EPIs, maletines│
│                    Entrar →  │
└──────────────────────────────┘

┌──────────────────────────────┐
│ PREINSPECCIONES BT           │
│ Inspección técnica           │
│                    Entrar →  │
└──────────────────────────────┘
```

No debe ser necesario recordar URLs independientes.

## ACCESO A5 — Centro de control

**Estado:** PENDIENTE

El Inicio de IsiVoltPro podrá convertirse progresivamente en una aplicación propia que agregue información de diferentes módulos:

- incidencias
- OT abiertas
- mantenimientos pendientes
- alertas
- revisiones
- actividad reciente

No inventar datos ni dashboards falsos durante la fase comercial.

---

# 5. RUTA C — Administración IsiVoltPro

## ADMIN C0 — Superadmin

**Estado:** DEFINIDO

La administración será accesible solo a usuarios autorizados.

Menú previsto:

```text
ADMINISTRACIÓN
├── Aplicaciones
├── Organizaciones
├── Usuarios
└── Permisos
```

## ADMIN C1 — Administrador de aplicaciones

**Estado:** PENDIENTE

Ruta conceptual:

`/admin/aplicaciones/`

Funciones:

- Añadir aplicación
- Editar aplicación
- Activar / desactivar
- Marcar Beta / Próximamente
- Ordenar
- Cambiar URL
- Subir / elegir icono o logo
- Definir categoría
- Gestionar visibilidad
- Gestionar acceso por organización

Formulario mínimo:

```text
Nombre
Descripción
URL
Logo / icono
Categoría
Estado
Orden
Visibilidad
```

El administrador no instala software ni modifica código. Gestiona el catálogo de aplicaciones disponible en IsiVoltPro.

## ADMIN C2 — Aplicaciones por organización

**Estado:** PENDIENTE

Ejemplo:

```text
Hospital A
├── IsiVoltPro OT           ACTIVA
├── Herramientas QR/NFC     ACTIVA
└── Preinspecciones BT      NO ASIGNADA

Empresa B
├── IsiVoltPro OT           ACTIVA
├── Herramientas QR/NFC     NO ASIGNADA
└── Preinspecciones BT      ACTIVA
```

## ADMIN C3 — Usuarios y roles

**Estado:** PENDIENTE

Roles iniciales de organización:

- owner
- admin
- coordinator
- technician
- viewer
- external_client

Rol de plataforma:

- superadmin

El acceso final a una aplicación dependerá de:

```text
USUARIO
  +
ORGANIZACIÓN ACTIVA
  +
MEMBRESÍA / ROL
  +
APLICACIÓN HABILITADA
  =
ACCESO
```

## ADMIN C4 — Permisos de aplicaciones

**Estado:** PENDIENTE

Debe poder determinarse qué perfiles pueden ver o abrir cada aplicación.

Ejemplo:

```text
IsiVoltPro OT
☑ owner
☑ admin
☑ coordinator
☑ technician
☑ viewer
☐ external_client
```

---

# 6. Modelo de catálogo de aplicaciones

Modelo conceptual inicial:

```text
applications
├── name
├── slug
├── description
├── icon
├── url
├── category
├── status
├── sort_order
└── is_visible
```

Relación con organizaciones:

```text
organization_applications
├── organization
├── application
└── enabled
```

Posteriormente podrá añadirse una capa de permisos más específica si resulta necesaria.

---

# 7. Aplicaciones iniciales del lanzador

## 1. IsiVoltPro OT

Prioridad: MUY ALTA

- Incidencias
- Órdenes de trabajo
- Asignaciones
- Técnicos
- Inicio / cierre de trabajos
- Fotos
- Materiales
- Histórico

## 2. Herramientas QR / NFC

Prioridad: MUY ALTA

- Herramientas
- Maletines
- EPIs
- Asignaciones
- Devoluciones
- QR / NFC
- Histórico de movimientos

## 3. Preinspecciones BT

Prioridad: MUY ALTA

- Inspecciones REBT
- Defectos
- Fotografías
- Cálculos
- Informes

Estas tres aplicaciones deben utilizarse como primeras integraciones reales del lanzador.

---

# 8. Orden recomendado de construcción desde el estado actual

```text
AHORA
│
├── Revisar FASE 3 — Qué es IsiVoltPro
│
├── ACCESO A1 — Botón Acceder + /acceso/
│
├── FASE 4 — Cómo funciona
│
├── FASE 5 — Ecosistema
│
├── FASE 6 — Aplicaciones públicas
│
├── ACCESO A2 — Login central
│
├── ACCESO A3 — Selector organización
│
├── ACCESO A4 — Lanzador
│
├── ADMIN C1 — Administrador de aplicaciones
│
├── ADMIN C2/C3/C4 — Organizaciones, usuarios y permisos
│
├── Conectar aplicaciones reales
│   ├── OT
│   ├── Herramientas QR/NFC
│   └── Preinspecciones BT
│
└── Completar Home pública + responsive + SEO
```

---

# 9. Regla de producto

La V3 debe crecer como plataforma.

Añadir una aplicación nueva en el futuro debe tender a este flujo:

```text
Superadmin
   ↓
Administración
   ↓
Aplicaciones
   ↓
Añadir aplicación
   ↓
Nombre + URL + logo + permisos
   ↓
Asignar a organizaciones
   ↓
Disponible en el lanzador
```

No debería ser necesario modificar manualmente la Home o el lanzador cada vez que se incorpora una nueva aplicación.

---

# 10. Principios no negociables

- No presentar funcionalidades ficticias como terminadas.
- No crear dashboards con métricas inventadas.
- No duplicar sistemas de autenticación.
- Una sola identidad IsiVoltPro.
- Una sola sesión central cuando se implemente el acceso real.
- Permisos ligados a usuario + organización + aplicación.
- Seguridad real fuera de la capa estática de GitHub Pages.
- Las aplicaciones reales existentes tienen prioridad frente a módulos hipotéticos.
- Construcción por fases pequeñas, publicables y reversibles.
