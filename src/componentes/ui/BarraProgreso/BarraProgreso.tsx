import React from 'react';
import estilos from './BarraProgreso.module.css';

interface PropsBarraProgreso {
    progreso: number; // value (0-100) -> progreso
    etiqueta?: string; // label -> etiqueta
    mostrarPorcentaje?: boolean; // showPercentage -> mostrarPorcentaje
}

/**
 * Componente simple de barra de progreso.
 */
export const BarraProgreso: React.FC<PropsBarraProgreso> = ({
    progreso,
    etiqueta,
    mostrarPorcentaje = false
}) => {
    // Asegurar que esté entre 0 y 100
    const valorSeguro = Math.min(100, Math.max(0, progreso));

    return (
        <div className={estilos.contenedor}>
            {(etiqueta || mostrarPorcentaje) && (
                <div className={estilos.etiqueta}>
                    {etiqueta && <span>{etiqueta}</span>}
                    {mostrarPorcentaje && <span>{Math.round(valorSeguro)}%</span>}
                </div>
            )}
            <div className={estilos.track}>
                <div
                    className={estilos.barra}
                    style={{ width: `${valorSeguro}%` }}
                />
            </div>
        </div>
    );
};
