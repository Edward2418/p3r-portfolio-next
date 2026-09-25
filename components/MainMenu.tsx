'use client'

import Image from 'next/image'
import { useRef, type KeyboardEvent } from 'react'
import { NAV_ITEMS, type SectionId } from './Sidebar'
import { PROFILE } from '@/app/data/profile'
import { playSound } from '@/lib/sounds'
import styles from './MainMenu.module.css'

const DESCRIPTIONS: Record<SectionId, string> = {
  about: 'Conoce mi perfil y mi formación.',
  projects: 'Explora los proyectos que estoy construyendo.',
  skills: 'Consulta mis habilidades técnicas.',
  social: 'Descubre mis intereses e inspiraciones.',
  timeline: 'Recorre mi trayectoria académica.',
  resume: 'Consulta mi perfil y las opciones de contacto.',
}

interface Props {
  selected: SectionId
  onSelect: (section: SectionId) => void
  onOpen: (section: SectionId) => void
}

export default function MainMenu({ selected, onSelect, onOpen }: Props) {
  const buttons = useRef<Array<HTMLButtonElement | null>>([])

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.altKey || event.ctrlKey || event.metaKey) return
    let next: number
    switch (event.key) {
      case 'ArrowDown': next = (index + 1) % NAV_ITEMS.length; break
      case 'ArrowUp': next = (index - 1 + NAV_ITEMS.length) % NAV_ITEMS.length; break
      case 'Home': next = 0; break
      case 'End': next = NAV_ITEMS.length - 1; break
      default: return
    }
    event.preventDefault()
    buttons.current[next]?.focus()
  }

  return (
    <main id="portfolio-main" tabIndex={-1} className={styles.scene} aria-labelledby="main-menu-title">
      <div className={styles.wordmark} aria-hidden="true">PORTFOLIO</div>
      <header className={styles.header}>
        <h1 id="main-menu-title">{PROFILE.displayName}</h1>
        <p>ISC / SEMESTRE {PROFILE.academic.currentSemester}</p>
      </header>

      <div className={styles.portrait} aria-hidden="true">
        <Image src="/img/oguri-cap.png" alt="" width={607} height={900}
          sizes="(max-width: 768px) 70vw, 48vw" className={styles.image} draggable={false} />
      </div>

      <div className={styles.menu}>
        <p className={styles.eyebrow}>PERSONAL FILE / MENU</p>
        <nav aria-label="Menú principal" aria-describedby="main-menu-help">
          <ul className={styles.list}>
            {NAV_ITEMS.map((item, index) => (
              <li key={item.id}>
                <button type="button"
                  ref={button => { buttons.current[index] = button }}
                  className={styles.option}
                  data-main-menu={item.id}
                  data-selected={selected === item.id}
                  onFocus={() => {
                    if (selected !== item.id) playSound('cursor')
                    onSelect(item.id)
                  }}
                  onMouseEnter={() => {
                    if (selected !== item.id) playSound('cursor')
                    onSelect(item.id)
                  }}
                  onKeyDown={event => navigate(event, index)}
                  onClick={() => onOpen(item.id)}>
                  <span className={styles.number} aria-hidden="true">0{index + 1}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <p className={styles.description}>{DESCRIPTIONS[selected]}</p>
        <p className={styles.help} id="main-menu-help">
          <span><kbd>↑↓</kbd> Elegir</span><span><kbd>Enter</kbd> Abrir</span>
        </p>
      </div>
    </main>
  )
}
