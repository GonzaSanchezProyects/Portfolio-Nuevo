import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContext'; // <--- IMPORTAR CONTEXTO

export default function Particles() {
  const canvasRef = useRef(null);
  
  // Obtenemos el tema actual ('light' o 'dark')
  const { theme } = useAppContext(); 

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let particlesArray;
    let numberOfParticles;
    let connectionDistance;

    // DEFINIR COLORES SEGÚN EL TEMA
    const isDark = theme === 'dark';
    // Si es dark -> Blanco (255,255,255). Si es light -> Negro/Gris (30,30,30)
    const particleColor = isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(30, 30, 30, 0.4)';
    const lineColor = isDark ? '255, 255, 255' : '30, 30, 30'; // Solo los números RGB para inyectar opacidad
    const mouseColor = '129, 140, 248'; // Color Índigo (Primary) para el mouse, se ve bien en ambos

    let mouse = {
      x: null,
      y: null,
      radius: 150
    }

    const setResponsiveValues = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (window.innerWidth < 768) {
        numberOfParticles = 30; 
        connectionDistance = 80; 
        mouse.radius = 80; 
      } else {
        numberOfParticles = 80;
        connectionDistance = 150;
        mouse.radius = 150;
      }
    };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });
    
    window.addEventListener('mouseout', () => {
      mouse.x = undefined;
      mouse.y = undefined;
    });

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        // Usamos el color dinámico
        ctx.fillStyle = particleColor; 
        ctx.fill();
      }

      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
      }
    }

    function init() {
      particlesArray = [];
      setResponsiveValues(); 

      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2; 
        let directionY = (Math.random() * 0.4) - 0.2; 
        
        particlesArray.push(new Particle(x, y, directionX, directionY, size, particleColor));
      }
    }

    function connect() {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
            + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

          if (distance < (connectionDistance * connectionDistance)) {
            opacityValue = 1 - (distance / (connectionDistance * connectionDistance * 0.8));
            // Usamos el color de línea dinámico
            ctx.strokeStyle = 'rgba(' + lineColor + ',' + opacityValue * 0.15 + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
        
        if (mouse.x && mouse.y) {
            let mouseDistance = ((particlesArray[a].x - mouse.x) * (particlesArray[a].x - mouse.x))
                + ((particlesArray[a].y - mouse.y) * (particlesArray[a].y - mouse.y));
                
            if (mouseDistance < (mouse.radius * mouse.radius)) {
                ctx.strokeStyle = 'rgba(' + mouseColor + ', 0.2)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
      }
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, innerWidth, innerHeight);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    }

    const handleResize = () => {
        init(); 
    }

    window.addEventListener('resize', handleResize);
    
    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', () => {});
      cancelAnimationFrame(animationFrameId);
    }
    
    // IMPORTANTE: Agregamos 'theme' a las dependencias.
    // Esto hace que cuando cambies el tema, el canvas se reinicie con los nuevos colores.
  }, [theme]); 

  return (
    <canvas 
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, 
        pointerEvents: 'none',
        background: 'transparent'
      }}
    />
  );
}