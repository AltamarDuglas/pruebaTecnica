import React, { useState, useEffect } from 'react';
import { Modal } from '@/componentes/ui/Modal/Modal';
import { Boton } from '@/componentes/ui/Boton/Boton';
import { PasoInfoBasica } from './PasoInfoBasica';
import { PasoConfigRespuesta } from './PasoConfigRespuesta';
import { PasoRevision } from './PasoRevision';
import { CrearAsistenteDTO, Asistente } from '@/dominio/tipos';
import { useAsistentes } from '@/hooks/useAsistentes';
import { ArrowLeft, ArrowRight, Save, CheckCircle2 } from 'lucide-react';


interface PropsModalCrear {
    abierto: boolean;
    alCerrar: () => void;
    datosIniciales?: Asistente | null;
    alExito: () => void;
}

const DATOS_INICIALES: CrearAsistenteDTO = {
    nombre: '',
    idioma: 'Español',
    tono: 'Profesional',
    longitudRespuesta: { corta: 30, media: 40, larga: 30 },
    audioHabilitado: false
};

export const ModalCrearAsistente: React.FC<PropsModalCrear> = ({
    abierto,
    alCerrar,
    datosIniciales,
    alExito
}) => {
    const { crearAsistente, actualizarAsistente, cargando } = useAsistentes();
    const [paso, setPaso] = useState(1);
    const [datosFormulario, setDatosFormulario] = useState<Partial<CrearAsistenteDTO>>(DATOS_INICIALES);
    const [errores, setErrores] = useState<Record<string, string>>({});
    const [mostrarExito, setMostrarExito] = useState(false);

    // Reiniciar estado cada vez que se abre el modal.
    // Si hay datos iniciales, es edición. Si no, empezamos de cero.
    useEffect(() => {
        if (abierto) {
            if (datosIniciales) {
                setDatosFormulario(datosIniciales);
            } else {
                setDatosFormulario(DATOS_INICIALES);
            }
            setPaso(1);
            setErrores({});
            setMostrarExito(false);
        }
    }, [abierto, datosIniciales]);

    const manejarActualizacion = (nuevosDatos: Partial<CrearAsistenteDTO>) => {
        setDatosFormulario(prev => ({ ...prev, ...nuevosDatos }));
        setErrores({});
    };

    const validarPaso1 = (): boolean => {
        const nuevosErrores: Record<string, string> = {};
        if (!datosFormulario.nombre || datosFormulario.nombre.trim().length < 3) {
            nuevosErrores.nombre = 'El nombre debe tener al menos 3 caracteres.';
        }
        if (!datosFormulario.idioma) nuevosErrores.idioma = 'Selecciona un idioma.';
        if (!datosFormulario.tono) nuevosErrores.tono = 'Selecciona un tono.';

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const validarPaso2 = (): boolean => {
        const nuevosErrores: Record<string, string> = {};
        const { corta, media, larga } = datosFormulario.longitudRespuesta || { corta: 0, media: 0, larga: 0 };
        if ((corta + media + larga) !== 100) {
            nuevosErrores.longitudRespuesta = 'La suma de porcentajes debe ser 100%.';
        }
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const siguientePaso = () => {
        if (paso === 1 && validarPaso1()) setPaso(2);
        // Step 2 is the final step now
    };

    const pasoAnterior = () => {
        if (paso > 1) setPaso(paso - 1);
    };

    const guardarAsistente = async () => {
        try {
            if (datosIniciales) {
                // Modo Edición
                await actualizarAsistente(datosIniciales.id, datosFormulario);
            } else {
                // Modo Creación
                await crearAsistente(datosFormulario as CrearAsistenteDTO);
            }
            setMostrarExito(true);
            setTimeout(() => {
                alExito();
            }, 1500);
        } catch (error) {
            console.error(error);
            // Manejar error (podríamos mostrar un toast)
        }
    };

    // Renderizado del contenido del paso actual
    const renderizarContenido = () => {
        if (mostrarExito) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[300px] text-center text-green-500 gap-4 animate-in zoom-in duration-300">
                    <CheckCircle2 size={64} />
                    <h3 className="text-2xl font-bold">¡Asistente Guardado!</h3>
                    <p className="text-secondary-foreground">El asistente ha sido {datosIniciales ? 'actualizado' : 'creado'} correctamente.</p>
                </div>
            );
        }

        switch (paso) {
            case 1:
                return <PasoInfoBasica datos={datosFormulario} alActualizar={manejarActualizacion} errores={errores} />;
            case 2:
                // We do validation on submit now or keep "Siguiente" as "Guardar"
                return <PasoConfigRespuesta datos={datosFormulario} alActualizar={manejarActualizacion} errores={errores} />;
            default:
                return null;
        }
    };

    return (
        <Modal
            abierto={abierto}
            alCerrar={alCerrar}
            titulo={datosIniciales ? 'Editar Asistente' : 'Crear Nuevo Asistente'}
        >
            {/* Stepper con labels */}
            {!mostrarExito && (
                <div className="flex items-start justify-between mb-6 px-[10%] relative w-full sm:px-0 sm:mb-4">
                    {/* Line Connector */}
                    <div className="absolute top-5 left-[15%] right-[15%] h-0.5 bg-border z-0" />

                    {/* Step 1 */}
                    <div className={`flex flex-col items-center gap-1 relative z-10 group`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${paso >= 1
                            ? 'bg-primary border-primary text-primary-foreground shadow-lg scale-110'
                            : 'bg-surface border-2 border-border text-muted-foreground'
                            }`}>
                            1
                        </div>
                        <span className={`text-sm font-medium transition-colors duration-300 ${paso >= 1 ? 'text-primary font-semibold' : 'text-muted-foreground'
                            }`}>
                            Información
                        </span>
                    </div>

                    {/* Step 2 */}
                    <div className={`flex flex-col items-center gap-1 relative z-10 group`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${paso === 2
                            ? 'bg-primary border-primary text-primary-foreground shadow-lg scale-110'
                            : 'bg-secondary border-2 border-border text-muted-foreground'
                            }`}>
                            2
                        </div>
                        <span className={`text-sm font-medium transition-colors duration-300 ${paso === 2 ? 'text-primary font-semibold' : 'text-muted-foreground'
                            }`}>
                            Configuración
                        </span>
                    </div>
                </div>
            )}

            <div className="min-h-[250px] flex flex-col">
                {renderizarContenido()}
            </div>

            {!mostrarExito && (
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-border sm:flex-col-reverse sm:gap-4 sm:items-stretch">
                    <div className="flex gap-2 ml-auto sm:w-full sm:justify-between">
                        {paso > 1 && (
                            <Boton
                                variante="secundario"
                                onClick={pasoAnterior}
                                icono={<ArrowLeft size={16} />}
                                className="sm:flex-1"
                            >
                                Atrás
                            </Boton>
                        )}

                        {paso < 2 ? (
                            <Boton
                                onClick={siguientePaso}
                                icono={<ArrowRight size={16} />}
                                className="flex-row-reverse sm:flex-1" // Icono a la derecha
                            >
                                Siguiente
                            </Boton>
                        ) : (
                            <Boton
                                onClick={() => {
                                    if (validarPaso2()) guardarAsistente();
                                }}
                                cargando={cargando}
                                icono={<Save size={16} />}
                                variante="primario"
                                className="sm:flex-1"
                            >
                                {datosIniciales ? 'Actualizar' : 'Crear Asistente'}
                            </Boton>
                        )}
                    </div>
                </div>
            )}
        </Modal>
    );
};
