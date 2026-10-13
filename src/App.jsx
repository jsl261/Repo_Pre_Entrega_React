import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ItemListContainer from './views/ItemListContainer';
import ItemDetail from './views/ItemDetail';
import About from './components/About';
import Cart from './views/Cart';
import Footer from './components/Footer';
import AgregarProducto from './components/AgregarProducto';
import Login from './components/Login';
import './App.css';

function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/agregar-producto" element={<AgregarProducto />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;