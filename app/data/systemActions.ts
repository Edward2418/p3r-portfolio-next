export interface SystemAction {
  icon: string
  title: string
  description: string
  href?: string
  button: string
  primary?: boolean
  pending?: string
}

// CV: colocar el archivo en public/cv-edward.pdf y cambiar `pending` por undefined.
export const SYSTEM_ACTIONS: SystemAction[] = [
  {
    icon: '▼',
    title: 'Descargar Currículum',
    description: 'CV completo en formato PDF',
    href: '/cv-edward.pdf',
    button: 'DOWNLOAD',
    primary: true,
    pending: 'PDF pendiente',
  },
  {
    icon: '✉',
    title: 'Correo institucional',
    description: 'd23390169@huauchinango.tecnm.mx',
    href: 'mailto:d23390169@huauchinango.tecnm.mx',
    button: 'SEND',
  },
  {
    icon: 'GH',
    title: 'GitHub',
    description: 'github.com/Edward2418',
    href: 'https://github.com/Edward2418',
    button: 'VISIT',
  },
  {
    icon: 'LI',
    title: 'LinkedIn',
    description: 'Perfil profesional',
    href: 'https://www.linkedin.com/in/',
    button: 'VISIT',
    pending: 'Falta enlace',
  },
]
