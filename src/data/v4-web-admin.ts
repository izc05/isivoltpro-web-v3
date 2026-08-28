export type V4AdminAreaState = 'ready-preview' | 'partial' | 'backend-required';

export type V4AdminArea = {
  id: string;
  label: string;
  description: string;
  route?: string;
  controls: string[];
  state: V4AdminAreaState;
};

export const v4AdminAreas: V4AdminArea[] = [
  {
    id: 'pages',
    label: 'Páginas públicas',
    description: 'Control editorial de Home, Producto, Sectores, Precios, Empresa, Contacto y páginas comerciales.',
    route: '/gestion-contenido/#paginas',
    controls: ['textos', 'CTAs', 'estado editorial', 'historial'],
    state: 'ready-preview',
  },
  {
    id: 'blog',
    label: 'Blog y noticias',
    description: 'Artículos, borradores, revisión, publicación y reutilización de medios.',
    route: '/gestion-contenido/blog/',
    controls: ['artículos', 'categorías', 'SEO', 'estado editorial'],
    state: 'ready-preview',
  },
  {
    id: 'resources',
    label: 'Recursos y guías',
    description: 'Biblioteca práctica, fichas evergreen y material de apoyo comercial.',
    route: '/gestion-contenido/#paginas',
    controls: ['guías', 'resúmenes', 'medios', 'publicación'],
    state: 'partial',
  },
  {
    id: 'media',
    label: 'Biblioteca multimedia',
    description: 'Imágenes, ilustraciones y vídeo con alt, procedencia, etiquetas y trazabilidad de uso.',
    route: '/gestion-contenido/#media',
    controls: ['alt', 'etiquetas', 'uso', 'estado'],
    state: 'ready-preview',
  },
  {
    id: 'navigation',
    label: 'Navegación y estructura',
    description: 'Cabecera, footer, breadcrumbs y jerarquía de rutas V4.',
    controls: ['menú principal', 'footer', 'migas', 'enlaces'],
    state: 'partial',
  },
  {
    id: 'catalog',
    label: 'Producto, módulos y sectores',
    description: 'Fichas comerciales, módulos, sectores y relaciones entre páginas.',
    controls: ['producto', 'módulos', 'sectores', 'CTA'],
    state: 'partial',
  },
  {
    id: 'pricing',
    label: 'Precios y planes',
    description: 'Presentación comercial de Autónomo, Equipo, Empresa y piloto sin publicar cifras no aprobadas.',
    controls: ['planes', 'copy', 'CTA', 'visibilidad'],
    state: 'partial',
  },
  {
    id: 'seo',
    label: 'SEO y publicación',
    description: 'Metadatos, canonical, Open Graph, sitemap y visibilidad editorial.',
    controls: ['title', 'description', 'canonical', 'indexación'],
    state: 'partial',
  },
  {
    id: 'social',
    label: 'Redes sociales',
    description: 'Preparación de piezas reutilizadas desde la web con aprobación previa obligatoria.',
    route: '/gestion-contenido/#redes',
    controls: ['copy', 'medios', 'aprobación', 'programación'],
    state: 'backend-required',
  },
  {
    id: 'forms',
    label: 'Formularios y solicitudes',
    description: 'Demo, contacto y piloto con estados, validación y privacidad.',
    controls: ['campos', 'mensajes', 'estado', 'destino'],
    state: 'backend-required',
  },
];

export const v4AdminSummary = {
  totalAreas: v4AdminAreas.length,
  previewReady: v4AdminAreas.filter((area) => area.state === 'ready-preview').length,
  partial: v4AdminAreas.filter((area) => area.state === 'partial').length,
  backendRequired: v4AdminAreas.filter((area) => area.state === 'backend-required').length,
};
