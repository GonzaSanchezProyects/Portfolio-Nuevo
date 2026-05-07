import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Contexto
import { AppProvider, useAppContext } from './context/AppContext';

// Componentes Globales / UI
import Cursor from './components/Cursor/Cursor';
import Particles from './components/Particles/Particles';
import ScrollReveal from './components/ScrollReveal/ScrollReveal';

// Componentes de Secciones (Home)
import Navbar from './components/Navbar/Navbar'; // Tu Dock
import Hero from './components/Hero/Hero';
import TechTicker from './components/TechTicker/TechTicker';
import Projects from './components/Projects/Projects';
import About from './components/About/About';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Gencore from './components/Gencore/Gencore';

// Páginas Nuevas
import FullPortfolio from './pages/FullPortfolio/FullPortfolio';

// Estilos
import './styles/globals.css';

// === COMPONENTE HOME (Tu página principal actual) ===
const Home = () => {
  const { t } = useAppContext();
  const sectionSpacing = '10rem';

  // === EFECTO DE TÍTULO DINÁMICO ===
  React.useEffect(() => {
    const originalTitle = document.title;
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Renderizando ideas... ⚡️";
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <div style={{ paddingBottom: '120px' }}>
      
      {/* 1. HERO & TICKER */}
      <Hero />
      
      <div style={{ marginBottom: '6rem' }}>
        <TechTicker />
      </div>

      {/* NUEVA SECCIÓN GENCORE */}
      <ScrollReveal>
        <div style={{ marginTop: '10rem' }}>
          <Gencore />
        </div>
      </ScrollReveal>
      
      {/* 2. PROYECTOS (Versión Resumida para Home) */}
      <ScrollReveal>
        <div style={{ maxWidth: '1200px', margin: `${sectionSpacing} auto 3rem`, padding: '0 2rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t.titles.projects}</h2>
        </div>
        {/* Aquí NO pasamos isFullPage, para que muestre el botón "Ver todo" */}
        <Projects />
      </ScrollReveal>

      {/* 3. SOBRE MÍ */}
      <ScrollReveal>
        <div style={{ marginTop: sectionSpacing }}>
          <About />
        </div>
      </ScrollReveal>

      {/* 4. ESTUDIOS */}
      <ScrollReveal>
        <div style={{ maxWidth: '800px', margin: `${sectionSpacing} auto 3rem`, padding: '0 2rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>{t.titles.education}</h2>
        </div>
        <Education />
      </ScrollReveal>

      {/* 5. CONTACTO */}
      <ScrollReveal>
        <div style={{ marginTop: sectionSpacing }}>
          <Contact />
        </div>
      </ScrollReveal>

      {/* 6. FOOTER & DOCK */}
      <Footer />
      <Navbar /> {/* El Dock flotante solo en la Home */}
    </div>
  );
};

// === APP PRINCIPAL CON RUTAS ===
export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        
        {/* ELEMENTOS GLOBALES (Se ven en todas las páginas) */}
        <Cursor /> 
        {/* Particles lo ponemos aquí si quieres que el fondo persista igual en ambas páginas,
            o puedes dejarlo dentro de cada componente si quieres que se reinicie.
            Aquí es más eficiente: */}
        <Particles />

        <Routes>
          {/* RUTA 1: TU PORTAFOLIO PERSONAL (HOME) */}
          <Route path="/" element={<Home />} />

          {/* RUTA 2: TU CATÁLOGO DE NEGOCIO */}
          <Route path="/portfolio" element={<FullPortfolio />} />
        </Routes>

      </BrowserRouter>
    </AppProvider>
  );
}