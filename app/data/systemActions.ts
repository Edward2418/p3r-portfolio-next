export interface SystemAction {
  icon: string
  title: string
  description: string
  href?: string
  button: string
  primary?: boolean
  pending?: string
}

export const SYSTEM_ACTIONS: SystemAction[] = [
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
]
