import React, { useEffect, useRef, useState } from 'react';
import styles from './Cursor.module.css';

export default function Cursor() {
  const cursorRef = useRef(null); // El punto pequeño (mouse real)
  const trailerRef = useRef(null); // El círculo grande (el que persigue)
  
  // Estado para saber si estamos sobre un elemento interactivo
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Posiciones iniciales
    let cursorX = 0, cursorY = 0;
    let trailerX = 0, trailerY = 0;

    // 1. Detectar movimiento del mouse
    const onMouseMove = (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      
      // Mover el punto central instantáneamente
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      }

      // Detectar si estamos sobre un enlace o botón
      const target = e.target;
      const isInteractive = target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button');
      setHovering(!!isInteractive);
    };

    // 2. El Loop de Animación (Aquí ocurre la magia de la física)
    const animateTrailer = () => {
      // Fórmula de Interpolación Lineal (Lerp) para suavidad
      // La posición del trailer se acerca un 15% (0.15) a la del mouse en cada frame
      trailerX += (cursorX - trailerX) * 0.15;
      trailerY += (cursorY - trailerY) * 0.15;

      if (trailerRef.current) {
        trailerRef.current.style.transform = `translate3d(${trailerX - 15}px, ${trailerY - 15}px, 0)`; // -15 para centrar el círculo de 30px
      }
      
      requestAnimationFrame(animateTrailer);
    };

    window.addEventListener('mousemove', onMouseMove);
    const animationId = requestAnimationFrame(animateTrailer);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* El punto central exacto */}
      <div ref={cursorRef} className={styles.cursorDot} />
      
      {/* El círculo que persigue y reacciona */}
      <div 
        ref={trailerRef} 
        className={`${styles.cursorTrailer} ${hovering ? styles.hovered : ''}`} 
      />
    </>
  );
}