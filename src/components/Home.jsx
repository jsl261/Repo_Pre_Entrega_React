import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '90px 20px', 
      fontFamily: 'sans-serif', 
      background: '#F9F6F0', 
      minHeight: '70vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <span style={{ fontSize: '5rem', marginBottom: '10px' }}>🧶</span>
      <h1 style={{ color: '#5C4033', margin: '15px 0', fontSize: '2.8rem', fontWeight: '800' }}>
        Bienvenidos a Rincón del Crochet
      </h1>
      <p style={{ color: '#7D6658', fontSize: '1.25rem', maxWidth: '650px', margin: '0 auto 35px', lineHeight: '1.6' }}>
        Descubre piezas únicas tejidas artesanalmente con amor: amigurumis tiernos, accesorios acogedores y detalles especiales para regalar o regalarte.
      </p>
      <Link 
        to="/catalogo" 
        style={{
          background: 'linear-gradient(135deg, #D98880 0%, #C0392B 100%)',
          color: 'white',
          padding: '15px 32px',
          borderRadius: '30px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1.15rem',
          boxShadow: '0 6px 20px rgba(192, 57, 43, 0.25)',
          display: 'inline-block'
        }}
      >
        Explorar Catálogo 🚀
      </Link>
    </div>
  );
}

export default Home;