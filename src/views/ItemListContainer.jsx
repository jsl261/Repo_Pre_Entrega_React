import React, { useState } from 'react';

function ItemListContainer({ greeting, handleAddToCart }) {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Ovejas Llaveros', precio: 10000.00, img: '/images/Imagen1.jpeg', stock: 5, cantidad: 1 },
    { id: 2, nombre: 'Virgenes', precio: 10000.00, img: '/images/Imagen2.jpeg', stock: 4, cantidad: 1 },
    { id: 3, nombre: 'Muñeca K-POP', precio: 40000.00, img: '/images/Imagen3.jpeg', stock: 10, cantidad: 1 },
  ]);

  // 🔍 Estado para controlar la imagen seleccionada para el Zoom
  const [selectedImage, setSelectedImage] = useState(null);

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
            {/* Imagen horizontal con efecto de lupa al pasar el cursor y zoom al hacer clic */}
            <div 
              onClick={() => setSelectedImage(prod)}
              style={{ 
                width: '140px', 
                height: '140px', 
                borderRadius: '12px', 
                overflow: 'hidden', 
                flexShrink: 0, 
                background: '#FDFBF7',
                cursor: 'pointer',
                position: 'relative'
              }}
              title="Haz clic para hacer zoom"
            >
              <img 
                src={prod.img} 
                alt={`Fotografía de ${prod.nombre} tejido a mano`} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }} 
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute',
                bottom: '5px',
                right: '5px',
                background: 'rgba(92, 64, 51, 0.7)',
                color: 'white',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem'
              }}>
                🔍
              </div>
            </div>

            {/* Información del producto */}
            <div style={{ flexGrow: 1 }}>
              <h3 style={{ margin: '0 0 6px 0', color: '#5C4033', fontSize: '1.3rem', fontWeight: '700' }}>{prod.nombre}</h3>
              <p style={{ color: '#C0392B', fontWeight: 'bold', fontSize: '1.25rem', margin: '0 0 12px 0' }}>${prod.precio.toFixed(2)}</p>
              
              {/* Selector de Cantidad */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.95rem', color: '#7D6658', fontWeight: '500' }}>Cantidad:</span>
                <button 
                  type="button"
                  onClick={() => restarCantidad(prod.id)}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #E2D2C5', background: '#FDFBF7', cursor: 'pointer', fontWeight: 'bold', color: '#5C4033', fontSize: '1rem' }}
                >
                  -
                </button>
                <span style={{ fontSize: '1.05rem', fontWeight: 'bold', minWidth: '20px', textAlign: 'center', color: '#5C4033' }}>{prod.cantidad}</span>
                <button 
                  type="button"
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
                type="button"
                onClick={() => {
                  if (handleAddToCart) {
                    handleAddToCart({
                      id: prod.id,
                      nombre: prod.nombre,
                      precio: prod.precio,
                      cantidad: prod.cantidad,
                      img: prod.img
                    });
                  }
                  alert(`¡Agregaste ${prod.cantidad} unidad(es) de "${prod.nombre}" al carrito!`);
                }}
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

      {/* 🔍 MODAL DE ZOOM PARA LA IMAGEN */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{
              background: '#ffffff',
              padding: '20px',
              borderRadius: '20px',
              maxWidth: '500px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              position: 'relative'
            }}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: '#C0392B',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
            
            <h3 style={{ color: '#5C4033', margin: '0 0 15px 0', fontSize: '1.4rem' }}>{selectedImage.nombre}</h3>
            
            <div style={{ width: '100%', height: '350px', borderRadius: '12px', overflow: 'hidden', marginBottom: '15px' }}>
              <img 
                src={selectedImage.img} 
                alt={selectedImage.nombre} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            
            <p style={{ color: '#7D6658', fontSize: '1.1rem', margin: '0 0 20px 0', fontWeight: 'bold' }}>
              Precio: ${selectedImage.precio.toFixed(2)}
            </p>

            <button 
              type="button"
              onClick={() => {
                if (handleAddToCart) {
                  handleAddToCart({
                    id: selectedImage.id,
                    nombre: selectedImage.nombre,
                    precio: selectedImage.precio,
                    cantidad: selectedImage.cantidad,
                    img: selectedImage.img
                  });
                }
                alert(`¡Agregaste ${selectedImage.cantidad} unidad(es) de "${selectedImage.nombre}" al carrito!`);
                setSelectedImage(null);
              }}
              style={{
                background: 'linear-gradient(135deg, #D98880 0%, #C0392B 100%)',
                color: 'white',
                padding: '12px 30px',
                borderRadius: '25px',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem',
                width: '100%'
              }}
            >
              Agregar al Carrito 🛒
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemListContainer;