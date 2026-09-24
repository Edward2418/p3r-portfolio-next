'use client'

import { useState } from 'react'
import { PROJECTS, type Project } from '@/app/data/projects'
import ProjectDialog from '@/components/ProjectDialog'
import styles from './ProjectsSection.module.css'

const technologies = [...new Set(PROJECTS.flatMap(project => project.tags))]

export default function ProjectsSection() {
  const [filter, setFilter] = useState<string | null>(null)
  const [selected, setSelected] = useState<Project | null>(null)
  const visible = PROJECTS.filter(project => filter === null || project.tags.includes(filter))

  return (
    <section className={`section-container ${styles.section}`} aria-labelledby="projects-title">
      <div className={styles.watermark} aria-hidden="true">PROJECTS</div>
      <div className="section-header">
        <h1 className="section-title" id="projects-title">PROYECTOS</h1>
        <div className="section-line" />
      </div>
      <p className={styles.intro}>Ideas que convierto en código. Selecciona un proyecto para explorar su ficha.</p>

      <div className={styles.filters} role="group" aria-label="Filtrar por tecnología">
        {[null, ...technologies].map(technology => (
          <button
            key={technology ?? 'all'} type="button"
            className={styles.filter} aria-pressed={filter === technology}
            onClick={() => setFilter(technology)}
          >
            {technology ?? '◆ TODOS'}
          </button>
        ))}
      </div>
      <p className={styles.count} role="status">
        {visible.length} de {PROJECTS.length} proyectos{filter ? ` · ${filter}` : ''}
      </p>

      <div className={styles.grid}>
        {visible.map((project, index) => (
          <article className={styles.card} key={project.id}>
            <div className={styles.art} aria-hidden="true">
              <span className={styles.artNumber}>{String(index + 1).padStart(2, '0')}</span>
              <span className={styles.artTitle}>PERSONAL<br />PROJECT</span>
              <span className={styles.artCaption}>CODE / DESIGN / RELOAD</span>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.eyebrow}>{project.type}</p>
              <h2 className={styles.title}>{project.title}</h2>
              <p className={styles.status}>◆ {project.status}</p>
              <p className={styles.description}>{project.summary}</p>
              <ul className={styles.tags} aria-label="Tecnologías">
                {project.tags.map(tag => <li key={tag}>{tag}</li>)}
              </ul>
              <button className={styles.action} type="button" onClick={() => setSelected(project)}
                aria-haspopup="dialog" aria-label={`Ver detalle de ${project.title}`}>
                VER DETALLE <span aria-hidden="true">↗</span>
              </button>
            </div>
          </article>
        ))}
      </div>
      {visible.length === 0 && <p className={styles.description}>No hay proyectos con esta tecnología.</p>}
      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
