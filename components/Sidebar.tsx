'use client'

import React from 'react'

const NAV_ITEMS = [
  { id: 'about',    label: 'SOBRE MÍ' },
  { id: 'projects', label: 'PROYECTOS' },
  { id: 'skills',   label: 'SKILLS' },
  { id: 'social',   label: 'SOCIAL LINK' },
  { id: 'timeline', label: 'TIMELINE' },
  { id: 'resume',   label: 'SYSTEM' },
]

export default function Sidebar({
  activeSection,
  onNavigate
}: {
  activeSection: string
  onNavigate: (section: string) => void
}) {
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

      <nav className="main-nav">
        <ul className="nav-list">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-arrow" />
              <span className="nav-label">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <span className="ctrl-hint"><kbd>↑↓</kbd> Navegar</span>
        <span className="ctrl-hint"><kbd>↵</kbd> Confirmar</span>
      </div>

    </aside>
  )
}