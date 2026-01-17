import React from 'react';
import { useAppContext } from '../../context/AppContext';
import styles from './Education.module.css';

export default function Education() {
  const { t } = useAppContext();

  return (
    <section>
      <div className={styles.container}>
        {/* Línea vertical decorativa */}
        <div className={styles.line}></div>

        {t.education.map((item, index) => (
          <article 
            key={item.id} 
            className={`${styles.item} ${index === 0 ? styles.active : ''}`}
          >
            {/* Punto decorativo */}
            <div className={styles.dot}></div>

            {/* Tarjeta de Contenido */}
            <div className={`${styles.content} glass-panel`}>
              <div className={styles.header}>
                <div>
                  <h3 className={styles.title}>{item.title}</h3>
                  <span className={styles.place}>{item.place}</span>
                </div>
                
                <span className={styles.dateBadge}>
                  {item.date}
                </span>
              </div>
              
              <p className={styles.desc}>{item.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}