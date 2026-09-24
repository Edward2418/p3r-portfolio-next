import { SKILLS } from '@/app/data/portfolio'

export default function SkillsSection() {
  const half = Math.ceil(SKILLS.length / 2)
  const left  = SKILLS.slice(0, half)
  const right = SKILLS.slice(half)

  return (
    <section className="section-container">
      <div className="skills-lv-bg" aria-hidden="true">SK</div>
      <div className="section-header">
        <h1 className="section-title">SKILLS</h1>
        <div className="section-line" />
      </div>
      <div className="skills-p3r-layout">
        <SkillCol title="TÉCNICAS" icon="⚔" skills={left} />
        <SkillCol title="HERRAMIENTAS" icon="🛡" skills={right} />
      </div>
    </section>
  )
}

function SkillCol({ title, icon, skills }: {
  title: string
  icon: string
  skills: typeof SKILLS
}) {
  return (
    <div className="skills-col">
      <div className="skills-col-header">
        <span className="skills-col-icon">{icon}</span>
        <span className="skills-col-title">{title}</span>
      </div>
      {skills.map((skill) => (
        <div key={skill.name} className="skill-entry">
          <div
            className="skill-type-dot"
            style={{ '--dot-color': skill.color } as React.CSSProperties}
          />
          <div className="skill-entry-info">
            <span className="skill-entry-name">{skill.name}</span>
            <span className="skill-entry-sub">{skill.sub}</span>
          </div>
          <div className="skill-entry-right">
            <span
              className="skill-entry-rank"
              style={{ '--dot-color': skill.color } as React.CSSProperties}
            >
              Lv {skill.fill}
            </span>
            <div className="skill-entry-bar-wrap">
              <div
                className="skill-entry-bar"
                style={{
                  '--dot-color': skill.color,
                  width: `${skill.fill}%`,
                } as React.CSSProperties}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}