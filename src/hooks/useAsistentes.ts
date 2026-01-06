import { useState, useEffect, useCallback } from 'react';
import { Asistente, CrearAsistenteDTO, ActualizarAsistenteDTO } from '@/dominio/tipos';
import { servicioAsistentes } from '@/servicios';

/**
 * Hook personalizado para la gestión de asistentes.
 * Centraliza la lógica de estado y llamadas al servicio correspondiente.
 */
export const useAsistentes = () => {
    const [asistentes, setAsistentes] = useState<Asistente[]>([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Función para cargar la lista de asistentes
    const cargarAsistentes = useCallback(async () => {
        setCargando(true);
        setError(null);
        try {
            const datos = await servicioAsistentes.obtenerTodos();
            setAsistentes(datos);
        } catch (err) {
            console.error(err);
            setError('Ocurrió un error al cargar los asistentes.');
        } finally {
            setCargando(false);
        }
    }, []);

    // Cargar al montar el componente (o cuando cambie la función cargarAsistentes)
    useEffect(() => {
        cargarAsistentes();
    }, [cargarAsistentes]);

    const crearAsistente = useCallback(async (datos: CrearAsistenteDTO) => {
        setCargando(true);
        try {
            const nuevoAsistente = await servicioAsistentes.crear(datos);
            setAsistentes(prev => [...prev, nuevoAsistente]);
            return nuevoAsistente;
        } catch (err) {
            setError('No se pudo crear el asistente.');
            throw err;
        } finally {
            setCargando(false);
        }
    }, []);

    const actualizarAsistente = useCallback(async (id: string, datos: ActualizarAsistenteDTO) => {
        setCargando(true);
        try {
            const actualizado = await servicioAsistentes.actualizar(id, datos);
            setAsistentes(prev => prev.map(a => a.id === id ? actualizado : a));
            return actualizado;
        } catch (err) {
            setError('No se pudo actualizar el asistente.');
            throw err;
        } finally {
            setCargando(false);
        }
    }, []);

    const eliminarAsistente = useCallback(async (id: string) => {
        setCargando(true);
        try {
            await servicioAsistentes.eliminar(id);
            setAsistentes(prev => prev.filter(a => a.id !== id));
        } catch (err) {
            setError('No se pudo eliminar el asistente.');
            throw err;
        } finally {
            setCargando(false);
        }
    }, []);

    const obtenerAsistentePorId = useCallback(async (id: string) => {
        return await servicioAsistentes.obtenerPorId(id);
    }, []);

    return {
        asistentes,
        cargando, // isLoading -> cargando
        error,
        crearAsistente,
        actualizarAsistente,
        eliminarAsistente,
        obtenerAsistentePorId,
        refrescar: cargarAsistentes
    };
};
