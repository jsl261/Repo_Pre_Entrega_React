import React, { useState, useEffect } from 'react';
import Item from '../components/Item';

function ItemListContainer() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Obtenemos los productos personalizados de localStorage (gestionados con ImgBB)
      const productosGuardados = JSON.parse(localStorage.getItem('productos_personalizados') || '[]');

      // Normalizamos las propiedades para asegurar compatibilidad total
      const productosNormalizados = productosGuardados.map(prod => ({
        id: prod.id,
        nombre: prod.nombre || prod.name,
        descripcion: prod.descripcion || prod.description,
        precio: prod.precio || prod.price,
        imagen: prod.imagen || prod.img || prod.pictureUrl,
        stock: prod.stock
      }));

      setItems(productosNormalizados);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px', color: '#831843', fontWeight: 'bold' }}>Cargando catálogo...</div>;
  }

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px', minHeight: '60vh', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#831843', textAlign: 'center', marginBottom: '32px' }}>
        Catálogo de Tejidos
      </h2>

      {items.length === 0 ? (
        <div style={{ 
          backgroundColor: 'white', 
          border: '1px solid #fce7f3', 
          borderRadius: '16px', 
          padding: '48px 24px', 
          textAlign: 'center', 
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          margin: 'auto',
          maxWidth: '500px',
          width: '100%'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🧶</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#831843', marginBottom: '8px' }}>
            Aún no hay productos en el catálogo
          </h3>
          <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Parece que todavía no has agregado ningún tejido. Ve a la sección de administración o formulario para subir tus creaciones con su imagen a ImgBB y empezar a vender.
          </p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
          gap: '24px' 
        }}>
          {items.map((prod, index) => (
            <Item 
              key={prod.id || index} 
              producto={prod} 
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default ItemListContainer;