import React from 'react';
import { productos } from '../data/productos'; // Importas tu archivo estático
import Item from '../components/Item';          // 👈 1. Importamos tu componente Item

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
            // 👈 2. Renderizamos el componente Item pasándole el producto como prop
            <Item key={prod.id} producto={prod} />
          ))}
        </div>
      )}
    </main>
  );
}