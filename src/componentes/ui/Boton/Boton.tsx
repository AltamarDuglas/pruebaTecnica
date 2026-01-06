import React from 'react';
import estilos from './Boton.module.css';
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
    return (
        <button
            className={`${estilos.boton} ${estilos[variante]} ${className}`}
            disabled={disabled || cargando}
            {...props}
        >
            {/* Si está cargando mostramos el spinner girando */}
            {cargando ? (
                <Loader2 className={estilos.cargando} size={18} />
            ) : (
                icono && <span className={estilos.icono}>{icono}</span>
            )}

            {children}
        </button>
    );
};
