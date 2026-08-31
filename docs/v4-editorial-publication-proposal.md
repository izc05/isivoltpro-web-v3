# V4 · Fase 10C.2 · Propuesta de publicación aprobada

Esta fase conecta el radar editorial diario con una propuesta estructurada de publicación, pero mantiene una puerta humana antes de tocar contenido público.

## Flujo

1. `Radar editorial diario V4` crea o actualiza un issue `Radar editorial · AAAA-MM-DD · tema`.
2. El radar debe estar en modo `ai_draft`. Si no existe `OPENAI_API_KEY`, el motor se queda en `discovery_only` y no puede avanzar a propuesta.
3. Un editor abre las fuentes originales y completa todos los checks de `Puerta de publicación` dentro del issue.
4. El propietario o un colaborador autorizado comenta exactamente `/prepare-publication`.
5. `.github/workflows/v4-editorial-publication-proposal.yml` recupera el issue y ejecuta `scripts/v4-editorial-proposal.py`.
6. El script exige:
   - issue de radar válido;
   - borrador IA presente;
   - checklist completamente marcado;
   - tipo editorial reconocido;
   - al menos una URL perteneciente a BOE, MITECO, INSST, IDAE, CNMC o EUR-Lex.
7. Se genera un artifact con `proposal.md` y `proposal.json` y un issue separado `Propuesta de publicación · radar #N`.
8. No se modifica `src/data/v3-daily-published.ts`, no se hace commit y no se publica en redes.

## Puertas de seguridad

- Solo `OWNER`, `MEMBER` o `COLLABORATOR` puede activar el comando.
- El comando solo funciona en issues, no en pull requests.
- `discovery_only` y `ai_error` no pueden convertirse en propuesta.
- Un checklist incompleto bloquea el proceso.
- Las URLs de fuentes se filtran por una lista cerrada de organismos permitidos.
- La salida declara `automaticPublish: false` y `socialPublish: false`.

## Siguiente checkpoint 10C.3

Cuando esta fase esté validada, el siguiente paso será convertir una propuesta ya completada en un **PR de contenido**, no en un merge automático. Ese PR deberá validar el esquema de `V3DailyPublishedPost`, compilar la web, pasar QA y recibir aprobación humana antes de publicar.
