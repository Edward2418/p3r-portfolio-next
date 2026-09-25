import type { CSSProperties } from 'react'
import type { SocialLink } from '@/app/data/portfolio'
import OguriPortrait from './OguriPortrait'
import styles from './sections/SocialSection.module.css'

export default function SocialLinkDetail({ link }: { link: SocialLink }) {
  return (
    <article key={link.id} id="social-detail" aria-labelledby="social-detail-name"
      className={styles.detail} style={{ '--sl-color-detail': link.color } as CSSProperties}>
      <div className={link.id === 'oguri' ? styles.illustratedDetail : styles.textDetail}>
        {link.id === 'oguri' && <OguriPortrait />}
        <div className={styles.detailPanel}>
          <div className={styles.detailHeader}>
            <span className={styles.arcanaBadge}>{link.arcana}</span>
            <p className={styles.detailSub}>{link.sub}</p>
            <h2 className={styles.detailName} id="social-detail-name">{link.name}</h2>
          </div>
          <div className={styles.rankBlock}>
            <div className={styles.rankLabel}>NIVEL DE VÍNCULO</div>
            <div className={styles.rankValue}>
              <span className={styles.rankNum}>{link.rank}</span>
              <span className={styles.rankMax}>/10</span>
            </div>
            <div className={styles.stars} aria-hidden="true">
              {Array.from({ length: 10 }, (_, i) => (
                <span key={i} className={i < link.rank ? styles.star : styles.starEmpty}>★</span>
              ))}
            </div>
          </div>
          <p className={styles.detailDesc}>{link.desc}</p>
          <div className={styles.tags} aria-label="Etiquetas">
            {link.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
          </div>
          <blockquote className={styles.quote}>{link.quote}</blockquote>
        </div>
      </div>
    </article>
  )
}
