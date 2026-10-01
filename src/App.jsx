import { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

// ==========================================
// ESTILOS CSS INCRUSTADOS (Para asegurar que se vea perfecto)
// ==========================================
const estilosCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Quicksand', sans-serif;
  }

  body {
    background: linear-gradient(135deg, #fce7f3 0%, #fae8ff 50%, #fdf2f8 100%);
    color: #4a5568;
    min-height: 100vh;
  }

  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Header */
  .main-header {
    background: linear-gradient(135deg, #86198f 0%, #be185d 50%, #9f1239 100%);
    color: white;
    padding: 2.5rem 2rem;
    text-align: center;
    box-shadow: 0 4px 20px rgba(190, 24, 93, 0.25);
  }

  .main-header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 0.5rem;
  }

  .main-header p {
    font-size: 1.1rem;
    font-style: italic;
    color: #fbcfe8;
  }

  /* Barra de Navegación */
  .main-nav {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-bottom: 2px solid #fbcfe8;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .nav-links a {
    text-decoration: none;
    color: #701a75;
    font-weight: 600;
    font-size: 1.05rem;
    transition: color 0.2s;
  }

  .nav-links a:hover {
    color: #db2777;
  }

  /* Buscador */
  .search-form {
    display: flex;
    background: #fdf2f8;
    border: 2px solid #f472b6;
    border-radius: 50px;
    padding: 0.5rem 1rem;
    width: 320px;
    align-items: center;
  }

  .search-form input {
    border: none;
    background: transparent;
    outline: none;
    width: 100%;
    font-size: 0.95rem;
    color: #4a5568;
  }

  .search-form button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.1rem;
  }

  /* Widgets de Carrito y Favoritos */
  .widgets-container {
    display: flex;
    gap: 1rem;
  }

  .widget-btn {
    text-decoration: none;
    background: #fdf2f8;
    border: 2px solid #f472b6;
    color: #831843;
    padding: 0.6rem 1.2rem;
    border-radius: 50px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
    position: relative;
  }

  .widget-btn.cart {
    background: linear-gradient(135deg, #d946ef 0%, #db2777 100%);
    color: white;
    border: none;
  }

  .widget-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(219, 39, 119, 0.2);
  }

  .badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #e11d48;
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }

  /* Contenido Principal */
  .main-content {
    flex-grow: 1;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 2.5rem 2rem;
  }

  /* Grid de Productos */
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  .product-card {
    background: white;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(219, 39, 119, 0.08);
    border: 2px solid #fbcfe8;
    transition: transform 0.3s, box-shadow 0.3s;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(219, 39, 119, 0.15);
  }

  .product-img-container {
    height: 220px;
    width: 100%;
    overflow: hidden;
    background: #fdf2f8;
  }

  .product-img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }

  .product-card:hover .product-img-container img {
    transform: scale(1.05);
  }

  .product-info {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .product-cat {
    font-size: 0.75rem;
    font-weight: 700;
    color: #db2777;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.5rem;
  }

  .product-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .product-desc {
    font-size: 0.9rem;
    color: #6b7280;
    margin-bottom: 1.5rem;
    line-height: 1.5;
    flex-grow: 1;
  }

  .product-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #fce7f3;
    padding-top: 1rem;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 800;
    color: #be185d;
  }

  .btn-primary {
    background: linear-gradient(135deg, #d946ef 0%, #be185d 100%);
    color: white;
    border: none;
    padding: 0.7rem 1.2rem;
    border-radius: 14px;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: opacity 0.2s;
    box-shadow: 0 4px 10px rgba(190, 24, 93, 0.2);
  }

  .btn-primary:hover {
    opacity: 0.9;
  }

  /* Fav Button */
  .fav-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: white;
    border: 2px solid #fbcfe8;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    z-index: 10;
    transition: transform 0.2s;
  }

  .fav-btn:hover {
    transform: scale(1.1);
  }

  /* Hero Banner */
  .hero-banner {
    background: linear-gradient(135deg, #ffffff 0%, #fdf2f8 100%);
    border: 2px solid #fbcfe8;
    border-radius: 32px;
    padding: 4rem 2rem;
    text-align: center;
    box-shadow: 0 15px 35px rgba(219, 39, 119, 0.1);
    margin-bottom: 3rem;
  }

  .hero-banner h2 {
    font-size: 3rem;
    font-weight: 800;
    color: #1f2937;
    margin-bottom: 1rem;
  }

  .hero-banner span.highlight {
    color: #be185d;
    border-bottom: 4px solid #fbcfe8;
  }

  .hero-banner p {
    font-size: 1.15rem;
    color: #6b7280;
    max-width: 600px;
    margin: 0 auto 2rem auto;
    line-height: 1.6;
  }

  /* Footer */
  .main-footer {
    background: linear-gradient(135deg, #581c87 0%, #831843 100%);
    color: #fce7f3;
    padding: 3rem 2rem 1.5rem 2rem;
    margin-top: auto;
    border-top: 4px solid #f472b6;
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .footer-bottom {
    max-width: 1200px;
    margin: 0 auto;
    border-top: 1px solid rgba(252, 231, 243, 0.2);
    padding-top: 1.5rem;
    text-align: center;
  }

  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  .team-card {
    background: rgba(131, 24, 67, 0.4);
    border: 1px solid rgba(244, 114, 182, 0.3);
    padding: 1rem;
    border-radius: 16px;
  }
`;

// ==========================================
// 1. CREACIÓN DEL CART CONTEXT (Estado Global)
// ==========================================
const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const addToCart = (producto, cantidad = 1) => {
    const index = cart.findIndex((item) => item.id === producto.id);
    if (index !== -1) {
      const nuevoCarrito = [...cart];
      nuevoCarrito[index].cantidad += cantidad;
      setCart(nuevoCarrito);
    } else {
      setCart([...cart, { ...producto, cantidad }]);
    }
  };

  const clearCart = () => setCart([]);

  const toggleFavorite = (productoId) => {
    if (favorites.includes(productoId)) {
      setFavorites(favorites.filter(id => id !== productoId));
    } else {
      setFavorites([...favorites, productoId]);
    }
  };

  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, favorites, toggleFavorite, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => useContext(CartContext);


// ==========================================
// 2. COMPONENTES DE UI
// ==========================================

function Header() {
  return (
    <header className="main-header">
      <div>
        <h1><span>🧶</span> Rincón del Crochet</h1>
        <p>Piezas artesanales hechas a mano con amor y dedicación</p>
      </div>
    </header>
  );
}

function CartWidget() {
  const { totalItems, favorites } = useCart();

  return (
    <div className="widgets-container">
      <Link to="/favoritos" className="widget-btn" title="Mis Favoritos">
        <span>❤️</span>
        <span>Favoritos</span>
        {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
      </Link>

      <Link to="/carrito" className="widget-btn cart">
        <span>🛒</span>
        <span>Carrito</span>
        {totalItems > 0 && <span className="badge">{totalItems}</span>}
      </Link>
    </div>
  );
}

function Nav() {
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (busqueda.trim()) {
      navigate(`/productos?busqueda=${encodeURIComponent(busqueda)}`);
    }
  };

  return (
    <nav className="main-nav">
      <div className="nav-links">
        <Link to="/">🏠 Inicio</Link>
        <Link to="/productos">🛍️ Catálogo</Link>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <input 
          type="text" 
          placeholder="Buscar amigurumis, mantas..." 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>

      <CartWidget />
    </nav>
  );
}

function Footer() {
  const equipo = [
    { nombre: "Arianna Salazar", rol: "Diseñadora de Patrones", email: "salazarari2908@gmail.com" },
    { nombre: "Jael Guerra", rol: "Tejedora Principal", email: "jael.guerra@gmail.com" },
    { nombre: "Julián Salazar", rol: "Logística y Envíos", email: "salazarlopezjj@gmail.com" }
  ];

  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>🧶 Rincón del Crochet</h3>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#fbcfe8' }}>
            Emprendimiento artesanal dedicado al diseño y confección de piezas únicas tejidas a crochet. Buenos Aires, Argentina.
          </p>
        </div>
        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'white' }}>Contacto y Redes</h4>
          <p style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>📧 contacto@rincondelcrochet.com</p>
          <p style={{ fontSize: '0.95rem' }}>📸 Instagram: @rincon.del.crochet</p>
        </div>
      </div>

      <div className="footer-bottom">
        <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', color: '#fbcfe8' }}>Conoce al equipo detrás de los ovillos</h4>
        <div className="team-grid">
          {equipo.map((persona, index) => (
            <div key={index} className="team-card">
              <h5 style={{ fontWeight: 'bold', color: 'white', fontSize: '1rem' }}>{persona.nombre}</h5>
              <span style={{ fontSize: '0.8rem', color: '#f472b6', display: 'block', margin: '4px 0' }}>{persona.rol}</span>
              <p style={{ fontSize: '0.75rem', color: '#fbcfe8' }}>{persona.email}</p>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

function Layout({ children }) {
  return (
    <div className="app-container">
      <style>{estilosCSS}</style>
      <Header />
      <Nav />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function Item({ producto }) {
  const { favorites, toggleFavorite } = useCart();
  const isFav = favorites.includes(producto.id);

  return (
    <div className="product-card">
      <button className="fav-btn" onClick={() => toggleFavorite(producto.id)}>
        {isFav ? "❤️" : "🤍"}
      </button>

      <div className="product-img-container">
        <img src={producto.imagen} alt={producto.nombre} />
      </div>

      <div className="product-info">
        <span className="product-cat">{producto.categoria}</span>
        <h3 className="product-title">{producto.nombre}</h3>
        <p className="product-desc">{producto.descripcion}</p>
        
        <div className="product-footer">
          <span className="product-price">${producto.precio.toLocaleString()}</span>
          <Link to={`/producto/${producto.id}`} className="btn-primary">
            Ver Detalle
          </Link>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// 3. VISTAS Y PÁGINAS PRINCIPALES
// ==========================================

function HomeView() {
  return (
    <div className="hero-banner">
      <span style={{ background: '#fce7f3', color: '#be185d', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
        ✨ Nueva Colección Artesanal
      </span>
      <h2 style={{ marginTop: '1rem' }}>
        Arte en cada <span className="highlight">Punto</span> 🧶
      </h2>
      <p>
        Explora nuestro catálogo exclusivo de amigurumis, mantas y accesorios tejidos a mano con materiales hipoalergénicos de primera calidad.
      </p>
      <Link to="/productos" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', display: 'inline-block' }}>
        Explorar Catálogo 🛍️
      </Link>
    </div>
  );
}

function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productosMock = [
      { id: 1, nombre: "Amigurumi Osito tierno", precio: 15000, categoria: "amigurumis", imagen: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=500&auto=format&fit=crop", descripcion: "Osito tejido a crochet con hilo 100% algodón e hipoalergénico." },
      { id: 2, nombre: "Manta Nórdica XL", precio: 45000, categoria: "hogar", imagen: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=500&auto=format&fit=crop", descripcion: "Manta tejida a mano ideal para pie de cama o sillón." },
      { id: 3, nombre: "Cartera Boho Chic", precio: 22000, categoria: "accesorios", imagen: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=500&auto=format&fit=crop", descripcion: "Bolso estilo matero o urbano tejido con técnica de red." }
    ];

    setTimeout(() => {
      setProductos(productosMock);
      setLoading(false);
    }, 300);
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: '2rem', fontWeight: '800', textAlign: 'center', marginBottom: '2rem', color: '#1f2937' }}>
        Catálogo de Creaciones
      </h2>
      {loading ? (
        <p style={{ textAlign: 'center', color: '#be185d', fontSize: '1.2rem', padding: '4rem 0', fontWeight: '600' }}>
          Tejiendo y cargando ovillos...
        </p>
      ) : (
        <div className="products-grid">
          {productos.map((prod) => (
            <Item key={prod.id} producto={prod} />
          ))}
        </div>
      )}
    </div>
  );
}

function ItemDetailContainer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, favorites, toggleFavorite } = useCart();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const productosMock = [
      { id: 1, nombre: "Amigurumi Osito tierno", precio: 15000, categoria: "amigurumis", imagen: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=500&auto=format&fit=crop", descripcion: "Osito tejido a crochet con hilo 100% algodón e hipoalergénico." },
      { id: 2, nombre: "Manta Nórdica XL", precio: 45000, categoria: "hogar", imagen: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=500&auto=format&fit=crop", descripcion: "Manta tejida a mano ideal para pie de cama o sillón." },
      { id: 3, nombre: "Cartera Boho Chic", precio: 22000, categoria: "accesorios", imagen: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=500&auto=format&fit=crop", descripcion: "Bolso estilo matero o urbano tejido con técnica de red." }
    ];

    const encontrado = productosMock.find((p) => p.id === parseInt(id));
    setProducto(encontrado);
  }, [id]);

  if (!producto) return <p style={{ textAlign: 'center', padding: '4rem', color: '#be185d' }}>Cargando detalle...</p>;

  const isFav = favorites.includes(producto.id);

  const handleAddToCart = () => {
    addToCart(producto, cantidad);
    navigate('/carrito');
  };

  return (
    <div style={{ background: 'white', borderRadius: '32px', padding: '3rem', border: '2px solid #fbcfe8', boxShadow: '0 20px 40px rgba(219,39,119,0.1)', display: 'flex', gap: '3rem', position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
      <button className="fav-btn" onClick={() => toggleFavorite(producto.id)} style={{ top: '2rem', right: '2rem' }}>
        {isFav ? "❤️" : "🤍"}
      </button>
      <img src={producto.imagen} alt={producto.nombre} style={{ width: '45%', height: '350px', objectFit: 'cover', borderRadius: '20px', border: '2px solid #fbcfe8' }} />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '55%' }}>
        <div>
          <span className="product-cat">{producto.categoria}</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#1f2937', margin: '0.5rem 0 1rem 0' }}>{producto.nombre}</h2>
          <p style={{ color: '#6b7280', lineHeight: '1.6' }}>{producto.descripcion}</p>
        </div>
        <div>
          <span style={{ fontSize: '2.5rem', fontWeight: '800', color: '#be185d', display: 'block', margin: '1.5rem 0' }}>
            ${producto.precio.toLocaleString()}
          </span>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', border: '2px solid #f472b6', borderRadius: '12px', overflow: 'hidden' }}>
              <button onClick={() => setCantidad(c => Math.max(1, c - 1))} style={{ padding: '0.5rem 1rem', background: '#fdf2f8', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
              <span style={{ padding: '0.5rem 1.5rem', fontWeight: 'bold' }}>{cantidad}</span>
              <button onClick={() => setCantidad(c => c + 1)} style={{ padding: '0.5rem 1.5rem', background: '#fdf2f8', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
            </div>
            <button onClick={handleAddToCart} className="btn-primary" style={{ flexGrow: 1, padding: '0.9rem', fontSize: '1rem', textAlign: 'center' }}>
              Agregar al Carrito 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FavoritesView() {
  const { favorites } = useCart();
  const productosMock = [
    { id: 1, nombre: "Amigurumi Osito tierno", precio: 15000, categoria: "amigurumis", imagen: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=500&auto=format&fit=crop", descripcion: "Osito tejido a crochet con hilo 100% algodón e hipoalergénico." },
    { id: 2, nombre: "Manta Nórdica XL", precio: 45000, categoria: "hogar", imagen: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=500&auto=format&fit=crop", descripcion: "Manta tejida a mano ideal para pie de cama o sillón." },
    { id: 3, nombre: "Cartera Boho Chic", precio: 22000, categoria: "accesorios", imagen: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=500&auto=format&fit=crop", descripcion: "Bolso estilo matero o urbano tejido con técnica de red." }
  ];

  const productosFavoritos = productosMock.filter(p => favorites.includes(p.id));

  if (productosFavoritos.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'white', borderRadius: '32px', border: '2px solid #fbcfe8' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1f2937' }}>❤️ Tus Favoritos</h2>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Aún no has marcado ningún producto como favorito.</p>
        <Link to="/productos" className="btn-primary" style={{ padding: '0.8rem 2rem', display: 'inline-block' }}>Explorar Productos</Link>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontSize: '2rem', fontWeight: '800', textAlign: 'center', marginBottom: '2rem', color: '#1f2937' }}>❤️ Mis Productos Favoritos</h2>
      <div className="products-grid">
        {productosFavoritos.map((prod) => <Item key={prod.id} producto={prod} />)}
      </div>
    </div>
  );
}

function CartView() {
  const { cart, clearCart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'white', borderRadius: '32px', border: '2px solid #fbcfe8' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1f2937' }}>🛒 Tu Carrito de Compras</h2>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Aún no has agregado ninguna creación a tu carrito.</p>
        <Link to="/productos" className="btn-primary" style={{ padding: '0.8rem 2rem', display: 'inline-block' }}>Explorar Productos</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '3rem', borderRadius: '32px', border: '2px solid #fbcfe8', boxShadow: '0 20px 40px rgba(219,39,119,0.1)' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem', color: '#1f2937' }}>🛒 Detalle de tu Carrito</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
        {cart.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #fce7f3', paddingBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <img src={item.imagen} alt={item.nombre} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '16px' }} />
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1f2937' }}>{item.nombre}</h4>
                <p style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '4px' }}>Cantidad: <span style={{ color: '#be185d', fontWeight: 'bold' }}>{item.cantidad}</span></p>
              </div>
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#be185d' }}>${(item.precio * item.cantidad).toLocaleString()}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #fbcfe8', paddingTop: '2rem' }}>
        <button onClick={clearCart} style={{ background: 'none', border: 'none', color: '#e11d48', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>
          🗑️ Vaciar Carrito
        </button>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '1.4rem', fontWeight: 'bold', display: 'block', marginBottom: '1rem', color: '#1f2937' }}>
            Total: <span style={{ color: '#be185d', fontWeight: '800' }}>${totalPrice.toLocaleString()}</span>
          </span>
          <button className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            Finalizar Compra ✨
          </button>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// 4. APP PRINCIPAL
// ==========================================
export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/productos" element={<ItemListContainer />} />
            <Route path="/producto/:id" element={<ItemDetailContainer />} />
            <Route path="/favoritos" element={<FavoritesView />} />
            <Route path="/carrito" element={<CartView />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}