import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  className,
  ...rest
}: ButtonProps) {
  const styles = {
    primary: "bg-blue-500 text-white hover:bg-blue-700",
    secondary: "bg-gray-700 text-white hover:bg-gray-900",
    danger: "bg-red-500 text-white hover:bg-red-700",
  };

  return (
    <button
      className={`px-3 py-1 rounded ${styles[variant]} ${className ?? ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}
