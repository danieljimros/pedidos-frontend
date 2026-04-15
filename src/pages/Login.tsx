import { useState, type FormEventHandler } from "react";
import axiosClient from "../api/axiosClient";

type User = {
  id: number;
  name: string;
  email: string;
};

const API_BASE = "http://localhost:8000";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1) Obtener cookie CSRF de Sanctum
      await axiosClient.get("/sanctum/csrf-cookie", { baseURL: API_BASE });

      // 2) Login (Fortify)
      await axiosClient.post(
        "/login",
        { email, password },
        { baseURL: API_BASE }
      );

      // 3) Verificar usuario autenticado
      const response = await axiosClient.get<User>("/api/user", {
        baseURL: API_BASE,
      });

      setUser(response.data);
    } catch (err: unknown) {
      console.error("Error de login:", err);
      setError("Credenciales incorrectas o problema de conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-200 rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>

      {error && <p className="text-red-600 mb-3">{error}</p>}
      {user && (
        <p className="text-green-700 mb-3">
          Sesión iniciada como: {user.name} ({user.email})
        </p>
      )}

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