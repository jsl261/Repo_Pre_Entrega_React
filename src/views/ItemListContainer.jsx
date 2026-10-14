import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import Item from '../components/Item'; 

export default function ItemListContainer() {
  const [listaProductos, setListaProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProductosNube = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'productos'));
        const productosNube = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setListaProductos(productosNube);
      } catch (error) {
        console.error("Error al obtener productos de Firestore:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductosNube();
  }, []);

  return (
    <main style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 16px' }}>
      <h2 style={{ textAlign: 'center', color: '#831843', marginBottom: '32px' }}>Catálogo de Tejidos</h2>
      
      {cargando ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
          <h3>Cargando catálogo desde la nube... ⏳</h3>
        </div>
      ) : listaProductos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
          <h3>Aún no hay productos en el catálogo</h3>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {listaProductos.map((prod) => (
            <Item key={prod.id} producto={prod} />
          ))}
        </div>
      )}
    </main>
  );
}