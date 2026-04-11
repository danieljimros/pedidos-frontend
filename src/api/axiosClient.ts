import axios from "axios";

// Configuración de Axios para la aplicación
const axiosClient = axios.create({
    // La URL base de la API se obtiene de las variables de entorno, con un valor por defecto.
  baseURL: import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

export default axiosClient;
