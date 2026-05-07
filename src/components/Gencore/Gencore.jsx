import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Activity, Box, ExternalLink, X, Terminal, 
  Zap, Globe, Sparkles, CheckCircle2, ChevronRight,
  Cpu, Database, Layout, Users, Code2
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import styles from './Gencore.module.css';

export default function Gencore() {
  const { lang } = useAppContext();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (selectedProduct) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedProduct]);

  const productData = {
    genfit: {
      id: 'genfit',
      title: 'Genfit',
      icon: <Activity size={48} />,
      color: '#00ffcc',
      tagline: lang === 'es' ? 'Ecosistema de Alto Rendimiento' : 'High Performance Ecosystem',
      description: lang === 'es' 
        ? 'Un SaaS de alto rendimiento que automatiza la nutrición y el entrenamiento mediante algoritmos dinámicos y análisis de datos en tiempo real.' 
        : 'A high-performance SaaS ecosystem that automates nutrition and training through dynamic algorithms and real-time data analysis.',
      stack: ['React 19', 'Supabase', 'PostgreSQL', 'AI Logic', 'Tailwind'],
      features: lang === 'es' 
        ? ['Cálculo de macros automático', 'Generador de rutinas inteligente', 'Panel administrativo', 'Pagos integrados'] 
        : ['Automatic macro calculation', 'Smart routine generator', 'Admin dashboard', 'Integrated payments'],
      link: 'https://genfit-info.site/'
    },
    genbox: {
      id: 'genbox',
      title: 'Genbox',
      icon: <Box size={48} />,
      color: '#7000ff',
      tagline: lang === 'es' ? 'Automatización Logística' : 'Logistics Automation',
      description: lang === 'es'
        ? 'Nuestra joya de ingeniería. Genbox utiliza flujos de n8n para sincronizar stock y proveedores globalmente, eliminando procesos manuales por completo.'
        : 'Our engineering masterpiece. Genbox utilizes n8n flows to synchronize stock and suppliers globally, eliminating manual processes completely.',
      stack: ['n8n', 'Python', 'Webhooks', 'Shopify API', 'Logic Flows'],
      features: lang === 'es'
        ? ['Flujos n8n de alta escala', 'Sincronización real-time', 'Gestión autónoma de órdenes', 'Alertas inteligentes']
        : ['High-scale n8n workflows', 'Real-time synchronization', 'Autonomous order management', 'Smart alerts'],
      link: 'https://gen-box-landing.vercel.app/' 
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.featuredBadge}>
        <div className={styles.badgeGlow}></div>
        <Sparkles size={18} />
        <span>{lang === 'es' ? 'PROYECTO ESTRELLA' : 'STAR PROJECT'}</span>
      </div>

      <div className={styles.hubContainer}>
        <svg className={styles.connectionsSvg} viewBox="0 0 1000 700">
          <path d="M500,350 C500,150 700,150 800,200" className={styles.connectorPath} />
          <path d="M500,350 C500,550 700,550 800,500" className={styles.connectorPath} />
        </svg>

        <div className={styles.centerHub}>
          <div className={styles.hubContent}>
            <div className={styles.hubIconBox}><Code2 size={40} /></div>
            <h2 className={styles.studioTitle}>Gencore<span>Studio</span></h2>
            
            {/* TU PÁRRAFO CON ESCRITURA BONITA */}
            <p className={styles.studioBio}>
              {lang === 'es' ? (
                <>
                  Gencore nació de la sinergia con un colega como un <strong>estudio de desarrollo de software a medida</strong>, donde fusionamos nuestra trayectoria con el rigor académico universitario. Lideramos conjuntamente el ciclo completo de desarrollo (Fullstack) y hoy consolidamos nuestro propio <strong>equipo de trabajo</strong>. He potenciado nuestra excelencia técnica dominando <strong>Next.js y Supabase</strong>, optimizando cada solución con <strong>herramientas de IA</strong>, Figma y despliegues robustos en Vercel.
                </>
              ) : (
                <>
                  Gencore emerged from a partnership as a <strong>custom software studio</strong>, blending our professional background with university academic rigor. We jointly lead the full development cycle (Fullstack) and are now building our own <strong>dedicated team</strong>. I have driven our technical excellence by mastering <strong>Next.js and Supabase</strong>, optimizing solutions with <strong>AI tools</strong>, Figma, and robust Vercel deployments.
                </>
              )}
            </p>

            <div className={styles.techMicroGrid}>
              <span>Next.js</span><span>Supabase</span><span>Figma</span><span>n8n</span><span>Vercel</span><span>IA Tools</span>
            </div>

            <a href="https://gencore.com.ar" target="_blank" rel="noreferrer" className={styles.hubLink}>
              {lang === 'es' ? 'Visitar GenCore' : 'Visit Ecosystem'} <Globe size={18} />
            </a>
          </div>
        </div>

        <div className={styles.satellites}>
          {Object.keys(productData).map((key) => (
            <div key={key} className={`${styles.bubble} ${styles[key]}`} onClick={() => setSelectedProduct(productData[key])}>
              <div className={styles.bubbleIconBox}>{productData[key].icon}</div>
              <div className={styles.bubbleText}>
                <h3>{productData[key].title}</h3>
                <span className={styles.exploreTrigger}>
                  {lang === 'es' ? 'Explorar' : 'Explore'} <ChevronRight size={18} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODALES IGUAL QUE ANTES... */}
      {selectedProduct && createPortal(
        <div className={styles.modalOverlay} onClick={() => setSelectedProduct(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()} style={{'--accent-product': selectedProduct.color}}>
            <button className={styles.closeBtn} onClick={() => setSelectedProduct(null)}><X size={32} /></button>
            <div className={styles.modalHeader}>
              {selectedProduct.icon}
              <h2 className={styles.modalTitle}>{selectedProduct.title}</h2>
            </div>
            <div className={styles.modalBody}>
              <p className={styles.modalLongDesc}>{selectedProduct.description}</p>
              <div className={styles.modalGrid}>
                <div className={styles.modalSection}>
                  <h4 className={styles.sectionTitle}><Cpu size={16} /> Stack</h4>
                  <div className={styles.tagCloud}>
                    {selectedProduct.stack.map(s => <span key={s} className={styles.techTag}>{s}</span>)}
                  </div>
                </div>
                <div className={styles.modalSection}>
                  <h4 className={styles.sectionTitle}><Database size={16} /> Features</h4>
                  <ul className={styles.featuresList}>
                    {selectedProduct.features.map((f, i) => <li key={i}><CheckCircle2 size={16} /> {f}</li>)}
                  </ul>
                </div>
              </div>
              <a href={selectedProduct.link} className={styles.launchBtn}>
                {lang === 'es' ? 'Página del Sistema' : 'Launch Application'} <ExternalLink size={20} />
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}