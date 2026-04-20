// Componente de botón reutilizable con estilos y variantes
interface ButtonProps {
  onClick: () => void;
  label: string;
  variant?: "secundary" | "primary";
}
// Renderiza un botón con estilos basados en la variante, ejecutando la función onClick al hacer clic
export default function Button({
  onClick,
  label,
  variant = "primary",
}: ButtonProps) {
  const styles = {
    secundary: "bg-red-500 text-white hover:bg-red-700",
    primary: "bg-blue-500 text-white hover:bg-blue-700",
  };

  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded ${styles[variant]}`}
    >
      {label}
    </button>
  );
}
