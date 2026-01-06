import { Asistente, CrearAsistenteDTO, ActualizarAsistenteDTO } from '@/dominio/tipos';
import { RepositorioAsistente } from './RepositorioAsistente';
import { v4 as uuidv4 } from 'uuid';

const CLAVE_ALMACENAMIENTO = 'funnelhot_asistentes_data';

/**
 * Implementación del repositorio usando LocalStorage del navegador.
 * Simula asincronía (Promise) para imitar una llamada a API real.
 */
export class LocalStorageRepositorio implements RepositorioAsistente {

    // Método privado auxiliar para leer del storage
    private obtenerAsistentesDelStorage(): Asistente[] {
        if (typeof window === 'undefined') return [];
        const data = localStorage.getItem(CLAVE_ALMACENAMIENTO);
        return data ? JSON.parse(data) : [];
    }

    // Método privado auxiliar para escribir en el storage
    private guardarAsistentesEnStorage(asistentes: Asistente[]): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(asistentes));
    }

    async obtenerTodos(): Promise<Asistente[]> {
        return new Promise((resolve) => {
            // Simulamos delay de red (100ms)
            setTimeout(() => {
                let asistentes = this.obtenerAsistentesDelStorage();

                // Datos de prueba iniciales si está vacío
                if (asistentes.length === 0) {
                    const DATOS_SEMILLA: Asistente[] = [
                        {
                            id: "1",
                            nombre: "Asistente de Ventas",
                            idioma: "Español",
                            tono: "Profesional",
                            longitudRespuesta: { corta: 30, media: 50, larga: 20 },
                            audioHabilitado: true,
                            instruccionesEntrenamiento: "Eres un asistente especializado en ventas. Siempre sé cordial y enfócate en identificar necesidades del cliente antes de ofrecer productos."
                        },
                        {
                            id: "2",
                            nombre: "Soporte Técnico",
                            idioma: "Inglés",
                            tono: "Amigable",
                            longitudRespuesta: { corta: 20, media: 30, larga: 50 },
                            audioHabilitado: false,
                            instruccionesEntrenamiento: "Ayudas a resolver problemas técnicos de manera clara y paso a paso. Siempre confirma que el usuario haya entendido antes de continuar."
                        }
                    ];
                    this.guardarAsistentesEnStorage(DATOS_SEMILLA);
                    asistentes = DATOS_SEMILLA;
                }

                resolve(asistentes);
            }, 100);
        });
    }

    async obtenerPorId(id: string): Promise<Asistente | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const asistentes = this.obtenerAsistentesDelStorage();
                const asistente = asistentes.find((a) => a.id === id);
                resolve(asistente || null);
            }, 100);
        });
    }

    async crear(datos: CrearAsistenteDTO): Promise<Asistente> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const asistentes = this.obtenerAsistentesDelStorage();
                const nuevoAsistente: Asistente = {
                    ...datos,
                    id: uuidv4(),
                };
                asistentes.push(nuevoAsistente);
                this.guardarAsistentesEnStorage(asistentes);
                resolve(nuevoAsistente);
            }, 300);
        });
    }

    async actualizar(id: string, datos: ActualizarAsistenteDTO): Promise<Asistente> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const asistentes = this.obtenerAsistentesDelStorage();
                const indice = asistentes.findIndex((a) => a.id === id);

                if (indice === -1) {
                    reject(new Error('Asistente no encontrado'));
                    return;
                }

                const asistenteActualizado = { ...asistentes[indice], ...datos };
                asistentes[indice] = asistenteActualizado;
                this.guardarAsistentesEnStorage(asistentes);
                resolve(asistenteActualizado);
            }, 300);
        });
    }

    async eliminar(id: string): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                let asistentes = this.obtenerAsistentesDelStorage();
                asistentes = asistentes.filter((a) => a.id !== id);
                this.guardarAsistentesEnStorage(asistentes);
                resolve();
            }, 300);
        });
    }
}
