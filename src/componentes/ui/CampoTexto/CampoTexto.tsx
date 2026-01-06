import React from 'react';


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
        <div className={`flex flex-col gap-1.5 w-full ${className}`}>
            {etiqueta && (
                <label htmlFor={inputId} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {etiqueta}
                </label>
            )}

            <input
                id={inputId}
                className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${error ? 'border-destructive' : ''}`}
                {...props}
            />

            {error && <span className="text-xs text-destructive">{error}</span>}
        </div>
    );
};
