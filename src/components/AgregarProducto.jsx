{/* Nombre del Producto */}
<input
  type="text"
  id="name"
  name="name"
  placeholder="Ej: Amigurumi Osito"
  value={formData.name}
  onChange={handleChange}
  required
  autoComplete="off"
  style={{
    backgroundColor: '#ffffff !important',
    color: '#1f2937 !important',
    WebkitAppearance: 'none',
    appearance: 'none'
  }}
/>

{/* Descripción */}
<textarea
  id="description"
  name="description"
  placeholder="Detalles del tejido, materiales, medidas..."
  value={formData.description}
  onChange={handleChange}
  rows="3"
  style={{ 
    width: '100%', 
    padding: '10px', 
    borderRadius: '8px', 
    border: '1px solid #E2D2C5', 
    resize: 'vertical', 
    fontFamily: 'inherit', 
    backgroundColor: '#ffffff', 
    color: '#1f2937',
    WebkitAppearance: 'none',
    appearance: 'none'
  }}
  required
/>

{/* Precio */}
<input
  type="number"
  id="price"
  name="price"
  placeholder="Ej: 9500"
  step="0.01"
  value={formData.price}
  onChange={handleChange}
  required
  style={{
    backgroundColor: '#ffffff',
    color: '#1f2937',
    WebkitAppearance: 'none',
    appearance: 'none'
  }}
/>

{/* Stock */}
<input
  type="number"
  id="stock"
  name="stock"
  placeholder="Ej: 5"
  value={formData.stock}
  onChange={handleChange}
  required
  style={{
    backgroundColor: '#ffffff',
    color: '#1f2937',
    WebkitAppearance: 'none',
    appearance: 'none'
  }}
/>