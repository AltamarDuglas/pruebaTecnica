import React, { useState, useEffect, useRef } from 'react';
import { Boton } from '@/componentes/ui/Boton/Boton';
import { CampoTexto } from '@/componentes/ui/CampoTexto/CampoTexto';
import { Send, RefreshCw, Bot, User } from 'lucide-react';
import estilos from './SimuladorChat.module.css';

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
        <div className={estilos.contenedor}>
            {/* Header handled by parent page */}

            <div className={estilos.areaMensajes}>
                {mensajes.length === 0 && (
                    <div className={estilos.estadoVacio}>
                        <p>Escribe algo para probar a tu asistente...</p>
                    </div>
                )}

                {mensajes.map((msg) => (
                    <div
                        key={msg.id}
                        className={`${estilos.burbujaMensaje} ${msg.rol === 'usuario' ? estilos.burbujaUsuario : estilos.burbujaBot}`}
                    >
                        <div className={estilos.cabeceraMensaje}>
                            {msg.rol === 'usuario' ? <User size={12} /> : <Bot size={12} />}
                            <span>{msg.rol === 'usuario' ? 'Tú' : 'Asistente'}</span>
                        </div>
                        {msg.contenido}
                    </div>
                ))}

                {/* Typing Bubble Indicator */}
                {escribiendo && (
                    <div className={estilos.burbujaEscribiendo}>
                        <div className={estilos.punto}></div>
                        <div className={estilos.punto}></div>
                        <div className={estilos.punto}></div>
                    </div>
                )}

                {/* Referencia invisible para scroll */}
                <div ref={finMensajesRef} />
            </div>

            <div className={estilos.areaEntrada}>
                {/* Removed old text indicator */}

                <form className={estilos.formulario} onSubmit={manejarEnvio}>
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
