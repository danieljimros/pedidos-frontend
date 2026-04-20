// pages/Login.tsx
import { useState, type FormEventHandler } from "react";
import type { User } from "../api/auth";

// Props para el componente de Login, incluyendo la función de login que se espera recibir
interface LoginProps {
  onLogin: (email: string, password: string) => Promise<User>;
}

// Componente de Login que maneja el estado del formulario y la lógica de autenticación
export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Intentamos hacer login con las credenciales proporcionadas, manejando errores y estado de carga
    try {
      await onLogin(email, password);
    } catch (err: unknown) {
      console.error("Error de login:", err);
      setError("Credenciales incorrectas o problema de conexión.");
    } finally {
      setLoading(false);
    }
  };

  // Renderizamos un formulario de login con campos para email y contraseña, mostrando mensajes de error y estado de carga
  return (
    <div className="max-w-md mx-auto p-6 border border-gray-200 rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Contraseña</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}