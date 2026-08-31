# IsiVoltPro V4 — Radar editorial diario

## Estado

Fase 10C. El radar automatiza **descubrimiento + borrador**, no la publicación final.

## Ejecución

GitHub Actions ejecuta `.github/workflows/v4-daily-editorial-radar.yml` cada día a las 06:00 UTC y también permite ejecución manual.

La salida se guarda durante 30 días como artifact y se crea/actualiza un issue con título `Radar editorial · AAAA-MM-DD · tipo`.

## Cadencia

- lunes: normativa;
- martes: actualidad;
- miércoles: seguridad / PRL;
- jueves: energía e instalaciones;
- viernes: práctico;
- sábado: curiosidad técnica;
- domingo: radar semanal.

## Fuentes iniciales

El motor consulta páginas públicas de BOE, MITECO, INSST, IDAE, CNMC y EUR-Lex. Un fallo de red o una fuente sin resultados no se convierte en contenido inventado: queda registrado como error y el radar puede decidir no proponer publicación.

## IA

La IA se activa únicamente si GitHub dispone del secreto `OPENAI_API_KEY`.

- el secreto nunca llega al frontend ni a GitHub Pages;
- el modelo por defecto es `gpt-5-mini` y puede cambiarse en el workflow;
- las respuestas usan `store=False`;
- si no hay clave o la llamada falla, el workflow continúa en modo `discovery_only` / `ai_error` y no publica contenido.

La clave se debe guardar como **GitHub Actions secret** del repositorio. No debe añadirse a `.env`, código, issues, artifacts ni documentación.

## Puerta editorial

Un borrador no pasa a publicación hasta comprobar como mínimo:

1. fuente original;
2. fecha de la fuente;
3. estado regulatorio cuando corresponda;
4. alcance real de la novedad;
5. aplicación práctica separada de hechos;
6. imagen y ALT;
7. aprobación editorial.

Una consulta, propuesta o audiencia pública nunca se transforma automáticamente en `vigente`.

## Redes

El radar puede preparar adaptaciones para LinkedIn, Instagram y Facebook, pero **no publica en redes**. El futuro backend social deberá conservar la secuencia:

`draft -> awaiting_approval -> approved -> scheduled -> published | failed`

`scheduled` no significa `published`.

## Siguiente checkpoint

10C.2 deberá convertir un borrador **aprobado** en una propuesta de publicación (PR o proyección desde backend) y mantener la web pública limitada a contenidos con estado `published`.
