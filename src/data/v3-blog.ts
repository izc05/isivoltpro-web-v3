export type V3BlogStatus = 'draft' | 'review' | 'scheduled' | 'published';
export type V3BlogCategory = 'operativa' | 'mantenimiento' | 'digitalizacion' | 'activos';
export type V3SocialChannel = 'instagram' | 'facebook' | 'linkedin';

export type V3BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type V3BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: V3BlogCategory;
  status: V3BlogStatus;
  publishedAt: string;
  updatedAt: string;
  readMinutes: number;
  author: string;
  image: string;
  imageAlt: string;
  keywords: string[];
  featured?: boolean;
  sections: V3BlogSection[];
  takeaway: string;
  relatedRoutes: { label: string; href: string }[];
};

export type V3SocialAdaptation = {
  id: string;
  postSlug: string;
  channels: V3SocialChannel[];
  status: 'draft' | 'ready' | 'approved' | 'blocked';
  media: string;
  publishAfter?: string;
  captions: Record<V3SocialChannel, string>;
};

export type V3EditorialQueueItem = {
  id: string;
  title: string;
  focus: string;
  status: 'idea' | 'draft' | 'review';
  plannedFor: string;
  channels: Array<'blog' | V3SocialChannel>;
};

export const v3BlogPosts: V3BlogPost[] = [
  {
    slug: 'historico-util-empieza-al-cerrar-ot',
    title: 'Un histórico útil empieza en el cierre de la orden de trabajo',
    description: 'Cómo cerrar una orden de trabajo para que la intervención de hoy ayude a diagnosticar, decidir y mantener mejor mañana.',
    excerpt: 'Cerrar una OT no debería significar escribir una memoria interminable. Debería dejar las pistas necesarias para que la siguiente persona entienda qué pasó, qué se hizo y qué queda pendiente.',
    category: 'operativa',
    status: 'published',
    publishedAt: '2026-08-25',
    updatedAt: '2026-08-25',
    readMinutes: 5,
    author: 'Equipo IsiVoltPro',
    image: '/media/v4/home-dashboard-premium.webp',
    imageAlt: 'Panel premium de IsiVoltPro con órdenes de trabajo, activos y seguimiento operativo de mantenimiento.',
    keywords: ['orden de trabajo', 'OT', 'histórico de mantenimiento', 'mantenimiento digital'],
    featured: true,
    sections: [
      {
        heading: 'El cierre no es el final: es el dato que queda',
        paragraphs: [
          'Cuando una orden se marca como terminada, el trabajo físico acaba, pero empieza el valor del histórico. Si el cierre solo dice “reparado”, dentro de seis meses habrá que reconstruir el problema desde cero.',
          'Un buen cierre deja contexto suficiente sin obligar al técnico a redactar un informe largo. La clave es registrar lo que realmente cambia una decisión futura.'
        ]
      },
      {
        heading: 'Cuatro datos que sí merecen quedarse',
        paragraphs: ['En la mayoría de intervenciones pequeñas, cuatro bloques bien resueltos aportan más valor que veinte campos obligatorios.'],
        bullets: [
          'Qué síntoma o fallo se encontró realmente.',
          'Qué actuación se realizó y sobre qué equipo o elemento.',
          'Qué evidencia ayuda a comprobarlo: foto, lectura, pieza sustituida o prueba final.',
          'Qué queda pendiente, incluso cuando la instalación vuelve a funcionar.'
        ]
      },
      {
        heading: 'El histórico debe poder leerse desde el activo',
        paragraphs: [
          'Una lista de órdenes aisladas obliga a buscar. Un histórico vinculado al activo permite ver recurrencias, comparar fallos y detectar cuándo una reparación deja de ser rentable.',
          'La pregunta práctica es sencilla: si mañana otra persona escanea el equipo, ¿puede entender qué ha ocurrido sin llamar a quien estuvo allí?'
        ]
      }
    ],
    takeaway: 'Registrar menos, pero registrar lo que ayuda a decidir después.',
    relatedRoutes: [
      { label: 'Ver órdenes de trabajo', href: '/modulos/ordenes-de-trabajo/' },
      { label: 'Guía para cerrar una OT', href: '/recursos/cerrar-ot-historico-util/' },
      { label: 'Probar el flujo', href: '/experiencia/' }
    ]
  },
  {
    slug: 'qr-mantenimiento-valor-despues-escanear',
    title: 'QR en mantenimiento: el valor empieza después de escanear',
    description: 'Un QR pegado a un equipo solo aporta valor si abre contexto útil: activo, incidencias, documentación, preventivo e histórico.',
    excerpt: 'Identificar un activo es fácil. Lo importante es qué puede hacer un técnico en los diez segundos posteriores al escaneo.',
    category: 'activos',
    status: 'published',
    publishedAt: '2026-08-22',
    updatedAt: '2026-08-22',
    readMinutes: 4,
    author: 'Equipo IsiVoltPro',
    image: '/media/v4/field-qr-scan-v2.webp',
    imageAlt: 'Técnico de mantenimiento identificando un equipo industrial mediante un código QR con el teléfono móvil.',
    keywords: ['QR mantenimiento', 'NFC', 'activos', 'mantenimiento preventivo'],
    sections: [
      {
        heading: 'El código no es el sistema',
        paragraphs: [
          'Poner una etiqueta QR en una máquina no digitaliza el mantenimiento. Solo crea una puerta de entrada. Si al abrirla aparece una ficha vacía o un PDF genérico, el técnico seguirá buscando información por otros canales.',
          'El objetivo debería ser reducir pasos en campo: identificar, entender y actuar desde el mismo punto.'
        ]
      },
      {
        heading: 'Qué debería aparecer al escanear',
        paragraphs: ['La primera pantalla debe priorizar la información útil para actuar, no toda la información disponible.'],
        bullets: [
          'Identificación inequívoca del activo y su ubicación.',
          'Avisos u órdenes abiertas relacionadas.',
          'Últimas intervenciones y fallos repetidos.',
          'Documentación realmente útil para ese equipo.',
          'Próxima revisión preventiva cuando corresponda.'
        ]
      },
      {
        heading: 'Menos navegación, más contexto',
        paragraphs: [
          'El QR funciona bien cuando evita escribir códigos, navegar por árboles de ubicaciones o preguntar qué máquina es. Esa reducción de fricción es más importante que la tecnología de la etiqueta.',
          'Por eso conviene probar el flujo con pocos activos antes de etiquetar una instalación completa.'
        ]
      }
    ],
    takeaway: 'El QR no debe llevar a una ficha: debe llevar al siguiente paso de trabajo.',
    relatedRoutes: [
      { label: 'Ver QR y NFC', href: '/modulos/qr-nfc/' },
      { label: 'Guía de QR en activos', href: '/recursos/qr-activos-mantenimiento/' },
      { label: 'Ver activos', href: '/modulos/activos/' }
    ]
  },
  {
    slug: 'mantenimiento-preventivo-sin-hojas-paralelas',
    title: 'Mantenimiento preventivo sin hojas paralelas',
    description: 'Cómo pasar de un calendario estático a revisiones preventivas que generan trabajo, evidencias e histórico sin duplicar registros.',
    excerpt: 'El preventivo pierde valor cuando el calendario vive en una hoja, la ejecución en otra y las evidencias en el móvil de cada técnico.',
    category: 'mantenimiento',
    status: 'published',
    publishedAt: '2026-08-19',
    updatedAt: '2026-08-19',
    readMinutes: 5,
    author: 'Equipo IsiVoltPro',
    image: '/media/v4/preventive-hvac-technician-v2.webp',
    imageAlt: 'Técnico de mantenimiento revisando una instalación con una tablet durante una tarea preventiva.',
    keywords: ['mantenimiento preventivo', 'plan de mantenimiento', 'orden de trabajo', 'digitalización'],
    sections: [
      {
        heading: 'El calendario debería generar trabajo, no recordatorios sueltos',
        paragraphs: [
          'Una fecha en una hoja de cálculo puede recordar que toca revisar un equipo, pero no garantiza que exista una orden clara, que alguien la ejecute ni que quede evidencia.',
          'Un preventivo útil conecta periodicidad, activo, tarea, responsable, resultado y siguiente fecha.'
        ]
      },
      {
        heading: 'Evita registrar dos veces lo mismo',
        paragraphs: ['Si la revisión preventiva se ejecuta como trabajo real, su resultado debería alimentar el histórico del activo automáticamente.'],
        bullets: [
          'La tarea nace de una periodicidad definida.',
          'La ejecución se registra como una orden o revisión trazable.',
          'Las evidencias quedan asociadas al mismo activo.',
          'El siguiente vencimiento no depende de copiar datos a otra hoja.'
        ]
      },
      {
        heading: 'Empieza por el preventivo que más duele perder',
        paragraphs: [
          'No es necesario digitalizar todo el plan de mantenimiento en una sola fase. Conviene empezar por equipos críticos, revisiones frecuentes o tareas que hoy generan más olvidos y llamadas.',
          'Cuando el flujo funciona para ese grupo, escalar resulta mucho más sencillo.'
        ]
      }
    ],
    takeaway: 'Un preventivo está organizado cuando la programación, la ejecución y el histórico forman el mismo flujo.',
    relatedRoutes: [
      { label: 'Ver mantenimiento preventivo', href: '/modulos/mantenimiento-preventivo/' },
      { label: 'Guía para pequeñas empresas', href: '/recursos/mantenimiento-preventivo-pequena-empresa/' },
      { label: 'Cómo implantar IsiVoltPro', href: '/implantacion/' }
    ]
  }
];

export const publishedV3BlogPosts = v3BlogPosts
  .filter((post) => post.status === 'published')
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const v3SocialAdaptations: V3SocialAdaptation[] = [
  {
    id: 'social-blog-historico-ot',
    postSlug: 'historico-util-empieza-al-cerrar-ot',
    channels: ['instagram', 'facebook', 'linkedin'],
    status: 'blocked',
    media: '/media/v4/home-dashboard-premium.webp',
    publishAfter: '2026-08-26T10:00:00+02:00',
    captions: {
      instagram: 'Cerrar una OT con “reparado” sirve para hoy. Para mañana necesitamos saber qué falló, qué se hizo, qué evidencia quedó y qué sigue pendiente. Menos campos, mejor histórico. #mantenimiento #ordendetrabajo #gestiondemantenimiento',
      facebook: 'Un histórico útil empieza al cerrar la orden de trabajo. No hace falta escribir una memoria: basta con conservar el síntoma real, la actuación, una evidencia y los pendientes. Así la siguiente intervención empieza con contexto y no desde cero.',
      linkedin: 'La calidad del histórico de mantenimiento se decide en el cierre de cada OT. Un proceso eficaz no exige más campos: exige conservar los datos que cambian una decisión futura. Síntoma real, actuación, evidencia y pendientes suelen aportar más que una descripción extensa.'
    }
  },
  {
    id: 'social-blog-qr-activos',
    postSlug: 'qr-mantenimiento-valor-despues-escanear',
    channels: ['instagram', 'facebook', 'linkedin'],
    status: 'ready',
    media: '/media/v4/field-qr-scan-v2.webp',
    captions: {
      instagram: 'Un QR en una máquina no digitaliza nada por sí solo. El valor está en lo que ocurre después: identificar el activo, ver incidencias, histórico, documentos y la siguiente acción. #mantenimiento #QR #activos',
      facebook: 'La etiqueta QR es solo la puerta de entrada. El verdadero ahorro aparece cuando el técnico escanea y llega directamente al contexto del activo sin buscar códigos, carpetas o mensajes antiguos.',
      linkedin: 'En gestión de activos, el QR no debería ser el objetivo. Debería reducir navegación y llevar al técnico al siguiente paso: activo correcto, trabajo abierto, últimas intervenciones, documentación relevante y preventivo.'
    }
  }
];

export const v3EditorialQueue: V3EditorialQueueItem[] = [
  { id: 'queue-2026-08-26', title: 'Cinco señales de que los avisos se están perdiendo entre WhatsApp y llamadas', focus: 'captura de avisos y prioridad', status: 'draft', plannedFor: '2026-08-26', channels: ['blog', 'instagram', 'facebook', 'linkedin'] },
  { id: 'queue-2026-08-27', title: 'Qué información necesita un técnico antes de aceptar una OT', focus: 'trabajo de campo y contexto', status: 'idea', plannedFor: '2026-08-27', channels: ['blog', 'instagram', 'linkedin'] },
  { id: 'queue-2026-08-28', title: 'Cuándo merece la pena digitalizar inventario de repuestos', focus: 'inventario y pequeñas empresas', status: 'idea', plannedFor: '2026-08-28', channels: ['blog', 'facebook', 'linkedin'] }
];
