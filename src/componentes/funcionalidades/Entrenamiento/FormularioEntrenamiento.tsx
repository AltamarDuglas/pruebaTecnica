import React, { useState, useEffect } from 'react';
import { Asistente } from '@/dominio/tipos';
import { Boton } from '@/componentes/ui/Boton/Boton';
import { Save } from 'lucide-react';
import estilos from './FormularioEntrenamiento.module.css';

/**
 * Formulario para editar las instrucciones de entrenamiento (System Prompt).
 */
interface PropsFormularioEntrenamiento {
    asistente: Asistente;
    alGuardar: (instrucciones: string) => Promise<void>;
}

export const FormularioEntrenamiento: React.FC<PropsFormularioEntrenamiento> = ({ asistente, alGuardar }) => {
    const [instrucciones, setInstrucciones] = useState(asistente.instruccionesEntrenamiento || '');
    const [guardando, setGuardando] = useState(false);
    const [sucio, setSucio] = useState(false); // isDirty -> sucio (modificado)
    const [mostrarExito, setMostrarExito] = useState(false);

    // Sincronizar cuando cambia el asistente
    useEffect(() => {
        setInstrucciones(asistente.instruccionesEntrenamiento || '');
        setSucio(false);
    }, [asistente.id, asistente.instruccionesEntrenamiento]);

    const manejarCambio = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInstrucciones(e.target.value);
        setSucio(true);
        setMostrarExito(false);
    };

    const manejarGuardar = async () => {
        setGuardando(true);
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
            await alGuardar(instrucciones);
            setSucio(false);
            setMostrarExito(true);

            setTimeout(() => {
                setMostrarExito(false);
            }, 3000);
        } catch (error) {
            console.error("Error guardando:", error);
        } finally {
            setGuardando(false);
        }
    };

    return (
        <div className={estilos.contenedor}>
            {/* Title and Description handled by parent page */}

            <textarea
                className={estilos.areaTexto}
                value={instrucciones}
                onChange={manejarCambio}
                placeholder="Ej: Eres un asistente experto en plantas. Tu objetivo es ayudar a los clientes a elegir la mejor maceta..."
            />

            <div className={estilos.pie}>
                {sucio && <span className={estilos.indicadorSinGuardar}>Cambios sin guardar</span>}
                {mostrarExito && !sucio && <span className={estilos.indicadorExito}>¡Guardado correctamente!</span>}

                <Boton
                    onClick={manejarGuardar}
                    cargando={guardando}
                    disabled={!sucio && !guardando}
                    icono={<Save size={16} />}
                >
                    {guardando ? 'Guardando...' : 'Guardar Entrenamiento'}
                </Boton>
            </div>
        </div>
    );
};
