import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ItemDetailContainer({ handleAddToCart }) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Obtenemos los productos de localStorage
      const productosGuardados = JSON.parse(localStorage.getItem('productos_personalizados') || '[]');
      
      // Buscamos el producto que coincida con el id de la URL
      const encontrado = productosGuardados.find(p => String(p.id) === String(id));
      
      setProducto(encontrado || null);
    } catch (error) {
      console.error('Error al cargar el detalle del producto:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '60px', color: '#831843' }}>Cargando detalle...</div>;
  }

  if (!producto) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>
        <h2>Producto no encontrado</h2>
        <p style={{ marginTop: '12px' }}>El producto que buscas no existe o fue eliminado.</p>
        <Link to="/" style={{ display: 'inline-block', marginTop: '20px', backgroundColor: '#db2777', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none' }}>
          Volver al Catálogo
        </Link>
      </div>
    );
  }

  // Soportamos tanto 'img' (del formulario) como 'imagen' por compatibilidad
  const imagenSrc = producto.img || producto.imagen || 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=500&q=80';

  const handleAdd = () => {
    if (handleAddToCart) {
      handleAddToCart({ ...producto, cantidad: 1 });
    }
  };

  return (
    <main style={{ maxWidth: '900px', margin: '40px auto', padding: '0 16px' }}>
      <Link to="/" style={{ color: '#db2777', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block', marginBottom: '24px' }}>
        &larr; Volver al Catálogo
      </Link>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '32px', 
        backgroundColor: 'white', 
        padding: '32px', 
        borderRadius: '16px', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #fce7f3'
      }}>
        {/* Imagen del producto */}
        <div style={{ width: '100%', height: '350px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
          <img 
            src={imagenSrc} 
            alt={producto.nombre} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>

        {/* Información detallada */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#831843', marginBottom: '12px' }}>
            {producto.nombre}
          </h2>
          <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px' }}>
            {producto.descripcion}
          </p>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#be185d', marginBottom: '24px' }}>
            ${producto.precio}
          </div>
          {producto.stock && (
            <p style={{ color: '#059669', fontSize: '0.9rem', marginBottom: '24px', fontWeight: '500' }}>
              Stock disponible: {producto.stock} unidades
            </p>
          )}
          <button 
            onClick={handleAdd}
            style={{ 
              backgroundColor: '#db2777', 
              color: 'white', 
              padding: '12px 24px', 
              borderRadius: '8px', 
              fontSize: '1rem', 
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </main>
  );
}