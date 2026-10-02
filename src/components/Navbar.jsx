import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '1.8rem' }}>🧶</span>
        <h2 style={{ margin: 0, color: '#333', fontSize: '1.4rem' }}>Rincón del Crochet</h2>
      </div>
      <nav style={{ display: 'flex', gap: '15px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#555', fontWeight: 'bold', padding: '8px 16px', borderRadius: '20px', background: '#f5f5f5' }}>
          🏠 Inicio
        </Link>
        <Link to="/catalogo" style={{ textDecoration: 'none', color: 'white', fontWeight: 'bold', padding: '8px 16px', borderRadius: '20px', background: 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)' }}>
          ✨ Catálogo
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;