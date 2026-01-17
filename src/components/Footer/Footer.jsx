import React from 'react';
import { useAppContext } from '../../context/AppContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={{
      textAlign: 'center',
      padding: '2rem',
      marginTop: '4rem',
      color: 'var(--text-secondary)',
      fontSize: '0.9rem',
      borderTop: '1px solid var(--border-subtle)'
    }}>
      <p>© {currentYear} Gonzalo Sanchez. All rights reserved.</p>
      <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '5px' }}>
        Built with React & Vanilla CSS Modules.
      </p>
    </footer>
  );
}