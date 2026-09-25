'use client'

import { useEffect } from 'react'
import { preloadSounds, setSoundMuted, stopSounds, useSoundMuted } from '@/lib/sounds'
import styles from './SoundControls.module.css'

/**
 * Control global de audio: precarga los efectos y expone el botón de silencio.
 */
export default function SoundControls() {
  const muted = useSoundMuted()

  useEffect(() => {
    preloadSounds()

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
