import React, { ReactNode } from 'react';


interface PropsTarjeta {
    titulo?: string; // title -> titulo
    children: ReactNode;
    pie?: ReactNode; // footer -> pie
    className?: string;
    onClick?: () => void;
}

/**
 * Componente Tarjeta (Card) para contenedores de contenido.
 * Soporta cabecera, cuerpo y pie.
 */
export const Tarjeta: React.FC<PropsTarjeta> = ({
    titulo,
    children,
    pie,
    className = '',
    onClick
}) => {
    return (
        <div
            className={`bg-surface text-card-foreground border border-border shadow-sm rounded-lg overflow-hidden flex flex-col ${className}`}
            onClick={onClick}
            style={onClick ? { cursor: 'pointer' } : undefined}
        >
            {titulo && (
                <div className="px-6 py-4 border-b border-border bg-muted/10">
                    <h3 className="m-0 text-lg font-semibold">{titulo}</h3>
                </div>
            )}

            <div className="p-6">
                {children}
            </div>

            {pie && (
                <div className="px-6 py-4 border-t border-border bg-muted/10 flex items-center">
                    {pie}
                </div>
            )}
        </div>
    );
};
