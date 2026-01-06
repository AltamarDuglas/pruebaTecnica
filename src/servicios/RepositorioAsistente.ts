import { Asistente, CrearAsistenteDTO, ActualizarAsistenteDTO } from '@/dominio/tipos';

/**
 * Interfaz que define las operaciones disponibles para gestionar Asistentes.
 * Sigue el patrón Repository para desacoplar la lógica de negocio de la persistencia.
 */
export interface RepositorioAsistente {
    obtenerTodos(): Promise<Asistente[]>;
    obtenerPorId(id: string): Promise<Asistente | null>;
    crear(datos: CrearAsistenteDTO): Promise<Asistente>;
    actualizar(id: string, datos: ActualizarAsistenteDTO): Promise<Asistente>;
    eliminar(id: string): Promise<void>;
}
