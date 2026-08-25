import { publishedV3BlogPosts } from './v3-blog';
import { v3DailyPublishedPosts } from './v3-daily-published';

export const v3BlogFeed = [...publishedV3BlogPosts, ...v3DailyPublishedPosts]
  .filter((post) => post.status === 'published')
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const v3BlogCategoryLabel = {
  operativa: 'Operativa',
  mantenimiento: 'Mantenimiento',
  digitalizacion: 'Digitalización',
  activos: 'Activos',
  actualidad: 'Actualidad',
  normativa: 'Normativa',
  seguridad: 'Seguridad',
  energia: 'Energía',
  curiosidades: 'Curiosidades',
} as const;
