import type { Metadata } from 'next';
import './globals.css';
import { CabeceraPrincipal } from '@/componentes/layout/CabeceraPrincipal';

export const metadata: Metadata = {
  title: 'Gestión Asistentes IA',
  description: 'Prueba Técnica - Gestión y Entrenamiento de Asistentes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <div className="contenedor-app">
          <CabeceraPrincipal />
          <main className="contenido-principal">
            {children}
          </main>
          <footer className="pie-pagina">
            <p>Prueba Técnica - 2026</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
