import React, { useState, useEffect } from 'react';
import { MapPin, Download, BookOpen } from 'lucide-react'; // Clock no se usaba, lo quité
import { useAppContext } from '../../context/AppContext';
import styles from './About.module.css';

export default function About() {
  const { t } = useAppContext();
  const [time, setTime] = useState("");

  // Reloj en vivo (Zona horaria Mendoza/Argentina -3)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('es-AR', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'America/Argentina/Mendoza' 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{t.about.title}</h2>
      
      <div className={styles.grid}>
        
        {/* COLUMNA 1: HISTORIA */}
        <article className={`${styles.bioCard} glass-panel`}>
          <p className={styles.bioText}>
            {t.about.bio_p1}
          </p>
          <p className={styles.bioText}>
            {t.about.bio_p2}
          </p>
          
          <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
             <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
               {t.about.hobbies}
             </span>
          </div>
        </article>

        {/* COLUMNA 2: WIDGETS */}
        <div className={styles.rightColumn}>
          
          {/* Ubicación & Hora */}
          <div className={`${styles.locationCard} glass-panel`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '8px', borderRadius: '8px' }}>
                <MapPin size={20} color="var(--primary)" />
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>{t.about.location}</h4>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <span className={styles.liveDot}></span> Online
                </div>
              </div>
            </div>
            
            <div className={styles.timeBox}>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'monospace' }}>{time}</span>
              <p style={{ fontSize: '0.7rem', opacity: 0.7 }}>GMT-3</p>
            </div>
          </div>

          {/* Learning Now */}
          <div className={`${styles.learningCard} glass-panel`}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', opacity: 0.8 }}>
                <BookOpen size={16} />
                <span style={{ fontSize: '0.85rem' }}>{t.about.learning}</span>
             </div>
             <div className={styles.techBadge}>
                {t.about.learning_item}
             </div>
          </div>

          {/* === BOTÓN CV CONFIGURADO === */}
          <a 
            href="/GonzaloSanchezCV.pdf" // La ruta empieza con / (refiere a la carpeta public)
            download="GonzaloSanchezCV.pdf" // Nombre con el que se guardará el archivo
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.cvCard} glass-panel`}
          >
            <div className={styles.cvContent}>
              <Download size={20} />
              <span>{t.about.cv_btn}</span>
            </div>
          </a>

        </div>
      </div>
    </section>
  );
}