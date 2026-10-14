// En src/components/Login.jsx

// Para el input de Correo electrónico:
<input 
  type="email" 
  placeholder="tu@correo.com" 
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  style={{ 
    width: '100%', 
    padding: '0.7rem', 
    borderRadius: '6px', 
    border: '1px solid #d1d5db', 
    boxSizing: 'border-box', 
    outline: 'none',
    backgroundColor: '#ffffff', // Fuerza fondo blanco en móviles
    color: '#1f2937',           // Fuerza texto oscuro
    WebkitAppearance: 'none',   // Evita el estilo por defecto de Android/iOS
    appearance: 'none'
  }}
/>

// Para el input de Contraseña:
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
    outline: 'none',
    backgroundColor: '#ffffff', // Fuerza fondo blanco en móviles
    color: '#1f2937',           // Fuerza texto oscuro
    WebkitAppearance: 'none',   // Evita el estilo por defecto de Android/iOS
    appearance: 'none'
  }}
/>