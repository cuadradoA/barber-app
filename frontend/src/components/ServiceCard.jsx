export default function ServiceCard({ service, price, onSelect }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
      <h3 className="text-xl font-semibold mb-2">{service}</h3>

      <p className="text-gray-500 mb-4">{price} COP</p>

      <button
        onClick={() => onSelect(service)}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
      >
        Seleccionar
      </button>
    </div>
  );
}
