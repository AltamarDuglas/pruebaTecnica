import React, { useEffect, useState, useRef } from 'react';
import { Zap, Scale, FileText } from 'lucide-react';

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
        corta: datos.longitudRespuesta?.corta || 30,
        media: datos.longitudRespuesta?.media || 40,
        larga: datos.longitudRespuesta?.larga || 30
    });

    // Actualizar padre cuando cambia estado local (debounce manual)
    useEffect(() => {
        const timer = setTimeout(() => {
            alActualizar({
                longitudRespuesta: longitudes
            });
        }, 300); // 300ms de retraso para evitar lag al arrastrar

        return () => clearTimeout(timer);
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
        <div className="flex flex-col gap-6">
            <div className="text-muted-foreground text-sm">
                <p>Define la probabilidad de que el asistente genere respuestas de cierta longitud.</p>
            </div>

            {/* Visualización simplificada sin BarraProgreso para ahorrar espacio vertical si es necesario, 
               o mantenemos si cabe. Al reducir márgenes debería caber. 
               Dejamos comentado si queremos ganarle más espacio explícitamente.
            */}

            <div className="flex flex-col gap-6">
                <GrupoSlider
                    label="Respuestas Cortas"
                    valor={longitudes.corta}
                    onChange={(v) => manejarCambioSlider('corta', v)}
                    colores={['#10b981', '#14b8a6']} // emerald-500 -> teal-500
                    icono={<Zap size={18} className="text-emerald-500" />}
                />
                <GrupoSlider
                    label="Respuestas Medianas"
                    valor={longitudes.media}
                    onChange={(v) => manejarCambioSlider('media', v)}
                    colores={['#3b82f6', '#6366f1']} // blue-500 -> indigo-500
                    icono={<Scale size={18} className="text-blue-500" />}
                />
                <GrupoSlider
                    label="Respuestas Largas"
                    valor={longitudes.larga}
                    onChange={(v) => manejarCambioSlider('larga', v)}
                    colores={['#a855f7', '#ec4899']} // purple-500 -> pink-500
                    icono={<FileText size={18} className="text-purple-500" />}
                />
            </div>

            {errores.longitudRespuesta && (
                <p className="text-destructive text-xs mt-1">{errores.longitudRespuesta}</p>
            )}

            <div className="flex items-center justify-between p-4 bg-muted/40 rounded-lg border border-border mt-2">
                <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-foreground">Habilitar Respuestas de Audio</span>
                    <span className="text-xs text-muted-foreground">Permite que el asistente genere salidas de voz.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={datos.audioHabilitado || false}
                        onChange={(e) => alActualizar({ audioHabilitado: e.target.checked })}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-input peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring rounded-full peer dark:bg-input peer-checked:bg-primary peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
                </label>
            </div>
        </div>
    );
};

const GrupoSlider = ({ label, valor, onChange, colores, icono }: { label: string, valor: number, onChange: (v: number) => void, colores: [string, string], icono: React.ReactNode }) => {
    // Generamos el gradiente dinámico para que el "track" se vea lleno hasta el punto del thumb
    // Usamos el color input (gris claro en light, oscuro en dark) para la parte vacía
    const backgroundStyle = {
        background: `linear-gradient(to right, ${colores[0]} 0%, ${colores[1]} ${valor}%, hsl(var(--input)) ${valor}%, hsl(var(--input)) 100%)`
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6">{icono}</span>
                    <span className="text-sm font-medium text-foreground">{label}</span>
                </div>
                <span className="text-sm font-bold" style={{ color: colores[1] }}>{valor}%</span>
            </div>
            <input
                type="range"
                min="0"
                max="100"
                value={valor}
                onChange={(e) => onChange(parseInt(e.target.value))}
                style={backgroundStyle}
                className="w-full h-3 rounded-lg appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:scale-110"
            />
        </div>
    );
};
