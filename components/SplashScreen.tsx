'use client'

import { useEffect, useRef, useState } from 'react'
import { PROFILE } from '@/app/data/profile'
import { playSound } from '@/lib/sounds'
import styles from './SplashScreen.module.css'

const SEEN_KEY = 'p3r-portfolio:splash-seen'
const LEAVE_MS = 700

type Phase = 'shown' | 'leaving' | 'hidden'

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
 * cierra con cualquier tecla, clic o toque, reproduciendo el sonido de
 * apertura del menú del juego.
 */
export default function SplashScreen() {
  const [phase, setPhase] = useState<Phase>('shown')
  const enabled = useRef(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const leaveTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    function leave() {
      if (!enabled.current) return
      enabled.current = false
      setPhase('leaving')
      remember()
      playSound('open')
      leaveTimer.current = window.setTimeout(() => setPhase('hidden'), LEAVE_MS)
    }

    function handleKeyDown(event: KeyboardEvent) {
      // Las teclas modificadoras pulsadas solas no deben cerrar el splash.
      if (['Shift', 'Control', 'Alt', 'Meta'].includes(event.key)) return
      leave()
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('pointerdown', leave)

    // Se resuelve tras el hidrata para evitar desajustes con el HTML del servidor.
    const readyTimer = window.setTimeout(() => {
      if (alreadySeen()) {
        setPhase('hidden')
        return
      }
      enabled.current = true
      buttonRef.current?.focus()
    }, 0)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('pointerdown', leave)
      window.clearTimeout(readyTimer)
      if (leaveTimer.current) window.clearTimeout(leaveTimer.current)
    }
  }, [])

  if (phase === 'hidden') return null

  return (
    <div
      className={phase === 'leaving' ? `${styles.splash} ${styles.leaving}` : styles.splash}
      role="dialog"
      aria-modal="true"
      aria-label="Pantalla de bienvenida"
    >
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.bigText} aria-hidden="true">PORTFOLIO</div>

      <div className={styles.center}>
        <p className={styles.kicker}>PERSONA · 3 · RELOAD</p>
        <h1 className={styles.name}>{PROFILE.name.toUpperCase()}</h1>
        <p className={styles.role}>{PROFILE.degree}</p>
        <p className={styles.specialty}>{PROFILE.specialty}</p>
        <button ref={buttonRef} type="button" className={styles.prompt}>
          <span className={styles.promptKey} aria-hidden="true">◀</span>
          <span>PULSA CUALQUIER TECLA PARA ENTRAR</span>
          <span className={styles.promptKey} aria-hidden="true">▶</span>
        </button>
      </div>

      <div className={styles.footer}>
        <span>© Edward Negrete Bustos</span>
        <span>
          ISC · ITSH · Sem {PROFILE.academic.currentSemester} de {PROFILE.academic.totalSemesters}
        </span>
      </div>
    </div>
  )
}
