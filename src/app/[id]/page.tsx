'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAsistentes } from '@/hooks/useAsistentes';
import { Asistente } from '@/dominio/tipos';
import { FormularioEntrenamiento } from '@/componentes/funcionalidades/Entrenamiento/FormularioEntrenamiento';
import { Boton } from '@/componentes/ui/Boton/Boton';
import { ArrowLeft, Loader2 } from 'lucide-react';


// TODO: Importar Simulador de Chat
import { SimuladorChat } from '@/componentes/funcionalidades/Entrenamiento/SimuladorChat';

export default function PaginaEntrenamiento() {
    const params = useParams();
    const router = useRouter();
    const { obtenerAsistentePorId, actualizarAsistente } = useAsistentes();

    const [asistente, setAsistente] = useState<Asistente | null>(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const cargarDatos = async () => {
            if (!params.id) return;
            try {
                setCargando(true);
                const datos = await obtenerAsistentePorId(params.id as string);
                if (datos) {
                    setAsistente(datos);
                } else {
                    setError('Asistente no encontrado.');
                }
            } catch (err) {
                setError('Error cargando el asistente.');
                console.error(err);
            } finally {
                setCargando(false);
            }
        };
        cargarDatos();
    }, [params.id, obtenerAsistentePorId]);

    const manejarGuardarEntrenamiento = async (instrucciones: string) => {
        if (!asistente) return;
        // Solo actualizamos el campo instruccionesEntrenamiento
        // Necesitamos mapear instrucciones -> instruccionesEntrenamiento en el objeto que se envía, pero UpdateDTO espera Partial<CrearAsistenteDTO>
        // En nuestra interfaz Asistente, se llama instruccionesEntrenamiento.

        // CORRECCION: En `tipos.ts` definimos 'instruccionesEntrenamiento', aseguremonos que ActualizarAsistenteDTO lo soporte.
        // Como ActualizarAsistenteDTO es Partial<CrearAsistenteDTO>, y CrearAsistenteDTO es Omit<Asistente, 'id'>, deberia tenerlo.

        await actualizarAsistente(asistente.id, { instruccionesEntrenamiento: instrucciones });
        setAsistente(prev => prev ? { ...prev, instruccionesEntrenamiento: instrucciones } : null);
    };

    if (cargando) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-muted-foreground">
                <Loader2 className="animate-spin text-primary" size={40} />
            </div>
        );
    }

    if (error || !asistente) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <h2 className="text-2xl font-bold text-destructive">Error</h2>
                <p className="text-muted-foreground">{error}</p>
                <Boton onClick={() => router.push('/')} variante="secundario" className="mt-4">
                    Volver al Inicio
                </Boton>
            </div>
        );
    }

    return (
        <div className="container mx-auto h-[calc(100vh-2rem)] py-4 max-w-[1400px] flex flex-col gap-4">
            <header className="flex flex-col gap-4 pb-4 border-b border-border">
                <Boton
                    variante="fantasma"
                    onClick={() => router.push('/')}
                    className="pl-0 hover:bg-transparent hover:text-primary gap-2 self-start"
                    icono={<ArrowLeft size={20} />}
                >
                    <span className="font-medium">Volver</span>
                </Boton>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <h1 className="text-3xl font-bold tracking-tight">{asistente.nombre}</h1>
                    <div className="flex gap-2">
                        <span className="bg-muted px-2.5 py-0.5 rounded-full text-sm font-medium text-muted-foreground border border-border">{asistente.idioma}</span>
                        <span className="bg-muted px-2.5 py-0.5 rounded-full text-sm font-medium text-muted-foreground border border-border">{asistente.tono}</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
                {/* Columna Izquierda: Entrenamiento */}
                <div className="flex flex-col h-full min-h-0 animate-in slide-in-from-left-4 duration-500">
                    <FormularioEntrenamiento
                        asistente={asistente}
                        alGuardar={manejarGuardarEntrenamiento}
                    />
                </div>

                {/* Columna Derecha: Chat */}
                <div className="flex flex-col h-full min-h-0 animate-in slide-in-from-right-4 duration-500 delay-100">
                    <SimuladorChat />
                </div>
            </div>
        </div>
    );
};
