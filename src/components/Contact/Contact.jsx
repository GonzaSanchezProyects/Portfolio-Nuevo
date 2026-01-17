import React, { useState } from 'react';
import { Mail, Github, Linkedin, Check, Instagram, MessageCircle } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import Magnetic from '../Magnetic/Magnetic';
import styles from './Contact.module.css';

export default function Contact() {
  const { t } = useAppContext();
  const [copied, setCopied] = useState(false);
  
  // TU CORREO REAL AQUÍ
  const email = "gonzalo.sanchez.develop@gmail.com"; 

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={styles.container}>
      <div className={`${styles.card} glass-panel`}>
        <h2 className={styles.title}>{t.contact.title}</h2>
        <p className={styles.desc}>{t.contact.desc}</p>

        {/* --- NUEVA ESTRUCTURA --- */}
        <div className={styles.actionsWrapper}>
          
          {/* 1. Botón de Email (Largo y claro) */}
          <Magnetic>
            <button 
              onClick={handleCopy} 
              className={`${styles.emailBtn} magnetic-item`}
            >
              {copied ? <Check size={20} /> : <Mail size={20} />}
              <span>{copied ? t.contact.copied : t.contact.copy}</span>
            </button>
          </Magnetic>

          {/* 2. Grupo de Redes Sociales (Cuadrados y oscuros) */}
          <div className={styles.socialGroup}>
            <Magnetic>
              <a href="https://www.linkedin.com/in/gonzalo-sanchez-126439192/" target="_blank" rel="noopener noreferrer" className={`${styles.socialBtn} magnetic-item`} aria-label="LinkedIn">
                <Linkedin size={22} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://github.com/GonzaSanchezProyects" target="_blank" rel="noopener noreferrer" className={`${styles.socialBtn} magnetic-item`} aria-label="GitHub">
                <Github size={22} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://www.instagram.com/gonzaa_sanchezz/" target="_blank" rel="noopener noreferrer" className={`${styles.socialBtn} magnetic-item`} aria-label="Instagram">
                <Instagram size={22} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://api.whatsapp.com/send/?phone=5492634272885&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className={`${styles.socialBtn} magnetic-item`} aria-label="WhatsApp">
                <MessageCircle size={22} />
              </a>
            </Magnetic>
          </div>
        </div>
        {/* ------------------------- */}
        
        <p className={styles.emailText}>
          {email}
        </p>
      </div>
    </section>
  );
}