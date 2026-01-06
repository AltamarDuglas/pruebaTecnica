import { LocalStorageRepositorio } from './LocalStorageRepositorio';

// Instancia única (Singleton) del servicio para ser usada en toda la app
export const servicioAsistentes = new LocalStorageRepositorio();
