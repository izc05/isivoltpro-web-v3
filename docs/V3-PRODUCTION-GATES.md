# IsiVoltPro Web V3 — fases de cierre y gates de producción

Este documento define cuándo la Web V3 puede avanzar de fase y, sobre todo, cuándo **NO** debe avanzar. Su objetivo es evitar que “seguir desarrollando” se convierta en añadir funciones, claims o integraciones sin una necesidad comercial o una validación real.

## Principios permanentes

1. **Público objetivo:** autónomos, pequeños equipos, empresas mantenedoras y negocios con instalaciones propias.
2. **Problema antes que software:** la web debe partir de avisos, OT, preventivos, activos, documentación y coordinación cotidiana.
3. **App Mantenimiento como puerta de entrada:** la plataforma puede crecer, pero no exige implantar todo el ecosistema desde el primer día.
4. **Nada ficticio:** no publicar clientes, resultados, métricas, precios, certificaciones, SLA, testimonios o integraciones no verificadas.
5. **Madurez visible:** núcleo, extensión, integración progresiva e I+D no se presentan como equivalentes.
6. **`main` protegido:** la rama comercial no se fusiona hasta superar todos los gates previos.
7. **`/acceso/` fuera de alcance:** autenticación y plataforma central se desarrollan por separado con Codex.

---

## Fase 1 — Arquitectura comercial

**Estado:** CERRADA.

Incluye:
- Home.
- Producto.
- Soluciones.
- App Mantenimiento.
- Apps/módulos.
- Apps especializadas con estado explícito.
- Sectores y landings.
- Alcance del producto.
- Demo.
- Piloto/contratación.
- Implantación.
- Seguridad.
- Planes sin precios ficticios.
- Recursos/guías.
- FAQ, Empresa, Ecosistema y Contacto de preproducción.

**No reabrir esta fase** para añadir páginas nuevas salvo que exista una necesidad clara de navegación, SEO o decisión del cliente que no esté cubierta por la arquitectura actual.

---

## Fase 2 — Integridad técnica y rendimiento

**Estado:** CERRADA / protegida por CI.

Criterios:
- `npm run check` y build verde.
- auditor de enlaces internos verde.
- sitemap limitado a páginas indexables.
- laboratorios históricos fuera de indexación.
- CSP comercial.
- tipografía local del sistema.
- sin MP4 heredados.
- Three.js fuera de las páginas comerciales.
- presupuesto total `dist` <= 3 MiB.
- Contacto sin `action`, `method` ni recogida activa de PII.
- telemetría externa apagada.

**Contraindicación para avanzar:** cualquier regresión en estas guardas.

---

## Fase 3 — QA móvil real

**Estado:** CERRADA en el núcleo; se vuelve a ejecutar con cada cambio.

Viewports obligatorios:
- 360 px.
- 390 px.
- 430 px.

Comprobaciones:
- sin scroll horizontal.
- controles principales >= 43 px.
- menú móvil dentro del viewport.
- recorrido completo para activar contenido `reveal`.
- capturas reales Chromium.
- revisión visual de páginas clave.

**Contraindicación para avanzar:** una ruta comercial representativa falla geometría o presenta un defecto visual relevante aunque el test automático sea verde.

---

## Fase 4 — QA tablet y escritorio real

**Estado:** EN CURSO.

Viewports obligatorios:
- 768 px.
- 1024 px.
- 1280 px.
- 1440 px.

Comprobaciones:
- sin overflow horizontal.
- navegación móvil/desktop correcta según breakpoint.
- botones y CTA legibles.
- heroes, grids y mockups sin solapes.
- capturas de Home, App Mantenimiento, Demo y Planes.

**Gate de salida:** workflow Chromium verde + revisión visual de artefactos.

**Contraindicación para avanzar:** confiar solo en CSS o en el build sin revisar navegador real.

---

## Fase 5 — Conversión y confianza

**Estado:** EN CURSO.

Debe cerrar:
- recorrido coherente Home → Soluciones/App → Demo → Piloto → Implantación.
- CTA de “demo” no debe terminar en un formulario bloqueado.
- alcance y límites visibles.
- apps especializadas con estado de madurez.
- FAQ alineada con producto, seguridad, piloto e implantación.
- no usar logos, testimonios o métricas ficticias como prueba social.

Señales de confianza permitidas:
- transparencia de alcance.
- proceso de piloto.
- arquitectura de seguridad documentada.
- QA y accesibilidad reales.
- política de no tracking en preproducción.
- contenido técnico útil.

**Contraindicación:** usar claims de mercado, seguridad, disponibilidad o resultados sin evidencia verificable.

---

## Fase 6 — Legal, privacidad y canal comercial

**Estado:** BLOQUEADA POR DATOS EXTERNOS.

Necesita antes de cerrarse:
- identidad jurídica y datos obligatorios definitivos.
- política de privacidad aprobada.
- política de cookies/consentimiento definitiva.
- backend/canal seguro de solicitud de demo.
- definición de qué datos se recogen y para qué.
- política de retención y acceso a solicitudes.

Hasta entonces:
- Contacto permanece deshabilitado.
- páginas legales provisionales permanecen `noindex`.
- PostHog/Sentry permanecen desactivados.

**Contraindicación absoluta:** activar formularios, cookies analíticas o telemetría porque “ya está preparada” técnicamente.

---

## Fase 7 — Oferta comercial

**Estado:** BLOQUEADA HASTA PILOTOS/DECISIÓN COMERCIAL.

Pendiente:
- precios finales.
- límites por plan.
- condiciones de piloto.
- soporte incluido.
- servicios de implantación/importación/QR/formación.
- condiciones contractuales, permanencia si existiera y cancelación.
- SLA solo si se decide y puede cumplirse.

Hasta entonces la web muestra estructura de planes, no importes ni compromisos inventados.

---

## Fase 8 — Enlace con IsiVoltPro Platform

**Estado:** BLOQUEADA HASTA QUE CODEX CIERRE ACCESO.

Antes de cambiar el CTA `Acceder`:
- confirmar URL definitiva/staging de la plataforma.
- confirmar login y sesión funcionales.
- confirmar organización activa y permisos.
- confirmar que el enlace no dirige a un placeholder.

La Web V3 no implementa autenticación paralela.

---

## Fase 9 — Gate PRE-MINI-PC

**Estado:** BLOQUEADO.

No se despliega en Mini PC hasta que estén cerradas:
- Fase 1 arquitectura.
- Fase 2 integridad técnica.
- Fase 3 móvil.
- Fase 4 tablet/escritorio.
- Fase 5 conversión/confianza.
- revisión de copy y rutas indexables.

Las fases 6–8 pueden seguir con elementos deshabilitados/provisionales únicamente si esa condición es visible, segura y no impide revisar el frontend; **no permiten declarar la web lista para producción**.

---

## Fase 10 — Staging Mini PC

**Estado:** NO INICIAR TODAVÍA.

Cuando el gate PRE-MINI-PC esté aprobado:
- checkout separado de la rama.
- puerto/hostname de staging independiente.
- no sustituir la web estable.
- `npm run smoke:staging`.
- revisar Home y rutas comerciales en dispositivos reales.
- corregir cualquier diferencia de infraestructura.

---

## Fase 11 — Merge y producción

**Estado:** BLOQUEADA.

Antes de mergear a `main`:
- staging aprobado.
- datos legales definitivos.
- canal de contacto seguro o CTA temporal deliberadamente definido.
- destino de Acceder confirmado.
- CI completo verde.
- no cambios pendientes que alteren arquitectura principal.
- PR deja de ser draft solo con decisión explícita.

## Regla de parada

Si el trabajo pendiente depende exclusivamente de una decisión externa (datos jurídicos, precios, backend, URL de plataforma o consentimiento), **no inventar una solución para aparentar avance**. Documentar el bloqueo y continuar únicamente con QA, contenido verificable o deuda técnica que realmente mejore la V3.
