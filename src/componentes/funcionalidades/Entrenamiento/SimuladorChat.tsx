import React, { useState, useEffect, useRef } from 'react';
import { Boton } from '@/componentes/ui/Boton/Boton';
import { CampoTexto } from '@/componentes/ui/CampoTexto/CampoTexto';
import { Send, RefreshCw, Bot, User } from 'lucide-react';


const RESPUESTAS_PREDEFINIDAS = [
    "Entendido, ¿en qué más puedo ayudarte?",
    "Esa es una excelente pregunta. Déjame explicarte...",
    "Claro, con gusto te ayudo con eso.",
    "¿Podrías darme más detalles sobre tu consulta?",
    "Perfecto, he registrado esa información.",
    "Entiendo, dame un segundo para verificarlo.",
    "Lo siento, no tengo información sobre eso, pero puedo aprender.",
    "¡Qué interesante! Cuéntame más."
];

interface Mensaje {
    id: string;
    rol: 'usuario' | 'asistente';
    contenido: string;
    timestamp: number;
}

export const SimuladorChat: React.FC = () => {
    const [mensajes, setMensajes] = useState<Mensaje[]>([]);
    const [valorEntrada, setValorEntrada] = useState('');
    const [escribiendo, setEscribiendo] = useState(false);
    const finMensajesRef = useRef<HTMLDivElement>(null);

    // Desplazar automáticamente al último mensaje
    const irAlFinal = () => {
        finMensajesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        irAlFinal();
    }, [mensajes, escribiendo]);

    const manejarEnvio = async (e?: React.FormEvent) => {
        e?.preventDefault();

        if (!valorEntrada.trim() || escribiendo) return;

        // Agregar mensaje del usuario
        const msgUsuario: Mensaje = {
            id: Date.now().toString(),
            rol: 'usuario',
            contenido: valorEntrada,
            timestamp: Date.now()
        };

        setMensajes(prev => [...prev, msgUsuario]);
        setValorEntrada('');
        setEscribiendo(true);

        // Simular latencia de red
        const demora = Math.floor(Math.random() * 1000) + 1000;

        setTimeout(() => {
            // Seleccionar respuesta aleatoria
            const respuestaRandom = RESPUESTAS_PREDEFINIDAS[Math.floor(Math.random() * RESPUESTAS_PREDEFINIDAS.length)];

            const msgBot: Mensaje = {
                id: (Date.now() + 1).toString(),
                rol: 'asistente',
                contenido: respuestaRandom,
                timestamp: Date.now()
            };

            setMensajes(prev => [...prev, msgBot]);
            setEscribiendo(false);
        }, demora);
    };

    const manejarReinicio = () => {
        setMensajes([]);
        setValorEntrada('');
        setEscribiendo(false);
    };

    return (
        <div className="bg-surface border border-border rounded-lg flex flex-col h-full overflow-hidden shadow-sm">
            {/* Header handled by parent page */}

            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-surface">
                {mensajes.length === 0 && (
                    <div className="flex items-center justify-center h-full text-muted-foreground text-sm italic opacity-70">
                        <p>Escribe algo para probar a tu asistente...</p>
                    </div>
                )}

                {mensajes.map((msg) => (
                    <div
                        key={msg.id}
                        className={`max-w-[85%] px-4 py-2 rounded-md text-sm leading-relaxed relative animate-in fade-in zoom-in duration-200 ${msg.rol === 'usuario'
                            ? 'self-end bg-primary text-primary-foreground rounded-br-[2px]'
                            : 'self-start bg-secondary text-secondary-foreground rounded-bl-[2px]'
                            }`}
                    >
                        <div className="flex items-center gap-1 text-[0.7rem] mb-1 opacity-80 font-medium">
                            {msg.rol === 'usuario' ? <User size={12} /> : <Bot size={12} />}
                            <span>{msg.rol === 'usuario' ? 'Tú' : 'Asistente'}</span>
                        </div>
                        {msg.contenido}
                    </div>
                ))}

                {/* Indicador de escritura: Los tres puntitos saltarines */}
                {escribiendo && (
                    <div className="self-start bg-surface border border-border px-4 py-2 rounded-md rounded-bl-[2px] flex items-center gap-1 w-fit mb-1 animate-in fade-in zoom-in duration-200">
                        <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.32s]"></div>
                        <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.16s]"></div>
                        <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"></div>
                    </div>
                )}

                {/* Este div invisible es el truco para scrollear siempre al final */}
                <div ref={finMensajesRef} />
            </div>

            <div className="p-4 bg-background border-t border-border">
                {/* Removed old text indicator */}

                <form className="flex gap-2" onSubmit={manejarEnvio}>
                    <div style={{ flex: 1 }}>
                        <CampoTexto
                            placeholder="Escribe un mensaje..."
                            value={valorEntrada}
                            onChange={(e) => setValorEntrada(e.target.value)}
                        // No pasamos etiqueta para que sea simple
                        />
                    </div>

                    {/* Botón de envío personalizado o simple */}
                    <Boton
                        type="submit"
                        disabled={!valorEntrada.trim() || escribiendo}
                        icono={<Send size={18} />}
                        onClick={manejarEnvio}
                    >

                    </Boton>
                </form>
            </div>
        </div>
    );
};
