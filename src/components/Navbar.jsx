// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import './Navbar.css';

const Navbar = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Escuchar el estado de autenticación de Firebase en tiempo real
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      setIsOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

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
              
              {/* Dinámico: Muestra el usuario activo y la opción de Salir con Bootstrap Icon */}
              {user ? (
                <>
                  <li>
                    <span className="nav-link" style={{ cursor: 'default', opacity: 0.9 }}>
                      👤 {user.email}
                    </span>
                  </li>
                  <li>
                    <a 
                      href="#logout" 
                      onClick={handleLogout} 
                      className="nav-link"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <i className="bi bi-door-closed" style={{ fontSize: '1rem' }}></i> Salir
                    </a>
                  </li>
                </>
              ) : (
                <li>
                  <NavLink to="/login" className="nav-link" onClick={handleLinkClick}>👤 Ingresar</NavLink>
                </li>
              )}
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