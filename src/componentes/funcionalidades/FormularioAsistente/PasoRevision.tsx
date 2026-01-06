import React from 'react';

import { CrearAsistenteDTO } from '@/dominio/tipos';
//import { BarraProgreso } from '@/componentes/ui/BarraProgreso/BarraProgreso';

interface PropsPasoRevision {
    datos: Partial<CrearAsistenteDTO>;
}

export const PasoRevision: React.FC<PropsPasoRevision> = ({ datos }) => {
    const config = datos.longitudRespuesta || { corta: 0, media: 0, larga: 0 };

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-muted/30 p-4 rounded-lg flex flex-col gap-2 border border-border">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Nombre</span>
                    <span className="font-medium text-foreground">{datos.nombre}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Idioma</span>
                    <span className="font-medium text-foreground">{datos.idioma}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Tono</span>
                    <span className="font-medium text-foreground">{datos.tono}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Audio</span>
                    <span className="font-medium text-foreground">{datos.audioHabilitado ? 'Habilitado' : 'Deshabilitado'}</span>
                </div>
            </div>

            <div>
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">
                    Configuración de Respuestas
                </h4>
                {/* Reutilizamos la barra de progreso para mostrar visualmente la distribución final */}
                <div className="flex h-2 rounded-full overflow-hidden w-full bg-secondary">
                    <div style={{ width: `${config.corta}%` }} className="bg-green-500" title="Corta" />
                    <div style={{ width: `${config.media}%` }} className="bg-primary" title="Media" />
                    <div style={{ width: `${config.larga}%` }} className="bg-blue-500" title="Larga" />
                </div>
                <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                    <span>Corta: {config.corta}%</span>
                    <span>Media: {config.media}%</span>
                    <span>Larga: {config.larga}%</span>
                </div>
            </div>

            <p className="text-sm text-muted-foreground text-center mt-4 italic">
                Por favor, revisa que todos los datos sean correctos antes de crear el asistente.
            </p>
        </div>
    );
};
