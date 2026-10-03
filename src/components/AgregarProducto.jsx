import React, { useState } from 'react';
import './AgregarProducto.css';

function AgregarProducto() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    stock: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Producto guardado:", formData);
    alert(`¡El producto "${formData.name}" se guardó correctamente!`);
    
    // Limpiar formulario después de guardar
    setFormData({
      id: '',
      name: '',
      price: '',
      stock: '',
      image: null
    });
  };

  return (
    <main className="main-content">
      <div className="form-card-container">
        <form onSubmit={handleSubmit} className="crochet-form">
          <h2>Agregar Nuevo Producto</h2>
          
          <div className="form-group">
            <label htmlFor="id">Id:</label>
            <input 
              type="text" 
              id="id" 
              name="id" 
              value={formData.id} 
              onChange={handleChange} 
              required 
              autoComplete="off" 
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Nombre del Producto:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="Ej: Amigurumi Osito" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              autoComplete="off" 
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Precio:</label>
            <input 
              type="number" 
              id="price" 
              name="price" 
              placeholder="Ej: 95" 
              step="0.01" 
              value={formData.price} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock:</label>
            <input 
              type="number" 
              id="stock" 
              name="stock" 
              placeholder="Ej: 5" 
              value={formData.stock} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Imagen:</label>
            <input 
              type="file" 
              id="image" 
              name="image" 
              accept="image/*" 
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" className="save-btn">Guardar Producto</button>
        </form>
      </div>
    </main>
  );
}

export default AgregarProducto;