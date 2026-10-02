import React, { useState } from 'react';

function ItemListContainer({ greeting }) {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Amigurumi Conejito', precio: 15.00, img: '/images/conejito.jpg', stock: 5, cantidad: 1 },
    { id: 2, nombre: 'Bufanda Texturada', precio: 22.00, img: '/images/bufanda.jpg', stock: 4, cantidad: 1 },
    { id: 3, nombre: 'Atrapasueños Crochet', precio: 12.00, img: '/images/atrapasuenos.jpg', stock: 10, cantidad: 1 },
  ]);

  const sumarCantidad = (id) => {
    setProductos(productos.map(prod => {
      if (prod.id === id && prod.cantidad < prod.stock) {
        return { ...prod, cantidad: prod.cantidad + 1 };
      }
      return prod;
    }));
  };

  const restarCantidad = (id) => {
    setProductos(productos.map(prod => {
      if (prod.id === id && prod.cantidad > 1) {
        return { ...prod, cantidad: prod.cantidad - 1 };
      }
      return prod;
    }));
  };

  const handleAgregarAlCarro = (nombre, cantidad, precio) => {
    alert(`¡Agregaste ${cantidad} unidad(es) de "${nombre}" al carrito! Total: $${(precio * cantidad).toFixed(2)}`);
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '850px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333', fontSize: '2rem', marginBottom: '5px' }}>{greeting}</h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>Elige tus tejidos favoritos y selecciona la cantidad</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {productos.map((prod) => (
          <div 
            key={prod.id} 
            style={{ 
              background: 'white', 
              borderRadius: '12px', 
              overflow: 'hidden', 
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)', 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center', 
              padding: '15px',
              gap: '20px'
            }}
          >
            {/* Imagen horizontal */}
            <div style={{ width: '130px', height: '130px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: '#f9f9f9' }}>
              <img src={prod.img} alt={`Fotografía de ${prod.nombre} tejido a mano`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Información del producto */}
            <div style={{ flexGrow: 1 }}>
              <h3 style={{ margin: '0 0 5px 0', color: '#333', fontSize: '1.2rem' }}>{prod.nombre}</h3>
              <p style={{ color: '#ff758c', fontWeight: 'bold', fontSize: '1.2rem', margin: '0 0 10px 0' }}>${prod.precio.toFixed(2)}</p>
              
              {/* Selector de Cantidad */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.9rem', color: '#666' }}>Cantidad:</span>
                <button 
                  onClick={() => restarCantidad(prod.id)}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontWeight: 'bold', color: '#555' }}
                >
                  -
                </button>
                <span style={{ fontSize: '1rem', fontWeight: 'bold', minWidth: '15px', textAlign: 'center' }}>{prod.cantidad}</span>
                <button 
                  onClick={() => sumarCantidad(prod.id)}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontWeight: 'bold', color: '#555' }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Botón de Comprar */}
            <div>
              <button 
                onClick={() => handleAgregarAlCarro(prod.nombre, prod.cantidad, prod.precio)}
                style={{
                  background: 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '25px',
                  border: 'none',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(255, 117, 140, 0.4)',
                  whiteSpace: 'nowrap'
                }}
              >
                Agregar 🛒
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;