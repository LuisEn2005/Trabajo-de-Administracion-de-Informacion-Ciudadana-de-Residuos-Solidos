import { Ruta } from '../dominio/entities/ruta.entity';

export const RUTA_REPOSITORY = Symbol('RUTA_REPOSITORY');

export interface CrearRutaDatos {
  numero: number;
  nombre: string;
  descripcionCobertura: string;
  activa?: boolean;
}

export interface ActualizarRutaDatos {
  numero?: number;
  nombre?: string;
  descripcionCobertura?: string;
  activa?: boolean;
}

export interface RutaRepository {
  crear(datos: CrearRutaDatos): Promise<Ruta>;
  buscarTodos(): Promise<Ruta[]>;
  buscarPorId(id: number): Promise<Ruta | null>;
  actualizar(id: number, datos: ActualizarRutaDatos): Promise<Ruta>;
  eliminar(id: number): Promise<void>;
}
