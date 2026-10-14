import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export default function ItemDetailContainer({ handleAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const obtenerProductoFirestore = async () => {
      try {
        const docRef = doc(db, 'productos', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProducto({ id: docSnap.id, ...docSnap.data() });
        } else {
          setProducto(null);
        }
      } catch (error) {
        console.error('Error al cargar el detalle del producto desde Firestore:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerProductoFirestore();
  }, [id]);

  const handleIncrement = () => {
    if (producto && cantidad < (producto.stock || 10)) {
      setCantidad(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (cantidad > 1) {
      setCantidad(prev => prev - 1);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '60px', color: '#831843' }}>Cargando detalle desde la nube...</div>;
  }

  if (!producto) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>
        <h2>Producto no encontrado</h2>
        <p style={{ marginTop: '12px' }}>El producto que buscas no existe en la base de datos o fue eliminado.</p>
        <button 
          onClick={() => navigate('/productos')}
          style={{ 
            marginTop: '20px', 
            backgroundColor: '#db2777', 
            color: 'white', 
            padding: '10px 20px', 
            borderRadius: '8px', 
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Volver al Catálogo
        </button>
      </div>
    );
  }

  const imagenSrc = producto.img || producto.imagen || 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=500&q=80';

  const handleAdd = () => {
    if (handleAddToCart) {
      handleAddToCart({ ...producto, cantidad });
    }
  };

  return (
    <main style={{ maxWidth: '900px', margin: '30px auto', padding: '0 16px' }}>
      <button 
        onClick={() => navigate('/productos')}
        style={{ 
          background: 'none', 
          border: 'none', 
          color: '#db2777', 
          textDecoration: 'underline', 
          fontWeight: 'bold', 
          cursor: 'pointer', 
          fontSize: '0.95rem',
          padding: '0',
          marginBottom: '16px',
          display: 'inline-block'
        }}
      >
        &larr; Volver al Catálogo
      </button>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '24px', 
        backgroundColor: 'white', 
        padding: '24px', 
        borderRadius: '16px', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #fce7f3',
        alignItems: 'center'
      }}>
        {/* Imagen del producto */}
        <div style={{ width: '100%', height: '320px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
          <img 
            src={imagenSrc} 
            alt={producto.nombre} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>

        {/* Información detallada con distancias reducidas */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#831843', marginBottom: '8px' }}>
            {producto.nombre}
          </h2>
          <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '16px' }}>
            {producto.descripcion}
          </p>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#be185d', marginBottom: '12px' }}>
            ${producto.precio}
          </div>
          {producto.stock !== undefined && (
            <p style={{ color: '#059669', fontSize: '0.85rem', marginBottom: '16px', fontWeight: '500' }}>
              Stock disponible: {producto.stock} unidades
            </p>
          )}

          {/* Selector de cantidad y botón */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '8px', overflow: 'hidden', height: '42px' }}>
              <button 
                onClick={handleDecrement}
                style={{ padding: '0 14px', backgroundColor: '#f3f4f6', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', height: '100%' }}
              >
                -
              </button>
              <span style={{ padding: '0 14px', fontSize: '1rem', fontWeight: 'bold' }}>{cantidad}</span>
              <button 
                onClick={handleIncrement}
                style={{ padding: '0 14px', backgroundColor: '#f3f4f6', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', height: '100%' }}
              >
                +
              </button>
            </div>
            <button 
              onClick={handleAdd}
              style={{ 
                backgroundColor: '#db2777', 
                color: 'white', 
                padding: '0 20px', 
                borderRadius: '8px', 
                fontSize: '0.95rem', 
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold',
                height: '42px',
                flex: 1
              }}
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}