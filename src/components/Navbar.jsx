import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import './Navbar.css';

const Navbar = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cargandoAuth, setCargandoAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCargandoAuth(true);
      setUser(currentUser);

      // Verificación directa sin consultas a Firestore (evita error de permisos)
      if (currentUser && currentUser.email === 'jael.guerra@gmail.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }

      setCargandoAuth(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      setUser(null);
      setIsAdmin(false);
      setIsOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="main-header">
      <nav className="custom-navbar">
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

              {/* Muestra "Agregar Producto" si el correo es jael.guerra@gmail.com */}
              {!cargandoAuth && user && isAdmin && (
                <li>
                  <NavLink to="/agregar-producto" className="nav-link" onClick={handleLinkClick}>Agregar Producto</NavLink>
                </li>
              )}
              
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
                      Salir
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