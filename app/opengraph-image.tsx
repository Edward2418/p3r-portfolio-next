import { ImageResponse } from 'next/og'
import { PROFILE } from './data/profile'

export const alt = 'Edward Negrete — Portafolio de desarrollo, Full-Stack y Videojuegos'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative',
      background: 'linear-gradient(150deg, #20dce8, #1459c5 45%, #100b91)', color: 'white',
      padding: 64, flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ position: 'absolute', right: -70, top: -80, width: 270, height: 840,
        background: '#f5fcff', transform: 'rotate(18deg)' }} />
      <div style={{ display: 'flex', fontSize: 23, letterSpacing: 6, color: '#061541', fontWeight: 700 }}>
        PERSONAL FILE / PORTFOLIO
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 930, padding: '30px 36px',
        background: '#061541', borderLeft: '10px solid #ff2244' }}>
        <div style={{ display: 'flex', color: '#81fff3', fontSize: 24, marginBottom: 16 }}>
          {PROFILE.specialty}
        </div>
        <div style={{ display: 'flex', fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>
          {PROFILE.name}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 24 }}>
        <div style={{ display: 'flex' }}>PROYECTOS / HABILIDADES / TRAYECTORIA</div>
        <div style={{ display: 'flex', color: '#bdefff', fontSize: 20 }}>Interfaz inspirada en Persona 3 Reload</div>
      </div>
    </div>,
    size
  )
}
