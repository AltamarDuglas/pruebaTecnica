import React from 'react';
import estilos from './PasoRevision.module.css';
import { CrearAsistenteDTO } from '@/dominio/tipos';
import { BarraProgreso } from '@/componentes/ui/BarraProgreso/BarraProgreso';

interface PropsPasoRevision {
    datos: Partial<CrearAsistenteDTO>;
}

export const PasoRevision: React.FC<PropsPasoRevision> = ({ datos }) => {
    const config = datos.configuracionLongitudRespuesta || { corta: 0, media: 0, larga: 0 };

    return (
        <div className={estilos.contenedor}>
            <div className={estilos.resumen}>
                <div className={estilos.fila}>
                    <span className={estilos.etiqueta}>Nombre</span>
                    <span className={estilos.valor}>{datos.nombre}</span>
                </div>
                <div className={estilos.fila}>
                    <span className={estilos.etiqueta}>Idioma</span>
                    <span className={estilos.valor}>{datos.idioma}</span>
                </div>
                <div className={estilos.fila}>
                    <span className={estilos.etiqueta}>Tono</span>
                    <span className={estilos.valor}>{datos.tono}</span>
                </div>
                <div className={estilos.fila}>
                    <span className={estilos.etiqueta}>Audio</span>
                    <span className={estilos.valor}>{datos.habilitarAudio ? 'Habilitado' : 'Deshabilitado'}</span>
                </div>
            </div>

            <div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                    Configuración de Respuestas
                </h4>
                {/* Reutilizamos la barra de progreso para mostrar visualmente la distribución final */}
                <div style={{ display: 'flex', height: '8px', borderRadius: '999px', overflow: 'hidden', width: '100%' }}>
                    <div style={{ width: `${config.corta}%`, background: 'var(--success)' }} title="Corta" />
                    <div style={{ width: `${config.media}%`, background: 'var(--primary)' }} title="Media" />
                    <div style={{ width: `${config.larga}%`, background: 'var(--secondary)' }} title="Larga" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '4px', color: 'var(--text-secondary)' }}>
                    <span>Corta: {config.corta}%</span>
                    <span>Media: {config.media}%</span>
                    <span>Larga: {config.larga}%</span>
                </div>
            </div>

            <p className={estilos.mensajeConfirmacion}>
                Por favor, revisa que todos los datos sean correctos antes de crear el asistente.
            </p>
        </div>
    );
};
