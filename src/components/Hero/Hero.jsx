import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import styles from './Hero.module.css';

// 1. IMPORTAR EL COMPONENTE NUEVO
import HackerText from '../HackerText/HackerText'; 

export default function Hero() {
  const { t } = useAppContext();

  return (
    <section className={styles.container}>
      <div className={styles.titleWrapper}>
        <div className={styles.avatarPortal}>
           <img 
             src="/profile.jpg"
             alt="Profile" 
             // Quitamos la clase anterior, ahora la imagen es 'avatarImage'
             className={styles.avatarImage}
           />
        </div>
        
        {/* 2. AQUÍ REEMPLAZAMOS EL TÍTULO ESTÁTICO */}
        {/* Antes era: <h1 className={styles.title}>{t.hero_title}</h1> */}
        
        <h1 className={styles.title}>
          {/* Pasamos el texto y la clase original para mantener el estilo */}
          <HackerText text={t.hero_title} className={styles.title} />
        </h1>

        <p className={styles.role}>{t.role}</p>
        <p className={styles.subtitle}>{t.hero_subtitle}</p>
      </div>

      {/* ... resto de botones ... */}
      <div className={styles.socialWrapper}>
         {/* ... */}
      </div>
    </section>
  );
}