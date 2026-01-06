import React from 'react';
import { AlternadorTema } from './AlternadorTema';

/**
 * Cabecera principal de la aplicación.
 * Contiene el título y el toggle de tema.
 */
export const CabeceraPrincipal: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-gradient-to-b from-background/95 to-background/60 backdrop-blur-md supports-[backdrop-filter]:bg-background/50">
            <div className="container flex h-16 max-w-[1400px] items-center justify-between mx-auto px-4 md:px-6">
                <div className="flex flex-col gap-0.5">
                    <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Gestión de Asistentes IA</h1>
                    <p className="text-xs text-muted-foreground hidden sm:block">Configura y entrena tus asistentes virtuales</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="h-6 w-px bg-border/50 hidden sm:block"></div>
                    <AlternadorTema />
                </div>
            </div>
        </header>
    );
};
