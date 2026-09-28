'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styles from './OguriPortrait.module.css'

const POSTER = '/img/social/oguri/poster.webp'
const SPRITES = {
  480: '/img/social/oguri/idle-480.webp',
  960: '/img/social/oguri/idle-960.webp',
} as const

/** Cinco fotogramas sobre un único lienzo: evita parpadeos al cambiar de imagen. */
export default function OguriPortrait() {
  const root = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const node = root.current
    if (!node) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    let disposed = false
    let loadedWidth = 0
    let requestedWidth = 0
    let version = 0

    function update() {
      if (disposed || !node) return
      node.dataset.reduced = String(reduced.matches)
      node.dataset.running = String(visible && !document.hidden && !reduced.matches)
      if (!visible || document.hidden || reduced.matches) return
      const canvas = node.querySelector<HTMLElement>('[role="img"]')
      const pixels = (canvas?.getBoundingClientRect().width ?? 390) * window.devicePixelRatio
      const width = pixels <= 480 ? 480 : 960
      // Solo subir de resolución: evitar nuevas descargas al reducir la ventana.
      if (width <= loadedWidth || width <= requestedWidth) return
      requestedWidth = width
      const requestVersion = ++version
      const image = new window.Image()
      image.src = SPRITES[width]
      void image.decode().then(() => {
        if (disposed || requestVersion !== version) return
        node.style.setProperty('--oguri-sprite', `url("${SPRITES[width]}")`)
        loadedWidth = width
        node.dataset.ready = 'true'
      }).catch(() => {
        // Conservar la imagen fija o la variante previamente decodificada.
        if (!disposed && requestVersion === version) requestedWidth = loadedWidth
      })
    }

    const observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting)
      update()
    }, { threshold: 0.1 })
    observer.observe(node)
    const resize = new ResizeObserver(update)
    resize.observe(node)
    window.addEventListener('resize', update)
    reduced.addEventListener('change', update)
    document.addEventListener('visibilitychange', update)
    update()

    return () => {
      disposed = true
      observer.disconnect()
      resize.disconnect()
      window.removeEventListener('resize', update)
      reduced.removeEventListener('change', update)
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  return (
    <div ref={root} className={styles.portrait} data-paused={paused}>
      <div className={styles.backdrop} aria-hidden="true" />
      <p className={styles.caption} aria-hidden="true">THE STAR / OGURI CAP</p>
      <div className={styles.canvas} role="img" aria-label="Oguri Cap, de Uma Musume: Pretty Derby">
        <Image src={POSTER} alt="" width={1031} height={1526}
          className={styles.poster} unoptimized draggable={false} />
        <div className={styles.sprite} aria-hidden="true" />
      </div>
      <div className={styles.controls}>
        <button type="button" className={styles.pause} aria-pressed={paused}
          aria-label="Pausar animación de Oguri" onClick={() => setPaused(value => !value)}>
          {paused ? '▶ REANUDAR' : 'Ⅱ PAUSAR'}
        </button>
        <span className={styles.staticLabel}>ILUSTRACIÓN ESTÁTICA</span>
      </div>
    </div>
  )
}
