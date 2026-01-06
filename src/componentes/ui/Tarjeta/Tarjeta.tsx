import React, { ReactNode } from 'react';
import estilos from './Tarjeta.module.css';

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
            className={`${estilos.tarjeta} ${className}`}
            onClick={onClick}
            style={onClick ? { cursor: 'pointer' } : undefined}
        >
            {titulo && (
                <div className={estilos.cabecera}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{titulo}</h3>
                </div>
            )}

            <div className={estilos.cuerpo}>
                {children}
            </div>

            {pie && (
                <div className={estilos.pie}>
                    {pie}
                </div>
            )}
        </div>
    );
};
