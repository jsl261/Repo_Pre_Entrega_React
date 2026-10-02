import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '15px 35px', 
      background: '#ffffff', 
      boxShadow: '0 2px 10px rgba(139, 90, 43, 0.08)',
      borderBottom: '2px solid #F3EAE2'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '1.8rem' }}>🧶</span>
        <h2 style={{ margin: 0, color: '#5C4033', fontSize: '1.4rem', fontWeight: '700' }}>Rincón del Crochet</h2>
      </div>
      <nav style={{ display: 'flex', gap: '15px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#6B5B53', fontWeight: '600', padding: '8px 16px', borderRadius: '20px', background: '#F5EBE6', transition: 'background 0.2s' }}>
          🏠 Inicio
        </Link>
        <Link to="/catalogo" style={{ textDecoration: 'none', color: 'white', fontWeight: '600', padding: '8px 16px', borderRadius: '20px', background: 'linear-gradient(135deg, #D98880 0%, #C0392B 100%)', boxShadow: '0 4px 10px rgba(192, 57, 43, 0.2)' }}>
          ✨ Catálogo
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;