import type { V3BlogPost } from './v3-blog';
import type { V3RegulationState } from './v3-daily-editorial';

export type V3DailyPublicCategory = 'actualidad' | 'normativa' | 'seguridad' | 'energia' | 'curiosidades';

export type V3DailyPublishedPost = Omit<V3BlogPost, 'category'> & {
  category: V3DailyPublicCategory;
  source: {
    name: string;
    url: string;
    publishedAt: string;
    checkedAt: string;
    authority: 'official_primary' | 'institutional' | 'sector_media';
  };
  regulationState: V3RegulationState;
};

export const v3DailyPublishedPosts: V3DailyPublishedPost[] = [
  {
    slug: 'agregacion-independiente-flexibilidad-electrica-instalaciones',
    title: 'Agregación independiente y flexibilidad eléctrica: qué debería mirar mantenimiento',
    description: 'MITECO ha abierto una consulta sobre reglas técnicas para la agregación independiente y la gestión flexible de demanda. Explicamos qué significa y qué no significa todavía para responsables de instalaciones.',
    excerpt: 'No es una nueva obligación de mantenimiento publicada hoy. Es una señal regulatoria relevante: la operación de cargas, la medida y la capacidad de desplazar consumos pueden ganar peso en la gestión de instalaciones.',
    category: 'actualidad',
    status: 'published',
    publishedAt: '2026-08-25',
    updatedAt: '2026-08-25',
    readMinutes: 6,
    author: 'Equipo IsiVoltPro',
    image: '/media/home-dashboard.svg',
    imageAlt: 'Panel conceptual de IsiVoltPro con información operativa y energética de mantenimiento.',
    keywords: ['agregador independiente', 'flexibilidad eléctrica', 'gestión de demanda', 'mantenimiento', 'instalaciones', 'España'],
    featured: true,
    source: {
      name: 'Ministerio para la Transición Ecológica y el Reto Demográfico (MITECO)',
      url: 'https://www.miteco.gob.es/es/prensa/ultimas-noticias/2026/agosto/el-miteco-avanza-en-la-implantacion-del-agregador-independiente-.html',
      publishedAt: '2026-08-13',
      checkedAt: '2026-08-25T18:33:00+02:00',
      authority: 'official_primary',
    },
    regulationState: 'consulta',
    sections: [
      {
        heading: 'Qué ha ocurrido realmente',
        paragraphs: [
          'El MITECO abrió el 13 de agosto de 2026 una audiencia pública sobre una propuesta de resolución que desarrolla reglas técnicas para la figura del agregador independiente y adapta procedimientos de operación del sistema eléctrico. El plazo indicado por el ministerio llega hasta el 3 de septiembre de 2026.',
          'La palabra importante aquí es propuesta. La consulta forma parte del proceso regulatorio y no debe presentarse como si todas sus reglas fueran ya una obligación final aplicable a cualquier instalación.'
        ]
      },
      {
        heading: 'Qué es un agregador independiente',
        paragraphs: [
          'En términos prácticos, la agregación permite coordinar cambios de consumo de distintos clientes para prestar servicios de flexibilidad al sistema eléctrico. El propio MITECO describe al agregador independiente como una figura capaz de gestionar demanda alterando el consumo de sus clientes.',
          'Para conseguirlo hacen falta datos de medida, una referencia de consumo, reglas de compensación y procedimientos que permitan saber qué flexibilidad se ha prestado realmente. Precisamente esos detalles son parte del desarrollo sometido a audiencia.'
        ]
      },
      {
        heading: 'Por qué un responsable de mantenimiento debería seguirlo',
        paragraphs: [
          'Mantenimiento no decide por sí solo la contratación energética, pero sí conoce algo decisivo: qué equipos pueden modificar su funcionamiento, durante cuánto tiempo y con qué límites operativos.',
          'Climatización, bombeos, almacenamiento, producción de frío, cargas desplazables o determinados procesos auxiliares pueden tener márgenes de operación distintos. Antes de hablar de flexibilidad, hay que saber qué activo consume, cuándo lo hace y qué consecuencia tendría mover ese consumo.'
        ],
        bullets: [
          'Inventario real de cargas relevantes y su potencia aproximada.',
          'Horarios, consignas y restricciones operativas de cada sistema.',
          'Medida suficiente para distinguir una reducción real de una variación normal de consumo.',
          'Equipos que no deben entrar en estrategias de flexibilidad por criticidad, seguridad o continuidad de servicio.',
          'Coordinación entre energía, mantenimiento, producción y responsables de la instalación.'
        ]
      },
      {
        heading: 'Qué no haría todavía',
        paragraphs: [
          'No cambiaría planes de mantenimiento ni consignas críticas basándome solo en una consulta pública. Tampoco asumiría que toda instalación podrá participar del mismo modo o que cualquier carga es flexible.',
          'Sí aprovecharía la señal para mejorar algo que ya tiene valor hoy: conocer mejor los consumos por activo o sistema, identificar cargas críticas y registrar condiciones de operación. Esa información sirve para eficiencia energética, diagnóstico y mantenimiento aunque el modelo regulatorio siga evolucionando.'
        ]
      },
      {
        heading: 'Qué conviene vigilar ahora',
        paragraphs: [
          'El siguiente paso es seguir el cierre de la audiencia y comprobar el texto que finalmente se apruebe. También será importante revisar requisitos de medida, compensación, responsabilidades y relación con comercializadoras o agregadores antes de convertir una oportunidad energética en una decisión operativa.',
          'IsiVoltPro mantendrá esta pieza marcada como contenido temporal: si el estado regulatorio cambia, deberá actualizarse la revisión y la fecha de comprobación.'
        ]
      }
    ],
    takeaway: 'No es una nueva obligación de mantenimiento hoy; sí es una señal de que operación, medida y gestión energética estarán cada vez más conectadas.',
    relatedRoutes: [
      { label: 'Ver mantenimiento preventivo', href: '/modulos/mantenimiento-preventivo/' },
      { label: 'Ver activos', href: '/modulos/activos/' },
      { label: 'Cómo implantar IsiVoltPro', href: '/implantacion/' }
    ]
  }
];
