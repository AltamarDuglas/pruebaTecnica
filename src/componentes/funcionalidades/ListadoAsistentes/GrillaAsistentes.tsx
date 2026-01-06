import React from 'react';
import { Asistente } from '@/dominio/tipos';
import { TarjetaAsistente } from './TarjetaAsistente';

import { Loader2, Plus } from 'lucide-react';
import { Boton } from '@/componentes/ui/Boton/Boton';

/**
 * Componente que muestra el listado de asistentes en cuadrícula.
 * Gestiona los estados de carga y lista vacía.
 */
interface PropsGrillaAsistentes {
    asistentes: Asistente[];
    cargando: boolean; // isLoading -> cargando
    alEditar: (asistente: Asistente) => void;
    alEliminar: (id: string) => void;
    alCrear: () => void;
}

export const GrillaAsistentes: React.FC<PropsGrillaAsistentes> = ({
    asistentes,
    cargando,
    alEditar,
    alEliminar,
    alCrear
}) => {
    if (cargando) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-muted-foreground animate-in fade-in duration-500">
                <Loader2 className="animate-spin text-primary" size={40} />
                <p>Cargando tus asistentes...</p>
            </div>
        );
    }

    if (asistentes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 text-center max-w-md mx-auto animate-in zoom-in duration-300">
                <div className="text-6xl mb-2 animate-bounce">🤖</div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold">No tienes asistentes creados aún</h3>
                    <p className="text-muted-foreground">Empieza creando tu primer asistente de IA para automatizar tus tareas.</p>
                </div>
                <Boton onClick={alCrear} icono={<Plus size={18} />}>
                    Crear mi primer asistente
                </Boton>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 animate-in fade-in duration-500">
            {asistentes.map((asistente) => (
                <TarjetaAsistente
                    key={asistente.id}
                    asistente={asistente}
                    alEditar={alEditar}
                    alEliminar={alEliminar}
                />
            ))}
        </div>
    );
};
