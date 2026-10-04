import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para cerrar el menú automáticamente al hacer clic en un enlace
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="main-header">
      <nav className="custom-navbar">
        {/* Fila superior visible siempre (Logo y Botón Hamburguesa) */}
        <div className="navbar-top-row">
          <Link to="/" className="navbar-brand" onClick={handleLinkClick}>
            Rincón del Crochet
          </Link>
          
          <button 
            className="menu-toggle" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menú de navegación"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Contenedor colapsable para móviles */}
        <div className={`navbar-collapse ${isOpen ? 'open' : ''}`}>
          <div className="navbar-left">
            <ul className="navbar-nav">
              <li>
                <NavLink to="/" className="nav-link" end onClick={handleLinkClick}>Inicio</NavLink>
              </li>
              <li>
                <NavLink to="/productos" className="nav-link" onClick={handleLinkClick}>Productos</NavLink>
              </li>
              <li>
                <NavLink to="/nosotros" className="nav-link" onClick={handleLinkClick}>Nosotros</NavLink>
              </li>
              <li>
                <NavLink to="/agregar-producto" className="nav-link" onClick={handleLinkClick}>Agregar Producto</NavLink>
              </li>
            </ul>
          </div>

          <div className="navbar-right">
            <div className="search-container">
              <input type="text" placeholder="Buscar..." className="search-input" />
              <button className="search-btn">Buscar</button>
            </div>

            <Link to="/carrito" className="cart-link" onClick={handleLinkClick}>
              🛒 Carrito <span className="cart-badge">{cartCount || 0}</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;