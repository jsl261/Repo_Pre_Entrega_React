import React from 'react';
import { productos } from '../data/productos'; // <-- Importas directamente tu archivo estático

export default function ItemListContainer() {
  return (
    <main style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 16px' }}>
      <h2 style={{ textAlign: 'center', color: '#831843', marginBottom: '32px' }}>Catálogo de Tejidos</h2>
      
      {productos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
          <h3>Aún no hay productos en el catálogo</h3>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {productos.map((prod) => (
            <div key={prod.id} style={{ background: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <img 
                src={prod.img} 
                alt={prod.nombre} 
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} 
              />
              <h3 style={{ color: '#831843', margin: '12px 0 8px' }}>{prod.nombre}</h3>
              <p style={{ color: '#4b5563', fontSize: '0.9rem', marginBottom: '12px' }}>{prod.descripcion}</p>
              <span style={{ fontWeight: 'bold', color: '#db2777', fontSize: '1.2rem' }}>${prod.precio}</span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}