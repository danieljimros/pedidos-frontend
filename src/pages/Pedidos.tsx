// Página principal para mostrar la lista de pedidos
import PedidosTable from "../components/PedidosTable";
import { usePedidos } from "../hooks/useDeleteRecord";

interface PedidosProps {
    onUnauthorized: () => Promise<void>;
}

// Componente principal que muestra la lista de pedidos
export default function Pedidos({ onUnauthorized }: PedidosProps) {
    const { pedidos, loading, error, deletePedido } = usePedidos(onUnauthorized);

    // Renderizado condicional para mostrar estado de carga, error o la tabla de pedidos
    if (loading) return <div className="p-6">Cargando pedidos...</div>;
    if (error) return <div className="p-6 text-red-600">{error}</div>;
    
    // Renderizamos una tabla con los pedidos obtenidos de la API
    return (
        <div className = "p-6">
            <h1 className = "text-2xl font-bold mb-4">Lista de Pedidos</h1>
            <PedidosTable pedidos={pedidos} onDelete={deletePedido} />
        </div>
    );
}