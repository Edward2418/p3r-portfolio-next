'use client'

import React, { useRef } from 'react'

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
    <aside className="sidebar">

      <div className="sidebar-header">
        <div className="char-avatar">
          <div className="avatar-placeholder">ED</div>
          <div className="char-level">
            <span className="lv-text">Lv</span>
            <span className="lv-num">6</span>
          </div>
        </div>
        <div className="char-info">
          <span className="char-name">EDWARD</span>
          <span className="char-role">ISC · Sem 6</span>
          <span className="char-arcana">◈ Full-Stack</span>
        </div>
      </div>

      <div className="stat-bars">
        <div className="stat-row">
          <span className="stat-label">HP</span>
          <div className="stat-bar-wrap">
            <div
              className="stat-bar hp-bar"
              style={{ '--fill': '85%' } as React.CSSProperties}
            />
          </div>
          <div className="stat-numbers">
            <span className="stat-value">425</span>
            <span className="stat-max">/500</span>
          </div>
        </div>
        <div className="stat-row">
          <span className="stat-label sp">SP</span>
          <div className="stat-bar-wrap">
            <div
              className="stat-bar sp-bar"
              style={{ '--fill': '60%' } as React.CSSProperties}
            />
          </div>
          <div className="stat-numbers">
            <span className="stat-value sp">182</span>
            <span className="stat-max">/300</span>
          </div>
        </div>
      </div>

      <nav className="main-nav" aria-label="Secciones del portafolio" aria-describedby="nav-instructions">
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
                onClick={() => onNavigate(item.id)}
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
