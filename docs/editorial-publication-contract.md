# IsiVoltPro Web V3 — Contrato de publicación editorial

**Estado:** preproducción  
**Ámbito:** Blog público, noticias, normativa, contenido técnico y representación social en la Web V3.

Este documento define qué debe garantizar la web pública cuando el sistema editorial entre en servicio. El manual operativo completo vive en IsiVoltPro Platform; la V3 es la capa de publicación y transparencia para el lector.

## 1. Principio público

El Blog de IsiVoltPro debe priorizar **calidad, utilidad y trazabilidad** sobre frecuencia.

La web no debe transmitir que se publica por obligación diaria. Si no existe una pieza suficientemente útil y verificada, se puede recurrir a contenido evergreen o no publicar.

## 2. Tipos de contenido

La interfaz debe poder distinguir visual y semánticamente al menos:

- normativa;
- actualidad;
- seguridad / PRL;
- energía e instalaciones;
- técnico/práctico;
- curiosidad técnica;
- radar semanal;
- contenido propio de IsiVoltPro.

La categoría no sustituye el estado regulatorio.

## 3. Información obligatoria en piezas temporales

Cuando un artículo deriva de una noticia, disposición, consulta o fuente externa temporal, debe mostrar de forma comprensible:

- título;
- fecha de publicación del artículo;
- fecha de actualización cuando corresponda;
- tipo editorial;
- fuente original;
- enlace a la fuente original;
- fecha de publicación de la fuente, si está disponible;
- fecha de última comprobación;
- estado regulatorio cuando aplique;
- autor/editor responsable;
- tiempo estimado de lectura;
- imagen/ALT adecuados.

## 4. Estados regulatorios visibles

La V3 debe evitar que el lector confunda fases regulatorias.

Etiquetas previstas:

- **Consulta / propuesta** — todavía no debe presentarse como obligación vigente.
- **Publicada** — disposición publicada; el artículo debe explicar aplicación/fechas con precisión.
- **Vigente** — aplicable según la comprobación editorial realizada.
- **Modificada** — existe una modificación posterior relevante.
- **Derogada** — no debe interpretarse como obligación actual.
- **No aplica** — noticia, contratación, caso práctico o contexto no normativo.

Las etiquetas deben acompañarse de texto comprensible cuando el contexto pueda generar dudas.

## 5. Estructura recomendada de una noticia

La lectura debe responder rápidamente:

1. Qué ha ocurrido.
2. Quién lo publica/aprueba.
3. Cuándo.
4. En qué estado está realmente.
5. A quién afecta o puede afectar.
6. Qué instalaciones/equipos/procesos pueden estar implicados.
7. Qué debería revisar mantenimiento.
8. Qué no cambia o qué todavía no puede afirmarse.
9. Dónde consultar la fuente original.

## 6. Estructura recomendada de contenido técnico

Una pieza técnica debe priorizar:

- problema o pregunta;
- explicación del fenómeno;
- síntomas/señales;
- causas posibles sin convertir indicios en diagnósticos automáticos;
- comprobaciones prácticas;
- errores frecuentes;
- seguridad y límites;
- idea clave final.

## 7. Fuente y evidencia en UI

Las noticias temporales deben tener un bloque de fuente visible, no escondido solo en JSON-LD.

Contenido mínimo del bloque:

- organismo/fuente;
- título o referencia;
- enlace original;
- fecha de fuente si existe;
- comprobado/actualizado en fecha;
- estado regulatorio.

Para artículos con varias fuentes, la UI podrá mostrar una fuente principal y una sección de referencias adicionales.

## 8. Correcciones y actualizaciones

La V3 debe poder mostrar:

- `Actualizado el …` cuando cambie contenido relevante;
- `Corrección` cuando una modificación material repare una afirmación incorrecta;
- cambio de estado normativo (`consulta -> publicada`, `vigente -> modificada`, etc.);
- aviso destacado si una pieza antigua pudiera inducir a error sin actualización.

No se debe borrar silenciosamente una corrección material del historial editorial interno.

## 9. Artículos antiguos

Una noticia antigua puede seguir indexada si conserva valor histórico, pero debe dejar claro cuando el contexto ha cambiado.

Si una pieza contiene una norma posteriormente modificada/derogada:

- actualizar etiqueta/estado;
- añadir nota de actualización cuando sea material;
- evitar CTAs o resúmenes que la presenten como vigente;
- mantener fuente original y nueva evidencia cuando proceda.

## 10. SEO y datos estructurados

Todo artículo indexable debe incluir:

- canonical;
- título/meta description únicos;
- Open Graph;
- Twitter/X Card compatible;
- `BlogPosting` JSON-LD;
- `datePublished`;
- `dateModified`;
- autor/editor;
- `citation` o `isBasedOn` cuando exista fuente temporal;
- keywords solo cuando aporten contexto;
- URL estable;
- entrada en sitemap.

No indexar:

- borradores;
- previews;
- workspace de administración;
- candidatos editoriales;
- revisiones internas;
- contenidos no aprobados.

## 11. Enlaces internos

Cada pieza debe enlazar únicamente a páginas realmente relacionadas, por ejemplo:

- módulo/capacidad de IsiVoltPro relacionada;
- guía práctica;
- recurso técnico;
- otro artículo útil;
- página de experiencia/producto cuando el enlace sea natural.

Evitar convertir todos los artículos en funnels agresivos.

## 12. Material visual

La web debe diferenciar claramente entre:

- fotografía/evidencia real;
- ilustración conceptual;
- gráfico explicativo;
- imagen generada.

Una imagen conceptual/generada no puede presentarse como evidencia de un suceso o defecto real.

Requisitos:

- ALT significativo;
- proporciones responsive;
- peso optimizado;
- licencia/procedencia trazable en backend;
- dirección visual coherente con V3.

## 13. Adaptaciones sociales

La web puede mostrar estado editorial interno en el workspace noindexable, pero la web pública no debe afirmar que una pieza está en una red hasta que el backend confirme `published`.

Estados previstos:

`draft -> awaiting_approval -> approved -> scheduled -> published | failed`

`scheduled` no significa publicado.

## 14. Workspace editorial

`/gestion-contenido/` y sus subrutas deben:

- permanecer `noindex,nofollow`;
- estar bloqueadas por defecto en producción hasta integración de autenticación;
- no incluir secretos;
- no exponer tokens ni endpoints privilegiados;
- no entrar en sitemap público;
- mostrar claramente cuándo una capacidad es preview/conceptual.

## 15. Transparencia comercial

Los artículos deben aportar valor incluso si el lector no compra IsiVoltPro.

La promoción del producto debe:

- ser secundaria;
- estar relacionada con el problema tratado;
- no condicionar la explicación técnica;
- no convertir una noticia oficial en publicidad encubierta.

## 16. Accesibilidad

El Blog debe conservar los criterios generales de V3:

- estructura semántica de encabezados;
- contraste suficiente;
- navegación por teclado;
- skip link;
- foco visible;
- ALT;
- enlaces con texto comprensible;
- reduced motion;
- lectura usable sin JavaScript cuando sea posible.

## 17. Rendimiento

El crecimiento diario del Blog no debe degradar la V3.

- evitar assets binarios pesados por artículo;
- optimizar imágenes;
- mantener presupuestos de build;
- no cargar librerías interactivas si el artículo no las usa;
- conservar prerender/static output cuando sea compatible con la arquitectura final.

## 18. QA obligatorio para una nueva pieza temporal

Antes de desplegar:

- [ ] URL construida.
- [ ] No es `noindex` por error.
- [ ] Está en sitemap.
- [ ] Tiene canonical.
- [ ] Tiene `BlogPosting`.
- [ ] Tiene fuente visible.
- [ ] Tiene enlace original válido.
- [ ] Tiene fecha de fuente/checked_at cuando corresponda.
- [ ] Tiene estado regulatorio correcto.
- [ ] `citation/isBasedOn` presente cuando aplique.
- [ ] Título/meta description únicos.
- [ ] Imagen y ALT correctos.
- [ ] Enlaces internos válidos.
- [ ] Responsive móvil/tablet/escritorio.
- [ ] No introduce overflow horizontal.
- [ ] No expone datos internos/secretos.

## 19. Go-live de V3 editorial

No promover a `isivoltpro.com` hasta que:

- [ ] staging público validado;
- [ ] backend editorial real conectado;
- [ ] proyección pública limite contenido a `published`;
- [ ] autenticación del workspace resuelta;
- [ ] fuentes y evidencias reales probadas;
- [ ] revalidación/correcciones probadas;
- [ ] privacidad/cookies/legal finalizados;
- [ ] publicación social probada sin secretos en frontend;
- [ ] sitemap/SEO completos;
- [ ] QA visual completa;
- [ ] procedimiento de rollback/retiro probado.

## 20. Regla de aceptación

Una página del Blog no está lista solo porque compile. Está lista cuando el lector puede responder:

**«¿De dónde sale esto, cuándo se comprobó, qué significa realmente para mantenimiento y qué debería hacer con esta información?»**

Si la página no permite responder esas preguntas, todavía no cumple el contrato editorial de IsiVoltPro.
