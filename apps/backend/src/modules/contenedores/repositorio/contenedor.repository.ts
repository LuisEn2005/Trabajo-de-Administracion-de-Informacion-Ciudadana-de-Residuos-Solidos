import {
  Contenedor,
  EstadoContenedor,
  ResumenInventarioContenedores,
  TipoContenedor,
} from '../dominio/entities/contenedor.entity';
import { ContenedorPersistencia } from './prisma/prisma-contenedor.repository';

export const CONTENEDOR_REPOSITORY = Symbol('CONTENEDOR_REPOSITORY');

export interface CrearContenedorDatos {
  codigo: string;
  tipo: TipoContenedor;
  capacidad: number;
  estado?: EstadoContenedor;
  puntoRecoleccionId?: number;
  fechaInstalacion?: Date;
}

export interface ActualizarContenedorDatos {
  codigo?: string;
  tipo?: TipoContenedor;
  capacidad?: number;
  estado?: EstadoContenedor;
  puntoRecoleccionId?: number;
  fechaInstalacion?: Date;
}

export interface IContenedorMapper {
  toDomain(registro: ContenedorPersistencia): Contenedor;
  fromPrisma(contenedor: any): ContenedorPersistencia;
}

export interface ContenedorRepository {
  crear(datos: CrearContenedorDatos): Promise<Contenedor>;
  buscarTodos(): Promise<Contenedor[]>;
  buscarPorId(id: number): Promise<Contenedor | null>;
  actualizar(id: number, datos: ActualizarContenedorDatos): Promise<Contenedor>;
  eliminar(id: number): Promise<void>;
  buscarPorPunto(puntoId: number): Promise<Contenedor[]>;
  cambiarEstado(id: number, estado: EstadoContenedor): Promise<Contenedor>;
  trasladarAPunto(id: number, puntoRecoleccionId: number | null): Promise<Contenedor>;
  obtenerResumenInventario(): Promise<ResumenInventarioContenedores>;
}
