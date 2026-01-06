import React from 'react';

import { Loader2 } from 'lucide-react';

/**
 * Props para el componente Botón.
 * Extendemos de ButtonHTMLAttributes para heredar propiedades estándar (onClick, disabled, etc.)
 */
interface PropsBoton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variante?: 'primario' | 'secundario' | 'peligro' | 'fantasma'; // variant -> variante
    tamano?: 'sm' | 'md' | 'lg'; // size -> tamano
    cargando?: boolean; // isLoading -> cargando
    icono?: React.ReactNode; // icon -> icono
}

/**
 * Componente de Botón reutilizable con soporte para estados de carga e iconos.
 */
export const Boton: React.FC<PropsBoton> = ({
    children,
    variante = 'primario',
    cargando = false,
    icono,
    className = '',
    disabled,
    ...props
}) => {
    // Mapeo de variantes a clases de Tailwind
    const variantClasses = {
        primario: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        secundario: "bg-background border border-input shadow-sm hover:bg-accent hover:text-accent-foreground",
        peligro: "bg-red-100 text-destructive border-transparent hover:bg-red-200", // Adaptado para coincidir con colores de Tailwind
        fantasma: "hover:bg-accent hover:text-accent-foreground"
    };

    const baseClasses = "inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 rounded-md";

    return (
        <button
            className={`group ${baseClasses} ${variantClasses[variante]} ${className}`}
            disabled={disabled || cargando}
            {...props}
        >
            {/* Si está cargando mostramos el spinner girando */}
            {cargando ? (
                <Loader2 className="animate-spin" size={18} />
            ) : (
                icono && <span className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110">{icono}</span>
            )}

            {children}
        </button>
    );
};
