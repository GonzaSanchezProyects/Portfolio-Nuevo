import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Creamos el contexto
const AppContext = createContext();

// 2. Creamos el proveedor
export const AppProvider = ({ children }) => {
  // Nota: Mantenemos 'lang' en lugar de 'language' para respetar tu código anterior
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('es');

  // Efecto para aplicar el tema al HTML tag
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  const toggleLang = () => setLang((prev) => (prev === 'es' ? 'en' : 'es'));

  // Diccionario de Traducciones Completo
  const translations = {
    /* ================= ESPAÑOL ================= */
    es: { 
      role: "Desarrollador Front-End",
      hero_title: "GONZALO SANCHEZ",
      hero_subtitle: "Especializado en crear experiencias web modernas, estéticas y funcionales.",
      
      titles: {
        projects: "Proyectos Seleccionados",
        stack: "Stack Tecnológico",
        education: "Formación Académica",
        contact: "Contacto"
      },
    
      about: {
        title: "Sobre Mí",
        bio_p1: "Me encanta programar y diseñar interfaces modernas e innovadoras, priorizando la comodidad y facilidad para el usuario.",
        bio_p2: "Disfruto el desafío de transformar ideas complejas en soluciones simples, rápidas y agradables de usar.",
        location: "Mendoza, Argentina",
        time: "Hora local",
        learning: "Aprendiendo ahora:",
        learning_item: "Arquitectura Cloud & AWS",
        cv_btn: "Descargar CV",
        hobbies: "Intereses: Fitness • Política • Economía"
      },

      projects: {
        genfit_title: "GenFit AI",
        genfit_desc: "Generador de rutinas de gym personalizado con IA. Algoritmos adaptativos para maximizar resultados.",
        
        fitseo_title: "Fitseo App",
        fitseo_desc: "Aplicación móvil integral de fitness con sistema de monetización y seguimiento de usuarios.",
        
        ipn_title: "IPN",
        ipn_desc: "Negocio de desarrollo de software especializado en el impulso político, estrategias de campaña y modernización electoral.",
        
        lab_title: "Mi negocio de desarrollo web",
        lab_desc: "Servicios de diseño y desarrollo freelance. Sitios de alto impacto y soluciones digitales a medida."
      },

      /* === NUEVA SECCIÓN: FULL PORTFOLIO (Página de trabajos) === */
      fullPortfolio: {
        back: "Volver al Inicio",
        title: "Últimos Trabajos",
        subtitle: "Una muestra de las soluciones digitales que estoy construyendo.",
        visit: "Visitar Sitio",
        dev: "En Desarrollo",
        empty: "No hay proyectos para mostrar."
      },

      education: [
        {
          id: 1,
          title: "Tecnicatura en Desarrollo de Software",
          place: "ITU - UNCUYO",
          date: "Actualidad",
          type: "Universitario",
          desc: "Formación superior en arquitectura de software, bases de datos y metodologías ágiles."
        },
        {
          id: 2,
          title: "React JS",
          place: "Coderhouse",
          date: "2023", 
          type: "Curso",
          desc: "Manejo avanzado de hooks, routing, context API y patrones de diseño de componentes."
        },
        {
          id: 3,
          title: "JavaScript",
          place: "Coderhouse",
          date: "2023",
          type: "Curso",
          desc: "Fundamentos del lenguaje, asincronismo, DOM y peticiones a APIs."
        },
        {
          id: 4,
          title: "Desarrollo Web",
          place: "Coderhouse",
          date: "2022",
          type: "Curso",
          desc: "Maquetado responsive con HTML5, CSS3, Flexbox, Grid y SASS."
        }
      ],

      contact: {
        title: "Contactame",
        desc: "¿Tienes un proyecto en mente? Hablemos.",
        copy: "Copiar Email",
        copied: "¡Copiado!"
      }
    },

    /* ================= ENGLISH ================= */
    en: { 
      role: "Front-End Developer", 
      hero_title: "GONZALO SANCHEZ",
      hero_subtitle: "Specialized in crafting modern, aesthetic, and functional web experiences.",

      titles: {
        projects: "Selected Projects",
        stack: "Tech Stack",
        education: "Education",
        contact: "Contact"
      },

      about: {
        title: "About Me",
        bio_p1: "Driven by a passion for clean code and crafting modern, innovative user interfaces.",
        bio_p2: "My focus is on constantly optimizing performance and pushing every project to the next level of quality.",
        location: "Mendoza, Argentina",
        time: "Local time",
        learning: "Learning now:",
        learning_item: "Cloud Architecture & AWS",
        cv_btn: "Download Resume",
        hobbies: "Interests: Fitness • Politics • Economics"
      },

      projects: {
        genfit_title: "GenFit AI",
        genfit_desc: "AI-powered personalized workout generator. Adaptive algorithms to maximize hypertrophy results.",
        
        fitseo_title: "Fitseo App",
        fitseo_desc: "Comprehensive mobile fitness application with monetization systems and user tracking.",
        
        ipn_title: "IPN",
        ipn_desc: "Software development business dedicated to political momentum, campaign strategies, and electoral modernization.",
        
        lab_title: "My Web Dev Business",
        lab_desc: "Freelance design and development services. High-impact websites and custom digital solutions."
      },

      /* === NEW SECTION: FULL PORTFOLIO === */
      fullPortfolio: {
        back: "Back to Home",
        title: "Selected Work",
        subtitle: "A showcase of the digital solutions I am building.",
        visit: "Visit Website",
        dev: "In Development",
        empty: "No projects to show."
      },

      education: [
        {
          id: 1,
          title: "Software Development Degree",
          place: "ITU - UNCUYO",
          date: "Present",
          type: "University",
          desc: "Higher education in software architecture, databases, and agile methodologies."
        },
        {
          id: 2,
          title: "React JS",
          place: "Coderhouse",
          date: "2023",
          type: "Course",
          desc: "Advanced hooks, routing, context API, and component design patterns."
        },
        {
          id: 3,
          title: "JavaScript",
          place: "Coderhouse",
          date: "2023",
          type: "Course",
          desc: "Language fundamentals, async, DOM manipulation, and API requests."
        },
        {
          id: 4,
          title: "Web Development",
          place: "Coderhouse",
          date: "2022",
          type: "Course",
          desc: "Responsive layout with HTML5, CSS3, Flexbox, Grid, and SASS."
        }
      ],

      contact: {
        title: "Get in Touch",
        desc: "Have a project in mind? Let's talk.",
        copy: "Copy Email",
        copied: "Copied!"
      }
    }
  };

  return (
    // IMPORTANTE: Aquí pasamos 'toggleLang' y 'lang' que es lo que usan tus componentes
    <AppContext.Provider value={{ theme, toggleTheme, lang, toggleLang, t: translations[lang] }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);