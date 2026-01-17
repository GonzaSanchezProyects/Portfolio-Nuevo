import React from 'react';
import { 
  FaReact, FaHtml5, FaCss3Alt, FaGitAlt, FaFigma, 
  FaGithub, FaSass, FaMobileAlt 
} from 'react-icons/fa';
import { SiNextdotjs, SiJavascript, SiVite } from 'react-icons/si';
import styles from './TechTicker.module.css';

// Lista de Tecnologías (Puedes cambiar nombres e iconos)
const techs = [
  { name: "React", icon: <FaReact size={40} /> },        // Átomo de React
  { name: "Next.js", icon: <SiNextdotjs size={40} /> },  // La 'N' de Next
  { name: "JavaScript", icon: <SiJavascript size={40} /> }, // JS Amarillo (en hover)
  { name: "HTML", icon: <FaHtml5 size={40} /> },         // Escudo HTML5
  { name: "CSS", icon: <FaCss3Alt size={40} /> },        // Escudo CSS3
  { name: "Git", icon: <FaGitAlt size={40} /> },         // Diamante de Git
  { name: "Figma", icon: <FaFigma size={40} /> },        // La F de Figma
  { name: "Vite", icon: <SiVite size={40} /> },          // Rayo de Vite
  { name: "Mobile", icon: <FaMobileAlt size={40} /> },   // Icono genérico móvil
  { name: "GitHub", icon: <FaGithub size={40} /> },      // Gato de GitHub
  { name: "Sass", icon: <FaSass size={40} /> },          // Logo de Sass
];

export default function TechTicker() {
  return (
    <div className={styles.tickerContainer}>
      {/* El degradado a los lados (Fade) se hace con CSS Mask en el container.
         Aquí dentro ponemos la pista (track) que se mueve.
      */}
      
      <div className={styles.track}>
        {/* Renderizamos la lista PRIMERA vez */}
        {techs.map((item, index) => (
          <div key={`original-${index}`} className={styles.item}>
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.name}>{item.name}</span>
          </div>
        ))}

        {/* Renderizamos la lista SEGUNDA vez (para el loop infinito) */}
        {techs.map((item, index) => (
          <div key={`dupe-${index}`} className={styles.item}>
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.name}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}