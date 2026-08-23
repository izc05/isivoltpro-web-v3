# Observabilidad Web V3

## Estado

**DESACTIVADA POR DEFECTO.**

La Web V3 no debe cargar PostHog, Sentry ni otro proveedor de telemetría únicamente porque exista una cuenta o una clave disponible. La activación queda condicionada a cerrar la política de privacidad, el criterio de consentimiento y la configuración de producción.

Variables reservadas:

```env
PUBLIC_TELEMETRY_ENABLED=false
PUBLIC_POSTHOG_KEY=
PUBLIC_SENTRY_DSN=
```

Mientras `PUBLIC_TELEMETRY_ENABLED` permanezca en `false`, el objetivo es mantener la web comercial sin cookies de analítica ni peticiones a proveedores de observabilidad.

## Qué queremos medir cuando se apruebe

El objetivo no es recopilar datos por recopilar. Solo medir preguntas de producto/comercial que permitan mejorar la web y el embudo.

### Navegación comercial

- `page_view` — página comercial visitada.
- `solution_viewed` — apertura de Soluciones o una solución concreta.
- `maintenance_app_viewed` — visita a App Mantenimiento.
- `resource_viewed` — apertura de una guía.
- `pricing_viewed` — visita a Planes.

### Intención

- `demo_cta_clicked` — clic en Solicitar demo.
- `maintenance_app_cta_clicked` — clic hacia App Mantenimiento.
- `implementation_viewed` — apertura de Cómo empezar / Implantación.
- `security_viewed` — apertura de Seguridad.
- `access_clicked` — salida desde la web comercial hacia Acceso, cuando ese enlace apunte a la plataforma real.

### Atributos mínimos

Evitar PII. Los eventos comerciales deberían limitarse a propiedades de contexto como:

- `page_group`: home | product | solutions | apps | sectors | resources | trust | conversion
- `route`
- `cta_location`: hero | section | footer | mobile_menu
- `viewport_group`: mobile | tablet | desktop
- `referrer_group` cuando pueda obtenerse sin introducir identificadores sensibles.

No enviar nombre, correo, teléfono, empresa, contenido de formularios, texto introducido por el visitante ni identificadores internos de clientes.

## Embudo inicial

```text
Home
  ↓
Soluciones / Producto
  ↓
App Mantenimiento / Apps / Sectores
  ↓
Implantación / Planes / FAQ / Seguridad
  ↓
Solicitar demo
```

Preguntas que debería responder PostHog:

1. ¿Qué entrada genera más intención: Soluciones, Producto o App Mantenimiento?
2. ¿Los autónomos navegan de forma diferente a pequeñas empresas?
3. ¿Qué guías llevan a una segunda página comercial?
4. ¿Qué CTA genera más clics hacia demo?
5. ¿Dónde abandona el visitante antes de entender la propuesta?

## Errores con Sentry

Sentry se reservará para errores reales de producción y problemas de frontend que afecten la experiencia.

Prioridades:

- errores JavaScript no controlados;
- fallos de carga de recursos propios;
- excepciones en futuras integraciones de formulario o acceso;
- regresiones tras despliegues.

Antes de activarlo deben revisarse:

- scrubbing de datos sensibles;
- envío de URL/query string;
- breadcrumbs automáticos;
- session replay, que permanecerá desactivado hasta tener una decisión explícita de privacidad;
- retención y región del proyecto;
- texto de privacidad/cookies correspondiente.

## Regla de activación

No activar observabilidad hasta cumplir simultáneamente:

1. política de privacidad definitiva;
2. decisión documentada sobre consentimiento/cookies;
3. claves de producción fuera del repositorio;
4. CSP actualizada únicamente con los hosts estrictamente necesarios;
5. QA que confirme que con telemetría desactivada no se realizan peticiones externas;
6. QA equivalente con telemetría activada en un entorno no productivo;
7. revisión de eventos para confirmar ausencia de PII.

## Implementación futura

La integración debe vivir detrás de un único componente/gate compartido y no dispersar llamadas directas por todas las páginas. El gate decidirá si carga cada proveedor y expondrá funciones pequeñas como `track()` y `captureError()`.

La web comercial debe seguir funcionando completamente aunque PostHog o Sentry estén bloqueados por navegador, CSP, red o consentimiento.
