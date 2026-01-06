import React from 'react';
import estilos from './Selector.module.css';
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
        <div className={`${estilos.contenedor} ${className}`}>
            {etiqueta && (
                <label htmlFor={selectId} className={estilos.etiqueta}>
                    {etiqueta}
                </label>
            )}

            <div className={estilos.wrapperSelect}>
                <select
                    id={selectId}
                    className={`${estilos.select} ${error ? estilos.errorSelect : ''}`}
                    {...props}
                >
                    <option value="" disabled>Selecciona una opción</option>
                    {opciones.map((opcion) => (
                        <option key={opcion.valor} value={opcion.valor}>
                            {opcion.texto}
                        </option>
                    ))}
                </select>
                <ChevronDown size={16} className={estilos.iconoFlecha} />
            </div>

            {error && <span className={estilos.mensajeError}>{error}</span>}
        </div>
    );
};
