'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAsistentes } from '@/hooks/useAsistentes';
import { Asistente } from '@/dominio/tipos';
import { FormularioEntrenamiento } from '@/componentes/funcionalidades/Entrenamiento/FormularioEntrenamiento';
import { Boton } from '@/componentes/ui/Boton/Boton';
import { ArrowLeft, Loader2 } from 'lucide-react';
import estilos from './page.module.css';

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
            <div className={estilos.contenedorCentro}>
                <Loader2 className={estilos.spinner} size={40} />
            </div>
        );
    }

    if (error || !asistente) {
        return (
            <div className={estilos.contenedorCentro}>
                <h2 className={estilos.tituloError}>Error</h2>
                <p>{error}</p>
                <Boton onClick={() => router.push('/')} variante="secundario" style={{ marginTop: '1rem' }}>
                    Volver al Inicio
                </Boton>
            </div>
        );
    }

    return (
        <div className={estilos.contenedorPagina}>
            <header className={estilos.cabecera}>
                <Boton
                    variante="fantasma"
                    onClick={() => router.push('/')}
                    className={estilos.botonVolver}
                >
                    <ArrowLeft size={20} />
                    <span className={estilos.textoVolver}>Volver</span>
                </Boton>

                <div className={estilos.infoCabecera}>
                    <h1 className={estilos.nombreAsistente}>{asistente.nombre}</h1>
                    <div className={estilos.insignias}>
                        <span className={estilos.insignia}>{asistente.idioma}</span>
                        <span className={estilos.insignia}>{asistente.tono}</span>
                    </div>
                </div>
            </header>

            <div className={estilos.contenidoGrilla}>
                <div className={estilos.columna}>
                    <FormularioEntrenamiento
                        asistente={asistente}
                        alGuardar={manejarGuardarEntrenamiento}
                    />
                </div>

                <div className={estilos.columna}>
                    <SimuladorChat />
                </div>
            </div>
        </div>
    );
}
