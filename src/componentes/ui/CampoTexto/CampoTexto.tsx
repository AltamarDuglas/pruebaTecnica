import React from 'react';
import estilos from './CampoTexto.module.css';

interface PropsCampoTexto extends React.InputHTMLAttributes<HTMLInputElement> {
    etiqueta?: string; // label -> etiqueta
    error?: string; // error message
}

/**
 * Componente de entrada de texto reutilizable.
 * Incluye etiqueta opcional y manejo de estados de error.
 */
export const CampoTexto: React.FC<PropsCampoTexto> = ({
    etiqueta,
    error,
    className = '',
    id,
    ...props
}) => {
    // Generamos un ID aleatorio si no se provee uno, para accesibilidad etiqueta-input
    const inputId = id || React.useId();

    return (
        <div className={`${estilos.contenedor} ${className}`}>
            {etiqueta && (
                <label htmlFor={inputId} className={estilos.etiqueta}>
                    {etiqueta}
                </label>
            )}

            <input
                id={inputId}
                className={`${estilos.input} ${error ? estilos.errorInput : ''}`}
                {...props}
            />

            {error && <span className={estilos.mensajeError}>{error}</span>}
        </div>
    );
};
