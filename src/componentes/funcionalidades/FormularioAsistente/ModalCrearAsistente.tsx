import React, { useState, useEffect } from 'react';
import { Modal } from '@/componentes/ui/Modal/Modal';
import { Boton } from '@/componentes/ui/Boton/Boton';
import { PasoInfoBasica } from './PasoInfoBasica';
import { PasoConfigRespuesta } from './PasoConfigRespuesta';
import { PasoRevision } from './PasoRevision';
import { CrearAsistenteDTO, Asistente } from '@/dominio/tipos';
import { useAsistentes } from '@/hooks/useAsistentes';
import { ArrowLeft, ArrowRight, Save, CheckCircle2 } from 'lucide-react';
import estilos from './ModalCrearAsistente.module.css';

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

    // Reiniciar estado
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
                <div className={estilos.mensajeExito}>
                    <CheckCircle2 size={64} />
                    <h3>¡Asistente Guardado!</h3>
                    <p>El asistente ha sido {datosIniciales ? 'actualizado' : 'creado'} correctamente.</p>
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
            {/* Stepper moved to top, using new styles */}
            {/* Stepper with Labels */}
            <div className={estilos.indicadorPasosSuperior}>
                {/* Step 1 */}
                <div className={`${estilos.pasoItem} ${paso >= 1 ? estilos.activo : ''} ${paso > 1 ? estilos.completado : ''}`}>
                    <div className={estilos.pasoCirculo}>1</div>
                    <span className={estilos.pasoEtiqueta}>Información</span>
                </div>

                {/* Step 2 */}
                <div className={`${estilos.pasoItem} ${paso === 2 ? estilos.activo : ''}`}>
                    <div className={estilos.pasoCirculo}>2</div>
                    <span className={estilos.pasoEtiqueta}>Configuración</span>
                </div>
            </div>

            <div className={estilos.contenedorPasos}>
                {renderizarContenido()}
            </div>

            {!mostrarExito && (
                <div className={estilos.pieModal}>
                    <div className={estilos.botonesNavegacion} style={{ marginLeft: 'auto' }}>
                        {paso > 1 && (
                            <Boton
                                variante="secundario"
                                onClick={pasoAnterior}
                                icono={<ArrowLeft size={16} />}
                            >
                                Atrás
                            </Boton>
                        )}

                        {paso < 2 ? (
                            <Boton
                                onClick={siguientePaso}
                                icono={<ArrowRight size={16} />}
                                style={{ flexDirection: 'row-reverse' }} // Icono a la derecha
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
