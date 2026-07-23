import { UUID } from '../../../../shared/domain/base';
import { Zona } from '../aggregates/zona';
import { MapaCalor } from '../entities/mapa-calor';
import { AsignacionRecurso } from '../entities/asignacion-recurso';
import { ReporteSemanal } from '../entities/reporte-semanal';

export interface IZonaRepositorio {
  guardar(zona: Zona): Promise<void>;
  buscarPorId(idZona: UUID): Promise<Zona | null>;
  listarPorCriticidad(): Promise<Zona[]>;
  actualizar(zona: Zona): Promise<void>;
}

export interface IMapaCalorRepositorio {
  guardar(mapa: MapaCalor): Promise<void>;
  obtenerUltimo(): Promise<MapaCalor | null>;
  buscarPorFecha(fecha: Date): Promise<MapaCalor | null>;
}

export interface IAsignacionRepositorio {
  guardar(asignacion: AsignacionRecurso): Promise<void>;
  buscarPorId(idAsignacion: UUID): Promise<AsignacionRecurso | null>;
  listarPorZona(idZona: UUID): Promise<AsignacionRecurso[]>;
  actualizar(asignacion: AsignacionRecurso): Promise<void>;
}

export interface IReporteSemanalRepositorio {
  guardar(reporte: ReporteSemanal): Promise<void>;
  buscarPorId(idReporte: UUID): Promise<ReporteSemanal | null>;
  listarPorPeriodo(desde: Date, hasta: Date): Promise<ReporteSemanal[]>;
}
