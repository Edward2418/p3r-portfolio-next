'use client'

import { useState, type ReactNode } from 'react'
import type { SectionId } from './Sidebar'

interface Props {
  sectionKey: SectionId
  children: (displayed: SectionId) => ReactNode
}

type Phase = 'idle' | 'exit' | 'enter'

export default function SectionTransition({ sectionKey, children }: Props) {
  const [transition, setTransition] = useState<{
    requested: SectionId
    displayed: SectionId
    phase: Phase
  }>({ requested: sectionKey, displayed: sectionKey, phase: 'idle' })

  // Conservar la pantalla saliente y recordar siempre el último destino.
  // Volver a la pantalla visible durante la salida cancela ese cambio.
  if (transition.requested !== sectionKey) {
    setTransition({
      ...transition,
      requested: sectionKey,
      phase: transition.displayed === sectionKey ? 'enter' : 'exit',
    })
  }

  const { displayed, phase } = transition

  return (
    <div
      id="section-content"
      className={`section-transition${phase === 'idle' ? '' : ` section-${phase}`}`}
      aria-busy={phase !== 'idle'}
      inert={phase === 'exit'}
      onAnimationEnd={(event) => {
        // Las animaciones internas de una sección no controlan la navegación.
        if (event.target !== event.currentTarget) return
        setTransition(current => current.phase === 'exit'
          ? { ...current, displayed: current.requested, phase: 'enter' }
          : { ...current, phase: 'idle' })
      }}
    >
      {children(displayed)}
    </div>
  )
}
