'use client'

import { useSyncExternalStore } from 'react'

/**
 * Sonidos extraídos de Persona 3 Reload (CueSheet) y convertidos a MP3.
 * Cada efecto se asocia a una acción de la interfaz, como en el juego.
 */
export type SoundKey = 'cursor' | 'confirm' | 'cancel' | 'open' | 'close' | 'levelup'

interface SoundDefinition {
  src: string
  volume: number
}

const SOUNDS: Record<SoundKey, SoundDefinition> = {
  cursor: { src: '/audio/cursor.mp3', volume: 0.35 },
  confirm: { src: '/audio/confirm.mp3', volume: 0.45 },
  cancel: { src: '/audio/cancel.mp3', volume: 0.4 },
  open: { src: '/audio/open.mp3', volume: 0.55 },
  close: { src: '/audio/close.mp3', volume: 0.4 },
  levelup: { src: '/audio/levelup.mp3', volume: 0.5 },
}

const STORAGE_KEY = 'p3r-portfolio:sound-muted'

const elements = new Map<SoundKey, HTMLAudioElement>()
const listeners = new Set<() => void>()

let muted = false
let hydrated = false
let lastCursorAt = -Infinity

/** Detener efectos pendientes al abandonar la pestaña o silenciar. */
export function stopSounds() {
  elements.forEach(audio => {
    audio.pause()
    audio.currentTime = 0
  })
}

function hydrate() {
  if (hydrated || typeof window === 'undefined') return
  hydrated = true
  try {
    muted = window.localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    muted = false
  }
}

function notify() {
  listeners.forEach(listener => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot() {
  hydrate()
  return muted
}

/** Estado de silencio compartido para todos los componentes. */
export function useSoundMuted(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

export function setSoundMuted(next: boolean) {
  hydrate()
  muted = next
  elements.forEach(audio => {
    audio.muted = next
  })
  if (next) stopSounds()
  try {
    window.localStorage.setItem(STORAGE_KEY, next ? '1' : '0')
  } catch {
    /* almacenamiento no disponible: el estado sigue vigente en memoria */
  }
  notify()
}

function getAudio(key: SoundKey): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null

  const cached = elements.get(key)
  if (cached) return cached

  const definition = SOUNDS[key]
  const audio = new Audio(definition.src)
  audio.volume = definition.volume
  audio.muted = muted
  audio.preload = 'auto'
  elements.set(key, audio)
  return audio
}

/**
 * Reproduce un efecto de sonido. No falla si el navegador bloquea el audio
 * (política de autoplay) o si el archivo aún no terminó de cargar.
 */
export function playSound(key: SoundKey) {
  hydrate()
  if (muted || typeof document === 'undefined' || document.hidden) return
  if (key === 'cursor') {
    const now = performance.now()
    if (now - lastCursorAt < 70) return
    lastCursorAt = now
  }

  const audio = getAudio(key)
  if (!audio) return

  try {
    audio.currentTime = 0
    void audio.play().catch(() => {
      /* autoplay bloqueado: se reintentará en la siguiente interacción */
    })
  } catch {
    /* audio no disponible */
  }
}

/** Precarga los archivos para que la primera reproducción sea inmediata. */
export function preloadSounds() {
  if (typeof window === 'undefined') return
  (Object.keys(SOUNDS) as SoundKey[]).forEach(key => getAudio(key))
}
