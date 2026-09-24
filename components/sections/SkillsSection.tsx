import type { CSSProperties } from 'react'
import { SKILLS } from '@/app/data/portfolio'
import ProgressBar from '@/components/ProgressBar'
import styles from './SkillsSection.module.css'

export default function SkillsSection() {
  return (
    <section className={`section-container ${styles.section}`} aria-labelledby="skills-title">
      <div className={styles.watermark} aria-hidden="true">SK</div>
      <div className="section-header">
        <h1 className="section-title" id="skills-title">SKILLS</h1>
        <div className="section-line" />
      </div>

      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.heading}>HABILIDADES TÉCNICAS</h2>
          <span className={styles.total}>{String(SKILLS.length).padStart(2, '0')} SKILLS</span>
        </div>
        <ul className={styles.list}>
          {SKILLS.map((skill, index) => (
            <li
              key={skill.name}
              className={styles.row}
              style={{ '--skill-color': skill.color } as CSSProperties}
            >
              <span className={styles.icon} aria-hidden="true">◆</span>
              <h3 className={styles.name}>{skill.name}</h3>
              <span className={styles.percentage} aria-hidden="true">
                {skill.fill}<span>%</span>
              </span>
              <ProgressBar
                label={`Nivel personal de ${skill.name}`}
                role="meter" value={skill.fill} valueText={`${skill.fill} %`}
                trackClassName={styles.track} fillClassName={styles.fill}
                delay={index * 90}
              />
            </li>
          ))}
        </ul>
        <p className={styles.note}>Porcentajes orientativos de autoevaluación personal.</p>
      </div>
    </section>
  )
}
