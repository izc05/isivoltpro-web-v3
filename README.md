# IsiVoltPro Web V3

Web pública y comercial de IsiVoltPro.

IsiVoltPro se posiciona como una plataforma práctica para autónomos, pequeños equipos y empresas de mantenimiento que necesitan controlar clientes, instalaciones, activos, avisos, órdenes de trabajo, mantenimiento preventivo, QR/NFC, documentación e histórico técnico sin implantar un ERP complejo.

## Rama activa de rediseño

`feat/v3-smb-commercial-redesign`

Base protegida:

`main` en `719017c8feba705f17963e3243ce0ba145c6e987`

No hacer merge a `main` hasta revisión visual y validación final.

## Estado real

### Web comercial V3

- Home comercial orientada a autónomos y pequeñas empresas — IMPLEMENTADA EN RAMA
- Entrada inmersiva previa a Home — IMPLEMENTADA
- Producto — IMPLEMENTADO
- Módulos / aplicaciones — IMPLEMENTADO
- Sectores — IMPLEMENTADO
- Planes — IMPLEMENTADO SIN PRECIOS FICTICIOS
- Recursos — IMPLEMENTADO COMO ESTRUCTURA INICIAL
- Empresa — IMPLEMENTADO
- Ecosistema — IMPLEMENTADO
- Contacto / solicitud de demo — DISEÑADO, ENVÍO AÚN NO CONECTADO
- Privacidad — ESTRUCTURA DE PREPRODUCCIÓN
- Cookies — ESTRUCTURA DE PREPRODUCCIÓN
- Aviso legal — ESTRUCTURA DE PREPRODUCCIÓN

### Acceso y plataforma

El acceso real, autenticación, organizaciones, permisos y aplicación SaaS se desarrollan por separado. Esta web pública enlaza a `/acceso/`, pero esta rama comercial no debe implementar ni duplicar la autenticación.

## Dirección visual

- fondo principal ultra blanco;
- azul acompañado de violeta, rosa, naranja, verde y cian;
- gradientes como acento;
- tipografía Manrope + DM Sans;
- mucho espacio en blanco;
- tarjetas con profundidad y sombras suaves;
- dashboard conceptual como demostración visual;
- diseño móvil prioritario;
- intro oscura breve antes de la Home, una vez por sesión;
- respeto de `prefers-reduced-motion`.

## Mensaje principal

> Menos papeleo. Más trabajo bajo control.

La web debe vender utilidad antes que complejidad técnica.

## Reglas no negociables

- No inventar clientes, testimonios ni métricas.
- No presentar funcionalidades futuras como terminadas.
- No fijar precios hasta validarlos con pilotos.
- No activar formularios que recojan datos antes de conectar privacidad y backend.
- No duplicar el sistema de autenticación de IsiVoltPro Platform.
- No mezclar trabajo comercial V3 con el desarrollo de acceso.
- Mantener rutas relativas a `BASE_URL` para facilitar GitHub Pages, Mini PC y VPS.
- Validar cambios con `npm run check`.

## Documentación

- `docs/V3-SMB-COMMERCIAL-REDESIGN.md` — referencia actual del rediseño comercial.
- `docs/ROADMAP-V3.md` — roadmap histórico; puede contener estados anteriores y debe interpretarse junto al documento de rediseño.
- `docs/phase-6-commercial-home.md` — checkpoint de la Home V1 anterior protegida.

## Flujo de despliegue previsto

```text
DESARROLLO / GITHUB
        ↓
MINI PC · STAGING
        ↓
VALIDACIÓN REAL
        ↓
VPS · PRODUCCIÓN
```

`main` conserva la Home V1 hasta aprobar expresamente el rediseño comercial.
