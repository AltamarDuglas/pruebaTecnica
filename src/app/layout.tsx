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
        <div className="relative flex min-h-screen flex-col bg-background font-sans antialiased text-foreground">
          <CabeceraPrincipal />
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-border/40 py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row mx-auto px-4 md:px-6">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">Prueba Técnica - 2026</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
