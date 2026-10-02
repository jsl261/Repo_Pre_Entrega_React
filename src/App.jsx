import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ItemListContainer from './views/ItemListContainer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<ItemListContainer greeting="Catálogo de Productos" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;