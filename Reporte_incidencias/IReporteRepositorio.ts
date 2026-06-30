import { UUID } from '../../../../shared/types/Base';
import { ReporteCiudadano, EstadoReporte } from '../model/ReporteCiudadano';
import { SeguimientoReporte } from '../model/SeguimientoReporte';
import { NotificacionEstado } from '../model/NotificacionEstado';

export interface IReporteRepositorio {
  guardar(reporte: ReporteCiudadano): Promise<void>;
  buscarPorId(idReporte: UUID): Promise<ReporteCiudadano | null>;
  buscarPorCiudadano(idCiudadano: UUID): Promise<ReporteCiudadano[]>;
  listarPorEstado(estado: EstadoReporte): Promise<ReporteCiudadano[]>;
  listarPorZona(idZona: UUID, desde?: Date, hasta?: Date): Promise<ReporteCiudadano[]>;
  actualizar(reporte: ReporteCiudadano): Promise<void>;
  eliminar(idReporte: UUID): Promise<void>;
  contarPorZonaYPeriodo(idZona: UUID, desde: Date, hasta: Date): Promise<number>;
}

export interface ISeguimientoRepositorio {
  guardar(seguimiento: SeguimientoReporte): Promise<void>;
  buscarPorReporte(idReporte: UUID): Promise<SeguimientoReporte[]>;
  obtenerUltimoCambio(idReporte: UUID): Promise<SeguimientoReporte | null>;
}

export interface INotificacionRepositorio {
  guardar(notificacion: NotificacionEstado): Promise<void>;
  buscarPendientes(): Promise<NotificacionEstado[]>;
  buscarFallidas(): Promise<NotificacionEstado[]>;
  actualizar(notificacion: NotificacionEstado): Promise<void>;
  eliminar(idNotificacion: UUID): Promise<void>;
}
