import React from 'react';
import { CampoTexto } from '@/componentes/ui/CampoTexto/CampoTexto';
import { Selector } from '@/componentes/ui/Selector/Selector';

import { CrearAsistenteDTO } from '@/dominio/tipos';

interface PropsPasoInfoBasica {
    datos: Partial<CrearAsistenteDTO>;
    alActualizar: (datos: Partial<CrearAsistenteDTO>) => void;
    errores: Record<string, string>;
}

const OPCIONES_IDIOMA = [
    { valor: 'Español', texto: 'Español' },
    { valor: 'Inglés', texto: 'Inglés' },
    { valor: 'Francés', texto: 'Francés' },
    { valor: 'Alemán', texto: 'Alemán' },
    { valor: 'Portugués', texto: 'Portugués' }
];

const OPCIONES_TONO = [
    { valor: 'Profesional', texto: 'Profesional (Formal)' },
    { valor: 'Amigable', texto: 'Amigable (Cercano)' },
    { valor: 'Técnico', texto: 'Técnico (Preciso)' },
    { valor: 'Humorístico', texto: 'Humorístico (Divertido)' }
];

export const PasoInfoBasica: React.FC<PropsPasoInfoBasica> = ({
    datos,
    alActualizar,
    errores
}) => {
    return (
        <div className="flex flex-col gap-4">
            <CampoTexto
                etiqueta="Nombre del Asistente *"
                placeholder="Ej. Asistente de Ventas"
                value={datos.nombre || ''}
                onChange={(e) => alActualizar({ nombre: e.target.value })}
                error={errores.nombre}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Selector
                    etiqueta="Idioma Principal *"
                    opciones={OPCIONES_IDIOMA}
                    value={datos.idioma || ''}
                    onChange={(e) => alActualizar({ idioma: e.target.value as any })}
                    error={errores.idioma}
                />

                <Selector
                    etiqueta="Tono de Respuesta *"
                    opciones={OPCIONES_TONO}
                    value={datos.tono || ''}
                    onChange={(e) => alActualizar({ tono: e.target.value as any })}
                    error={errores.tono}
                />
            </div>
        </div>
    );
};
