/**
 * Definiciones de tipos y entidades del dominio (Business Core).
 * Todo está en español para facilitar la comprensión del equipo.
 */

export type TonoAsistente = 'Formal' | 'Casual' | 'Profesional' | 'Amigable';
export type IdiomaAsistente = 'Español' | 'Inglés' | 'Portugués';

export interface ConfiguracionLongitudRespuesta {
    corta: number;   // Porcentaje de respuestas cortas
    media: number;   // Porcentaje de respuestas medias
    larga: number;   // Porcentaje de respuestas largas
}

/**
 * Entidad principal que representa un Asistente de IA.
 */
export interface Asistente {
    id: string;
    nombre: string;
    idioma: IdiomaAsistente;
    tono: TonoAsistente;
    longitudRespuesta: ConfiguracionLongitudRespuesta;
    audioHabilitado: boolean;
    /**
     * Instrucciones de sistema (System Prompt) para el entrenamiento.
     * Puede estar vacío si aún no se ha entrenado.
     */
    instruccionesEntrenamiento?: string;
}

// DTOs (Data Transfer Objects) para creación y actualización
export type CrearAsistenteDTO = Omit<Asistente, 'id'>;
export type ActualizarAsistenteDTO = Partial<CrearAsistenteDTO>;
