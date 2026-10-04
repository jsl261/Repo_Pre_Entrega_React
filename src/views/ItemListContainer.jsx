import React, { useState } from 'react';

function ItemListContainer({ greeting, handleAddToCart }) {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Ovejas Llaveros', precio: 10000.00, img: '/images/Imagen1.jpeg', stock: 5, cantidad: 1, favorito: true }, // Lo dejamos en favorito para probar
    { id: 2, nombre: 'Virgenes', precio: 10000.00, img: '/images/Imagen2.jpeg', stock: 4, cantidad: 1, favorito: false },
    { id: 3, nombre: 'Muñeca K-POP', precio: 40000.00, img: '/images/Imagen3.jpeg', stock: 10, cantidad: 1, favorito: false },
    { id: 4, nombre: 'Sonajeros', precio: 20000.00, img: '/images/Imagen4.jpeg', stock: 10, cantidad: 1, favorito: false },
    { id: 5, nombre: 'Kit de Nacimiento', precio: 50000.00, img: '/images/Imagen5.jpeg', stock: 10, cantidad: 1, favorito: false },
  ]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [vistaActual, setVistaActual] = useState('todos');

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

  const toggleFavorito = (id) => {
    setProductos(productos.map(prod => {
      if (prod.id === id) {
        const actualizado = { ...prod, favorito: !prod.favorito };
        if (selectedImage && selectedImage.id === id) {
          setSelectedImage(actualizado);
        }
        return actualizado;
      }
      return prod;
    }));
  };

  const productosFavoritos = productos.filter(prod => prod.favorito);
  const productosAMostrar = vistaActual === 'todos' ? productos : productosFavoritos;

  return (
    <div style={{ padding: '30px 15px', maxWidth: '850px', margin: '0 auto', fontFamily: 'sans-serif', background: '#F9F6F0', minHeight: '80vh' }}>
      
      {/* Título y subtítulo */}
      <div style={{ textAlign: 'center', marginTop: '15px', marginBottom: '20px' }}>
        <h2 style={{ color: '#5C4033', fontSize: '1.9rem', marginBottom: '8px', fontWeight: '800' }}>{greeting}</h2>
        <p style={{ color: '#7D6658', fontSize: '1rem', margin: 0, padding: '0 10px' }}>Elige tus tejidos favoritos y selecciona la cantidad</p>
      </div>

      {/* Botones de Navegación */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => setVistaActual('todos')}
          style={{
            background: vistaActual === 'todos' ? '#5C4033' : '#ffffff',
            color: vistaActual === 'todos' ? '#ffffff' : '#5C4033',
            border: '1px solid #5C4033',
            padding: '10px 20px',
            borderRadius: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '0.9rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}
        >
          Catálogo Completo
        </button>
        <button
          type="button"
          onClick={() => setVistaActual('favoritos')}
          style={{
            background: vistaActual === 'favoritos' ? '#C0392B' : '#ffffff',
            color: vistaActual === 'favoritos' ? '#ffffff' : '#C0392B',
            border: '1px solid #C0392B',
            padding: '10px 20px',
            borderRadius: '20px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '0.9rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}
        >
          ❤️ Mis Favoritos ({productosFavoritos.length})
        </button>
      </div>

      {/* Lista de Productos */}
      {productosAMostrar.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', background: '#ffffff', borderRadius: '16px', border: '1px solid #F3EAE2' }}>
          <p style={{ color: '#7D6658', fontSize: '1.05rem', margin: 0 }}>
            Aún no tienes productos marcados como favoritos. Haz clic en el corazón 🤍 de cualquier tejido para guardarlo aquí.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {productosAMostrar.map((prod) => (
            <div 
              key={prod.id} 
              style={{ 
                background: '#ffffff', 
                borderRadius: '16px', 
                overflow: 'hidden', 
                boxShadow: '0 6px 20px rgba(139, 90, 43, 0.06)', 
                border: '1px solid #F3EAE2',
                display: 'flex', 
                flexDirection: 'column', // En celulares se acomoda en columna vertical para que nada quede oculto
                alignItems: 'stretch', 
                padding: '16px',
                gap: '15px',
                position: 'relative'
              }}
            >
              {/* ❤️️ Botón de Favorito */}
              <button
                type="button"
                onClick={() => toggleFavorito(prod.id)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: '#ffffff',
                  border: '1px solid #E2D2C5',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  zIndex: 2
                }}
                title={prod.favorito ? "Quitar de favoritos" : "Marcar como favorito"}
              >
                {prod.favorito ? '❤️' : '🤍'}
              </button>

              <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', alignItems: 'center' }}>
                {/* Imagen con zoom */}
                <div 
                  onClick={() => setSelectedImage(prod)}
                  style={{ 
                    width: '110px', 
                    height: '110px', 
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
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>

                {/* Información básica */}
                <div style={{ flexGrow: 1, paddingRight: '30px' }}>
                  <h3 style={{ margin: '0 0 6px 0', color: '#5C4033', fontSize: '1.15rem', fontWeight: '700' }}>{prod.nombre}</h3>
                  <p style={{ color: '#C0392B', fontWeight: 'bold', fontSize: '1.15rem', margin: '0 0 10px 0' }}>${prod.precio.toFixed(2)}</p>
                  
                  {/* Selector de Cantidad */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.9rem', color: '#7D6658', fontWeight: '500' }}>Cant:</span>
                    <button 
                      type="button"
                      onClick={() => restarCantidad(prod.id)}
                      style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #E2D2C5', background: '#FDFBF7', cursor: 'pointer', fontWeight: 'bold', color: '#5C4033', fontSize: '1rem' }}
                    >
                      -
                    </button>
                    <span style={{ fontSize: '1rem', fontWeight: 'bold', minWidth: '20px', textAlign: 'center', color: '#5C4033' }}>{prod.cantidad}</span>
                    <button 
                      type="button"
                      onClick={() => sumarCantidad(prod.id)}
                      style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #E2D2C5', background: '#FDFBF7', cursor: 'pointer', fontWeight: 'bold', color: '#5C4033', fontSize: '1rem' }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Botón de Comprar a lo ancho en celulares */}
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
                    padding: '12px 20px',
                    borderRadius: '25px',
                    border: 'none',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(192, 57, 43, 0.25)',
                    width: '100%',
                    fontSize: '0.95rem'
                  }}
                >
                  Agregar al Carrito 🛒
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Zoom */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0, 0, 0, 0.75)', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ background: '#ffffff', padding: '20px', borderRadius: '20px', maxWidth: '400px', width: '100%', textAlign: 'center', position: 'relative' }}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              style={{ position: 'absolute', top: '15px', right: '15px', background: '#C0392B', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', fontWeight: 'bold', cursor: 'pointer', zIndex: 3 }}
            >
              ✕
            </button>
            <h3 style={{ color: '#5C4033', margin: '0 0 15px 0' }}>{selectedImage.nombre}</h3>
            <div style={{ width: '100%', height: '300px', borderRadius: '12px', overflow: 'hidden', marginBottom: '15px' }}>
              <img src={selectedImage.img} alt={selectedImage.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <p style={{ color: '#7D6658', fontSize: '1.1rem', margin: '0 0 20px 0', fontWeight: 'bold' }}>Precio: ${selectedImage.precio.toFixed(2)}</p>
            <button 
              type="button"
              onClick={() => {
                if (handleAddToCart) {
                  handleAddToCart({ id: selectedImage.id, nombre: selectedImage.nombre, precio: selectedImage.precio, cantidad: selectedImage.cantidad, img: selectedImage.img });
                }
                alert(`¡Agregaste ${selectedImage.cantidad} unidad(es) de "${selectedImage.nombre}" al carrito!`);
                setSelectedImage(null);
              }}
              style={{ background: 'linear-gradient(135deg, #D98880 0%, #C0392B 100%)', color: 'white', padding: '12px 30px', borderRadius: '25px', border: 'none', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}
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