'use client'

import React, { useRef, useState } from 'react'
import { PLAYER_LEVEL, PLAYER_STATS, PROFILE } from '@/app/data/profile'

export const NAV_ITEMS = [
  { id: 'about',    label: 'SOBRE MÍ' },
  { id: 'projects', label: 'PROYECTOS' },
  { id: 'skills',   label: 'SKILLS' },
  { id: 'social',   label: 'SOCIAL LINK' },
  { id: 'timeline', label: 'TIMELINE' },
  { id: 'resume',   label: 'SYSTEM' },
] as const

export type SectionId = typeof NAV_ITEMS[number]['id']

export default function Sidebar({
  activeSection,
  onNavigate
}: {
  activeSection: SectionId
  onNavigate: (section: SectionId) => void
}) {
  const buttons = useRef<Array<HTMLButtonElement | null>>([])
  const toggleButton = useRef<HTMLButtonElement | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeLabel = NAV_ITEMS.find(item => item.id === activeSection)?.label

  function closeMenu() {
    setMenuOpen(false)
    // En escritorio el botón compacto está oculto.
    if (toggleButton.current?.getClientRects().length) toggleButton.current.focus()
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.altKey || event.ctrlKey || event.metaKey) return

    let nextIndex = index
    switch (event.key) {
      case 'ArrowDown': nextIndex = (index + 1) % NAV_ITEMS.length; break
      case 'ArrowUp': nextIndex = (index - 1 + NAV_ITEMS.length) % NAV_ITEMS.length; break
      case 'Home': nextIndex = 0; break
      case 'End': nextIndex = NAV_ITEMS.length - 1; break
      default: return
    }

    event.preventDefault()
    buttons.current[nextIndex]?.focus()
  }

  return (
    <aside
      className={`sidebar${menuOpen ? ' menu-open' : ''}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && menuOpen) {
          event.preventDefault()
          closeMenu()
        }
      }}
    >

      <button
        ref={toggleButton}
        className="mobile-menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="portfolio-navigation"
        onClick={() => setMenuOpen(open => !open)}
      >
        <span className="mobile-menu-brand">{PROFILE.displayName} <span>Lv {PLAYER_LEVEL}</span></span>
        <span className="mobile-menu-section">{activeLabel}</span>
        <span className="mobile-menu-action">{menuOpen ? 'CERRAR ✕' : 'MENÚ ☰'}</span>
      </button>

      <div className="sidebar-header">
        <div className="char-avatar">
          <div className="avatar-placeholder">{PROFILE.initials}</div>
          <div className="char-level">
            <span className="lv-text">Lv</span>
            <span className="lv-num">{PROFILE.academic.currentSemester}</span>
          </div>
        </div>
        <div className="char-info">
          <span className="char-name">{PROFILE.displayName}</span>
          <span className="char-role">ISC · Sem {PROFILE.academic.currentSemester}</span>
          <span className="char-arcana">◈ Full-Stack</span>
        </div>
      </div>

      <div className="stat-bars" aria-hidden="true">
        {PLAYER_STATS.map(stat => (
          <div className="stat-row" key={stat.label}>
            <span className={`stat-label ${stat.variant}`}>{stat.label}</span>
            <div className="stat-bar-wrap">
              <div
                className={`stat-bar ${stat.variant}-bar`}
                style={{ '--fill': `${stat.value / stat.max * 100}%` } as React.CSSProperties}
              />
            </div>
            <div className="stat-numbers">
              <span className={`stat-value ${stat.variant}`}>{stat.value}</span>
              <span className="stat-max">/{stat.max}</span>
            </div>
          </div>
        ))}
      </div>

      <nav id="portfolio-navigation" className="main-nav" aria-label="Secciones del portafolio" aria-describedby="nav-instructions">
        <ul className="nav-list">
          {NAV_ITEMS.map((item, index) => (
            <li key={item.id}>
              <button
                ref={(button) => { buttons.current[index] = button }}
                type="button"
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                aria-current={activeSection === item.id ? 'true' : undefined}
                aria-controls="section-content"
                onKeyDown={(event) => handleKeyDown(event, index)}
                onClick={() => {
                  onNavigate(item.id)
                  if (menuOpen) closeMenu()
                }}
              >
                <span className="nav-arrow" aria-hidden="true" />
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer" id="nav-instructions">
        <span className="ctrl-hint"><kbd>↑↓</kbd> Navegar</span>
        <span className="ctrl-hint"><kbd>↵</kbd> Confirmar</span>
      </div>

    </aside>
  )
}
