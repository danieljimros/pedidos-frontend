// Este hook personalizado `useAuth` se encarga de gestionar la autenticación del usuario en la aplicación React. Proporciona el estado del usuario autenticado, un indicador de si se está verificando la sesión, y funciones para iniciar sesión y cerrar sesión.
import { useEffect, useState } from "react";
import {
  fetchCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
  type User,
} from "../api/auth";

// El hook `useAuth` devuelve un objeto con el usuario autenticado, un indicador de verificación de sesión, y funciones para iniciar y cerrar sesión.
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  // Al montar el componente, se intenta obtener el usuario actual para verificar si hay una sesión activa. Si se obtiene un usuario, se establece en el estado; si no, se establece como null. Finalmente, se indica que la verificación de sesión ha terminado.
  useEffect(() => {
    fetchCurrentUser()
      .then((currentUser) => {
        setUser(currentUser);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setCheckingSession(false);
      });
  }, []);

  const login = async (email: string, password: string) => {
    // La función `login` intenta autenticar al usuario con las credenciales proporcionadas. Si la autenticación es exitosa, se establece el usuario en el estado y se devuelve el usuario autenticado.
    const authenticatedUser = await loginRequest(email, password);
    setUser(authenticatedUser);
    return authenticatedUser;
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } finally {
      setUser(null);
    }
  };

  return {
    user,
    checkingSession,
    login,
    logout,
  };
}