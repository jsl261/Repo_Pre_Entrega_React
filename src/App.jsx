import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ItemListContainer from './views/ItemListContainer';
import Cart from './views/Cart'; // 🛒 Importamos la vista del carrito
import Footer from './components/Footer';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]); // 🛒 Estado global del carrito

  // Función para agregar productos al carrito o sumar cantidades si ya existen
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

  // Función para eliminar un producto específico del carrito
  const handleRemoveItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // Función para vaciar por completo el carrito
  const handleClearCart = () => {
    setCart([]);
  };

  // Calculamos el total de unidades para el Navbar
  const totalCartCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <BrowserRouter>
      <div style={{ background: '#F9F6F0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} cartCount={totalCartCount} />
        
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<ItemListContainer greeting="Catálogo de Productos" searchTerm={searchTerm} handleAddToCart={handleAddToCart} />} />
            <Route path="/productos" element={<ItemListContainer greeting="Catálogo de Productos" searchTerm={searchTerm} handleAddToCart={handleAddToCart} />} />
            <Route path="/categoria/:categoryName" element={<ItemListContainer searchTerm={searchTerm} handleAddToCart={handleAddToCart} />} />
            
            {/* 🛒 Nueva ruta para el Carrito */}
            <Route path="/carrito" element={<Cart cart={cart} onRemoveItem={handleRemoveItem} onClearCart={handleClearCart} />} />
          </Routes>
        </div>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;