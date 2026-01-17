import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  BrainCircuit, Smartphone, Computer, X, ExternalLink, 
  ChevronLeft, ChevronRight, Construction 
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import styles from './Projects.module.css';
import SpotlightWrapper from '../SpotlightWrapper/SpotlightWrapper';

// =========================================================
// === IMPORTACIÓN DE ASSETS LOCALES ===
// =========================================================

// GENFIT
import genfit2 from '../../assets/genfit/2.webp'; 
import genfit3 from '../../assets/genfit/3.webp';
import genfit4 from '../../assets/genfit/4.webp';

// FITSEO
import fitseo2 from '../../assets/fitseo/2.webp';
import fitseo3 from '../../assets/fitseo/3.webp';
import fitseo4 from '../../assets/fitseo/4.webp';

// IPN
import ipn2 from '../../assets/ipn/2.webp';
import ipn3 from '../../assets/ipn/3.webp';
import ipn4 from '../../assets/ipn/4.webp';

// LAB
import lab2 from '../../assets/lab/2.webp';
import lab3 from '../../assets/lab/3.webp';
import lab4 from '../../assets/lab/4.webp';

// =========================================================

const imageAssets = {
  genfit: [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop", // PORTADA (Index 0)
    genfit2, // Galería 1
    genfit3, // Galería 2
    genfit4  // Galería 3
  ],
  fitseo: [
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1470&auto=format&fit=crop", // PORTADA
    fitseo2,
    fitseo3,
    fitseo4
  ],
  ipn: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1470&auto=format&fit=crop", // PORTADA
    ipn2,
    ipn3,
    ipn4
  ],
  lab: [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop", // PORTADA
    lab2,
    lab3,
    lab4
  ]
};

export default function Projects() {
  const { t } = useAppContext();
  const [selectedProject, setSelectedProject] = useState(null);
  const [mounted, setMounted] = useState(false);
  
  // Estado para el índice de la GALERÍA (no del array completo)
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setMounted(true);
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      setCurrentSlide(0); // Reinicia al abrir el modal
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedProject]);

  // --- LÓGICA DE NAVEGACIÓN ACTUALIZADA ---
  // Ahora usamos 'selectedProject.gallery.length' en lugar de images.length
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

  // --- ESTRUCTURA DE DATOS MODIFICADA ---
  // Aquí separamos la Portada de la Galería
  const projectsData = [
    {
      id: 1,
      key: 'genfit', 
      cover: imageAssets.genfit[0],           // Solo la primera foto
      gallery: imageAssets.genfit.slice(1),   // Todas MENOS la primera
      icon: <BrainCircuit size={14} />,
      badge: "AI Powered",
      link: "https://genfit.lat",
      large: true,
      inProgress: false
    },
    {
      id: 2,
      key: 'fitseo',
      cover: imageAssets.fitseo[0],
      gallery: imageAssets.fitseo.slice(1),
      icon: <Smartphone size={14} />,
      badge: "Mobile App",
      link: "#",
      large: false,
      inProgress: true
    },
    {
      id: 3,
      key: 'ipn',
      cover: imageAssets.ipn[0],
      gallery: imageAssets.ipn.slice(1),
      icon: <Computer size={14} />,
      badge: "Business",
      link: "https://https://ipn-software.vercel.app/",
      large: false,
      inProgress: false
    },
    {
      id: 4,
      key: 'lab',
      cover: imageAssets.lab[0],
      gallery: imageAssets.lab.slice(1),
      icon: <Computer size={14} />,
      badge: "Tech Lab",
      link: "/portfolio",
      large: true,
      inProgress: false
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
            {/* AQUÍ USAMOS LA PORTADA (project.cover) */}
            <div className={styles.cardImage} style={{ backgroundImage: `url(${project.cover})` }} />
            <div className={styles.cardOverlay} />
            <div className={styles.badge}>
              {project.icon}
              <span>{project.badge}</span>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{t.projects[`${project.key}_title`]}</h3>
              <p className={styles.cardDesc}>{t.projects[`${project.key}_desc`]} </p>
            </div>
          </article>
        ))}
      </SpotlightWrapper>

      {/* === MODAL & CINEMATIC CAROUSEL === */}
      {mounted && selectedProject && createPortal(
        <div className={styles.modalOverlay} onClick={handleClose}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            
            <button className={styles.closeBtn} onClick={handleClose}>
              <X size={24} />
            </button>

            {/* CONTENEDOR DEL CARRUSEL CINEMÁTICO */}
            <div className={styles.cinematicCarousel}>
              
              {/* 1. RENDERIZAMOS LA GALERÍA (No la portada) */}
              {selectedProject.gallery.map((img, index) => (
                <div 
                  key={index}
                  className={`${styles.slide} ${index === currentSlide ? styles.activeSlide : ''}`}
                  style={{ backgroundImage: `url(${img})` }}
                />
              ))}

              <div className={styles.carouselOverlay} />

              {/* 3. Controles (Solo si hay más de 1 imagen en la galería) */}
              {selectedProject.gallery.length > 1 && (
                <>
                  <button className={`${styles.navBtn} ${styles.prev}`} onClick={prevSlide}>
                    <ChevronLeft size={28} />
                  </button>
                  <button className={`${styles.navBtn} ${styles.next}`} onClick={nextSlide}>
                    <ChevronRight size={28} />
                  </button>

                  {/* 4. Indicadores */}
                  <div className={styles.indicatorsBar}>
                    {selectedProject.gallery.map((_, index) => (
                      <div 
                        key={index}
                        className={`${styles.bar} ${index === currentSlide ? styles.activeBar : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentSlide(index);
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
              
              {/* Caso borde: Si la galería está vacía o tiene 1 sola foto, muestra algo por defecto si quieres */}
              {selectedProject.gallery.length === 0 && (
                 <div className={`${styles.slide} ${styles.activeSlide}`} style={{ backgroundImage: `url(${selectedProject.cover})` }} />
              )}
            </div>

            <div className={styles.modalBody}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                 <div className={styles.badge} style={{ position: 'static' }}>
                    {selectedProject.icon}
                    <span>{selectedProject.badge}</span>
                 </div>
                 {selectedProject.inProgress && (
                   <div className={styles.badge} style={{ background: 'rgba(255, 165, 0, 0.2)', borderColor: 'orange', color: 'orange' }}>
                      <Construction size={14} />
                      <span>In Progress</span>
                   </div>
                 )}
              </div>

              <h2 className={styles.modalTitle}>{t.projects[`${selectedProject.key}_title`]}</h2>
              <p className={styles.modalDesc}>{t.projects[`${selectedProject.key}_desc`]}</p>

              {selectedProject.inProgress ? (
                <button className={styles.disabledBtn} disabled>
                   Wait for it... <Construction size={18} />
                </button>
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