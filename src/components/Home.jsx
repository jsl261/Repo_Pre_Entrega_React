import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', fontFamily: 'sans-serif' }}>
      <span style={{ fontSize: '4rem' }}>🧶</span>
      <h1 style={{ color: '#ff758c', margin: '20px 0', fontSize: '2.5rem' }}>
        Bienvenidos a Rincón del Crochet
      </h1>
      <p style={{ color: '#555', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 30px', lineHeight: '1.6' }}>
        Descubre piezas únicas tejidas artesanalmente con amor: amigurumis tiernos, accesorios acogedores y detalles especiales para regalar o regalarte.
      </p>
      <Link 
        to="/catalogo" 
        style={{
          background: 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)',
          color: 'white',
          padding: '14px 28px',
          borderRadius: '30px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          boxShadow: '0 4px 15px rgba(255, 117, 140, 0.4)',
          display: 'inline-block',
          transition: 'transform 0.2s ease'
        }}
      >
        Explorar Catálogo 🚀
      </Link>
    </div>
  );
}

export default Home;