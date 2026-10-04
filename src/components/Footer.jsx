import React from 'react';
import './Footer.css';

const Footer = () => {
  const equipo = [
    {
      nombre: 'Julian Salazar',
      correo: 'julian@rincondelcrochet.com',
      imagen: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    {
      nombre: 'Jael Guerra',
      correo: 'maria@rincondelcrochet.com',
      imagen: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    },
    {
      nombre: 'Indira Lara',
      correo: 'carlos@rincondelcrochet.com',
      imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <footer className="main-footer">
      <div className="footer-content">
        {/* Contenedor centralizado verticalmente: Marca arriba, equipo abajo */}
        <div className="footer-brand-section">
          <h3 className="footer-title">Rincón del Crochet</h3>
          <p className="footer-description">
            Hecho a mano con amor y dedicación.
          </p>
        </div>

        <div className="footer-team-section">
          <span className="team-label">Equipo:</span>
          <div className="team-row">
            {equipo.map((miembro, index) => (
              <div key={index} className="team-card">
                <img src={miembro.imagen} alt={miembro.nombre} className="team-avatar" />
                <div className="team-info">
                  <span className="team-name">{miembro.nombre}</span>
                  <span className="team-email">{miembro.correo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Rincón del Crochet. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;