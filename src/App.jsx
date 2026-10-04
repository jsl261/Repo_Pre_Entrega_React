import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ItemListContainer from './views/ItemListContainer';
import About from './components/About';
import Cart from './views/Cart';
import Footer from './components/Footer';
import AgregarProducto from './components/AgregarProducto';
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

  // 👇 Nueva función para actualizar la cantidad desde el carrito (+ / -)
  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      // Si la cantidad llega a 0 o menos, eliminamos el producto del carrito
      handleRemoveItem(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, cantidad: newQuantity } : item
      )
    );
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <BrowserRouter>
      <div style={{ background: '#F9F6F0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} cartCount={totalCartCount} />
        
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<ItemListContainer greeting="Catálogo de Productos" searchTerm={searchTerm} handleAddToCart={handleAddToCart} />} />
            <Route path="/categoria/:categoryName" element={<ItemListContainer searchTerm={searchTerm} handleAddToCart={handleAddToCart} />} />
            <Route path="/nosotros" element={<About />} />
            
            {/* 👇 Pasamos la función onUpdateQuantity al componente Cart */}
            <Route 
              path="/carrito" 
              element={
                <Cart 
                  cart={cart} 
                  onRemoveItem={handleRemoveItem} 
                  onClearCart={handleClearCart} 
                  onUpdateQuantity={handleUpdateQuantity} 
                />
              } 
            />
            
            <Route path="/agregar-producto" element={<AgregarProducto />} />
          </Routes>
        </div>
        
        <Footer />
        
      </div>
    </BrowserRouter>
  );
}

export App;