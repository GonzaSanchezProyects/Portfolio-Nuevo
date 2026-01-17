import React, { useEffect, useRef } from 'react';

export default function Magnetic({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    // 1. DETECCIÓN DE MÓVIL (La Cláusula de Guardia)
    // Verificamos si la pantalla es menor a 768px (celulares/tablets chicas)
    // O si el dispositivo no tiene capacidad de "hover" (es táctil puro)
    const isMobile = window.innerWidth < 768 || window.matchMedia("(hover: none)").matches;

    // Si es móvil, NO hacemos nada. El botón se comportará normal.
    if (isMobile) return;

    // --- Lógica del Imán (Solo para PC) ---
    const element = ref.current;
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const x = clientX - centerX;
      const y = clientY - centerY;

      element.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = `translate(0px, 0px)`;
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return React.cloneElement(children, { ref });
}