import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Item({ producto }) {
  const [modalAbierto, setModalAbierto] = useState(false);
  
  // Manejamos la imagen por si viene como 'img' o 'imagen'
  const imagenSrc = producto.img || producto.imagen || 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=500&q=80';

  return (
    <>
      <div style={{ 
        background: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
        overflow: 'hidden', 
        border: '1px solid #fce7f3', 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%'
      }}>
        {/* Imagen con zoom / modal */}
        <div 
          onClick={() => setModalAbierto(true)}
          title="Haz clic para ver la imagen ampliada"
          style={{ width: '100%', height: '220px', overflow: 'hidden', backgroundColor: '#f3f4f6', cursor: 'zoom-in', position: 'relative' }}
        >
          <img 
            src={imagenSrc} 
            alt={producto.nombre} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=500&q=80';
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            background: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            pointerEvents: 'none'
          }}>
            🔍 Ampliar
          </div>
        </div>

        {/* Detalles en tarjeta */}
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <h3 style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#831843', marginBottom: '8px' }}>
            {producto.nombre || 'Sin nombre'}
          </h3>
          <p style={{ color: '#4b5563', fontSize: '0.875rem', marginBottom: '16px', flexGrow: 1, lineHeight: '1.4' }}>
            {producto.descripcion || 'Sin descripción disponible.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
            <span style={{ color: '#be185d', fontWeight: 'bold', fontSize: '1.125rem' }}>
              ${producto.precio || '0'}
            </span>
            <Link 
              to={`/producto/${producto.id}`}
              style={{ 
                backgroundColor: '#db2777', 
                color: 'white', 
                padding: '6px 12px', 
                borderRadius: '8px', 
                fontSize: '0.875rem', 
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Ver Detalle
            </Link>
          </div>
        </div>
      </div>

      {/* Modal de Zoom */}
      {modalAbierto && (
        <div 
          onClick={() => setModalAbierto(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{
              position: 'relative',
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              maxWidth: '90vw',
              maxHeight: '90vh',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <button 
              onClick={() => setModalAbierto(false)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: '#831843',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                fontSize: '1.25rem',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10
              }}
            >
              &times;
            </button>
            <div style={{ padding: '16px', backgroundColor: '#fdf2f8', borderBottom: '1px solid #fce7f3' }}>
              <h4 style={{ margin: 0, color: '#831843', fontSize: '1.2rem', fontWeight: 'bold' }}>{producto.nombre}</h4>
            </div>
            <div style={{ padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto', backgroundColor: '#000' }}>
              <img 
                src={imagenSrc} 
                alt={producto.nombre} 
                style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }} 
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}