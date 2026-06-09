/* Background.jsx
   El fondo animado del portafolio: gradiente azul P3R + filtro SVG
   de distorsión de onda (el mismo que tenías en el proyecto HTML).
   
   En React separamos este elemento en su propio componente porque:
   - Es reutilizable si lo necesitamos en otras páginas
   - Mantiene el código de page.jsx limpio y legible
*/

export default function Background() {
  return (
    <>
      {/* Filtro SVG invisible — define el efecto underwater */}
      <svg
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
        aria-hidden="true"
      >
        <defs>
          <filter id="wave-distort" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.008"
              numOctaves="3"
              seed="2"
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="18s"
                values="0.012 0.008; 0.010 0.012; 0.014 0.007; 0.012 0.008"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Capa de gradiente azul con distorsión */}
      <div className="bg-layer" />

      {/* Cuadrícula de perspectiva */}
      <div className="bg-grid" />
    </>
  )
}