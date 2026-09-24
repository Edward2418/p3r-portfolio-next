'use client'

import { useState } from 'react'
import Background         from '@/components/Background'
import Sidebar, { type SectionId } from '@/components/Sidebar'
import SectionTransition  from '@/components/SectionTransition'
import AboutSection       from '@/components/sections/AboutSection'
import SkillsSection      from '@/components/sections/SkillsSection'
import SocialSection      from '@/components/sections/SocialSection'
import TimelineSection    from '@/components/sections/TimelineSection'
import SystemSection      from '@/components/sections/SystemSection'

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>('about')

  const sections: Record<SectionId, React.ReactNode> = {
    about:    <AboutSection />,
    projects: (
      <div className="section-container">
        <h1 className="section-title">PROYECTOS</h1>
        <p style={{ color: 'var(--white-dim)', marginTop: '1rem' }}>Próximamente — Fase 3</p>
      </div>
    ),
    skills:   <SkillsSection />,
    social:   <SocialSection />,
    timeline: <TimelineSection />,
    resume:   <SystemSection />,
  }

  return (
    <>
      <Background />
      <div className="app-layout">
        <Sidebar
          activeSection={activeSection}
          onNavigate={setActiveSection}
        />
        <main className="content-area">
          <SectionTransition sectionKey={activeSection}>
            {(displayed) => sections[displayed]}
          </SectionTransition>
        </main>
      </div>
    </>
  )
}
