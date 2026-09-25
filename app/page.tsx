'use client'

import { useCallback, useRef, useState } from 'react'
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
import SplashScreen       from '@/components/SplashScreen'
import CustomCursor       from '@/components/CustomCursor'
import MenuCharacter      from '@/components/MenuCharacter'
import MainMenu from '@/components/MainMenu'
import SceneTransition from '@/components/SceneTransition'
import type { SceneView } from '@/lib/scene-transition'
import { playSound } from '@/lib/sounds'

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>('about')
  const [view, setView] = useState<'menu' | 'section'>('menu')
  const focusRequested = useRef(false)
  const backButton = useRef<HTMLButtonElement>(null)

  const focusScene = useCallback((displayed: SceneView) => {
    if (!focusRequested.current) return
    focusRequested.current = false
    if (displayed === 'menu') {
      document.querySelector<HTMLButtonElement>(`[data-main-menu="${activeSection}"]`)?.focus()
    } else {
      backButton.current?.focus()
    }
  }, [activeSection])

  function openSection(section: SectionId) {
    playSound('confirm')
    focusRequested.current = true
    setActiveSection(section)
    setView('section')
  }

  function returnToMenu() {
    playSound('cancel')
    focusRequested.current = true
    setView('menu')
  }

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
      <a className="skip-link" href="#portfolio-main">Saltar al contenido</a>
      <CustomCursor />
      <SplashScreen />
      <SoundControls />
      <SceneTransition view={view} onReady={focusScene}>
      {displayedView => displayedView === 'menu' ? (
        <MainMenu selected={activeSection} onSelect={setActiveSection} onOpen={openSection} />
      ) : (
        <div className="app-layout" onKeyDown={event => {
          if (event.key === 'Escape' && !event.defaultPrevented && !document.querySelector('dialog[open]')) {
            event.preventDefault()
            returnToMenu()
          }
        }}>
          <Sidebar
            activeSection={activeSection}
            onNavigate={setActiveSection}
          />
          <main id="portfolio-main" className="content-area" tabIndex={-1} aria-label="Contenido del portafolio">
            <div className="section-toolbar">
              <button ref={backButton} type="button" className="back-to-menu" onClick={returnToMenu}>
                <span aria-hidden="true">←</span> VOLVER AL MENÚ <kbd>Esc</kbd>
              </button>
            </div>
            <div className="section-stage">
              <SectionTransition sectionKey={activeSection}>
                {(displayed) => sections[displayed]}
              </SectionTransition>
            </div>
          </main>
          <MenuCharacter dimmed={activeSection !== 'about'} />
        </div>
      )}
      </SceneTransition>
    </>
  )
}
