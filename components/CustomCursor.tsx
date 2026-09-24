'use client'

import { useEffect, useRef } from 'react'
import styles from './CustomCursor.module.css'

const INTERACTIVE = 'a, button, [role="button"], [role="tab"], [role="switch"], input, select, textarea, label'
const LERP = 0.35
const SNAP = 0.2

/**
 * Cursor personalizado (anillo con retardo + punto): solo se activa en
 * dispositivos con puntero fino y desaparece si el ratón sale de la ventana.
 * La posición se actualiza directamente en el DOM para no re-renderizar.
 */
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!fine.matches) return

    const maybeRing = ringRef.current
    const maybeDot = dotRef.current
    if (!maybeRing || !maybeDot) return

    const ring: HTMLDivElement = maybeRing
    const dot: HTMLDivElement = maybeDot

    let targetX = -100
    let targetY = -100
    let ringX = -100
    let ringY = -100
    let frame = 0

    function place() {
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
    }

    function tick() {
      ringX += (targetX - ringX) * LERP
      ringY += (targetY - ringY) * LERP
      place()

      if (Math.abs(targetX - ringX) > SNAP || Math.abs(targetY - ringY) > SNAP) {
        frame = window.requestAnimationFrame(tick)
      } else {
        frame = 0
      }
    }

    function handlePointerMove(event: PointerEvent) {
      targetX = event.clientX
      targetY = event.clientY
      dot.style.opacity = '1'
      ring.style.opacity = '1'
      place()

      const target = event.target as Element | null
      const interactive = target instanceof Element && target.closest(INTERACTIVE) !== null
      ring.classList.toggle(styles.ringHover, interactive)
      dot.classList.toggle(styles.dotHover, interactive)

      if (!frame) frame = window.requestAnimationFrame(tick)
    }

    function handlePointerOut(event: PointerEvent) {
      if (event.relatedTarget !== null) return
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    function handlePointerOver(event: PointerEvent) {
      if (event.relatedTarget !== null) return
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.documentElement.addEventListener('pointerout', handlePointerOut)
    document.documentElement.addEventListener('pointerover', handlePointerOver)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      document.documentElement.removeEventListener('pointerout', handlePointerOut)
      document.documentElement.removeEventListener('pointerover', handlePointerOver)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className={styles.cursor} aria-hidden="true">
      <div ref={ringRef} className={styles.ring} />
      <div ref={dotRef} className={styles.dot} />
    </div>
  )
}
