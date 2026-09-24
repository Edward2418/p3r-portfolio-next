'use client'

import { useState, type KeyboardEvent } from 'react'
import { TIMELINE_EVENTS } from '@/app/data/portfolio'
import { playSound } from '@/lib/sounds'
import styles from './TimelineSection.module.css'

export default function TimelineSection() {
  const [active, setActive] = useState(
    TIMELINE_EVENTS.find(e => e.isCurrent) ?? TIMELINE_EVENTS[0]
  )

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.altKey || event.ctrlKey || event.metaKey) return

    let nextIndex = index
    switch (event.key) {
      case 'ArrowDown': nextIndex = (index + 1) % TIMELINE_EVENTS.length; break
      case 'ArrowUp': nextIndex = (index - 1 + TIMELINE_EVENTS.length) % TIMELINE_EVENTS.length; break
      case 'Home': nextIndex = 0; break
      case 'End': nextIndex = TIMELINE_EVENTS.length - 1; break
      default: return
    }

    event.preventDefault()
    playSound('cursor')
    const rows = event.currentTarget.parentElement?.querySelectorAll('button')
    rows?.[nextIndex]?.focus()
    setActive(TIMELINE_EVENTS[nextIndex])
  }

  return (
    <section className={`section-container ${styles.section}`} aria-labelledby="timeline-title">
      <div className={styles.watermark} aria-hidden="true">TL</div>
      <div className="section-header">
        <h1 className="section-title" id="timeline-title">TIMELINE</h1>
        <div className="section-line" />
      </div>

      <div className={styles.layout}>
        <div className={styles.events}>
          {TIMELINE_EVENTS.map((ev, index) => (
            <button
              key={ev.id}
              type="button"
              className={[
                styles.event,
                ev.isCurrent ? styles.eventCurrent : '',
                ev.isFuture ? styles.eventFuture : '',
                active.id === ev.id ? styles.eventActive : '',
              ].filter(Boolean).join(' ')}
              aria-pressed={active.id === ev.id}
              onKeyDown={event => handleKeyDown(event, index)}
              onMouseEnter={() => playSound('cursor')}
              onClick={() => {
                playSound('confirm')
                setActive(ev)
              }}
            >
              <span className={styles.marker}>
                <span className={styles.year}>{ev.year}</span>
                <span className={styles.dot} aria-hidden="true" />
              </span>
              <span className={styles.label}>
                <span className={styles.eventTitle}>{ev.title}</span>
                <span className={styles.eventSub}>{ev.sub}</span>
              </span>
            </button>
          ))}
        </div>

        <div className={styles.detail} key={active.id}>
          <div className={styles.yearBig} aria-hidden="true">{active.year}</div>
          <div className={styles.detailContent}>
            <span className={[
              styles.badge,
              active.isCurrent ? styles.badgeActive : '',
              active.isFuture ? styles.badgeFuture : '',
            ].filter(Boolean).join(' ')}>{active.badge}</span>
            <h2 className={styles.detailTitle}>{active.fullTitle}</h2>
            <p className={styles.detailInstitution}>{active.institution}</p>
            <div className={styles.divider} />
            <p className={styles.detailDesc}>{active.desc}</p>
            <div className={styles.tags} aria-label="Etiquetas">
              {active.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
