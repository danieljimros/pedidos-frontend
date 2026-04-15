// components/PedidosTable.tsx
export interface Pedido {
  id: number;
  cliente: string;
  producto: string;
  cantidad: number;
  precio: number;
  estado: string;
}

// Componente para mostrar una tabla de pedidos, recibe un array de pedidos como prop
interface PedidosTableProps {
  pedidos: Pedido[];
}

// Renderiza una tabla con los datos de los pedidos, mostrando cada campo en una columna
export default function PedidosTable({ pedidos }: PedidosTableProps) {
  return (
    <table className="w-full border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-200 px-4 py-2">ID</th>
          <th className="border border-gray-200 px-4 py-2">Cliente</th>
          <th className="border border-gray-200 px-4 py-2">Producto</th>
          <th className="border border-gray-200 px-4 py-2">Cantidad</th>
          <th className="border border-gray-200 px-4 py-2">Precio</th>
          <th className="border border-gray-200 px-4 py-2">Estado</th>
        </tr>
      </thead>

      <tbody>
        {pedidos.map((pedido) => (
          <tr key={pedido.id} className="hover:bg-gray-50">
            <td className="border border-gray-200 px-4 py-2">{pedido.id}</td>
            <td className="border border-gray-200 px-4 py-2">{pedido.cliente}</td>
            <td className="border border-gray-200 px-4 py-2">{pedido.producto}</td>
            <td className="border border-gray-200 px-4 py-2">{pedido.cantidad}</td>
            <td className="border border-gray-200 px-4 py-2">{Number(pedido.precio).toFixed(2)} €</td>
            <td className="border border-gray-200 px-4 py-2">{pedido.estado}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
