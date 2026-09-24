export default function SystemSection() {
  return (
    <section className="section-container">
      <div className="system-lv-bg" aria-hidden="true">SYS</div>
      <div className="section-header">
        <h1 className="section-title">SYSTEM</h1>
        <div className="section-line" />
      </div>
      <div className="system-p3r-layout">
        <div className="system-player-card">
          <div className="sys-avatar-wrap">
            <div className="sys-avatar">ED</div>
            <div className="sys-plv-tag">
              <span className="sys-plv-lbl">PLV</span>
              <span className="sys-plv-num">06</span>
            </div>
          </div>
          <div className="sys-player-info">
            <h2 className="sys-player-name">EDWARD NEGRETE BUSTOS</h2>
            <p className="sys-player-role">Ing. en Sistemas Computacionales</p>
            <p className="sys-player-inst">TecNM · ITSH · Huauchinango, Pue.</p>
          </div>
          <div className="sys-divider" />
          <div className="sys-stats-list">
            {[
              ['SEMESTRE',     '6to de 8'],
              ['ESPECIALIDAD', 'Full-Stack · Videojuegos'],
              ['PROYECTOS',    '4 completados'],
              ['TECNOLOGÍAS',  'Java · SQL · HTML/CSS/JS · Kotlin'],
              ['ESTADO',       '◆ Disponible'],
            ].map(([label, val]) => (
              <div key={label} className="sys-stat-row">
                <span className="sys-stat-label">{label}</span>
                <span className={`sys-stat-val ${label === 'ESTADO' ? 'sys-stat-active' : ''}`}>{val}</span>
              </div>
            ))}
          </div>
          <div className="sys-progress-block">
            <div className="sys-progress-label">
              <span>PROGRESO DE CARRERA</span>
              <span>75%</span>
            </div>
            <div className="sys-progress-track">
              <div className="sys-progress-fill" style={{ width: '75%' }} />
            </div>
            <div className="sys-progress-hint">Meta: Titulación 2027</div>
          </div>
        </div>

        <div className="system-actions-col">
          <div className="sys-actions-header">ACCIONES DISPONIBLES</div>
          {[
            { icon: '▼', title: 'Descargar Currículum', desc: 'CV completo en formato PDF · Actualizado 2025', href: '/cv-edward.pdf', btn: 'DOWNLOAD', primary: true },
            { icon: '✉', title: 'Correo institucional', desc: 'd23390169@huauchinango.tecnm.mx', href: 'mailto:d23390169@huauchinango.tecnm.mx', btn: 'SEND', primary: false },
            { icon: 'GH', title: 'GitHub', desc: 'github.com/Edward2418', href: 'https://github.com/Edward2418', btn: 'VISIT', primary: false },
            { icon: 'LI', title: 'LinkedIn', desc: 'Perfil profesional', href: 'https://linkedin.com/', btn: 'VISIT', primary: false },
          ].map((action) => (
            <div key={action.title} className={`sys-action-card ${action.primary ? 'primary' : ''}`}>
              <div className={`sys-action-icon ${action.primary ? 'primary' : ''}`}>{action.icon}</div>
              <div className="sys-action-info">
                <h3 className="sys-action-title">{action.title}</h3>
                <p className="sys-action-desc">{action.desc}</p>
              </div>
              <a
                className={`sys-action-btn ${action.primary ? 'primary-btn' : ''}`}
                href={action.href}
                target={action.href.startsWith('http') ? '_blank' : undefined}
                rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {action.btn}
              </a>
            </div>
          ))}
          <div className="sys-controls-hint">
            <span><kbd>↑↓</kbd> Navegar</span>
            <span><kbd>↵</kbd> Seleccionar</span>
          </div>
        </div>
      </div>
    </section>
  )
}