'use client'

import { useCallback, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Background         from '@/components/Background'
import Sidebar, { type SectionId } from '@/components/Sidebar'
import SectionTransition  from '@/components/SectionTransition'
import SoundControls      from '@/components/SoundControls'
import SplashScreen       from '@/components/SplashScreen'
import CustomCursor       from '@/components/CustomCursor'
import MainMenu from '@/components/MainMenu'
import SceneTransition from '@/components/SceneTransition'
import type { SceneView } from '@/lib/scene-transition'
import { playSound } from '@/lib/sounds'

function SectionLoading() {
  return <p className="section-container" role="status">Cargando sección…</p>
}

const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), { loading: SectionLoading })
const SkillsSection = dynamic(() => import('@/components/sections/SkillsSection'), { loading: SectionLoading })
const SocialSection = dynamic(() => import('@/components/sections/SocialSection'), { loading: SectionLoading })
const TimelineSection = dynamic(() => import('@/components/sections/TimelineSection'), { loading: SectionLoading })
const SystemSection = dynamic(() => import('@/components/sections/SystemSection'), { loading: SectionLoading })
const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection'), { loading: SectionLoading })

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
        </div>
      )}
      </SceneTransition>
    </>
  )
}
