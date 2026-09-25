'use client'

import Image from 'next/image'
import styles from './MenuCharacter.module.css'

/**
 * Ilustración de Oguri Cap en una columna propia a la derecha del contenido.
 * Es decorativa: se atenúa fuera de la
 * sección About para no competir con el texto.
 */
export default function MenuCharacter({ dimmed = false }: { dimmed?: boolean }) {
  return (
    <div
      className={dimmed ? `${styles.character} ${styles.dimmed}` : styles.character}
      aria-hidden="true"
    >
      <div className={styles.body}>
        <span className={styles.halo} />
        <Image
          className={styles.image}
          src="/img/oguri-cap.png"
          alt=""
          width={607}
          height={900}
          sizes="(max-width: 1439px) 0px, (min-width: 1800px) 360px, 20vw"
          draggable={false}
        />
        <span className={styles.groundGlow} />
      </div>
    </div>
  )
}
