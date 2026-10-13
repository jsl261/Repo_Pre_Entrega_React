// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendEmailVerification 
} from 'firebase/auth';
import { auth } from '../firebase/config';

// Expresiones regulares para validaciones
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  // Función para traducir los códigos de error más comunes de Firebase
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Este correo electrónico ya está registrado. Por favor, inicia sesión.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Correo electrónico o contraseña incorrectos.';
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Inténtalo de nuevo más tarde.';
      default:
        return 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validar Correo Electrónico
    if (!EMAIL_REGEX.test(email)) {
      setError('Por favor, ingresa un correo electrónico válido (ejemplo: usuario@dominio.com).');
      return;
    }

    // Validar Contraseña (solo al registrarse)
    if (isRegistering && !PASSWORD_REGEX.test(password)) {
      setError(
        'La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, un número y un carácter especial (@$!%*?&).'
      );
      return;
    }

    try {
      if (isRegistering) {
        // Proceso de Registro
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        
        setMessage('¡Registro exitoso! Te hemos enviado un correo de verificación. Redirigiendo a inicio de sesión...');
        
        // Limpiar campos y cambiar automáticamente al modo Iniciar Sesión tras 2 segundos
        setTimeout(() => {
          setIsRegistering(false);
          setPassword('');
          setMessage('');
          setShowPassword(false);
        }, 2000);

      } else {
        // Proceso de Inicio de Sesión
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Verificar que el correo haya sido verificado
        if (!userCredential.user.emailVerified) {
          setError('Por favor, verifica tu correo electrónico antes de ingresar.');
          return;
        }
        
        setMessage('¡Bienvenido a El Rincón del Crochet!');
        
        // Redirigir al Home ("/") tras 1 segundo de mostrar el mensaje de bienvenida
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (err) {
      setError(getErrorMessage(err.code));
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
    setMessage('');
    setShowPassword(false);
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: '3rem 1rem', 
      flex: 1 
    }}>
      <div style={{ 
        background: '#ffffff', 
        padding: '2.5rem', 
        borderRadius: '12px', 
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)', 
        width: '100%', 
        maxWidth: '400px',
        borderTop: '4px solid #c2185b'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          color: '#c2185b', 
          marginBottom: '1.5rem',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
        </h2>
        
        {error && (
          <p style={{ 
            color: '#d32f2f', 
            background: '#ffebee', 
            padding: '0.75rem', 
            borderRadius: '6px', 
            fontSize: '0.9rem', 
            marginBottom: '1rem',
            lineHeight: '1.4'
          }}>
            {error}
          </p>
        )}
        
        {message && (
          <p style={{ 
            color: '#2e7d32', 
            background: '#e8f5e9', 
            padding: '0.75rem', 
            borderRadius: '6px', 
            fontSize: '0.9rem', 
            marginBottom: '1rem',
            lineHeight: '1.4'
          }}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#4b5563', marginBottom: '0.4rem' }}>
              Correo electrónico
            </label>
            <input 
              type="email" 
              placeholder="tu@correo.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#4b5563', marginBottom: '0.4rem' }}>
              Contraseña
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ 
                  width: '100%', 
                  padding: '0.7rem', 
                  paddingRight: '2.5rem', 
                  borderRadius: '6px', 
                  border: '1px solid #d1d5db', 
                  boxSizing: 'border-box', 
                  outline: 'none' 
                }}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ 
                  position: 'absolute', 
                  right: '0.6rem', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  fontSize: '1.1rem',
                  color: '#6b7280',
                  padding: '0.2rem'
                }}
                title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? "👁️‍🗨️" : "👁️"}
              </button>
            </div>
            {isRegistering && (
              <span style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.3rem', display: 'block' }}>
                Mínimo 8 caracteres, 1 mayúscula, 1 número y 1 símbolo (@$!%*?&).
              </span>
            )}
          </div>

          <button 
            type="submit" 
            style={{ 
              backgroundColor: '#c2185b', 
              color: '#ffffff', 
              border: 'none', 
              padding: '0.75rem', 
              borderRadius: '6px', 
              fontWeight: '600', 
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              marginTop: '0.5rem'
            }}
          >
            {isRegistering ? 'Registrarse' : 'Ingresar'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button 
            onClick={toggleMode} 
            style={{ background: 'none', border: 'none', color: '#c2185b', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500', textDecoration: 'underline' }}
          >
            {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;