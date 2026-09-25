'use client'

import { useEffect, useRef } from 'react'
import type { Project } from '@/app/data/projects'
import { playSound } from '@/lib/sounds'
import styles from './sections/ProjectsSection.module.css'

interface Props {
  project: Project | null
  onClose: () => void
}

export default function ProjectDialog({ project, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closedByEscape = useRef(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (project && !dialog.open) {
      dialog.showModal()
      playSound('confirm')
    }
    if (!project && dialog.open) dialog.close()
  }, [project])

  return (
    <dialog
      ref={dialogRef} className={styles.dialog}
      aria-labelledby="project-dialog-title" aria-describedby="project-dialog-description"
      onCancel={() => { closedByEscape.current = true }}
      onClose={() => {
        playSound(closedByEscape.current ? 'cancel' : 'close')
        closedByEscape.current = false
        onClose()
      }}
      onClick={event => {
        // Solo cerrar al pulsar fuera del panel, no en su contenido o padding.
        if (event.target !== event.currentTarget) return
        const bounds = event.currentTarget.getBoundingClientRect()
        if (event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom) event.currentTarget.close()
      }}
    >
      {project && (
        <div className={styles.dialogPanel}>
          <div className={styles.dialogHeader}>
            <p className={styles.eyebrow}>PROJECT FILE / {project.type}</p>
            <button type="button" className={styles.close} onClick={() => dialogRef.current?.close()}>
              CERRAR <span aria-hidden="true">✕</span>
            </button>
          </div>
          <h2 className={styles.dialogTitle} id="project-dialog-title">{project.title}</h2>
          <p className={styles.status}>◆ {project.status}</p>
          <p className={styles.description} id="project-dialog-description">{project.description}</p>
          <ul className={styles.tags} aria-label="Tecnologías">
            {project.tags.map(tag => <li key={tag}>{tag}</li>)}
          </ul>
          <h3 className={styles.detailHeading}>DESARROLLO</h3>
          <ul className={styles.highlights}>
            {project.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}
          </ul>
          <a className={styles.action} href={project.github} target="_blank" rel="noopener noreferrer">
            VER EN GITHUB <span aria-hidden="true">↗</span>
            <span className={styles.srOnly}> (abre en otra pestaña)</span>
          </a>
        </div>
      )}
    </dialog>
  )
}
