import { useState } from "react";
import ServiceCard from "./ServiceCard";
import { createAppointment, getServices } from "../api";

export default function Booking() {
  const [category, setCategory] = useState(null);
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [datetime, setDatetime] = useState("");
  const [message, setMessage] = useState("");

  async function loadServices(type) {
    try {
      const data = await getServices(type);

      setServices(data.services);

      setCategory(type);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await createAppointment({
        type: category,
        service: selected,
        name,
        phone,
        datetime,
      });

      setMessage("Cita agendada con éxito ");

      setSelected(null);
      setCategory(null);
      setServices([]);

      setName("");
      setPhone("");
      setDatetime("");
    } catch (err) {
      setMessage(err.message || "Error");
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* SELECCIÓN DE TIPO DE SERVICIO */}

      {!category && (
        <div>
          <h3 className="text-2xl font-bold text-center mb-8 text-white">
            Elige un tipo de servicio
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div
              onClick={() => loadServices("basic")}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl cursor-pointer"
            >
              <h4 className="text-xl font-bold mb-2">Servicio Basic</h4>

              <p className="text-gray-600">
                Servicios tradicionales de barbería como corte y barba con
                atención clásica.
              </p>
            </div>

            <div
              onClick={() => loadServices("premium")}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl cursor-pointer"
            >
              <h4 className="text-xl font-bold mb-2">Servicio Premium</h4>

              <p className="text-gray-600">
                Experiencia premium con técnicas avanzadas, mayor detalle y
                acabado profesional.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SERVICIOS DINÁMICOS */}

      {category && !selected && (
        <div>
          <h3 className="text-2xl font-bold text-center mb-6 text-white">
            Selecciona un servicio
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s) => (
              <ServiceCard
                key={s.service}
                service={`${s.service} ${category === "premium" ? "Premium" : ""}`}
                price={s.price}
                onSelect={() => setSelected(s.service)}
              />
            ))}
          </div>
        </div>
      )}

      {/* FORMULARIO */}

      {selected && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-6 mt-10 max-w-md mx-auto space-y-4"
        >
          <h4 className="text-xl font-semibold text-center">
            Reservando: {selected}
          </h4>

          <input
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Celular"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <div>
            <label className="text-sm text-gray-600">Fecha y hora</label>

            <input
              type="datetime-local"
              className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-black"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              required
            />
          </div>

          <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
            Confirmar cita
          </button>
        </form>
      )}

      {/* MENSAJE */}

      {message && (
        <p className="text-center text-green-600 mt-6 font-medium">{message}</p>
      )}
    </div>
  );
}
