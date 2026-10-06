'use client'

import { useEffect } from 'react'
import { setSoundMuted, stopSounds, useSoundMuted } from '@/lib/sounds'
import styles from './SoundControls.module.css'

/**
 * Control global de audio. Cada efecto se carga cuando se utiliza por primera vez.
 */
export default function SoundControls() {
  const muted = useSoundMuted()

  useEffect(() => {
    function handleVisibility() {
      if (document.hidden) stopSounds()
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      stopSounds()
    }

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
