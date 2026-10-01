import { useState, useEffect } from 'react';
import Item from '../components/Item';

export default function ItemListContainer({ greeting }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos la llamada a una API consumiendo nuestro JSON local
    // (Nota: Si colocas el archivo en la carpeta public puedes hacer fetch('/productos.json'))
    fetch('/src/data/productos.json')
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los productos:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-pink-900 mb-6 text-center">{greeting}</h2>
      
      {loading ? (
        <p className="text-center text-pink-600">Cargando ovillos y creaciones...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productos.map((prod) => (
            <Item key={prod.id} producto={prod} />
          ))}
        </div>
      )}
    </div>
  );
}