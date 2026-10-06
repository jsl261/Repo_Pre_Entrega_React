import React, { useState } from 'react';
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  // Función para subir la imagen a la API de ImgBB
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
      return datos.data.url; // Retorna la URL pública directa de ImgBB
    } else {
      throw new Error(datos.error?.message || 'Error al subir la imagen a ImgBB');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('Subiendo imagen a ImgBB...');

    try {
      // 1. Subimos la imagen seleccionada a la API de ImgBB
      const urlImagenServidor = await subirImagenAImgBB(formData.image);

      // 2. Creamos el objeto final generando un ID automático único basado en el tiempo
      const productoFinal = {
        id: Date.now().toString(),
        nombre: formData.name,
        descripcion: formData.description,
        precio: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        img: urlImagenServidor,
        favorito: false
      };

      // Guardamos en localStorage
      const productosGuardados = JSON.parse(localStorage.getItem('productos_personalizados') || '[]');
      localStorage.setItem('productos_personalizados', JSON.stringify([...productosGuardados, productoFinal]));

      setMensaje(`¡El producto "${formData.name}" se guardó correctamente! 🎉`);
      
      // Limpiar formulario después de guardar
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        image: null
      });

      // Limpiar visualmente el input de archivo
      const fileInput = document.getElementById('image');
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error(error);
      setMensaje(`❌ Error: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };

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