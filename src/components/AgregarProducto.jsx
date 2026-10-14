// src/components/AgregarProducto.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc 
} from 'firebase/firestore';
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
  const [productosAdmin, setProductosAdmin] = useState([]);
  
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [verificando, setVerificando] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser && currentUser.email === 'jael.guerra@gmail.com') {
        setIsAdmin(true);
        await cargarProductosFirestore();
      } else {
        setIsAdmin(false);
      }
      
      setVerificando(false);
    });

    return () => unsubscribe();
  }, []);

  const cargarProductosFirestore = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'productos'));
      const prods = querySnapshot.docs.map(documento => ({
        id: documento.id,
        ...documento.data()
      }));
      setProductosAdmin(prods);
    } catch (error) {
      console.error("Error al cargar productos de Firestore:", error);
    }
  };

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

      const productoNuevo = {
        nombre: formData.name,
        descripcion: formData.description,
        precio: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        img: urlImagenServidor,
        favorito: false,
        createdAt: Date.now()
      };

      await addDoc(collection(db, 'productos'), productoNuevo);
      await cargarProductosFirestore();

      setMensaje(`¡El producto "${formData.name}" se guardó correctamente en la nube! 🎉`);

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

  const eliminarProducto = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto de la nube?')) {
      try {
        await deleteDoc(doc(db, 'productos', id));
        await cargarProductosFirestore();
        setMensaje('🗑️ Producto eliminado correctamente.');
      } catch (error) {
        console.error("Error al eliminar:", error);
        setMensaje('❌ Error al eliminar el producto.');
      }
    }
  };

  const cambiarStock = async (id, nuevoStock) => {
    const stockNum = parseInt(nuevoStock);
    if (isNaN(stockNum) || stockNum < 0) return;

    try {
      const productoRef = doc(db, 'productos', id);
      await updateDoc(productoRef, { stock: stockNum });
      setProductosAdmin(prev => prev.map(p => p.id === id ? { ...p, stock: stockNum } : p));
    } catch (error) {
      console.error("Error al actualizar stock:", error);
    }
  };

  if (verificando) {
    return (
      <main className="agregar-producto-main" style={{ textAlign: 'center' }}>
        <h3>Verificando permisos de administrador... ⏳</h3>
      </main>
    );
  }

  if (!user || !isAdmin) {
    return (
      <main className="agregar-producto-main" style={{ textAlign: 'center' }}>
        <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', maxWidth: '400px', margin: '0 auto' }}>
          <h2 style={{ color: '#78281F', marginBottom: '15px' }}>Acceso Restringido 🔒</h2>
          <p style={{ color: '#555', marginBottom: '20px' }}>Esta sección es exclusiva para el administrador del sitio.</p>
          <button 
            onClick={() => navigate('/login')}
            className="btn-guardar-prod"
          >
            Iniciar Sesión
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="agregar-producto-main">
      <div className="agregar-producto-content">
        
        {/* Formulario */}
        <div className="form-card-box">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%' }}>
            <h2 style={{ color: '#831843', fontSize: '1.25rem', marginBottom: '5px' }}>Agregar Nuevo Producto (Nube)</h2>

            {mensaje && (
              <div style={{
                padding: '10px',
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

            <div className="form-group-item">
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

            <div className="form-group-item">
              <label htmlFor="description">Descripción:</label>
              <textarea
                id="description"
                name="description"
                placeholder="Detalles del tejido, materiales, medidas..."
                value={formData.description}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>

            <div className="form-group-item">
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

            <div className="form-group-item">
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

            <div className="form-group-item">
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

            <button 
              type="submit" 
              disabled={cargando}
              className="btn-guardar-prod"
            >
              {cargando ? 'Subiendo imagen a ImgBB...' : 'Guardar Producto'}
            </button>
          </form>
        </div>

        {/* Tarjeta de Gestión de Productos */}
        <div className="gestionar-productos-box">
          <h3 style={{ color: '#831843', marginBottom: '20px', borderBottom: '2px solid #fce7f3', paddingBottom: '10px', fontSize: '1.1rem' }}>
            📦 Gestionar Productos en la Nube ({productosAdmin.length})
          </h3>

          {productosAdmin.length === 0 ? (
            <p style={{ color: '#6b7280', textAlign: 'center', padding: '20px' }}>No hay productos registrados en Firestore todavía.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {productosAdmin.map((prod) => (
                <div key={prod.id} className="prod-admin-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={prod.img} alt={prod.nombre} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '6px' }} />
                    <div>
                      <h4 style={{ margin: 0, color: '#831843', fontSize: '0.9rem' }}>{prod.nombre}</h4>
                      <span style={{ color: '#be185d', fontWeight: 'bold', fontSize: '0.85rem' }}>${prod.precio}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#4b5563' }}>Stock:</label>
                      <input 
                        type="number" 
                        value={prod.stock} 
                        onChange={(e) => cambiarStock(prod.id, e.target.value)}
                        style={{ 
                          width: '50px', 
                          padding: '4px', 
                          borderRadius: '4px', 
                          border: '1px solid #d1d5db', 
                          textAlign: 'center',
                          backgroundColor: '#ffffff',
                          color: '#1f2937'
                        }}
                        min="0"
                      />
                    </div>

                    <button 
                      onClick={() => eliminarProducto(prod.id)}
                      style={{ background: '#dc2626', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}

export default AgregarProducto;