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
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

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
      if (!fine.matches || reduced.matches || event.pointerType === 'touch' || document.querySelector('dialog[open]')) {
        hide()
        return
      }
      const firstMove = !document.documentElement.hasAttribute('data-custom-cursor')
      targetX = event.clientX
      targetY = event.clientY
      if (firstMove) {
        ringX = targetX
        ringY = targetY
      }
      document.documentElement.setAttribute('data-custom-cursor', '')
      dot.style.opacity = '1'
      ring.style.opacity = '1'
      place()

      const target = event.target as Element | null
      const interactive = target instanceof Element && target.closest(INTERACTIVE) !== null
      ring.classList.toggle(styles.ringHover, interactive)
      dot.classList.toggle(styles.dotHover, interactive)

      if (!frame) frame = window.requestAnimationFrame(tick)
    }

    function hide() {
      document.documentElement.removeAttribute('data-custom-cursor')
      dot.style.opacity = '0'
      ring.style.opacity = '0'
      if (frame) window.cancelAnimationFrame(frame)
      frame = 0
    }

    function handlePointerOut(event: PointerEvent) {
      if (event.relatedTarget !== null) return
      hide()
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.documentElement.addEventListener('pointerout', handlePointerOut)
    window.addEventListener('blur', hide)
    fine.addEventListener('change', hide)
    reduced.addEventListener('change', hide)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      document.documentElement.removeEventListener('pointerout', handlePointerOut)
      window.removeEventListener('blur', hide)
      fine.removeEventListener('change', hide)
      reduced.removeEventListener('change', hide)
      hide()
    }
  }, [])

  return (
    <div className={styles.cursor} aria-hidden="true">
      <div ref={ringRef} className={styles.ring} />
      <div ref={dotRef} className={styles.dot} />
    </div>
  )
}
