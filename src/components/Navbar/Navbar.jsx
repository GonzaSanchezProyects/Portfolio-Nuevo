import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Sun, Moon, Languages } from 'lucide-react'; // Iconos ligeros
import styles from './Navbar.module.css';

export default function Navbar() {
  const { theme, toggleTheme, lang, toggleLang } = useAppContext();

  return (
    <nav className={`${styles.nav} glass-panel`}>
      <span style={{ fontWeight: 800, fontSize: '1.2rem' }}>GS.</span>
      
      <div className={styles.divider}></div>
      
      <button className={styles.btn} onClick={toggleLang}>
        <Languages size={20} style={{ marginRight: 8 }} />
        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{lang.toUpperCase()}</span>
      </button>

      <button className={styles.btn} onClick={toggleTheme}>
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </nav>
  );
}