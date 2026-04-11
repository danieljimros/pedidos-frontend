// Página principal para mostrar la lista de pedidos

// Importamos los hooks de React y el cliente de Axios configurado para la API 
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

// Datos tipados con Typescript para representar un pedido
interface Pedido {
  id: number;
  cliente: string;
  producto: string;
  cantidad: number;
  precio: number;
  estado: string;
}

interface ApiSuccessResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

interface PaginatedData<T> {
    data: T[];
}

export default function Pedidos() {
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
            .catch((err) => {
                console.error("Error al cargar los pedidos:", err);
                setError("No se pudieron cargar los pedidos. Revisa que el servidor esté activo.");
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="p-6">Cargando pedidos...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;
    
    return (
        <div className = "p-6">
            <h1 className = "text-2xl font-bold mb-4">Lista de Pedidos</h1>

            {/* Tabla para mostrar los pedidos */}
            <table className = "w-full border border-gray-200">
                <thead>
                    <tr className = "bg-gray-100">
                        <th className = "border border-gray-200 px-4 py-2">ID</th>
                        <th className = "border border-gray-200 px-4 py-2">Cliente</th>
                        <th className = "border border-gray-200 px-4 py-2">Producto</th>
                        <th className = "border border-gray-200 px-4 py-2">Cantidad</th>
                        <th className = "border border-gray-200 px-4 py-2">Precio</th>
                        <th className = "border border-gray-200 px-4 py-2">Estado</th>
                    </tr>
                </thead>

                <tbody>
                    {pedidos.map((pedido) => (
                        <tr key={pedido.id} className = "hover:bg-gray-50">
                            <td className = "border border-gray-200 px-4 py-2">{pedido.id}</td>
                            <td className = "border border-gray-200 px-4 py-2">{pedido.cliente}</td>
                            <td className = "border border-gray-200 px-4 py-2">{pedido.producto}</td>
                            <td className = "border border-gray-200 px-4 py-2">{pedido.cantidad}</td>
                            <td className = "border border-gray-200 px-4 py-2">${Number(pedido.precio).toFixed(2)}</td>
                            <td className = "border border-gray-200 px-4 py-2">{pedido.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}