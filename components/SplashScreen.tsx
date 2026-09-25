'use client'

import { useEffect, useRef, useState } from 'react'
import { PROFILE } from '@/app/data/profile'
import { playSound } from '@/lib/sounds'
import styles from './SplashScreen.module.css'

const SEEN_KEY = 'p3r-portfolio:splash-seen'
const LEAVE_MS = 700

function alreadySeen(): boolean {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

function remember() {
  try {
    window.sessionStorage.setItem(SEEN_KEY, '1')
  } catch {
    /* sin sessionStorage solo se pierde el recuerdo de la sesión */
  }
}

/**
 * Pantalla de bienvenida estilo P3R. Se muestra una vez por sesión y se
 * cierra con el botón de entrada o Escape, reproduciendo el sonido de
 * apertura del menú del juego.
 */
export default function SplashScreen() {
  const [leaving, setLeaving] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const entering = useRef(false)
  const leaveTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!alreadySeen() && dialog && !dialog.open) dialog.showModal()
    return () => {
      if (leaveTimer.current) window.clearTimeout(leaveTimer.current)
      dialog?.close()
    }
  }, [])

  function enter() {
    if (entering.current) return
    entering.current = true
    setLeaving(true)
    remember()
    playSound('open')
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : LEAVE_MS
    leaveTimer.current = window.setTimeout(() => {
      dialogRef.current?.close()
      const navigation = document.querySelectorAll<HTMLButtonElement>(
        '[data-main-menu][data-selected="true"], .mobile-menu-toggle, .nav-item[aria-current="true"]'
      )
      Array.from(navigation).find(button => button.getClientRects().length)?.focus()
    }, delay)
  }

  return (
    <dialog
      ref={dialogRef}
      className={leaving ? `${styles.splash} ${styles.leaving}` : styles.splash}
      aria-label="Pantalla de bienvenida"
      onCancel={event => { event.preventDefault(); enter() }}
    >
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.bigText} aria-hidden="true">PORTFOLIO</div>

      <div className={styles.center}>
        <p className={styles.kicker}>PERSONA · 3 · RELOAD</p>
        <h1 className={styles.name}>{PROFILE.name.toUpperCase()}</h1>
        <p className={styles.role}>{PROFILE.degree}</p>
        <p className={styles.specialty}>{PROFILE.specialty}</p>
        <button type="button" className={styles.prompt} onClick={enter} aria-disabled={leaving}>
          <span className={styles.promptKey} aria-hidden="true">◀</span>
          <span>ENTRAR AL PORTAFOLIO</span>
          <span className={styles.promptKey} aria-hidden="true">▶</span>
        </button>
      </div>

      <div className={styles.footer}>
        <span>© Edward Negrete Bustos</span>
        <span>
          ISC · ITSH · Sem {PROFILE.academic.currentSemester} de {PROFILE.academic.totalSemesters}
        </span>
      </div>
    </dialog>
  )
}
