'use client';

import { useState } from 'react';
import { useAsistentes } from '@/hooks/useAsistentes';
import { GrillaAsistentes } from '@/componentes/funcionalidades/ListadoAsistentes/GrillaAsistentes';
import { Asistente } from '@/dominio/tipos';
import { Boton } from '@/componentes/ui/Boton/Boton';
import { Plus } from 'lucide-react';
import estilos from './page.module.css';

// TODO: Importar Modal de Creación cuando esté implementado
// import { ModalCrearAsistente } from '@/componentes/funcionalidades/FormularioAsistente/ModalCrearAsistente';

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
    console.log("Editando", asistente); // Temporal
    setAsistenteEnEdicion(asistente);
    setModalAbierto(true);
  };

  const manejarCrear = () => {
    console.log("Creando nuevo"); // Temporal
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
    <div className={estilos.contenedor}>
      <div className={estilos.tarjetaPrincipal}>
        <div className={estilos.filaCabecera}>
          <h2 className={estilos.titulo}>Asistentes IA</h2>

          <Boton onClick={manejarCrear} icono={<Plus size={18} />}>
            Creación
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

      {/* TODO: Integrar Modal Real */}
      {/* 
      <ModalCrearAsistente
        abierto={modalAbierto}
        alCerrar={manejarCerrarModal}
        datosIniciales={asistenteEnEdicion}
        alExito={manejarExito}
      /> 
      */}
    </div>
  );
}
