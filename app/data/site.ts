import { PROFILE } from './profile'

export const SITE = {
  title: 'Edward Negrete | Portafolio',
  description: `Portafolio de ${PROFILE.name}, estudiante de ${PROFILE.degree}, con especialidad en ${PROFILE.specialty}. Proyectos, habilidades y trayectoria en una interfaz inspirada en Persona 3 Reload.`,
  url: new URL(
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000')
  ),
}
