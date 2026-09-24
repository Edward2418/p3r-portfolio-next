import { SKILLS } from '@/app/data/portfolio'
import { ACADEMIC_PROGRESS, PLAYER_LEVEL, PLAYER_STATS, PROFILE } from '@/app/data/profile'
import ProgressBar from '@/components/ProgressBar'

export default function AboutSection() {
  const { academic } = PROFILE
  const attributes = SKILLS.filter(skill => skill.attribute)

  return (
    <section className="section-container" aria-labelledby="about-title">
      <div className="about-lv-bg" aria-hidden="true">{PLAYER_LEVEL}</div>

      <div className="section-header">
        <h1 className="section-title" id="about-title">SOBRE MÍ</h1>
        <div className="section-line" />
      </div>

      <div className="about-stats-layout">
        <div className="about-left-col">
          <div className="about-avatar-wrap">
            <div className="avatar-large-placeholder">{PROFILE.initials}</div>
            <div className="about-plv">
              <span className="about-plv-label">PLV</span>
              <span className="about-plv-num">{PLAYER_LEVEL}</span>
            </div>
          </div>

          <div className="about-bars" aria-hidden="true">
            {PLAYER_STATS.map(stat => (
              <div className="about-bar-row" key={stat.label}>
                <span className={`about-bar-label ${stat.variant}`}>{stat.label}</span>
                <ProgressBar
                  label={stat.label} value={stat.value} max={stat.max}
                  trackClassName="about-bar-track"
                  fillClassName={`about-bar-fill ${stat.variant}-fill`}
                />
                <span className={`about-bar-val ${stat.variant}`}>
                  {stat.value}<span className="about-bar-max">/{stat.max}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="about-attrs">
            {attributes.map((skill, index) => (
              <div key={skill.name} className="about-attr-row">
                <span className="about-attr-name" aria-hidden="true">{skill.attribute}</span>
                <span className="about-attr-skill">{skill.name}</span>
                <ProgressBar
                  label={`Nivel personal de ${skill.name}`} value={skill.fill} role="meter"
                  trackClassName="about-attr-bar-wrap" fillClassName="about-attr-bar"
                  delay={index * 70}
                />
                <span className="about-attr-num" aria-hidden="true">{skill.fill}</span>
              </div>
            ))}
          </div>
          <p className="about-stats-note">Niveles orientativos de aprendizaje · escala personal de 0 a 100.</p>
        </div>

        <div className="about-right-col">
          <div className="about-identity">
            <h2 className="about-name">{PROFILE.name}</h2>
            <p className="about-role">{PROFILE.degree}</p>
            <p className="about-institute">{PROFILE.institution}</p>
          </div>
          <div className="about-divider" />
          <p className="about-bio">
            Estudiante de {academic.currentSemester}º semestre con especialidad en{' '}
            <strong>{PROFILE.specialty}</strong>.
            Apasionado del anime, los JRPGs y la construcción
            de proyectos reales mientras aprendo las tecnologías
            que mueven la industria.
          </p>

          <div className="about-next-exp">
            <div className="next-exp-label">NEXT EXP · {ACADEMIC_PROGRESS}%</div>
            <ProgressBar
              label="Progreso de carrera" value={academic.completedSemesters} max={academic.totalSemesters}
              valueText={`${academic.completedSemesters} de ${academic.totalSemesters} semestres completados`}
              trackClassName="next-exp-track" fillClassName="next-exp-fill" delay={350}
            />
            <div className="next-exp-info">
              <span className="next-exp-val">{academic.completedSemesters} de {academic.totalSemesters} semestres completados</span>
              <span className="next-exp-goal">Meta: Titulación {academic.graduationYear}</span>
            </div>
          </div>

          <div className="about-tags">
            {SKILLS.map(skill => <span key={skill.name} className="tag">{skill.name}</span>)}
          </div>
        </div>
      </div>
    </section>
  )
}
