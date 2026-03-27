import { useState } from "react";
import { login } from "../api";
import fondo from "../assets/fondo.jpg";

export default function Login({ onLoginSuccess, onBackHome }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const { token } = await login(user, pass);
      localStorage.setItem("token", token);
      onLoginSuccess(token);
    } catch (err) {
      setMsg(err.message || "Error");
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center">

      {/* Fondo */}
      <img
        src={fondo}
        className="absolute w-full h-full object-cover"
      />

      {/* Filtro oscuro */}
      <div className="absolute w-full h-full bg-black/60"></div>

      {/* Contenido */}
      <div className="relative z-10 bg-white p-8 rounded-xl shadow-xl w-full max-w-sm">

        <h2 className="text-2xl font-bold text-center mb-6">
          Panel del Barbero 💈
        </h2>

        <form onSubmit={submit} className="space-y-4">

          <input
            className="w-full border rounded-lg p-2"
            placeholder="Usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full border rounded-lg p-2"
            placeholder="Contraseña"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
          >
            Iniciar sesión
          </button>

        </form>

        {/* BOTÓN VOLVER */}
        <button
          type="button"
          onClick={onBackHome}
          className="w-full mt-4 border border-gray-400 py-2 rounded-lg hover:bg-gray-100"
        >
          Volver al inicio
        </button>

        {msg && (
          <p className="text-red-500 text-center mt-4">
            {msg}
          </p>
        )}

      </div>

    </div>
  );
}