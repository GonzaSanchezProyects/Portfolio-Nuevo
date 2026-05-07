import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Bot, Mic, Globe, X, ExternalLink, 
  ChevronLeft, ChevronRight, Construction 
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import styles from './Projects.module.css';
import SpotlightWrapper from '../SpotlightWrapper/SpotlightWrapper';
import { Link } from 'react-router-dom';

import botPortada from '../../assets/bot/bot.png';
import DailyReady from '../../assets/daily/daily.png';

const imageAssets = {
  bot_n8n: [
    botPortada
  ],
  daily_ready: [
    DailyReady
  ],
  gencore: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1470&auto=format&fit=crop"]
};

export default function Projects() {
  const { lang } = useAppContext(); 
  const [selectedProject, setSelectedProject] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setMounted(true);
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      setCurrentSlide(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedProject]);

  const nextSlide = (e) => {
    e.stopPropagation();
    if (!selectedProject) return;
    setCurrentSlide((prev) => (prev + 1) % selectedProject.gallery.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    if (!selectedProject) return;
    setCurrentSlide((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);
  };

  const projectsData = [
    {
      id: 1,
      key: 'bot_n8n', 
      cover: imageAssets.bot_n8n[0],
      gallery: imageAssets.bot_n8n.slice(1),
      icon: <Bot size={14} />,
      badge: "n8n Automation",
      link: "#", 
      large: false, 
      inProgress: false,
      title: lang === 'es' ? "Bot de Prospección n8n" : "n8n Lead Gen Bot",
      desc: lang === 'es' 
        ? "Script automático que busca en Google Maps, recolecta correos corporativos y envía publicidad de forma autónoma."
        : "Automated script that searches Google Maps, collects corporate emails, and sends ads autonomously."
    },
    {
      id: 2,
      key: 'daily_ready',
      cover: imageAssets.daily_ready[0],
      gallery: imageAssets.daily_ready.slice(1),
      icon: <Mic size={14} />,
      badge: "AI Scoring",
      link: "#",
      large: false, // <--- Mitad de fila
      inProgress: true, // <--- CAMBIO: Activamos "En construcción"
      title: "DailyReady",
      desc: lang === 'es'
        ? "Plataforma para practicar Dailys en inglés. Toma tu micrófono y puntúa tu fluidez mediante IA."
        : "Platform to practice English Dailies. Uses your microphone and scores your fluency using AI."
    },
    {
      id: 3,
      key: 'gencore',
      cover: imageAssets.gencore[0],
      gallery: imageAssets.gencore.slice(1),
      icon: <Globe size={14} />,
      badge: "Web Business",
      link: "/portfolio", 
      large: true, // <--- CAMBIO: Mitad de fila (Llena el espacio en blanco)
      inProgress: false,
      title: lang === 'es' ? "Mi antiguo negocio de desarrollo web" : "My old web development business",
      desc: lang === 'es' 
        ? "Catálogo de soluciones de desarrollo web a medida creadas para empresas y negocios reales."
        : "Catalog of custom web development solutions created for real companies and businesses."
    }
  ];

  const handleClose = () => setSelectedProject(null);

  return (
    <section>
      <SpotlightWrapper className={styles.grid}>
        {projectsData.map((project) => (
          <article 
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className={`${styles.card} ${project.large ? styles.large : ''} spotlight-card`}
          >
            <div className={styles.cardImage} style={{ backgroundImage: `url(${project.cover})` }} />
            <div className={styles.cardOverlay} />
            <div className={styles.badge}>
              {project.icon}
              <span>{project.badge}</span>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardDesc}>{project.desc}</p>
            </div>
          </article>
        ))}
      </SpotlightWrapper>

      {mounted && selectedProject && createPortal(
        <div className={styles.modalOverlay} onClick={handleClose}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={handleClose}><X size={24} /></button>

            <div className={styles.cinematicCarousel}>
              {selectedProject.gallery.map((img, index) => (
                <div 
                  key={index}
                  className={`${styles.slide} ${index === currentSlide ? styles.activeSlide : ''}`}
                  style={{ backgroundImage: `url(${img})` }}
                />
              ))}
              <div className={styles.carouselOverlay} />
              {selectedProject.gallery.length > 1 && (
                <>
                  <button className={`${styles.navBtn} ${styles.prev}`} onClick={prevSlide}><ChevronLeft size={28} /></button>
                  <button className={`${styles.navBtn} ${styles.next}`} onClick={nextSlide}><ChevronRight size={28} /></button>
                </>
              )}
              {selectedProject.gallery.length === 0 && (
                 <div className={`${styles.slide} ${styles.activeSlide}`} style={{ backgroundImage: `url(${selectedProject.cover})` }} />
              )}
            </div>

            <div className={styles.modalBody}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                 <div className={styles.badge} style={{ position: 'static' }}>
                    {selectedProject.icon} <span>{selectedProject.badge}</span>
                 </div>
                 {/* BADGE "IN PROGRESS" EN EL MODAL */}
                 {selectedProject.inProgress && (
                   <div className={styles.badge} style={{ background: 'rgba(255, 165, 0, 0.2)', borderColor: 'orange', color: 'orange' }}>
                      <Construction size={14} />
                      <span>{lang === 'es' ? 'En Progreso' : 'In Progress'}</span>
                   </div>
                 )}
              </div>
              
              <h2 className={styles.modalTitle}>{selectedProject.title}</h2>
              <p className={styles.modalDesc}>{selectedProject.desc}</p>
              
              {/* LÓGICA DEL BOTÓN: DESHABILITADO SI ESTÁ EN PROGRESO */}
              {selectedProject.inProgress ? (
                <button className={styles.disabledBtn} disabled>
                   {lang === 'es' ? 'En construcción...' : 'In Progress...'} <Construction size={18} />
                </button>
              ) : selectedProject.link.startsWith('/') ? (
                <Link to={selectedProject.link} className={styles.visitBtn} onClick={handleClose}>
                  View Gallery <ExternalLink size={18} />
                </Link>
              ) : (
                <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className={styles.visitBtn}>
                  Visit Project <ExternalLink size={18} />
                </a>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}