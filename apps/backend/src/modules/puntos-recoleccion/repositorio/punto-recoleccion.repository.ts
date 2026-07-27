import {
  EstadoPuntoRecoleccion,
  PuntoRecoleccion,
} from '../dominio/entities/punto-recoleccion.entity';

export const PUNTO_RECOLECCION_REPOSITORY = Symbol('PUNTO_RECOLECCION_REPOSITORY');

export interface CrearPuntoRecoleccionDatos {
  nombre: string;
  direccion: string;
  referencia?: string;
  latitud: number;
  longitud: number;
  estado?: EstadoPuntoRecoleccion;
}

export interface ActualizarPuntoRecoleccionDatos {
  nombre?: string;
  direccion?: string;
  referencia?: string;
  latitud?: number;
  longitud?: number;
  estado?: EstadoPuntoRecoleccion;
}

export interface PuntoRecoleccionRepository {
  crear(datos: CrearPuntoRecoleccionDatos): Promise<PuntoRecoleccion>;
  buscarTodos(): Promise<PuntoRecoleccion[]>;
  buscarPorId(id: number): Promise<PuntoRecoleccion | null>;
  actualizar(id: number, datos: ActualizarPuntoRecoleccionDatos): Promise<PuntoRecoleccion>;
  eliminar(id: number): Promise<void>;
  cambiarEstado(id: number, estado: EstadoPuntoRecoleccion): Promise<PuntoRecoleccion>;
}
