import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="main-header">
      <nav className="custom-navbar">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">
            Rincón del Crochet
          </Link>
          <ul className="navbar-nav">
            <li>
              <Link to="/" className="nav-link">Inicio</Link>
            </li>
            <li>
              <Link to="/productos" className="nav-link">Productos</Link>
            </li>
            <li>
              <Link to="/nosotros" className="nav-link">Nosotros</Link>
            </li>
            {/* Menú desplegable con la referencia asignada */}
            <li className="dropdown" ref={dropdownRef}>
              <button 
                className="nav-link" 
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Categorías ▾
              </button>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link 
                      to="/productos?categoria=amigurumis" 
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Amigurumis
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/productos?categoria=prendas" 
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Prendas
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/productos?categoria=accesorios" 
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Accesorios
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        <div className="navbar-right">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="search-input"
            />
            <button className="search-btn">Buscar</button>
          </div>

          <Link to="/carrito" className="cart-link">
            🛒 Carrito <span className="cart-badge">0</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;