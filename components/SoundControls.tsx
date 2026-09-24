'use client'

import { useEffect } from 'react'
import { playSound, preloadSounds, setSoundMuted, useSoundMuted } from '@/lib/sounds'
import styles from './SoundControls.module.css'

/**
 * Control global de audio: precarga los efectos, reproduce el sonido de
 * cancelación con Escape y expone el botón de silencio de la interfaz.
 */
export default function SoundControls() {
  const muted = useSoundMuted()

  useEffect(() => {
    preloadSounds()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') playSound('cancel')
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <button
      type="button"
      className={muted ? `${styles.toggle} ${styles.toggleMuted}` : styles.toggle}
      aria-pressed={muted}
      aria-label={muted ? 'Activar sonidos de la interfaz' : 'Silenciar sonidos de la interfaz'}
      onClick={() => setSoundMuted(!muted)}
    >
      <span className={styles.icon} aria-hidden="true">♪</span>
      <span className={styles.label}>SONIDO {muted ? 'OFF' : 'ON'}</span>
    </button>
  )
}
