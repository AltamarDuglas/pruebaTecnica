import React, { useEffect, useState } from 'react';
import estilos from './PasoConfigRespuesta.module.css';
import { CrearAsistenteDTO } from '@/dominio/tipos';
import { BarraProgreso } from '@/componentes/ui/BarraProgreso/BarraProgreso';

interface PropsPasoConfigRespuesta {
    datos: Partial<CrearAsistenteDTO>;
    alActualizar: (datos: Partial<CrearAsistenteDTO>) => void;
    errores: Record<string, string>;
}

export const PasoConfigRespuesta: React.FC<PropsPasoConfigRespuesta> = ({
    datos,
    alActualizar,
    errores
}) => {
    // Estado local para los sliders para mejor performance visual
    const [longitudes, setLongitudes] = useState({
        corta: datos.configuracionLongitudRespuesta?.corta || 30,
        media: datos.configuracionLongitudRespuesta?.media || 40,
        larga: datos.configuracionLongitudRespuesta?.larga || 30
    });

    // Actualizar padre cuando cambia estado local (con debounce manual o directo)
    useEffect(() => {
        alActualizar({
            configuracionLongitudRespuesta: longitudes
        });
    }, [longitudes]);

    // Función de auto-balanceo inteligente (sacada del original)
    const manejarCambioSlider = (tipo: 'corta' | 'media' | 'larga', nuevoValor: number) => {
        // Clampeamos entre 0 y 100
        const valor = Math.max(0, Math.min(100, nuevoValor));

        const actual = { ...longitudes };
        const diferencia = valor - actual[tipo];

        // Si no hay cambio real, salir
        if (diferencia === 0) return;

        // Actualizamos el valor objetivo
        actual[tipo] = valor;

        // Repartir la diferencia entre los otros dos
        const otrosTipos = (Object.keys(actual) as Array<keyof typeof actual>).filter(t => t !== tipo);

        let remanente = 100 - valor;

        // Lógica simplificada de balanceo: Proporcional a sus valores actuales
        const sumaOtros = actual[otrosTipos[0]] + actual[otrosTipos[1]];

        if (sumaOtros === 0) {
            // Si ambos son 0, repartir equitativamente
            actual[otrosTipos[0]] = remanente / 2;
            actual[otrosTipos[1]] = remanente / 2;
        } else {
            // Reparto proporcional
            const ratio0 = actual[otrosTipos[0]] / sumaOtros;
            actual[otrosTipos[0]] = Math.round(remanente * ratio0);
            actual[otrosTipos[1]] = remanente - actual[otrosTipos[0]]; // El resto para el último para asegurar 100%
        }

        setLongitudes(actual);
    };

    return (
        <div className={estilos.contenedor}>
            <div className={estilos.descripcion}>
                <p>Define la probabilidad de que el asistente genere respuestas de cierta longitud. La suma debe ser siempre 100%.</p>
            </div>

            {/* Barra de visualización total */}
            <BarraProgreso
                progreso={100}
                etiqueta="Distribución Total (Debe ser 100%)"
            // En una implementación real más compleja, pasaríamos segmentos de colores
            />

            <div className={estilos.filaSliders}>
                <GrupoSlider
                    label="Respuestas Cortas"
                    valor={longitudes.corta}
                    onChange={(v) => manejarCambioSlider('corta', v)}
                    color="var(--success)"
                />
                <GrupoSlider
                    label="Respuestas Medianas"
                    valor={longitudes.media}
                    onChange={(v) => manejarCambioSlider('media', v)}
                    color="var(--primary)"
                />
                <GrupoSlider
                    label="Respuestas Largas"
                    valor={longitudes.larga}
                    onChange={(v) => manejarCambioSlider('larga', v)}
                    color="var(--secondary)"
                />
            </div>

            {errores.configuracionLongitudRespuesta && (
                <p style={{ color: 'var(--error)', fontSize: '0.8rem' }}>{errores.configuracionLongitudRespuesta}</p>
            )}

            <div className={estilos.filaSwitch}>
                <div className={estilos.switchEtiqueta}>
                    <span className={estilos.tituloSwitch}>Habilitar Respuestas de Audio</span>
                    <span className={estilos.descSwitch}>Permite que el asistente genere salidas de voz.</span>
                </div>
                <label className={estilos.switch}>
                    <input
                        type="checkbox"
                        checked={datos.habilitarAudio || false}
                        onChange={(e) => alActualizar({ habilitarAudio: e.target.checked })}
                    />
                    <span className={estilos.slider}></span>
                </label>
            </div>
        </div>
    );
};

const GrupoSlider = ({ label, valor, onChange, color }: { label: string, valor: number, onChange: (v: number) => void, color: string }) => (
    <div className={estilos.grupoSlider}>
        <div className={estilos.cabeceraSlider}>
            <span style={{ color }}>{label}</span>
            <span className={estilos.valor}>{valor}%</span>
        </div>
        <input
            type="range"
            min="0"
            max="100"
            value={valor}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className={estilos.inputRango}
        />
    </div>
);
