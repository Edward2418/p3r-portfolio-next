'use client'

import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { transitionScene, type SceneState, type SceneView } from '@/lib/scene-transition'
import styles from './SceneTransition.module.css'

interface Props {
  view: SceneView
  onReady: (view: SceneView) => void
  children: (displayed: SceneView) => ReactNode
}

export default function SceneTransition({ view, onReady, children }: Props) {
  const [scene, setScene] = useState<SceneState>({
    requested: view, displayed: view, phase: 'idle', version: 0,
  })

  if (scene.requested !== view) setScene(transitionScene(scene, { type: 'request', view }))

  const advance = useCallback(() => {
    setScene(current => transitionScene(current, { type: 'advance', version: scene.version }))
  }, [scene.version])

  useEffect(() => {
    if (scene.phase === 'idle') {
      onReady(scene.displayed)
      return
    }
    // Respaldo si se cancela la animación; sin espera con movimiento reducido.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(advance, reduced ? 0 : 900)
    return () => window.clearTimeout(timer)
  }, [scene.phase, scene.displayed, advance, onReady])

  const busy = scene.phase !== 'idle'
  return (
    <div className={styles.stage} aria-busy={busy}>
      <div className={styles.content} data-scene-phase={scene.phase} inert={busy}>
        {children(scene.displayed)}
      </div>
      {busy && (
        <div key={scene.version} aria-hidden="true"
          className={`${styles.sweep} ${scene.phase === 'cover' ? styles.cover : styles.reveal}`}
          onAnimationEnd={event => {
            if (event.target === event.currentTarget) advance()
          }}>
          <span className={styles.line} />
        </div>
      )}
    </div>
  )
}
