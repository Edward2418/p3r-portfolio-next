'use client'

import { useState } from 'react'
import { TIMELINE_EVENTS } from '@/app/data/portfolio'

export default function TimelineSection() {
  const [active, setActive] = useState(
    TIMELINE_EVENTS.find(e => e.isCurrent) ?? TIMELINE_EVENTS[0]
  )

  return (
    <section className="section-container">
      <div className="timeline-lv-bg" aria-hidden="true">TL</div>
      <div className="section-header">
        <h1 className="section-title">TIMELINE</h1>
        <div className="section-line" />
      </div>
      <div className="timeline-p3r-layout">
        <div className="timeline-events-col">
          {TIMELINE_EVENTS.map((ev) => (
            <div
              key={ev.id}
              className={`tl-event ${ev.isCurrent ? 'current' : ''} ${ev.isFuture ? 'future' : ''} ${active.id === ev.id ? 'active' : ''}`}
              onClick={() => setActive(ev)}
            >
              <div className="tl-event-marker">
                <div className="tl-event-year">{ev.year}</div>
                <div className="tl-event-dot" />
              </div>
              <div className="tl-event-label">
                <span className="tl-event-title">{ev.title}</span>
                <span className="tl-event-sub">{ev.sub}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="timeline-detail-col">
          <div className="tl-detail">
            <div className="tl-detail-year-big">{active.year}</div>
            <div className="tl-detail-content">
              <div className={`tl-detail-badge ${active.isCurrent ? 'active-badge' : ''} ${active.isFuture ? 'future-badge' : ''}`}>
                {active.badge}
              </div>
              <h3 className="tl-detail-title">{active.fullTitle}</h3>
              <p className="tl-detail-institution">{active.institution}</p>
              <div className="tl-detail-divider" />
              <p className="tl-detail-desc">{active.desc}</p>
              <div className="tl-detail-tags">
                {active.tags.map(tag => <span key={tag} className="tag small">{tag}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}