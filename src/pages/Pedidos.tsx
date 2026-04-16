// Página principal para mostrar la lista de pedidos

// Importamos los hooks de React y el cliente de Axios configurado para la API 
import axios from "axios";
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import PedidosTable, { type Pedido } from "../components/PedidosTable";

// Datos tipados con Typescript para representar un pedido
// Tipos para la respuesta de la API, incluyendo paginación
interface ApiSuccessResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

interface PaginatedData<T> {
    data: T[];
}

interface PedidosProps {
    onUnauthorized: () => Promise<void>;
}

// Componente principal que muestra la lista de pedidos
export default function Pedidos({ onUnauthorized }: PedidosProps) {
    // Estado para almacenar la lista de pedidos, carga y error
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // useEffect para cargar los pedidos desde la API al montar el componente
    useEffect(() => {
        axiosClient.get<ApiSuccessResponse<PaginatedData<Pedido>>>("/pedidos")
            .then((response) => {
                setPedidos(response.data.data?.data ?? []);
                setLoading(false);
            })
            .catch(async (err) => {
                if (axios.isAxiosError(err) && err.response?.status === 401) {
                    await onUnauthorized();
                    return;
                }

                console.error("Error al cargar los pedidos:", err);
                setError("No se pudieron cargar los pedidos. Revisa que el servidor esté activo.");
                setLoading(false);
            });
    }, [onUnauthorized]);

    // Renderizado condicional para mostrar estado de carga, error o la tabla de pedidos
    if (loading) return <div className="p-6">Cargando pedidos...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;
    
    // Renderizamos una tabla con los pedidos obtenidos de la API
    return (
        <div className = "p-6">
            <h1 className = "text-2xl font-bold mb-4">Lista de Pedidos</h1>
            <PedidosTable pedidos={pedidos} />
        </div>
    );
}