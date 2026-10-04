import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cartCount }) => { // 🛒 Recibimos el contador dinámico

  return (
    <header className="main-header">
      <nav className="custom-navbar">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">
            Rincón del Crochet
          </Link>
          <ul className="navbar-nav">
            <li>
              <NavLink to="/" className="nav-link" end>Inicio</NavLink>
            </li>
            <li>
              <NavLink to="/productos" className="nav-link">Productos</NavLink>
            </li>
            <li>
              <NavLink to="/nosotros" className="nav-link">Nosotros</NavLink>
            </li>
            {/* 🌟 NUEVA PESTAÑA: AGREGAR PRODUCTO */}
            <li>
              <NavLink to="/agregar-producto" className="nav-link">Agregar Producto</NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-right">
          <div className="search-container">
            <input type="text" placeholder="Buscar..." className="search-input" />
            <button className="search-btn">Buscar</button>
          </div>

          <Link to="/carrito" className="cart-link">
            🛒 Carrito <span className="cart-badge">{cartCount || 0}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;