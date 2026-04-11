import { Component, type ReactNode } from "react";
import Pedidos from "./pages/Pedidos";

// Componente para manejar errores en la aplicación y mostrar un mensaje amigable
class ErrorBoundary extends Component<{ children: ReactNode }, { error: string | null }> {
  state = { error: null };
  static getDerivedStateFromError(e: Error) {
    return { error: e.message };
  }
  render() {
    if (this.state.error) {
      return <div className="p-6 text-red-600">Error en la aplicación: {this.state.error}</div>;
    }
    return this.props.children;
  }
}

// Componente principal de la aplicación que muestra el dashboard de pedidos
export default function App() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Dashboard de Pedidos
      </h1>
      <ErrorBoundary>
        <Pedidos />
      </ErrorBoundary>
    </div>
  );
}
