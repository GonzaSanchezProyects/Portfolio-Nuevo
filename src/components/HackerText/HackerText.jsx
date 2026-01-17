import React, { useState, useEffect, useRef } from 'react';

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";

export default function HackerText({ text, className = "" }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);
  
  const scramble = () => {
    let iteration = 0;
    
    clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );
      
      if (iteration >= text.length) { 
        clearInterval(intervalRef.current);
      }
      
      iteration += 1 / 3; 
    }, 30);
  };

  // Solo se ejecuta al iniciar (montar el componente)
  useEffect(() => {
    scramble();
    return () => clearInterval(intervalRef.current);
  }, [text]);

  return (
    <span 
      className={className} 
      // Hemos quitado el onMouseEnter
      style={{ display: 'inline-block' }} 
    >
      {displayText}
    </span>
  );
}