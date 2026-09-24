'use client'

import { useState } from 'react'
import { SOCIAL_LINKS } from '@/app/data/portfolio'

export default function SocialSection() {
  const [active, setActive] = useState(SOCIAL_LINKS[0])

  return (
    <section className="section-container">
      <div className="section-header">
        <h1 className="section-title">SOCIAL LINK</h1>
        <div className="section-line" />
      </div>
      <div className="sl-layout">
        <div className="sl-list">
          {SOCIAL_LINKS.map((link) => (
            <div
              key={link.id}
              className={`sl-row ${active.id === link.id ? 'active' : ''}`}
              style={{ '--sl-color': link.color } as React.CSSProperties}
              onClick={() => setActive(link)}
            >
              <div className="sl-row-icon">{link.icon}</div>
              <div className="sl-row-info">
                <span className="sl-row-name">{link.name}</span>
                <span className="sl-row-arcana">{link.arcana}</span>
              </div>
              <div className="sl-row-rank">
                {Array.from({ length: 10 }, (_, i) => i < link.rank ? '★' : '☆').join('')}
              </div>
            </div>
          ))}
        </div>

        <div className="sl-detail">
          <div
            className="sl-card-detail"
            style={{ '--sl-color-detail': active.color } as React.CSSProperties}
          >
            <div className="sl-info-col">
              <div className="sl-detail-header">
                <div className="sl-arcana-badge">{active.arcana}</div>
                <h2 className="sl-detail-name">{active.name}</h2>
                <p className="sl-detail-sub">{active.sub}</p>
              </div>
              <div className="sl-rank-row">
                <div className="sl-rank-label">NIVEL DE VÍNCULO</div>
                <div className="sl-rank-num">{active.rank}</div>
                <div className="sl-stars">
                  {Array.from({ length: 10 }, (_, i) => (
                    <span key={i} className={`sl-star ${i >= active.rank ? 'empty' : ''}`}>★</span>
                  ))}
                </div>
              </div>
              <p className="sl-detail-desc">{active.desc}</p>
              <div className="sl-detail-tags">
                {active.tags.map(tag => <span key={tag} className="tag small">{tag}</span>)}
              </div>
              <blockquote className="sl-quote">{active.quote}</blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}