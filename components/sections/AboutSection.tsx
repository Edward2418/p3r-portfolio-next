import { SKILLS } from '@/app/data/portfolio'
import { ACADEMIC_PROGRESS, PLAYER_LEVEL, PLAYER_STATS, PROFILE } from '@/app/data/profile'
import ProgressBar from '@/components/ProgressBar'
import styles from './AboutSection.module.css'

export default function AboutSection() {
  const { academic } = PROFILE
  const attributes = SKILLS.filter(skill => skill.attribute)

  return (
    <section className={`section-container ${styles.section}`} aria-labelledby="about-title">
      <div className={styles.watermark} aria-hidden="true">{PLAYER_LEVEL}</div>

      <div className="section-header">
        <h1 className="section-title" id="about-title">SOBRE MÍ</h1>
        <div className="section-line" />
      </div>

      <div className={styles.layout}>
        <div className={styles.leftCol}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatar}>{PROFILE.initials}</div>
            <div className={styles.plv}>
              <span className={styles.plvLabel}>PLV</span>
              <span className={styles.plvNum}>{PLAYER_LEVEL}</span>
            </div>
          </div>

          <div className={styles.bars} aria-hidden="true">
            {PLAYER_STATS.map(stat => (
              <div className={styles.barRow} key={stat.label}>
                <span className={stat.variant === 'sp' ? `${styles.barLabel} ${styles.barLabelSp}` : styles.barLabel}>
                  {stat.label}
                </span>
                <ProgressBar
                  label={stat.label} value={stat.value} max={stat.max}
                  trackClassName={styles.barTrack}
                  fillClassName={`${styles.barFill} ${stat.variant === 'sp' ? styles.spFill : styles.hpFill}`}
                />
                <span className={stat.variant === 'sp' ? `${styles.barValue} ${styles.barValueSp}` : styles.barValue}>
                  {stat.value}<span className={styles.barMax}>/{stat.max}</span>
                </span>
              </div>
            ))}
          </div>

          <div className={styles.attrs}>
            {attributes.map((skill, index) => (
              <div key={skill.name} className={styles.attrRow}>
                <span className={styles.attrName} aria-hidden="true">{skill.attribute}</span>
                <span className={styles.attrSkill}>{skill.name}</span>
                <ProgressBar
                  label={`Nivel personal de ${skill.name}`} value={skill.fill} role="meter"
                  valueText={`${skill.fill} %`}
                  trackClassName={styles.attrTrack} fillClassName={styles.attrFill}
                  delay={index * 70}
                />
                <span className={styles.attrNum} aria-hidden="true">{skill.fill}%</span>
              </div>
            ))}
          </div>
          <p className={styles.statsNote}>Niveles orientativos de aprendizaje · escala personal de 0 a 100.</p>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.identity}>
            <h2 className={styles.name}>{PROFILE.name}</h2>
            <p className={styles.role}>{PROFILE.degree}</p>
            <p className={styles.institute}>{PROFILE.institution}</p>
          </div>
          <div className={styles.divider} />
          <p className={styles.bio}>
            Estudiante de {academic.currentSemester}º semestre con especialidad en{' '}
            <strong>{PROFILE.specialty}</strong>.
            Apasionado del anime, los JRPGs y la construcción
            de proyectos reales mientras aprendo las tecnologías
            que mueven la industria.
          </p>

          <div className={styles.nextExp}>
            <div className={styles.nextExpLabel}>NEXT EXP · {ACADEMIC_PROGRESS}%</div>
            <ProgressBar
              label="Progreso de carrera" value={academic.completedSemesters} max={academic.totalSemesters}
              valueText={`${academic.completedSemesters} de ${academic.totalSemesters} semestres completados`}
              trackClassName={styles.nextExpTrack} fillClassName={styles.nextExpFill} delay={350}
            />
            <div className={styles.nextExpInfo}>
              <span className={styles.nextExpVal}>
                {academic.completedSemesters} de {academic.totalSemesters} semestres completados
              </span>
              <span className={styles.nextExpGoal}>Meta: Titulación {academic.graduationYear}</span>
            </div>
          </div>

          <div className={styles.tags}>
            {SKILLS.map(skill => <span key={skill.name} className="tag">{skill.name}</span>)}
          </div>
        </div>
      </div>
    </section>
  )
}
