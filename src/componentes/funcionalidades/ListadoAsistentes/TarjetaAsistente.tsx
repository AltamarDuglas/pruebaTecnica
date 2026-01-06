
import { Asistente } from '@/dominio/tipos';
import { Tarjeta } from '@/componentes/ui/Tarjeta/Tarjeta';
import { Boton } from '@/componentes/ui/Boton/Boton';
import { Edit2, Trash2, BrainCircuit } from 'lucide-react';

import { useRouter } from 'next/navigation';

/**
 * Componente de tarjeta individual para mostrar un asistente.
 * Permite navegar al entrenamiento, editar o eliminar.
 */
interface PropsTarjetaAsistente {
    asistente: Asistente;
    alEditar: (asistente: Asistente) => void;
    alEliminar: (id: string) => void;
}

export const TarjetaAsistente: React.FC<PropsTarjetaAsistente> = ({
    asistente,
    alEditar,
    alEliminar
}) => {
    const router = useRouter();

    const manejarEntrenamiento = () => {
        router.push(`/${asistente.id}`);
    };

    return (
        <Tarjeta className="w-full bg-card/40 backdrop-blur-md border-white/5 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(var(--primary),0.15)] transition-all duration-500 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4 relative z-10">
                {/* Sección de Información (Izquierda) */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-xl group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm border border-primary/20">
                        {asistente.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                        <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors tracking-tight">{asistente.nombre}</h3>
                        <div className="flex gap-2 flex-wrap">
                            <span className="text-xs bg-muted/60 px-2.5 py-0.5 rounded-md text-muted-foreground font-medium whitespace-nowrap border border-border/40">{asistente.idioma}</span>
                            <span className="text-xs bg-muted/60 px-2.5 py-0.5 rounded-md text-muted-foreground font-medium whitespace-nowrap border border-border/40">{asistente.tono}</span>
                        </div>
                    </div>
                </div>

                {/* Sección de Acciones (Derecha) */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/30">
                    <Boton
                        variante="secundario"
                        tamano="sm"
                        onClick={(e) => { e.stopPropagation(); alEditar(asistente); }}
                        className="h-9 px-3 text-xs hover:border-primary/50"
                        icono={<Edit2 size={16} className="transition-transform duration-300 group-hover:rotate-12" />}
                    >
                        Editar
                    </Boton>

                    <Boton
                        variante="primario"
                        onClick={(e) => { e.stopPropagation(); manejarEntrenamiento(); }}
                        className="h-9 px-4 min-w-[100px] hover:shadow-md hover:shadow-primary/20 transition-all duration-300"
                        icono={<BrainCircuit size={16} className="animate-pulse" />}
                    >
                        Entrenar
                    </Boton>

                    <Boton
                        variante="peligro"
                        tamano="sm"
                        onClick={(e) => { e.stopPropagation(); alEliminar(asistente.id); }}
                        className="h-9 w-9 px-0 sm:ml-2 hover:bg-destructive/90 transition-colors"
                        icono={<Trash2 size={16} className="transition-transform duration-300 hover:scale-125 hover:rotate-6" />}
                        aria-label="Eliminar asistente"
                    />
                </div>
            </div>
        </Tarjeta>
    );
};
