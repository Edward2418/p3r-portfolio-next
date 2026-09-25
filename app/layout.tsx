import { Nunito_Sans, Bebas_Neue } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { SITE } from './data/site'
import { PROFILE } from './data/profile'
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

export const metadata: Metadata = {
  metadataBase: SITE.url,
  title: SITE.title,
  description: SITE.description,
  applicationName: 'P3R Portfolio',
  authors: [{ name: PROFILE.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: '/',
    siteName: 'P3R Portfolio',
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    images: [{ url: '/opengraph-image', alt: `${PROFILE.name} — portafolio de desarrollo` }],
  },
}

export const viewport: Viewport = { themeColor: '#061541' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${nunitoSans.variable} ${bebasNeue.variable}`}>
      <body>{children}</body>
    </html>
  )
}
