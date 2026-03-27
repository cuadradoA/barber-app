import { useEffect, useState } from "react";
import { getDashboardAppointments, getStats } from "../api";

export default function Dashboard({ token }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const [appointments, setAppointments] = useState([]);

  const [stats, setStats] = useState({
    dailyIncome: 0,
    monthlyIncome: 0,
    yearlyIncome: 0,
    count: 0,
  });

  // cerrar sesión
  function logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  useEffect(() => {
    if (!token) return;

    async function load() {
      const res = await getDashboardAppointments(date, token);

      setAppointments(res.appointments || []);

      const st = await getStats(date, token);

      setStats(st);
    }

    load();
  }, [date, token]);

  if (!token) {
    return <p className="text-center mt-10">No autorizado</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}

      <div className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Panel del Barbero 💈</h1>

          <div className="flex items-center gap-3">
            <label className="font-medium">Fecha:</label>

            <input
              type="date"
              className="border rounded-lg p-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Cerrar sesión
        </button>
      </div>

      {/* TARJETAS DE ESTADÍSTICAS */}

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500 text-sm">Citas del día</h3>

          <p className="text-3xl font-bold">{stats.count}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500 text-sm">Ingresos del día</h3>

          <p className="text-3xl font-bold">{stats.dailyIncome} COP</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500 text-sm">Ingresos del mes</h3>

          <p className="text-3xl font-bold">{stats.monthlyIncome} COP</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500 text-sm">Ingresos del año</h3>

          <p className="text-3xl font-bold">{stats.yearlyIncome} COP</p>
        </div>
      </div>

      {/* TABLA DE CITAS */}

      <div className="max-w-6xl mx-auto bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Citas</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b text-gray-600">
              <tr>
                <th className="py-2">Hora</th>
                <th>Cliente</th>
                <th>Servicio</th>
                <th>Precio</th>
                <th>Teléfono</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((a) => (
                <tr key={a.id} className="border-b hover:bg-gray-50">
                  <td className="py-2">
                    {new Date(a.datetime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>

                  <td>{a.name}</td>

                  <td>{a.service}</td>

                  <td>{a.price} COP</td>

                  <td>{a.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
