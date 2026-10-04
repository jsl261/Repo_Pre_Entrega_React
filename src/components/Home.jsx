import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ background: '#F9F6F0', minHeight: '80vh', padding: '60px 20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Logo / Imagen decorativa */}
        <div style={{ marginBottom: '20px' }}>
          <img 
            src="/images/Crochet.jpeg" 
            alt="Ovillo y crochet con corazón" 
            style={{ 
              width: '90px', 
              height: '90px', 
              objectFit: 'contain', 
              borderRadius: '50%', 
              boxShadow: '0 4px 10px rgba(92, 64, 51, 0.15)',
              background: '#fff',
              padding: '5px'
            }} 
          />
        </div>

        <h1 style={{ 
          color: '#5C4033', 
          fontSize: '2.5rem', 
          fontWeight: '800', 
          marginBottom: '20px',
          lineHeight: '1.2'
        }}>
          Bienvenidos al Rincón del Crochet
        </h1>

        <p style={{ color: '#7D6658', fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '40px' }}>
          Cada pieza está tejida a mano con amor y dedicación. Descubre nuestros amigurumis únicos, bufandas abrigadas y accesorios artesanales ideales para regalar o regalarte.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', flexWrap: 'wrap' }}>
          <Link 
            to="/productos" 
            style={{
              background: 'linear-gradient(135deg, #D98880 0%, #C0392B 100%)',
              color: 'white',
              padding: '14px 32px',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              boxShadow: '0 4px 15px rgba(192, 57, 43, 0.25)'
            }}
          >
            Ver Catálogo 🛍️
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;