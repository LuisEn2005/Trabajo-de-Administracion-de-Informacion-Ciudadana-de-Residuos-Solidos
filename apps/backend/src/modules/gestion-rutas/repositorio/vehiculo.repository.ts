import { TipoCarroceria, Vehiculo } from '../dominio/entities/vehiculo.entity';

export const VEHICULO_REPOSITORY = Symbol('VEHICULO_REPOSITORY');

export interface CrearVehiculoDatos {
  placa: string;
  carroceria: TipoCarroceria;
  rutaId: number;
  activo?: boolean;
}

export interface ActualizarVehiculoDatos {
  placa?: string;
  carroceria?: TipoCarroceria;
  rutaId?: number;
  activo?: boolean;
}

export interface VehiculoRepository {
  crear(datos: CrearVehiculoDatos): Promise<Vehiculo>;
  buscarTodos(): Promise<Vehiculo[]>;
  buscarPorId(id: number): Promise<Vehiculo | null>;
  buscarPorRutaId(rutaId: number): Promise<Vehiculo[]>;
  actualizar(id: number, datos: ActualizarVehiculoDatos): Promise<Vehiculo>;
  eliminar(id: number): Promise<void>;
}
