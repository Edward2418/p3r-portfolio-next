'use client'

import { useState, type CSSProperties, type KeyboardEvent } from 'react'
import { SOCIAL_LINKS } from '@/app/data/portfolio'
import { playSound } from '@/lib/sounds'
import SceneTransition from '@/components/SceneTransition'
import SocialLinkDetail from '@/components/SocialLinkDetail'
import styles from './SocialSection.module.css'

export default function SocialSection() {
  const [active, setActive] = useState(SOCIAL_LINKS[0])

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.altKey || event.ctrlKey || event.metaKey) return

    let nextIndex = index
    switch (event.key) {
      case 'ArrowDown': nextIndex = (index + 1) % SOCIAL_LINKS.length; break
      case 'ArrowUp': nextIndex = (index - 1 + SOCIAL_LINKS.length) % SOCIAL_LINKS.length; break
      case 'Home': nextIndex = 0; break
      case 'End': nextIndex = SOCIAL_LINKS.length - 1; break
      default: return
    }

    event.preventDefault()
    playSound('cursor')
    const rows = event.currentTarget.parentElement?.querySelectorAll('button')
    rows?.[nextIndex]?.focus()
    setActive(SOCIAL_LINKS[nextIndex])
  }

  return (
    <section className={`section-container ${styles.section}`} aria-labelledby="social-title">
      <div className={styles.watermark} aria-hidden="true">LINK</div>
      <div className="section-header">
        <h1 className="section-title" id="social-title">SOCIAL LINK</h1>
        <div className="section-line" />
      </div>

      <div className={styles.layout}>
        <nav className={styles.list} aria-label="Vínculos">
          {SOCIAL_LINKS.map((link, index) => (
            <button
              key={link.id}
              type="button"
              className={`${styles.row} ${active.id === link.id ? styles.rowActive : ''}`}
              style={{ '--sl-color': link.color } as CSSProperties}
              aria-pressed={active.id === link.id}
              aria-controls="social-detail"
              onKeyDown={event => handleKeyDown(event, index)}
              onMouseEnter={() => playSound('cursor')}
              onClick={() => {
                playSound('confirm')
                setActive(link)
              }}
            >
              <span className={styles.rowIcon} aria-hidden="true">{link.icon}</span>
              <span className={styles.rowInfo}>
                <span className={styles.rowName}>{link.name}</span>
                <span className={styles.rowArcana}>{link.arcana}</span>
              </span>
              <span className={styles.rowRank} aria-label={`Nivel de vínculo ${link.rank} de 10`}>
                {Array.from({ length: 10 }, (_, i) =>
                  <span key={i} className={i < link.rank ? styles.star : styles.starEmpty} aria-hidden="true">★</span>
                )}
              </span>
            </button>
          ))}
        </nav>

        <SceneTransition view={active.id} variant="panel">
          {id => <SocialLinkDetail link={SOCIAL_LINKS.find(link => link.id === id) ?? SOCIAL_LINKS[0]} />}
        </SceneTransition>
      </div>
    </section>
  )
}
