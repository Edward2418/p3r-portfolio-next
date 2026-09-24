import { ACADEMIC_PROGRESS, PLAYER_LEVEL, PROFILE } from '@/app/data/profile'
import { PROJECTS } from '@/app/data/projects'
import { SKILLS } from '@/app/data/portfolio'
import { SYSTEM_ACTIONS } from '@/app/data/systemActions'
import ProgressBar from '@/components/ProgressBar'
import styles from './SystemSection.module.css'

const STATS: Array<[string, string]> = [
  ['SEMESTRE', `${PROFILE.academic.currentSemester}º de ${PROFILE.academic.totalSemesters} · En curso`],
  ['ESPECIALIDAD', PROFILE.specialty],
  ['PROYECTOS', `${PROJECTS.length} publicados · ${PROJECTS.filter(project => project.status === 'Completado').length} completados`],
  ['TECNOLOGÍAS', SKILLS.map(skill => skill.name).join(' · ')],
  ['ESTADO', '◆ Disponible'],
]

export default function SystemSection() {
  return (
    <section className={`section-container ${styles.section}`} aria-labelledby="system-title">
      <div className={styles.watermark} aria-hidden="true">SYS</div>
      <div className="section-header">
        <h1 className="section-title" id="system-title">SYSTEM</h1>
        <div className="section-line" />
      </div>

      <div className={styles.layout}>
        <div className={styles.playerCard}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatar}>{PROFILE.initials}</div>
            <div className={styles.plvTag}>
              <span>PLV</span>
              <strong>{PLAYER_LEVEL}</strong>
            </div>
          </div>

          <div className={styles.playerInfo}>
            <h2 className={styles.playerName}>{PROFILE.name}</h2>
            <p className={styles.playerRole}>{PROFILE.degree}</p>
            <p className={styles.playerInst}>{PROFILE.institution}</p>
          </div>

          <div className={styles.divider} />

          <dl className={styles.stats}>
            {STATS.map(([label, value]) => (
              <div className={styles.statRow} key={label}>
                <dt className={styles.statLabel}>{label}</dt>
                <dd className={label === 'ESTADO' ? `${styles.statValue} ${styles.statActive}` : styles.statValue}>
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <div className={styles.progressBlock}>
            <div className={styles.progressLabel}>
              <span>PROGRESO DE CARRERA</span>
              <span>{ACADEMIC_PROGRESS}%</span>
            </div>
            <ProgressBar label="Progreso de carrera" value={ACADEMIC_PROGRESS}
              valueText={`${ACADEMIC_PROGRESS} %`}
              trackClassName={styles.progressTrack} fillClassName={styles.progressFill} />
            <div className={styles.progressHint}>Meta: Titulación {PROFILE.academic.graduationYear}</div>
          </div>
        </div>

        <div className={styles.actionsCol}>
          <h2 className={styles.actionsHeader}>ACCIONES DISPONIBLES</h2>
          <ul className={styles.actions}>
            {SYSTEM_ACTIONS.map(action => (
              <li key={action.title} className={action.primary ? `${styles.actionCard} ${styles.actionPrimary}` : styles.actionCard}>
                <span className={styles.actionIcon} aria-hidden="true">{action.icon}</span>
                <span className={styles.actionInfo}>
                  <span className={styles.actionTitle}>{action.title}</span>
                  <span className={styles.actionDesc}>{action.description}</span>
                </span>
                {action.pending ? (
                  <span className={styles.actionPending} title="Pendiente de agregar">{action.pending}</span>
                ) : (
                  <a
                    className={styles.actionBtn}
                    href={action.href}
                    target={action.href?.startsWith('http') ? '_blank' : undefined}
                    rel={action.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {action.button}
                    {action.href?.startsWith('http') && (
                      <span className={styles.srOnly}> (abre en otra pestaña)</span>
                    )}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <div className={styles.controlsHint}>
            <span><kbd>↑↓</kbd> Navegar</span>
            <span><kbd>↵</kbd> Seleccionar</span>
          </div>
        </div>
      </div>
    </section>
  )
}
