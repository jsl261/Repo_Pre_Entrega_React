// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/agregar-producto');
    } catch (err) {
      console.error(err);
      setError('Correo o contraseña incorrectos. Inténtalo nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#fdf2f4', 
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '400px', 
        backgroundColor: '#ffffff', 
        padding: '30px 20px', 
        borderRadius: '12px', 
        boxShadow: '0 8px 24px rgba(194, 24, 91, 0.12)',
        boxSizing: 'border-box',
        border: '1px solid #fce7f3'
      }}>
        <h2 style={{ color: '#831843', marginBottom: '20px', textAlign: 'center' }}>Iniciar Sesión 🔐</h2>

        {error && (
          <div style={{
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '8px',
            background: '#FADBD8',
            color: '#78281F',
            fontSize: '0.9rem',
            textAlign: 'center',
            fontWeight: 'bold'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label htmlFor="email" style={{ fontWeight: 'bold', color: '#4b5563', fontSize: '0.9rem' }}>Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                border: '1.5px solid #fbcfe8',
                backgroundColor: '#ffffff',
                color: '#1f2937',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label htmlFor="password" style={{ fontWeight: 'bold', color: '#4b5563', fontSize: '0.9rem' }}>Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                border: '1.5px solid #fbcfe8',
                backgroundColor: '#ffffff',
                color: '#1f2937',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#c2185b',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            {cargando ? 'Iniciando sesión...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;