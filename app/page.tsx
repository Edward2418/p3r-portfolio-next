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
import ProjectsSection    from '@/components/sections/ProjectsSection'
import SoundControls      from '@/components/SoundControls'

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>('about')

  const sections: Record<SectionId, React.ReactNode> = {
    about:    <AboutSection />,
    projects: <ProjectsSection />,
    skills:   <SkillsSection />,
    social:   <SocialSection />,
    timeline: <TimelineSection />,
    resume:   <SystemSection />,
  }

  return (
    <>
      <Background />
      <SoundControls />
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
