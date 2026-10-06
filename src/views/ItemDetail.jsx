import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import productosData from '../data/productos.json';

function ItemDetail({ handleAddToCart }) {
  const { id } = useParams();
  const producto = productosData.find(p => p.id === parseInt(id));
  const [cantidad, setCantidad] = useState(1);

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(precio);
  };

  if (!producto) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', background: '#F9F6F0', minHeight: '70vh', fontFamily: 'sans-serif' }}>
        <h2 style={{ color: '#5C4033', fontSize: '1.8rem', marginBottom: '20px' }}>Producto no encontrado</h2>
        <Link 
          to="/productos" 
          style={{ 
            background: '#5C4033',
            color: '#ffffff',
            border: '1px solid #5C4033',
            padding: '10px 20px',
            borderRadius: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '0.9rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          ← Ir al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px 15px', maxWidth: '700px', margin: '0 auto', fontFamily: 'sans-serif', background: '#F9F6F0', minHeight: '80vh' }}>
      
      {/* Botón de retorno con el estilo exacto de píldora marrón */}
      <div style={{ marginBottom: '20px' }}>
        <Link 
          to="/productos" 
          style={{ 
            background: '#5C4033',
            color: '#ffffff',
            border: '1px solid #5C4033',
            padding: '10px 20px',
            borderRadius: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '0.9rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            textDecoration: 'none',
            display: 'inline-block'
          }}
        >
          ← Ir al catálogo
        </Link>
      </div>
      
      <div style={{ 
        background: '#ffffff', 
        borderRadius: '20px', 
        padding: '25px', 
        boxShadow: '0 6px 20px rgba(139, 90, 43, 0.08)', 
        border: '1px solid #F3EAE2', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px' 
      }}>
        <div style={{ width: '100%', height: '320px', borderRadius: '14px', overflow: 'hidden', background: '#FDFBF7' }}>
          <img src={producto.img} alt={producto.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div>
          <h2 style={{ color: '#5C4033', fontSize: '1.8rem', margin: '0 0 10px 0' }}>{producto.nombre}</h2>
          <p style={{ color: '#C0392B', fontSize: '1.4rem', fontWeight: 'bold', margin: '0 0 15px 0' }}>{formatearPrecio(producto.precio)}</p>
          <p style={{ color: '#7D6658', fontSize: '1rem', lineHeight: '1.5', margin: '0 0 20px 0' }}>{producto.descripcion}</p>
          <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '20px' }}>Stock disponible: {producto.stock} unidades</p>

          {/* Control de cantidad */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
            <span style={{ color: '#5C4033', fontWeight: 'bold' }}>Cantidad:</span>
            <button 
              type="button"
              onClick={() => setCantidad(Math.max(1, cantidad - 1))}
              style={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #E2D2C5', background: '#FDFBF7', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', color: '#5C4033' }}
            >-</button>
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#5C4033', minWidth: '20px', textAlign: 'center' }}>{cantidad}</span>
            <button 
              type="button"
              onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}
              style={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #E2D2C5', background: '#FDFBF7', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', color: '#5C4033' }}
            >+</button>
          </div>

          <button 
            type="button"
            onClick={() => {
              if (handleAddToCart) {
                handleAddToCart({ ...producto, cantidad });
              }
              alert(`¡Agregaste ${cantidad} unidad(es) de "${producto.nombre}" al carrito!`);
            }}
            style={{
              background: 'linear-gradient(135deg, #D98880 0%, #C0392B 100%)',
              color: 'white',
              padding: '14px 20px',
              borderRadius: '25px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%',
              fontSize: '1rem',
              boxShadow: '0 4px 15px rgba(192, 57, 43, 0.25)'
            }}
          >
            Agregar al Carrito 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;