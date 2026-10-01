export default function Item({ producto }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-pink-100 flex flex-col justify-between">
      <img src={producto.imagen} alt={producto.nombre} className="h-48 w-full object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-pink-900 mb-1">{producto.nombre}</h3>
        <p className="text-gray-600 text-sm mb-3 flex-grow">{producto.descripcion}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-pink-700 font-bold text-lg">${producto.precio}</span>
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer">
            Ver Detalle
          </button>
        </div>
      </div>
    </div>
  );
}