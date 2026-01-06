import React from 'react';


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
        <div className="flex flex-col gap-1 w-full text-sm">
            {(etiqueta || mostrarPorcentaje) && (
                <div className="flex justify-between items-center mb-1 text-muted-foreground font-medium text-xs">
                    {etiqueta && <span>{etiqueta}</span>}
                    {mostrarPorcentaje && <span>{Math.round(valorSeguro)}%</span>}
                </div>
            )}
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div
                    className="h-full bg-primary transition-all duration-300 ease-in-out"
                    style={{ width: `${valorSeguro}%` }}
                />
            </div>
        </div>
    );
};
