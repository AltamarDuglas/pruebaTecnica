import React from 'react';

import { ChevronDown } from 'lucide-react';

interface Opcion {
    valor: string;
    texto: string;
}

interface PropsSelector extends React.SelectHTMLAttributes<HTMLSelectElement> {
    etiqueta?: string;
    error?: string;
    opciones: Opcion[]; // options -> opciones
}

/**
 * Componente Select estilizado.
 * Reemplaza el select nativo feo con uno consistente con el diseño.
 */
export const Selector: React.FC<PropsSelector> = ({
    etiqueta,
    error,
    opciones,
    className = '',
    id,
    ...props
}) => {
    const selectId = id || React.useId();

    return (
        <div className={`flex flex-col gap-1.5 w-full ${className}`}>
            {etiqueta && (
                <label htmlFor={selectId} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {etiqueta}
                </label>
            )}

            <div className="relative flex items-center">
                <select
                    id={selectId}
                    className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-colors ${error ? 'border-destructive' : ''}`}
                    {...props}
                >
                    <option value="" disabled>Selecciona una opción</option>
                    {opciones.map((opcion) => (
                        <option key={opcion.valor} value={opcion.valor}>
                            {opcion.texto}
                        </option>
                    ))}
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>

            {error && <span className="text-xs text-destructive">{error}</span>}
        </div>
    );
};
