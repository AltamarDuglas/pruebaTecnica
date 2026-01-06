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
    <div className="container mx-auto py-8 min-h-screen max-w-[1400px] px-4 md:px-6">
      {/* Breadcrumb removed */}

      <div className="bg-surface border border-border shadow-sm rounded-xl p-6 md:p-8 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">ASISTENTES IA</h2>

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
  );
}
