import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ searchTerm }) => {
  return (
    <div className="home-container" style={{ padding: '2rem', textAlign: 'center' }}>
      <div className="home-hero">
        <h1>🧶 Rincón del Crochet</h1>
        <p>Proyecto desarrollado con dedicación y amor por el tejido artesanal.</p>
        
        <div style={{ marginTop: '2rem' }}>
          <Link to="/productos" className="btn-explorar" style={{
            backgroundColor: '#ec4899',
            color: '#fff',
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Ver Catálogo de Productos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;