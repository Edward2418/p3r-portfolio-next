import { Nunito_Sans, Bebas_Neue } from 'next/font/google'
import './globals.css'

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: 'variable',
  axes: ['wdth'],
  style: ['normal', 'italic'],
  variable: '--font-menu-var',
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-title-var',
})

export const metadata = {
  title: 'Edward Negrete | Portfolio',
  description: 'Portafolio personal estilo Persona 3 Reload',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${nunitoSans.variable} ${bebasNeue.variable}`}>
      <body>{children}</body>
    </html>
  )
}
