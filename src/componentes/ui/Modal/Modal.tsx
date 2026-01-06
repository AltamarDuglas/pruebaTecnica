import React, { useEffect } from 'react';
import estilos from './Modal.module.css';
import { X } from 'lucide-react';

interface PropsModal {
    abierto: boolean; // isOpen -> abierto
    alCerrar: () => void; // onClose -> alCerrar
    titulo: string; // title -> titulo
    children: React.ReactNode;
}

/**
 * Componente Modal genérico.
 * Maneja el bloqueo del scroll del body cuando está abierto y cierre con ESC.
 */
export const Modal: React.FC<PropsModal> = ({
    abierto,
    alCerrar,
    titulo,
    children
}) => {
    // Bloquear scroll del body cuando el modal está abierto
    useEffect(() => {
        if (abierto) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [abierto]);

    // Cerrar con tecla ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') alCerrar();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [alCerrar]);

    if (!abierto) return null;

    return (
        <div className={estilos.overlay} onClick={alCerrar}>
            {/* stopPropagation para que click en el modal no lo cierre */}
            <div className={estilos.modal} onClick={(e) => e.stopPropagation()}>
                <div className={estilos.cabecera}>
                    <h2 className={estilos.titulo}>{titulo}</h2>
                    <button className={estilos.botonCerrar} onClick={alCerrar}>
                        <X size={24} />
                    </button>
                </div>
                <div className={estilos.contenido}>
                    {children}
                </div>
            </div>
        </div>
    );
};
