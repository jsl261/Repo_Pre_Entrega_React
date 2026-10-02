import React from 'react';

function Footer() {
  return (
    <footer style={{ background: '#333', color: 'white', padding: '30px 20px', marginTop: '80px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h3 style={{ color: '#ff7eb3', marginBottom: '10px' }}>🧶 Rincón del Crochet</h3>
        <p style={{ fontSize: '0.95rem', color: '#bbb', marginBottom: '25px' }}>
          Proyecto desarrollado con dedicación y amor por el tejido artesanal.
        </p>

        {/* Sección de Encargados */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <img 
              src="/images/equipo.jpg" 
              alt="Equipo encargados de Rincón del Crochet" 
              style={{ width: '75px', height: '75px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ff7eb3', marginBottom: '8px' }} 
            />
            <p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.95rem' }}>Equipo Carpiseñas</p>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#aaa' }}>Desarrolladores del Proyecto</p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #444', marginTop: '25px', paddingTop: '15px', fontSize: '0.8rem', color: '#888' }}>
          © 2026 Rincón del Crochet. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;