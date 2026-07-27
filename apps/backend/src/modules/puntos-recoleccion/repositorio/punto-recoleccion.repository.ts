import { PuntoRecoleccion } from '../dominio/entities/punto-recoleccion.entity';

export const PUNTO_RECOLECCION_REPOSITORY = 'PUNTO_RECOLECCION_REPOSITORY';

export interface CrearPuntoRecoleccionDatos {
  nombre: string;
  referencia?: string;
  latitud: number;
  longitud: number;
  activo?: boolean;
}

export interface ActualizarPuntoRecoleccionDatos {
  nombre?: string;
  referencia?: string;
  latitud?: number;
  longitud?: number;
  activo?: boolean;
}

export interface PuntoRecoleccionRepository {
  crear(datos: CrearPuntoRecoleccionDatos): Promise<PuntoRecoleccion>;
  buscarTodos(): Promise<PuntoRecoleccion[]>;
  buscarPorId(id: number): Promise<PuntoRecoleccion | null>;
  actualizar(id: number, datos: ActualizarPuntoRecoleccionDatos): Promise<PuntoRecoleccion>;
  eliminar(id: number): Promise<void>;
  cambiarEstado(id: number, activo: boolean): Promise<PuntoRecoleccion>;
}