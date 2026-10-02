import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ItemListContainer from './views/ItemListContainer';
import About from './components/About'; // 👈 1. Importas la página de Nosotros
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
          ...updatedCart[existingIndex],
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
        
        {/* El Navbar va fuera de las Routes para que sea fijo en toda la web */}
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} cartCount={totalCartCount} />
        
        <div style={{ flex: 1 }}>
          {/* 👇 2. Las Routes van aquí, decidiendo qué componente mostrar según la URL */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<ItemListContainer greeting="Catálogo de Productos" searchTerm={searchTerm} handleAddToCart={handleAddToCart} />} />
            <Route path="/categoria/:categoryName" element={<ItemListContainer searchTerm={searchTerm} handleAddToCart={handleAddToCart} />} />
            <Route path="/nosotros" element={<About />} /> {/* 👈 3. Ruta de la página Nosotros */}
            <Route path="/carrito" element={<Cart cart={cart} onRemoveItem={handleRemoveItem} onClearCart={handleClearCart} />} />
          </Routes>
        </div>
        
        {/* El Footer también va fuera para que se vea abajo en todas las vistas */}
        <Footer />
        
      </div>
    </BrowserRouter>
  );
}

export default App;