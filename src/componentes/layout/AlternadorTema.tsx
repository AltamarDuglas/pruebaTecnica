'use client';

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Boton } from '@/componentes/ui/Boton/Boton';

/**
 * Componente para alternar entre modo claro y oscuro.
 * Se encarga de persistir la preferencia en localStorage y aplicar el atributo data-theme.
 */
export const AlternadorTema: React.FC = () => {
    const [esOscuro, setEsOscuro] = useState(false);
    const [montado, setMontado] = useState(false);

    useEffect(() => {
        setMontado(true);
        // Leer preferencia guardada o del sistema
        const temaGuardado = localStorage.getItem('tema');
        const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Since default global CSS is now Dark/Funnelhot, we must explicitly set 'light' if preferred
        // Default is dark if no preference or if system prefers dark
        if (temaGuardado === 'light') {
            setEsOscuro(false);
            document.documentElement.setAttribute('data-theme', 'light');
        } else if (temaGuardado === 'dark') {
            setEsOscuro(true);
            document.documentElement.setAttribute('data-theme', 'dark');
        } else if (prefiereOscuro) {
            // System preference fallback
            setEsOscuro(true);
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            // Fallback to light if system is light and no storage? 
            // Actually if default CSS is dark, and system is light, we should set light.
            setEsOscuro(false);
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, []);

    const alternar = () => {
        const nuevoEstado = !esOscuro;
        setEsOscuro(nuevoEstado);

        const tema = nuevoEstado ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', tema);
        localStorage.setItem('tema', tema);
    };

    if (!montado) return null; // Evitar hidratación mismatch

    return (
        <Boton
            variante="fantasma"
            onClick={alternar}
            icono={esOscuro ? <Sun size={20} /> : <Moon size={20} />}
            aria-label="Alternar modo oscuro"
            style={{ padding: '0.5rem' }}
        />
    );
};
