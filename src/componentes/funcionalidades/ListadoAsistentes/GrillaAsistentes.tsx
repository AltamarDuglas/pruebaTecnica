import React from 'react';
import { Asistente } from '@/dominio/tipos';
import { TarjetaAsistente } from './TarjetaAsistente';
import estilos from './GrillaAsistentes.module.css';
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
            <div className={estilos.contenedorCarga}>
                <Loader2 className={estilos.spinner} size={40} />
                <p>Cargando tus asistentes...</p>
            </div>
        );
    }

    if (asistentes.length === 0) {
        return (
            <div className={estilos.estadoVacio}>
                <div className={estilos.iconoVacio}>🤖</div>
                <h3>No tienes asistentes creados aún</h3>
                <p>Empieza creando tu primer asistente de IA para automatizar tus tareas.</p>
                <Boton onClick={alCrear} icono={<Plus size={18} />}>
                    Crear mi primer asistente
                </Boton>
            </div>
        );
    }

    return (
        <div className={estilos.lista}>
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
