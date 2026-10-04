import React from 'react';
import './Footer.css';

const Footer = () => {
  const equipo = [
    {
      nombre: 'Julian Salazar',
      correo: 'julian@rincondelcrochet.com',
      imagen: '/images/julian.jpeg',
    },
    {
      nombre: 'Jael Guerra',
      correo: 'jael@rincondelcrochet.com',
      imagen: '/images/jael.jpeg',
    },
    {
      nombre: 'Indira Lara',
      correo: 'indira@rincondelcrochet.com',
      imagen: '/images/indira.jpeg',
    },
  ];

  return (
    <footer className="main-footer">
      <div className="footer-content">
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