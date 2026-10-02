export default function Nav() {
  return (
    <nav className="bg-pink-200 px-6 py-3 flex gap-6 font-medium text-pink-900 shadow-inner">
      <a href="/" className="hover:text-pink-600 transition-colors">Inicio</a>
      <a href="/productos" className="hover:text-pink-600 transition-colors">Productos</a>
      <a href="/carrito" className="hover:text-pink-600 transition-colors ml-auto">🛒 Carrito</a>
    </nav>
  );
}