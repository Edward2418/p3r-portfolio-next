'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styles from './OguriPortrait.module.css'

const POSTER = '/img/social/oguri/video-poster.webp'
const VIDEO = '/img/social/oguri/idle-video.webm'

/** Video sin pista de audio; el póster permanece hasta la primera reproducción. */
export default function OguriPortrait() {
  const root = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)
  const syncPlayback = useRef<(() => void) | null>(null)

  useEffect(() => {
    const node = root.current
    const media = video.current
    if (!node || !media) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    let disposed = false
    let failed = false

    function update() {
      if (disposed || !node || !media) return
      node.dataset.reduced = String(reduced.matches)
      const running = visible && !document.hidden && !reduced.matches && !pausedRef.current && !failed
      if (!running) {
        media.pause()
        return
      }
      if (!media.getAttribute('src')) media.src = VIDEO
      void media.play().catch(() => {
        if (disposed || media.error || !visible || document.hidden || reduced.matches || pausedRef.current) return
        // Un bloqueo de autoplay permite reintentar mediante el botón.
        pausedRef.current = true
        setPaused(true)
      })
    }

    function onPlaying() {
      if (!node) return
      node.dataset.ready = 'true'
      node.dataset.running = 'true'
    }
    function onPause() {
      if (node) node.dataset.running = 'false'
    }
    function onError() {
      failed = true
      if (node) {
        node.dataset.ready = 'false'
        node.dataset.failed = 'true'
      }
      media?.pause()
    }

    syncPlayback.current = update
    const observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting)
      update()
    }, { threshold: 0.1 })
    observer.observe(node)
    media.addEventListener('playing', onPlaying)
    media.addEventListener('pause', onPause)
    media.addEventListener('error', onError)
    reduced.addEventListener('change', update)
    document.addEventListener('visibilitychange', update)
    update()

    return () => {
      disposed = true
      syncPlayback.current = null
      observer.disconnect()
      reduced.removeEventListener('change', update)
      document.removeEventListener('visibilitychange', update)
      media.removeEventListener('playing', onPlaying)
      media.removeEventListener('pause', onPause)
      media.removeEventListener('error', onError)
      media.pause()
      media.removeAttribute('src')
      media.load()
    }
  }, [])

  return (
    <div ref={root} className={styles.portrait} data-paused={paused}>
      <div className={styles.backdrop} aria-hidden="true" />
      <p className={styles.caption} aria-hidden="true">THE STAR / OGURI CAP</p>
      <div className={styles.canvas} role="img" aria-label="Oguri Cap, de Uma Musume: Pretty Derby">
        <Image src={POSTER} alt="" width={540} height={960}
          className={styles.poster} unoptimized draggable={false} />
        <video ref={video} className={styles.video} muted loop playsInline preload="none"
          aria-hidden="true" disablePictureInPicture />
      </div>
      <div className={styles.controls}>
        <button type="button" className={styles.pause} aria-pressed={paused}
          aria-label="Pausar animación de Oguri" onClick={() => {
            pausedRef.current = !pausedRef.current
            setPaused(pausedRef.current)
            syncPlayback.current?.()
          }}>
          {paused ? '▶ REANUDAR' : 'Ⅱ PAUSAR'}
        </button>
        <span className={styles.staticLabel}>ILUSTRACIÓN ESTÁTICA</span>
      </div>
    </div>
  )
}
