import { publishedV3BlogPosts } from './v3-blog';
import { v3DailyPublishedPosts, type V3DailyPublishedPost } from './v3-daily-published';

const generatedModules = import.meta.glob<{ v3DailyGeneratedPost: V3DailyPublishedPost }>('./generated/*.ts', { eager: true });
const generatedPosts = Object.values(generatedModules)
  .map((module) => module.v3DailyGeneratedPost)
  .filter(Boolean);

export const v3BlogFeed = [...publishedV3BlogPosts, ...v3DailyPublishedPosts, ...generatedPosts]
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
