interface ProjectScreenshot {
  src: string
  alt: string
  caption: string
  width: number
  height: number
}

export interface Project {
  id: string
  title: string
  type: string
  summary: string
  description: string
  tags: string[]
  status: 'En desarrollo' | 'Completado'
  github: string
  highlights: string[]
  screenshots: ProjectScreenshot[]
}

export const PROJECTS: Project[] = [
  {
    id: 'p3r-portfolio',
    title: 'P3R Portfolio',
    type: 'PORTAFOLIO WEB',
    summary: 'Mi perfil como desarrollador, presentado a través de una interfaz inspirada en Persona 3 Reload.',
    description: 'Proyecto personal que comenzó como práctica con HTML, CSS y JavaScript y evolucionó hacia una aplicación con Next.js y TypeScript. Recrea la experiencia de un menú de videojuego mediante navegación por pantallas, estadísticas de personaje y transiciones, con componentes y datos compartidos.',
    tags: ['Next.js', 'React', 'TypeScript', 'CSS'],
    status: 'En desarrollo',
    github: 'https://github.com/Edward2418/p3r-portfolio-next',
    screenshots: [
      {
        src: '/img/projects/p3r-portfolio/menu.webp',
        alt: 'Menú principal del portafolio con Oguri a la izquierda y seis opciones de navegación sobre fondo azul.',
        caption: 'Menú principal · navegación por pantallas',
        width: 1440,
        height: 1000,
      },
      {
        src: '/img/projects/p3r-portfolio/social.webp',
        alt: 'Social Link con la lista de personajes y videojuegos junto a la ficha ilustrada de Oguri.',
        caption: 'Social Link · ficha de Oguri Cap',
        width: 1440,
        height: 1000,
      },
    ],
    highlights: [
      'Migración de HTML y JavaScript a componentes React.',
      'Menú responsive con navegación por teclado.',
      'Datos tipados y barras accesibles con movimiento reducido.',
      'Estética P3R con tipografía inclinada y transiciones CSS.',
      'Video de personaje con transparencia, pausa y carga diferida.',
    ],
  },
]
