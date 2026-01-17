import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Loader2 } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar'; 
import Particles from '../../components/Particles/Particles';
import SpotlightWrapper from '../../components/SpotlightWrapper/SpotlightWrapper';
import { useAppContext } from '../../context/AppContext';
import styles from './FullPortfolio.module.css';

// Importa tus imágenes
import arcImg from '../../assets/Webs/arc.png';
import cateringImg from '../../assets/Webs/cate.png';
import telecomImg from '../../assets/Webs/tele.png';

export default function FullPortfolio() {
  const { t, lang, theme } = useAppContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Web Arquitectura Doble",
      category: "Web App",
      image: arcImg,
      description: lang === 'es' 
        ? "Plataforma que consta de las ambas orientaciones del cliente respecto a la construcción."
        : "Platform covering both of the client's orientations regarding construction.",
      tech: ["React", "Python", "Stripe"],
      status: "ready", // Botón habilitado
      link: "https://arquitectura-red.vercel.app" 
    },
    {
      id: 2,
      title: "Web Catering",
      category: "E-commerce",
      image: cateringImg,
      description: lang === 'es'
        ? "Web que cuenta con cotizador automático para una empresa de catering en Miami"
        : "Website featuring an automatic quote calculator for a catering company in Miami.",
      tech: ["Shopify", "Liquid", "JS"],
      status: "ready", // Botón habilitado
      link: "https://pagina-catering.vercel.app"
    },
    {
      id: 3,
      title: "Web Telecomunicaciones",
      category: "Landing Page",
      image: telecomImg,
      description: lang === 'es'
        ? "Plataforma realizada para una empresa de telecomunicaciones en Miami."
        : "Platform developed for a telecommunications company in Miami.",
      tech: ["Next.js", "Tailwind", "Framer"],
      status: "dev", // Botón bloqueado ("Construyendo...")
      link: "#"
    }
  ];

  return (
    <div className={styles.pageContainer} data-theme={theme}>
      <Particles />
      
      <header className={styles.header}>
        <div className={styles.topBar}>
          <Link to="/" className={styles.backBtn}>
            <ArrowLeft size={20} /> <span className={styles.backText}>{t.fullPortfolio.back}</span>
          </Link>
        </div>
        
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{t.fullPortfolio.title}</h1>
          <p className={styles.subtitle}>{t.fullPortfolio.subtitle}</p>
        </div>
      </header>

      <main className={styles.mainContent}>
        <SpotlightWrapper className={styles.grid}>
          {projects.map((project, index) => (
            <article 
              key={project.id} 
              className={`${styles.card} spotlight-card`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={styles.imageContainer}>
                <div 
                  className={styles.bgImage} 
                  style={{ backgroundImage: `url(${project.image})` }} 
                />
                <div className={styles.overlay} />
                <div className={styles.categoryBadge}>{project.category}</div>
                
                {/* CAMBIO: Mostramos el badge SIEMPRE en todos los proyectos */}
                <div className={styles.devBadge}>
                    <div className={styles.pulseDot}></div> {t.fullPortfolio.dev}
                </div>
                
              </div>

              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>
                <div className={styles.techStack}>
                  {project.tech.map((t, i) => (
                    <span key={i} className={styles.techTag}>{t}</span>
                  ))}
                </div>
                
                {/* Lógica del botón: Depende del status 'ready' o 'dev' */}
                {project.status === 'dev' ? (
                  <button className={styles.devBtn} disabled>
                    <Loader2 size={18} className={styles.spinIcon} />
                    {lang === 'es' ? "Construyendo..." : "Building..."}
                  </button>
                ) : (
                  <a href={project.link} className={styles.viewBtn}>
                    {t.fullPortfolio.visit} <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </SpotlightWrapper>
      </main>

      <footer className={styles.footer}>
        <p>© 2026 Gonzalo Sanchez Dev</p>
      </footer>

      <Navbar />
      
    </div>
  );
}