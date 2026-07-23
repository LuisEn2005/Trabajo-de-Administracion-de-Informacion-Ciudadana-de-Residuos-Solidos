import { DiaSemana, FrecuenciaRuta, HorarioRuta, Turno } from '../dominio/entities/horario-ruta.entity';

export const HORARIO_RUTA_REPOSITORY = Symbol('HORARIO_RUTA_REPOSITORY');

export interface CrearHorarioRutaDatos {
  rutaId: number;
  frecuencia: FrecuenciaRuta;
  diaSemana: DiaSemana;
  turno: Turno;
  horaInicio: string;
  horaFin: string;
  activo?: boolean;
}

export interface ActualizarHorarioRutaDatos {
  frecuencia?: FrecuenciaRuta;
  diaSemana?: DiaSemana;
  turno?: Turno;
  horaInicio?: string;
  horaFin?: string;
  activo?: boolean;
}

export interface HorarioRutaRepository {
  crear(datos: CrearHorarioRutaDatos): Promise<HorarioRuta>;
  buscarTodos(): Promise<HorarioRuta[]>;
  buscarPorId(id: number): Promise<HorarioRuta | null>;
  buscarPorRutaId(rutaId: number): Promise<HorarioRuta[]>;
  actualizar(id: number, datos: ActualizarHorarioRutaDatos): Promise<HorarioRuta>;
  eliminar(id: number): Promise<void>;
}
