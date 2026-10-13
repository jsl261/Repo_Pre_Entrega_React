import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import './AgregarProducto.css';

function AgregarProducto() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: null
  });

  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [verificando, setVerificando] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const docRef = doc(db, 'usuarios', currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists() && docSnap.data().rol === 'admin') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('Error al verificar rol:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setVerificando(false);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const subirImagenAImgBB = async (file) => {
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

    if (!apiKey) {
      throw new Error('Falta configurar la VITE_IMGBB_API_KEY en el archivo .env');
    }

    const convertirABase64 = (blob) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    const base64Image = await convertirABase64(file);

    const data = new FormData();
    data.append('key', apiKey);
    data.append('image', base64Image);

    const respuesta = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: data
    });

    const datos = await respuesta.json();

    if (datos.success) {
      return datos.data.url;
    } else {
      throw new Error(datos.error?.message || 'Error al subir la imagen a ImgBB');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('Subiendo imagen a ImgBB...');

    try {
      const urlImagenServidor = await subirImagenAImgBB(formData.image);

      const productoFinal = {
        id: Date.now().toString(),
        nombre: formData.name,
        descripcion: formData.description,
        precio: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        img: urlImagenServidor,
        favorito: false
      };

      const productosGuardados = JSON.parse(localStorage.getItem('productos_personalizados') || '[]');
      localStorage.setItem('productos_personalizados', JSON.stringify([...productosGuardados, productoFinal]));

      setMensaje(`¡El producto "${formData.name}" se guardó correctamente! 🎉`);

      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        image: null
      });

      const fileInput = document.getElementById('image');
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error(error);
      setMensaje(`❌ Error: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };

  if (verificando) {
    return (
      <main className="main-content" style={{ textAlign: 'center', padding: '60px' }}>
        <h3>Verificando permisos de administrador... ⏳</h3>
      </main>
    );
  }

  if (!user || !isAdmin) {
    return (
      <main className="main-content" style={{ textAlign: 'center', padding: '60px' }}>
        <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', maxWidth: '400px', margin: '0 auto', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h2 style={{ color: '#78281F', marginBottom: '15px' }}>Acceso Restringido 🔒</h2>
          <p style={{ color: '#555', marginBottom: '20px' }}>Esta sección es exclusiva para el administrador del sitio. Inicia sesión con la cuenta correcta.</p>
          <button 
            onClick={() => navigate('/login')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#c2185b',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Iniciar Sesión
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="main-content">
      <div className="form-card-container">
        <form onSubmit={handleSubmit} className="crochet-form">
          <h2>Agregar Nuevo Producto</h2>

          {mensaje && (
            <div style={{
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '8px',
              background: mensaje.includes('❌') ? '#FADBD8' : '#D4EFDF',
              color: mensaje.includes('❌') ? '#78281F' : '#145A32',
              fontSize: '0.9rem',
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              {mensaje}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Nombre del Producto:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Ej: Amigurumi Osito"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción:</label>
            <textarea
              id="description"
              name="description"
              placeholder="Detalles del tejido, materiales, medidas..."
              value={formData.description}
              onChange={handleChange}
              rows="3"
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2D2C5', resize: 'vertical', fontFamily: 'inherit' }}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Precio:</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Ej: 9500"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock:</label>
            <input
              type="number"
              id="stock"
              name="stock"
              placeholder="Ej: 5"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Imagen:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="save-btn" disabled={cargando}>
            {cargando ? 'Subiendo imagen a ImgBB...' : 'Guardar Producto'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default AgregarProducto;