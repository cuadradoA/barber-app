import Booking from "../components/Booking";
import fondo from "../assets/fondo.jpg";

export default function Home({ onShowLogin }) {
  return (
    <div className="min-h-screen relative">
      {/* IMAGEN DE FONDO */}
      <img
        src={fondo}
        className="absolute inset-0 w-full h-full object-cover"
        alt="fondo barbería"
      />

      {/* FILTRO OSCURO */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* CONTENIDO */}
      <div className="relative z-10">
        {/* NAVBAR */}
        <header className="w-full bg-black text-white shadow">
          <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
            <h1 className="text-xl font-bold">Barber Studio</h1>

            <button
              onClick={onShowLogin}
              className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Iniciar sesión
            </button>
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL */}
        <main className="max-w-6xl mx-auto p-6">
          <div className="text-center mb-10 text-white">
            <h2 className="text-4xl font-bold mb-3">Agenda tu cita</h2>

            <p className="text-gray-200">Reserva tu servicio en segundos</p>
          </div>

          {/* COMPONENTE BOOKING */}
          <Booking />
        </main>
      </div>
    </div>
  );
}
