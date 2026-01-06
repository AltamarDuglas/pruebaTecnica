'use client';

import { useState } from 'react';
import { useAsistentes } from '@/hooks/useAsistentes';
import { GrillaAsistentes } from '@/componentes/funcionalidades/ListadoAsistentes/GrillaAsistentes';
import { Asistente } from '@/dominio/tipos';
import { Boton } from '@/componentes/ui/Boton/Boton';
import { Plus } from 'lucide-react';


import { ModalCrearAsistente } from '@/componentes/funcionalidades/FormularioAsistente/ModalCrearAsistente';

export default function Inicio() {
  const { asistentes, cargando, eliminarAsistente, refrescar } = useAsistentes();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [asistenteEnEdicion, setAsistenteEnEdicion] = useState<Asistente | null>(null);

  const manejarEliminar = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este asistente? Esta acción no se puede deshacer.')) {
      await eliminarAsistente(id);
    }
  };

  const manejarEditar = (asistente: Asistente) => {
    setAsistenteEnEdicion(asistente);
    setModalAbierto(true);
  };

  const manejarCrear = () => {
    setAsistenteEnEdicion(null);
    setModalAbierto(true);
  };

  const manejarCerrarModal = () => {
    setModalAbierto(false);
    setAsistenteEnEdicion(null);
  };

  const manejarExito = () => {
    manejarCerrarModal();
    refrescar();
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Mesh Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-500/20 blur-[120px] rounded-full mix-blend-screen opacity-30 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/20 blur-[120px] rounded-full mix-blend-screen opacity-30" />
      </div>

      <div className="relative z-10 container mx-auto py-8 max-w-[1400px] px-4 md:px-6">
        {/* Breadcrumb removed */}

        <div className="bg-surface/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-6 md:p-8 animate-in fade-in duration-500 ring-1 ring-white/5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">ASISTENTES IA</h2>

            <Boton onClick={manejarCrear} icono={<Plus size={18} />}>
              CREACIÓN
            </Boton>
          </div>

          <GrillaAsistentes
            asistentes={asistentes}
            cargando={cargando}
            alEditar={manejarEditar}
            alEliminar={manejarEliminar}
            alCrear={manejarCrear}
          />
        </div>

        <ModalCrearAsistente
          abierto={modalAbierto}
          alCerrar={manejarCerrarModal}
          datosIniciales={asistenteEnEdicion}
          alExito={manejarExito}
        />
      </div>
    </div>
  );
}
