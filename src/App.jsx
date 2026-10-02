import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home'; // 🏡 Importamos la página de inicio
import ItemListContainer from './views/ItemListContainer';
import Cart from './views/Cart';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);

  const handleAddToCart = (productoConCantidad) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(item => item.id === productoConCantidad.id);
      if (existingIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex] = {
          ...updatedAuthItem = updatedCart[existingIndex],
          cantidad: updatedCart[existingIndex].cantidad + productoConCantidad.cantidad
        };
        return updatedCart;
      } else {
        return [...prevCart, productoConCantidad];
      }
    });
  };

  const handleRemoveItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <BrowserRouter>
      <div style={{ background: '#F9F6F0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} cartCount={totalCartCount} />
        
        <div style={{ flex: 1 }}>
          <Routes>
            {/* 🏡 Ruta raíz independiente para la página de bienvenida */}
            <Route path="/" element={<Home />} />
            
            {/* 🛍️ Ruta exclusiva para el Catálogo de Productos */}
            <Route path="/productos" element={<ItemListContainer greeting="Catálogo de Productos" searchTerm={searchTerm} handleAddToCart={handleAddToCart} />} />
            <Route path="/categoria/:categoryName" element={<ItemListContainer searchTerm={searchTerm} handleAddToCart={handleAddToCart} />} />
            
            {/* 🛒 Ruta del Carrito */}
            <Route path="/carrito" element={<Cart cart={cart} onRemoveItem={handleRemoveItem} onClearCart={handleClearCart} />} />
          </Routes>
        </div>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;