import React from 'react';
import { Asistente } from '@/dominio/tipos';
import { Tarjeta } from '@/componentes/ui/Tarjeta/Tarjeta';
import { Boton } from '@/componentes/ui/Boton/Boton';
import { Edit2, Trash2, BrainCircuit } from 'lucide-react';
import estilos from './TarjetaAsistente.module.css';
import { useRouter } from 'next/navigation';

/**
 * Componente de tarjeta individual para mostrar un asistente.
 * Permite navegar al entrenamiento, editar o eliminar.
 */
interface PropsTarjetaAsistente {
    asistente: Asistente;
    alEditar: (asistente: Asistente) => void;
    alEliminar: (id: string) => void;
}

export const TarjetaAsistente: React.FC<PropsTarjetaAsistente> = ({
    asistente,
    alEditar,
    alEliminar
}) => {
    const router = useRouter();

    const manejarEntrenamiento = () => {
        router.push(`/${asistente.id}`);
    };

    return (
        <Tarjeta className={estilos.tarjeta}>
            <div className={estilos.contenido}>
                <div className={estilos.cabecera}>
                    <div className={estilos.avatar}>
                        {asistente.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div className={estilos.info}>
                        <h3 className={estilos.nombre}>{asistente.nombre}</h3>
                        <div className={estilos.datos}>
                            <span className={estilos.etiqueta}>{asistente.idioma}</span>
                            <span className={estilos.etiqueta}>{asistente.tono}</span>
                        </div>
                    </div>
                </div>

                <div className={estilos.acciones}>
                    <Boton
                        variante="secundario"
                        tamano="sm"
                        onClick={() => alEditar(asistente)}
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                        icono={<Edit2 size={14} />}
                    >
                        Editar
                    </Boton>

                    <Boton
                        variante="primario"
                        onClick={manejarEntrenamiento}
                        style={{ padding: '0.5rem 1.5rem', minWidth: '120px' }}
                        icono={<BrainCircuit size={18} />}
                    >
                        Entrenar
                    </Boton>

                    <Boton
                        variante="peligro"
                        onClick={() => alEliminar(asistente.id)}
                        style={{ padding: '0.4rem' }}
                        icono={<Trash2 size={16} />}
                        aria-label="Eliminar asistente"
                    />
                </div>
            </div>
        </Tarjeta>
    );
};
