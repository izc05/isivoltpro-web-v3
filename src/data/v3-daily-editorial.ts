export type V3DailyEditorialType = 'normativa' | 'actualidad' | 'seguridad' | 'energia' | 'practico' | 'curiosidad' | 'radar';
export type V3SourceAuthority = 'official_primary' | 'institutional' | 'sector_media' | 'internal';
export type V3Jurisdiction = 'espana' | 'union_europea' | 'autonomica' | 'local' | 'internacional';
export type V3RegulationState = 'consulta' | 'publicada' | 'vigente' | 'modificada' | 'derogada' | 'no_aplica';

export type V3EditorialSource = {
  id: string;
  name: string;
  domain: string;
  authority: V3SourceAuthority;
  jurisdiction: V3Jurisdiction;
  topics: string[];
  note: string;
};

export type V3DailyEditorialSlot = {
  weekday: number;
  label: string;
  type: V3DailyEditorialType;
  promise: string;
  preferredSources: string[];
};

export type V3DailyCandidate = {
  id: string;
  plannedFor: string;
  type: V3DailyEditorialType;
  title: string;
  angle: string;
  sourceId?: string;
  sourceUrl?: string;
  sourcePublishedAt?: string;
  checkedAt: string;
  jurisdiction: V3Jurisdiction;
  regulationState?: V3RegulationState;
  status: 'idea' | 'verified' | 'draft' | 'review' | 'ready';
  channels: Array<'blog' | 'instagram' | 'facebook' | 'linkedin'>;
};

export const v3EditorialSources: V3EditorialSource[] = [
  {
    id: 'boe',
    name: 'Boletín Oficial del Estado',
    domain: 'boe.es',
    authority: 'official_primary',
    jurisdiction: 'espana',
    topics: ['normativa', 'instalaciones', 'mantenimiento', 'contratacion-publica', 'seguridad'],
    note: 'Fuente prioritaria para disposiciones publicadas. Comprobar fecha, rango, entrada en vigor y texto consolidado cuando exista.',
  },
  {
    id: 'miteco',
    name: 'Ministerio para la Transición Ecológica y el Reto Demográfico',
    domain: 'miteco.gob.es',
    authority: 'official_primary',
    jurisdiction: 'espana',
    topics: ['energia', 'electricidad', 'eficiencia', 'climatizacion', 'participacion-publica'],
    note: 'Usar para novedades energéticas, consultas públicas y documentos regulatorios. Una consulta nunca se redacta como norma ya aprobada.',
  },
  {
    id: 'insst',
    name: 'Instituto Nacional de Seguridad y Salud en el Trabajo',
    domain: 'insst.es',
    authority: 'institutional',
    jurisdiction: 'espana',
    topics: ['seguridad', 'PRL', 'electricidad', 'equipos', 'trabajos-mantenimiento'],
    note: 'Fuente preferente para prevención, guías técnicas y criterios de seguridad laboral.',
  },
  {
    id: 'idae',
    name: 'IDAE',
    domain: 'idae.es',
    authority: 'institutional',
    jurisdiction: 'espana',
    topics: ['eficiencia-energetica', 'edificios', 'instalaciones', 'renovables', 'movilidad'],
    note: 'Usar para eficiencia energética, rehabilitación y gestión de consumos, diferenciando guía técnica de obligación normativa.',
  },
  {
    id: 'cnmc',
    name: 'CNMC',
    domain: 'cnmc.es',
    authority: 'institutional',
    jurisdiction: 'espana',
    topics: ['electricidad', 'gas', 'mercados', 'consumidores', 'regulacion'],
    note: 'Útil para cambios de mercado y regulación energética con impacto operativo en instalaciones.',
  },
  {
    id: 'eurlex',
    name: 'EUR-Lex',
    domain: 'eur-lex.europa.eu',
    authority: 'official_primary',
    jurisdiction: 'union_europea',
    topics: ['reglamentos-ue', 'refrigerantes', 'energia', 'maquinaria', 'seguridad'],
    note: 'Fuente primaria para reglamentos y directivas de la UE. Explicar siempre su aplicación y fechas relevantes en España.',
  },
  {
    id: 'codigotecnico',
    name: 'Código Técnico de la Edificación',
    domain: 'codigotecnico.org',
    authority: 'official_primary',
    jurisdiction: 'espana',
    topics: ['edificios', 'salubridad', 'energia', 'incendios', 'accesibilidad'],
    note: 'Usar para documentos y actualizaciones del CTE; evitar convertir recomendaciones o documentos de apoyo en obligaciones que no sean legales.',
  },
];

export const v3DailyEditorialCadence: V3DailyEditorialSlot[] = [
  { weekday: 1, label: 'Lunes', type: 'normativa', promise: 'Qué ha cambiado, desde cuándo y a quién afecta.', preferredSources: ['boe', 'eurlex', 'miteco'] },
  { weekday: 2, label: 'Martes', type: 'actualidad', promise: 'Una noticia española con impacto real en mantenimiento o instalaciones.', preferredSources: ['miteco', 'boe', 'cnmc'] },
  { weekday: 3, label: 'Miércoles', type: 'seguridad', promise: 'Un criterio de seguridad o PRL aplicado al trabajo técnico.', preferredSources: ['insst', 'boe'] },
  { weekday: 4, label: 'Jueves', type: 'energia', promise: 'Energía, eficiencia, climatización y operación de instalaciones.', preferredSources: ['idae', 'miteco', 'cnmc', 'eurlex'] },
  { weekday: 5, label: 'Viernes', type: 'practico', promise: 'Un caso práctico, fallo frecuente o decisión de campo.', preferredSources: ['internal'] },
  { weekday: 6, label: 'Sábado', type: 'curiosidad', promise: 'Una curiosidad técnica explicada sin perder rigor.', preferredSources: ['internal', 'insst', 'idae'] },
  { weekday: 0, label: 'Domingo', type: 'radar', promise: 'Resumen de lo importante de la semana y qué vigilar la siguiente.', preferredSources: ['boe', 'miteco', 'insst', 'idae', 'cnmc', 'eurlex'] },
];

export const v3DailyEditorialRules = [
  'Priorizar fuente oficial o primaria cuando exista y enlazar siempre la fuente original.',
  'No copiar artículos de medios: resumir, contextualizar y aportar interpretación propia para mantenimiento.',
  'Distinguir claramente entre consulta pública, propuesta, disposición publicada y norma vigente.',
  'Indicar fecha de publicación de la fuente y fecha de última comprobación cuando el contenido sea temporal.',
  'Si una norma ha sido modificada o derogada, no publicar el resumen antiguo como si siguiera vigente.',
  'Separar hechos de opinión y evitar titulares alarmistas o afirmaciones que la fuente no sostenga.',
  'Para normas UNE/AENOR, citar referencia y alcance cuando proceda, sin reproducir contenido protegido.',
  'Cada pieza debe responder a la pregunta práctica: ¿qué cambia o qué debería mirar un técnico o responsable de mantenimiento?',
] as const;

export const v3DailyCandidates: V3DailyCandidate[] = [
  {
    id: 'daily-2026-08-26-agregador',
    plannedFor: '2026-08-26',
    type: 'actualidad',
    title: 'Agregación independiente y flexibilidad eléctrica: qué puede cambiar para las instalaciones',
    angle: 'Explicar la consulta abierta y por qué la gestión flexible de demanda puede acabar afectando a responsables de instalaciones, sin presentarla como una norma ya aprobada.',
    sourceId: 'miteco',
    sourceUrl: 'https://www.miteco.gob.es/es/prensa/ultimas-noticias/2026/agosto/el-miteco-avanza-en-la-implantacion-del-agregador-independiente-.html',
    sourcePublishedAt: '2026-08-13',
    checkedAt: '2026-08-25T18:33:00+02:00',
    jurisdiction: 'espana',
    regulationState: 'consulta',
    status: 'verified',
    channels: ['blog', 'instagram', 'facebook', 'linkedin'],
  },
  {
    id: 'daily-2026-08-27-pci-adif',
    plannedFor: '2026-08-27',
    type: 'practico',
    title: 'Qué enseña el mantenimiento PCI distribuido en una red de estaciones',
    angle: 'Usar una contratación pública reciente como punto de partida para hablar de inventario, periodicidades, evidencias y coordinación cuando hay muchos emplazamientos.',
    sourceId: 'boe',
    sourceUrl: 'https://www.boe.es/diario_boe/txt.php?id=BOE-B-2026-27276',
    sourcePublishedAt: '2026-08-18',
    checkedAt: '2026-08-25T18:33:00+02:00',
    jurisdiction: 'espana',
    regulationState: 'no_aplica',
    status: 'verified',
    channels: ['blog', 'linkedin', 'facebook'],
  },
  {
    id: 'daily-2026-08-28-cuadro-calor',
    plannedFor: '2026-08-28',
    type: 'curiosidad',
    title: 'Por qué unos pocos grados de más pueden delatar un problema antes de que falle un cuadro',
    angle: 'Termografía, conexiones, desequilibrios y suciedad explicados como curiosidad útil, evitando convertir una señal térmica en un diagnóstico automático.',
    checkedAt: '2026-08-25T18:33:00+02:00',
    jurisdiction: 'espana',
    regulationState: 'no_aplica',
    status: 'idea',
    channels: ['blog', 'instagram', 'facebook', 'linkedin'],
  },
  {
    id: 'daily-2026-08-29-ot-reincidente',
    plannedFor: '2026-08-29',
    type: 'practico',
    title: 'La avería que vuelve tres veces no son tres averías independientes',
    angle: 'Mostrar cómo un histórico bien enlazado puede convertir repeticiones aparentemente aisladas en una señal de causa raíz.',
    checkedAt: '2026-08-25T18:33:00+02:00',
    jurisdiction: 'espana',
    regulationState: 'no_aplica',
    status: 'idea',
    channels: ['blog', 'instagram', 'linkedin'],
  },
  {
    id: 'daily-2026-08-30-radar',
    plannedFor: '2026-08-30',
    type: 'radar',
    title: 'Radar de mantenimiento: lo que merece seguir la próxima semana',
    angle: 'Resumen breve de cambios regulatorios, energía, seguridad e instalaciones con enlaces a las fuentes originales y fechas de seguimiento.',
    checkedAt: '2026-08-25T18:33:00+02:00',
    jurisdiction: 'espana',
    status: 'idea',
    channels: ['blog', 'linkedin', 'facebook'],
  },
];
