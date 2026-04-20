// Este componente principal `App` es el punto de entrada de la aplicación React. Gestiona la autenticación del usuario, muestra un encabezado con información de sesión y define las rutas para las páginas de inicio de sesión y pedidos. Además, incluye un `ErrorBoundary` para capturar y mostrar errores en la aplicación.
import { Component, type ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Pedidos from "./pages/Pedidos";
import { useAuth } from "./hooks/useAuth";
import Button from "./components/Button";

// El componente `ErrorBoundary` es una clase que extiende `Component` y se utiliza para capturar errores en la aplicación. Si ocurre un error, muestra un mensaje de error en lugar de la interfaz normal.
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

// El componente `App` utiliza el hook `useAuth` para gestionar la autenticación del usuario. Dependiendo del estado de autenticación, muestra diferentes rutas y opciones en la interfaz.
export default function App() {
  const { user, checkingSession, login, logout } = useAuth();

  if (checkingSession) {
    return <div className="p-10">Comprobando sesión...</div>;
  }

  return (
    <div className="p-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-blue-600">
            Dashboard de Pedidos
          </h1>
          {user && (
            <p className="mt-2 text-sm text-gray-600">
              Sesión iniciada como {user.name} ({user.email})
            </p>
          )}
        </div>

        {user && (
          <Button
            type="button"
            onClick={() => void logout()}
            variant="secondary"
            className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white"
          >
            Cerrar sesión
          </Button>
        )}
      </div>

      <ErrorBoundary>
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/pedidos" replace /> : <Login onLogin={login} />}
          />
          <Route
            path="/pedidos"
            element={user ? <Pedidos onUnauthorized={logout} /> : <Navigate to="/login" replace />}
          />
          <Route
            path="*"
            element={<Navigate to={user ? "/pedidos" : "/login"} replace />}
          />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}
