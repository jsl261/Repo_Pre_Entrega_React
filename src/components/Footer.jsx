import React from 'react';

function Footer() {
  return (
    <footer style={{ background: '#4A3329', color: '#F3EAE2', padding: '40px 20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h3 style={{ color: '#E8C8B8', marginBottom: '10px', fontSize: '1.4rem' }}>🧶 Rincón del Crochet</h3>
        <p style={{ fontSize: '0.95rem', color: '#D2B4A7', marginBottom: '25px' }}>
          Proyecto desarrollado con dedicación y amor por el tejido artesanal.
        </p>

        {/* Sección de Encargados */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <img 
              src="/images/equipo.jpg" 
              alt="Equipo encargados de Rincón del Crochet" 
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #E8C8B8', marginBottom: '8px' }} 
            />
            <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1rem', color: '#fff' }}>Equipo Carpiseñas</p>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#D2B4A7' }}>Desarrolladores del Proyecto</p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #5C4033', marginTop: '30px', paddingTop: '15px', fontSize: '0.8rem', color: '#A89085' }}>
          © 2026 Rincón del Crochet. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;