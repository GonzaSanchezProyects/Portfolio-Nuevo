import React, { useState } from 'react';
import styles from './TechTicker.module.css';

import { 
  FaReact, FaHtml5, FaCss3Alt, FaGitAlt, FaFigma, 
  FaGithub, FaSass, FaMobileAlt, FaTimes
} from 'react-icons/fa';

import { 
  SiNextdotjs, SiJavascript, SiVite, 
  SiSupabase, SiN8N, SiVercel 
} from 'react-icons/si';

const techs = [
  { name: "React", icon: <FaReact size={40} /> },        
  { name: "Next.js", icon: <SiNextdotjs size={40} /> },  
  { name: "JavaScript", icon: <SiJavascript size={40} /> }, 
  { name: "HTML", icon: <FaHtml5 size={40} /> },         
  { name: "CSS", icon: <FaCss3Alt size={40} /> },        
  { name: "Git", icon: <FaGitAlt size={40} /> },         
  { name: "Figma", icon: <FaFigma size={40} /> },        
  { name: "Vite", icon: <SiVite size={40} /> },          
  { name: "Mobile", icon: <FaMobileAlt size={40} /> },   
  { name: "GitHub", icon: <FaGithub size={40} /> },      
  { name: "Sass", icon: <FaSass size={40} /> },          
  { name: "Supabase", icon: <SiSupabase size={40} /> },  
  { name: "n8n", icon: <SiN8N size={40} /> },            
  { name: "Vercel", icon: <SiVercel size={40} /> },      
];

export default function TechTicker() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.sectionWrapper}>
      
      {/* --- BOTÓN UNIFICADO (Web y Celular) --- */}
      <div className={styles.actionContainer}>
        <button 
          className={styles.toggleBtn} 
          onClick={() => setIsOpen(true)}
        >
          Ver mi stack tecnológico
        </button>
      </div>

      <div className={styles.tickerContainer}>
        {/* ENVOLTORIO PARA EVITAR EL SCROLL HORIZONTAL */}
        <div className={styles.trackWrapper}>
          {/* CINTA ANIMADA */}
          <div className={`${styles.tickerTrack} ${isOpen ? styles.paused : ''}`}>
            {techs.map((tech, index) => (
              <div key={index} className={styles.tickerItem}>{tech.icon}</div>
            ))}
            {techs.map((tech, index) => (
              <div key={`dup-${index}`} className={styles.tickerItem}>{tech.icon}</div>
            ))}
          </div>
        </div>

        {/* OVERLAY Y POPUP DE LISTA COMPLETA (MODAL FIJO) */}
        <div 
          className={`${styles.modalOverlay} ${isOpen ? styles.showOverlay : ''}`}
          onClick={() => setIsOpen(false)}
        >
          <div 
            className={`${styles.popupList} ${isOpen ? styles.showPopup : ''}`}
            onClick={(e) => e.stopPropagation()} /* Evita que el clic cierre el modal si tocas adentro */
          >
            {/* BOTÓN DE CERRAR DENTRO DEL POPUP */}
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
              <FaTimes size={20} />
            </button>

            <h4 className={styles.popupTitle}>Mi Stack Tecnológico</h4>
            <div className={styles.popupGrid}>
              {techs.map((tech, i) => (
                <div key={`popup-${i}`} className={styles.popupItem}>
                  {React.cloneElement(tech.icon, { size: 18 })}
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}