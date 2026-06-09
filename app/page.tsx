'use client'

import { useState } from 'react'
import Background from '@/components/Background'
import Sidebar from '@/components/Sidebar'
import AboutSection from '@/components/sections/AboutSection'

/* Mapa de sección → componente.
   Cuando agreguemos más secciones, solo añadimos aquí. */
const SECTIONS: Record<string, React.ReactNode> = {
  about:    <AboutSection />,
  projects: <div className="section-container"><h1 className="section-title">PROYECTOS</h1></div>,
  skills:   <div className="section-container"><h1 className="section-title">SKILLS</h1></div>,
  social:   <div className="section-container"><h1 className="section-title">SOCIAL LINK</h1></div>,
  timeline: <div className="section-container"><h1 className="section-title">TIMELINE</h1></div>,
  resume:   <div className="section-container"><h1 className="section-title">SYSTEM</h1></div>,
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('about')

  return (
    <>
      <Background />
      <div className="app-layout">
        <Sidebar
          activeSection={activeSection}
          onNavigate={setActiveSection}
        />
        <main className="content-area">
          {SECTIONS[activeSection]}
        </main>
      </div>
    </>
  )
}