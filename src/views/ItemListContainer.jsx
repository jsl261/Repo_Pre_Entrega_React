import React, { useState } from 'react';

function ItemListContainer({ greeting }) {
  // Lista de productos con su stock disponible y la cantidad inicial seleccionada en 1
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Amigurumi Conejito', precio: 15.00, img: '/images/conejito.jpg', stock: 5, cantidad: 1 },
    { id: 2, nombre: 'Bufanda Texturada', precio: 22.00, img: '/images/bufanda.jpg', stock: 4, cantidad: 1 },
    { id: 3, nombre: 'Atrapasueños Crochet', precio: 12.00, img: '/images/atrapasuenos.jpg', stock: 10, cantidad: 1 },
  ]);

  // Función para aumentar la cantidad de un producto específico
  const sumarCantidad = (id) => {
    setProductos(productos.map(prod => {
      if (prod.id === id && prod.cantidad < prod.stock) {
        return { ...prod, cantidad: prod.cantidad + 1 };
      }
      return prod;
    }));
  };

  // Función para disminuir la cantidad (mínimo 1)
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
    <div style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333', fontSize: '2rem', marginBottom: '5px' }}>{greeting}</h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>Elige tus tejidos favoritos y selecciona la cantidad</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
        {productos.map((prod) => (
          <div key={prod.id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            
            {/* Imagen del producto */}
            <div style={{ height: '200px', background: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img src={prod.img} alt={`Fotografía de ${prod.nombre} tejido a mano`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Información e interacción */}
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '1.2rem' }}>{prod.nombre}</h3>
              <p style={{ color: '#ff758c', fontWeight: 'bold', fontSize: '1.3rem', margin: '0 0 15px 0' }}>${prod.precio.toFixed(2)}</p>
              
              {/* Selector de Cantidad */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <button 
                  onClick={() => restarCantidad(prod.id)}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', color: '#555' }}
                >
                  -
                </button>
                <span style={{ fontSize: '1.1rem', fontWeight: 'bold', minWidth: '20px' }}>{prod.cantidad}</span>
                <button 
                  onClick={() => sumarCantidad(prod.id)}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', color: '#555' }}
                >
                  +
                </button>
              </div>

              {/* Botón de Comprar / Agregar */}
              <button 
                onClick={() => handleAgregarAlCarro(prod.nombre, prod.cantidad, prod.precio)}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '25px',
                  border: 'none',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(255, 117, 140, 0.4)'
                }}
              >
                Agregar al Carrito 🛒
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemListContainer;