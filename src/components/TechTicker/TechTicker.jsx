import React, { useState } from 'react';
import styles from './TechTicker.module.css';

import { 
  FaReact, FaHtml5, FaCss3Alt, FaGitAlt, FaFigma, 
  FaGithub, FaSass, FaMobileAlt
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
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const showPopup = isHovered || isMobileOpen;

  return (
    <div className={styles.sectionWrapper}>
      
      {/* --- BOTÓN PARA MÓVIL --- */}
      <div className={styles.mobileAction}>
        <button 
          className={styles.mobileBtn} 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? "Cerrar Stack" : "Click para ver mi stack"}
        </button>
      </div>

      {/* --- CARTEL INDICADOR PARA DESKTOP --- */}
      <div className={`${styles.desktopHint} ${isHovered ? styles.hiddenHint : ''}`}>
        Pasa el mouse para ver el stack completo ✨
      </div>

      <div 
        className={styles.tickerContainer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* CINTA ANIMADA */}
        <div className={`${styles.tickerTrack} ${showPopup ? styles.paused : ''}`}>
          {techs.map((tech, index) => (
            <div key={index} className={styles.tickerItem}>{tech.icon}</div>
          ))}
          {techs.map((tech, index) => (
            <div key={`dup-${index}`} className={styles.tickerItem}>{tech.icon}</div>
          ))}
        </div>

        {/* POPUP DE LISTA COMPLETA */}
        <div className={`${styles.popupList} ${showPopup ? styles.showPopup : ''}`}>
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
  );
}