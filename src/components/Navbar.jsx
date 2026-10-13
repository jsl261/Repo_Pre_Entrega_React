import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore'; // 👈 Añadimos setDoc
import './Navbar.css';

const Navbar = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cargandoAuth, setCargandoAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setCargandoAuth(true);
      setUser(currentUser);

      if (currentUser) {
        try {
          const docRef = doc(db, 'usuarios', currentUser.uid);
          let docSnap = await getDoc(docRef);

          // Si el documento no existe y es tu correo de admin, lo creamos automáticamente
          if (!docSnap.exists() && currentUser.email === 'jael.guerra@gmail.com') {
            await setDoc(docRef, { rol: 'admin', email: currentUser.email });
            docSnap = await getDoc(docRef); // Volvemos a leerlo
          }

          if (docSnap.exists() && docSnap.data().rol === 'admin') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('Error al verificar o crear el rol:', error);
          setIsAdmin(false);
        }
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

              {/* Se muestra unicamente si el usuario esta logueado y es admin */}
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