export default function AboutSection() {
  return (
    <section className="section-container">

      <div className="about-lv-bg" aria-hidden="true">06</div>

      <div className="section-header">
        <h1 className="section-title">SOBRE MÍ</h1>
        <div className="section-line" />
      </div>

      <div className="about-stats-layout">

        <div className="about-left-col">
          <div className="about-avatar-wrap">
            <div className="avatar-large-placeholder">ED</div>
            <div className="about-plv">
              <span className="about-plv-label">PLV</span>
              <span className="about-plv-num">06</span>
            </div>
          </div>

          <div className="about-bars">
            <div className="about-bar-row">
              <span className="about-bar-label">HP</span>
              <div className="about-bar-track">
                <div className="about-bar-fill hp-fill" style={{ '--fill': '85%' } as React.CSSProperties} />
              </div>
              <span className="about-bar-val">425<span className="about-bar-max">/500</span></span>
            </div>
            <div className="about-bar-row">
              <span className="about-bar-label sp">SP</span>
              <div className="about-bar-track">
                <div className="about-bar-fill sp-fill" style={{ '--fill': '60%' } as React.CSSProperties} />
              </div>
              <span className="about-bar-val sp">182<span className="about-bar-max">/300</span></span>
            </div>
          </div>

          <div className="about-attrs">
            {[
              { name: 'STR', skill: 'Java',       val: 70, fill: '70%' },
              { name: 'MAG', skill: 'SQL',        val: 65, fill: '65%' },
              { name: 'END', skill: 'HTML/CSS/JS', val: 75, fill: '75%' },
              { name: 'AGI', skill: 'Kotlin',     val: 55, fill: '55%' },
              { name: 'LCK', skill: 'Linux',      val: 60, fill: '60%' },
            ].map((attr) => (
              <div key={attr.name} className="about-attr-row">
                <span className="about-attr-name">{attr.name}</span>
                <span className="about-attr-skill">{attr.skill}</span>
                <div className="about-attr-bar-wrap">
                  <div
                    className="about-attr-bar"
                    style={{ '--attr-fill': attr.fill, width: attr.fill } as React.CSSProperties}
                  />
                </div>
                <span className="about-attr-num">{attr.val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-right-col">
          <div className="about-identity">
            <h2 className="about-name">Edward Negrete Bustos</h2>
            <p className="about-role">Ingeniería en Sistemas Computacionales</p>
            <p className="about-institute">TecNM · ITSH · Huauchinango, Pue.</p>
          </div>

          <div className="about-divider" />

          <p className="about-bio">
            Estudiante de 6to semestre con especialidad en{' '}
            <strong>Full-Stack y Videojuegos</strong>.
            Apasionado del anime, los JRPGs y la construcción
            de proyectos reales mientras aprendo las tecnologías
            que mueven la industria.
          </p>

          <div className="about-next-exp">
            <div className="next-exp-label">NEXT EXP</div>
            <div className="next-exp-track">
              <div className="next-exp-fill" style={{ width: '50%' }} />
            </div>
            <div className="next-exp-info">
              <span className="next-exp-val">4 semestres completados</span>
              <span className="next-exp-goal">Meta: Titulación 2027</span>
            </div>
          </div>

          <div className="about-tags">
            {['Java', 'SQL', 'HTML/CSS/JS', 'Kotlin', 'Linux', 'Git'].map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}