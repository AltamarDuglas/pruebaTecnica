import React, { useEffect } from 'react';

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[4px] animate-in fade-in duration-200" onClick={alCerrar}>
            {/* stopPropagation para que click en el modal no lo cierre */}
            <div
                className="bg-background w-[90%] max-w-[600px] rounded-lg shadow-lg flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-5 zoom-in-95 duration-300 border border-border"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-semibold text-foreground m-0">{titulo}</h2>
                    <button
                        className="flex items-center justify-center p-1 rounded-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        onClick={alCerrar}
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="p-4 overflow-y-auto no-scrollbar">
                    {children}
                </div>
                {/* CSS styles for no-scrollbar are better handled in globals or a utility class if reused often, but here it's specific */}
                <style jsx>{`
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}</style>
            </div>
        </div>
    );
};
