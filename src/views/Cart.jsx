import React from 'react';
import { Link } from 'react-router-dom';

function Cart({ cart, onRemoveItem, onClearCart, onUpdateQuantity }) {
  // Calculamos el precio total de toda la compra
  const totalPrice = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  if (cart.length === 0) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', fontFamily: 'sans-serif', background: '#F9F6F0', minHeight: '70vh', boxSizing: 'border-box' }}>
        <h2 style={{ color: '#5C4033', fontSize: '2rem', marginBottom: '15px' }}>Tu carrito está vacío 🛒</h2>
        <p style={{ color: '#7D6658', fontSize: '1.1rem', marginBottom: '30px' }}>¡Explora nuestro catálogo y descubre hermosos tejidos hechos a mano!</p>
        <Link 
          to="/productos" 
          style={{
            background: 'linear-gradient(135deg, #D98880 0%, #C0392B 100%)',
            color: 'white',
            padding: '12px 28px',
            borderRadius: '25px',
            textDecoration: 'none',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(192, 57, 43, 0.25)',
            display: 'inline-block'
          }}
        >
          Ver Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px 10px', 
      maxWidth: '850px', 
      margin: '0 auto', 
      fontFamily: 'sans-serif', 
      background: '#F9F6F0', 
      minHeight: '80vh',
      boxSizing: 'border-box',
      width: '100%',
      overflowX: 'hidden'
    }}>
      <h2 style={{ textAlign: 'center', color: '#5C4033', fontSize: '1.8rem', marginBottom: '20px', fontWeight: '800' }}>Tu Carrito de Compras</h2>

      {/* Lista de Productos del Carrito */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px', width: '100%', boxSizing: 'border-box' }}>
        {cart.map((prod) => (
          <div 
            key={prod.id} 
            style={{ 
              background: '#ffffff', 
              borderRadius: '16px', 
              boxShadow: '0 4px 15px rgba(139, 90, 43, 0.06)', 
              border: '1px solid #F3EAE2',
              display: 'flex', 
              flexDirection: 'column',
              padding: '14px',
              gap: '12px',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'center', width: '100%', boxSizing: 'border-box' }}>
              {/* Imagen del producto */}
              <div style={{ width: '75px', height: '75px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, background: '#FDFBF7' }}>
                <img src={prod.img} alt={prod.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Información y detalles */}
              <div style={{ flexGrow: 1, minWidth: 0 }}>
                <h3 style={{ margin: '0 0 4px 0', color: '#5C4033', fontSize: '1rem', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prod.nombre}</h3>
                <p style={{ color: '#7D6658', margin: '0 0 6px 0', fontSize: '0.8rem' }}>Precio unitario: ${prod.precio.toFixed(2)}</p>
                
                {/* Control de Cantidades (+ / -) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E2D2C5', borderRadius: '8px', background: '#FDFBF7', overflow: 'hidden' }}>
                    <button 
                      type="button"
                      onClick={() => onUpdateQuantity(prod.id, prod.cantidad - 1)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '4px 10px',
                        cursor: 'pointer',
                        color: '#5C4033',
                        fontWeight: 'bold',
                        fontSize: '0.9rem'
                      }}
                    >
                      -
                    </button>
                    <span style={{ padding: '0 8px', fontSize: '0.85rem', fontWeight: '600', color: '#5C4033' }}>
                      {prod.cantidad}
                    </span>
                    <button 
                      type="button"
                      onClick={() => onUpdateQuantity(prod.id, prod.cantidad + 1)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '4px 10px',
                        cursor: 'pointer',
                        color: '#5C4033',
                        fontWeight: 'bold',
                        fontSize: '0.9rem'
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Fila inferior de cada tarjeta: Subtotal y botón eliminar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F3EAE2', paddingTop: '10px', width: '100%', boxSizing: 'border-box' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#7D6658' }}>Subtotal: </span>
                <span style={{ color: '#C0392B', fontWeight: 'bold', fontSize: '1rem' }}>
                  ${(prod.precio * prod.cantidad).toFixed(2)}
                </span>
              </div>
              <button 
                type="button"
                onClick={() => onRemoveItem(prod.id)}
                style={{
                  background: 'transparent',
                  color: '#C0392B',
                  border: '1px solid #C0392B',
                  padding: '5px 12px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}
              >
                Eliminar 🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen y Acciones Finales */}
      <div style={{ 
        background: '#ffffff', 
        padding: '16px', 
        borderRadius: '16px', 
        boxShadow: '0 4px 15px rgba(139, 90, 43, 0.06)', 
        border: '1px solid #F3EAE2', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '15px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ textAlign: 'center', borderBottom: '1px solid #F3EAE2', paddingBottom: '12px', width: '100%', boxSizing: 'border-box' }}>
          <h3 style={{ margin: '0 0 4px 0', color: '#5C4033', fontSize: '1.1rem' }}>Total a Pagar:</h3>
          <p style={{ color: '#C0392B', fontSize: '1.6rem', fontWeight: 'bold', margin: '0' }}>${totalPrice.toFixed(2)}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', boxSizing: 'border-box' }}>
          <button 
            type="button"
            onClick={onClearCart}
            style={{
              background: '#FDFBF7',
              color: '#7D6658',
              border: '1px solid #E2D2C5',
              padding: '12px',
              borderRadius: '25px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '0.9rem',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            Vaciar Carrito
          </button>
          
          <button 
            type="button"
            onClick={() => alert('¡Compra finalizada con éxito! Gracias por elegir Rincón del Crochet.')}
            style={{
              background: 'linear-gradient(135deg, #D98880 0%, #C0392B 100%)',
              color: 'white',
              padding: '12px',
              borderRadius: '25px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(192, 57, 43, 0.25)',
              fontSize: '0.9rem',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            Finalizar Compra ✨
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;