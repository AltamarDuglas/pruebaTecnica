import React from 'react';
import { AlternadorTema } from './AlternadorTema';

/**
 * Cabecera principal de la aplicación.
 * Contiene el título y el toggle de tema.
 */
export const CabeceraPrincipal: React.FC = () => {
    return (
        <header className="cabecera-principal">
            <div className="contenido-cabecera">
                <div>
                    <h1>Gestión de Asistentes IA</h1>
                    <p>Configura y entrena tus asistentes virtuales</p>
                </div>
                <AlternadorTema />
            </div>
        </header>
    );
};
