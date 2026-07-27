import {
  AsignacionOperativa,
  EstadoAsignacionOperativa,
} from '../dominio/entities/asignacion-operativa.entity';

export const ASIGNACION_OPERATIVA_REPOSITORY = Symbol('ASIGNACION_OPERATIVA_REPOSITORY');

export interface CrearAsignacionOperativaDatos {
  rutaId: number;
  vehiculoId: number;
  horarioId: number;
  estado?: EstadoAsignacionOperativa;
  fecha?: Date;
}

export interface ActualizarAsignacionOperativaDatos {
  rutaId?: number;
  vehiculoId?: number;
  horarioId?: number;
  estado?: EstadoAsignacionOperativa;
  fecha?: Date;
}

export interface AsignacionOperativaRepository {
  crear(datos: CrearAsignacionOperativaDatos): Promise<AsignacionOperativa>;
  buscarTodos(): Promise<AsignacionOperativa[]>;
  buscarPorId(id: number): Promise<AsignacionOperativa | null>;
  actualizar(id: number, datos: ActualizarAsignacionOperativaDatos): Promise<AsignacionOperativa>;
  eliminar(id: number): Promise<void>;
  buscarPorRuta(rutaId: number): Promise<AsignacionOperativa[]>;
  buscarPorVehiculo(vehiculoId: number): Promise<AsignacionOperativa[]>;
  buscarProgramacionPublica(): Promise<AsignacionOperativa[]>;
}
