import React from 'react';
import { Link } from 'react-router-dom';

function Cart({ cart, onRemoveItem, onClearCart }) {
  // Calculamos el precio total de toda la compra
  const totalPrice = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  if (cart.length === 0) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', fontFamily: 'sans-serif', background: '#F9F6F0', minHeight: '70vh' }}>
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
            boxShadow: '0 4px 15px rgba(192, 57, 43, 0.25)'
          }}
        >
          Ver Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '50px 20px', maxWidth: '850px', margin: '0 auto', fontFamily: 'sans-serif', background: '#F9F6F0', minHeight: '80vh' }}>
      <h2 style={{ textAlign: 'center', color: '#5C4033', fontSize: '2.2rem', marginBottom: '30px', fontWeight: '800' }}>Tu Carrito de Compras</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
        {cart.map((prod) => (
          <div 
            key={prod.id} 
            style={{ 
              background: '#ffffff', 
              borderRadius: '16px', 
              boxShadow: '0 6px 20px rgba(139, 90, 43, 0.06)', 
              border: '1px solid #F3EAE2',
              display: 'flex', 
              alignItems: 'center', 
              padding: '18px',
              gap: '20px'
            }}
          >
            {/* Imagen del producto */}
            <div style={{ width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, background: '#FDFBF7' }}>
              <img src={prod.img} alt={prod.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Información y detalles */}
            <div style={{ flexGrow: 1 }}>
              <h3 style={{ margin: '0 0 6px 0', color: '#5C4033', fontSize: '1.2rem', fontWeight: '700' }}>{prod.nombre}</h3>
              <p style={{ color: '#7D6658', margin: '0 0 4px 0', fontSize: '0.95rem' }}>Precio unitario: ${prod.precio.toFixed(2)}</p>
              <p style={{ color: '#5C4033', margin: '0', fontWeight: '600' }}>Cantidad: {prod.cantidad}</p>
            </div>

            {/* Subtotal por producto */}
            <div style={{ textAlign: 'right', minWidth: '100px' }}>
              <p style={{ color: '#C0392B', fontWeight: 'bold', fontSize: '1.2rem', margin: '0 0 10px 0' }}>
                ${(prod.precio * prod.cantidad).toFixed(2)}
              </p>
              <button 
                type="button"
                onClick={() => onRemoveItem(prod.id)}
                style={{
                  background: 'transparent',
                  color: '#C0392B',
                  border: '1px solid #C0392B',
                  padding: '6px 12px',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
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
      <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', boxShadow: '0 6px 20px rgba(139, 90, 43, 0.06)', border: '1px solid #F3EAE2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: '0 0 5px 0', color: '#5C4033', fontSize: '1.4rem' }}>Total a Pagar:</h3>
          <p style={{ color: '#C0392B', fontSize: '1.8rem', fontWeight: 'bold', margin: '0' }}>${totalPrice.toFixed(2)}</p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            type="button"
            onClick={onClearCart}
            style={{
              background: '#FDFBF7',
              color: '#7D6658',
              border: '1px solid #E2D2C5',
              padding: '12px 20px',
              borderRadius: '25px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '0.95rem'
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
              padding: '12px 24px',
              borderRadius: '25px',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(192, 57, 43, 0.25)',
              fontSize: '0.95rem'
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