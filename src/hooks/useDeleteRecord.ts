// hooks/useDeleteRecord.ts
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import axiosClient from "../api/axiosClient";

// Tipos para la respuesta de la API, incluyendo paginación
export interface Pedido {
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

export function usePedidos(onUnauthorized: () => Promise<void>) {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPedidos = useCallback(async () => {
    // Intentamos cargar los pedidos desde la API, manejando errores y estado de carga
    try {
      setLoading(true);
      const response =
        await axiosClient.get<ApiSuccessResponse<PaginatedData<Pedido>>>("/pedidos");
      setPedidos(response.data.data?.data ?? []);
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        await onUnauthorized();
        return;
      }
      setError("No se pudieron cargar los pedidos.");
    } finally {
      setLoading(false);
    }
  }, [onUnauthorized]);

  const deletePedido = async (id: number) => {
    // Intentamos eliminar un pedido por su ID, manejando errores y estado de carga
    try {
      await axiosClient.delete(`/pedidos/${id}`);
      setPedidos((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        await onUnauthorized();
        return;
      }
      setError("No se pudo eliminar el pedido.");
    }
  };

  useEffect(() => {
    void fetchPedidos();
  }, [fetchPedidos]);

  return { pedidos, loading, error, deletePedido, refetch: fetchPedidos };
}