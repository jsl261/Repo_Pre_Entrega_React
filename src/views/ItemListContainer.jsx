import React, { useState } from 'react';

function ItemListContainer({ greeting }) {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Amigurumi Conejito', precio: 15.00, img: '/images/Imagen1.jpeg', stock: 5, cantidad: 1 },
    { id: 2, nombre: 'Bufanda Texturada', precio: 22.00, img: '/images/Imagen2.jpeg', stock: 4, cantidad: 1 },
    { id: 3, nombre: 'Atrapasueños Crochet', precio: 12.00, img: '/images/Imagen3.jpeg', stock: 10, cantidad: 1 },
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
    <div style={{ padding: '50px 20px', maxWidth: '850px', margin: '0 auto', fontFamily: 'sans-serif', background: '#F9F6F0', minHeight: '80vh' }}>
      <h2 style={{ textAlign: 'center', color: '#5C4033', fontSize: '2.2rem', marginBottom: '8px', fontWeight: '800' }}>{greeting}</h2>
      <p style={{ textAlign: 'center', color: '#7D6658', marginBottom: '40px', fontSize: '1.1rem' }}>Elige tus tejidos favoritos y selecciona la cantidad</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {productos.map((prod) => (
          <div 
            key={prod.id} 
            style={{ 
              background: '#ffffff', 
              borderRadius: '16px', 
              overflow: 'hidden', 
              boxShadow: '0 6px 20px rgba(139, 90, 43, 0.06)', 
              border: '1px solid #F3EAE2',
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center', 
              padding: '18px',
              gap: '22px'
            }}
          >
            {/* Imagen horizontal */}
            <div style={{ width: '140px', height: '140px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, background: '#FDFBF7' }}>
              <img src={prod.img} alt={`Fotografía de ${prod.nombre} tejido a mano`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Información del producto */}
            <div style={{ flexGrow: 1 }}>
              <h3 style={{ margin: '0 0 6px 0', color: '#5C4033', fontSize: '1.3rem', fontWeight: '700' }}>{prod.nombre}</h3>
              <p style={{ color: '#C0392B', fontWeight: 'bold', fontSize: '1.25rem', margin: '0 0 12px 0' }}>${prod.precio.toFixed(2)}</p>
              
              {/* Selector de Cantidad */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.95rem', color: '#7D6658', fontWeight: '500' }}>Cantidad:</span>
                <button 
                  onClick={() => restarCantidad(prod.id)}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #E2D2C5', background: '#FDFBF7', cursor: 'pointer', fontWeight: 'bold', color: '#5C4033', fontSize: '1rem' }}
                >
                  -
                </button>
                <span style={{ fontSize: '1.05rem', fontWeight: 'bold', minWidth: '20px', textAlign: 'center', color: '#5C4033' }}>{prod.cantidad}</span>
                <button 
                  onClick={() => sumarCantidad(prod.id)}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #E2D2C5', background: '#FDFBF7', cursor: 'pointer', fontWeight: 'bold', color: '#5C4033', fontSize: '1rem' }}
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
                  background: 'linear-gradient(135deg, #D98880 0%, #C0392B 100%)',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '25px',
                  border: 'none',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(192, 57, 43, 0.25)',
                  whiteSpace: 'nowrap',
                  fontSize: '0.95rem'
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