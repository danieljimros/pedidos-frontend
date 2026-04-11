/// <reference types="vite/client" />

// Definición de tipos para las variables de entorno utilizadas en la aplicación
interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}

// Extensión de la interfaz ImportMeta para incluir las variables de entorno
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
