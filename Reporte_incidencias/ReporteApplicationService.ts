import { UUID } from '../../../shared/types/Base';
import { NotFoundError } from '../../../shared/errors/DomainError';
import { ReporteFactory } from '../domain/factories/ReporteFactory';
import { ReporteCiudadano, EstadoReporte } from '../domain/model/ReporteCiudadano';
import { SeguimientoReporte } from '../domain/model/SeguimientoReporte';
import { NotificacionEstado, CanalNotificacion } from '../domain/model/NotificacionEstado';
import {
  IReporteRepositorio,
  ISeguimientoRepositorio,
  INotificacionRepositorio,
} from '../domain/repositories/IReporteRepositorio';

export interface CrearReporteDTO {
  idCiudadano: UUID;
  latitud: number;
  longitud: number;
  distrito: string;
  direccionReferencia: string;
  descripcion: string;
  tipoResiduo: string;
  esAnonimo: boolean;
}

export interface IReporteApplicationService {
  crearReporte(dto: CrearReporteDTO): Promise<UUID>;
  obtenerReporte(idReporte: UUID): Promise<ReporteCiudadano>;
  actualizarEstado(idReporte: UUID, nuevoEstado: EstadoReporte, comentario?: string, idAdministrador?: UUID): Promise<void>;
  listarPorCiudadano(idCiudadano: UUID): Promise<ReporteCiudadano[]>;
}

export class ReporteApplicationService implements IReporteApplicationService {
  constructor(
    private readonly reporteRepo: IReporteRepositorio,
    private readonly seguimientoRepo: ISeguimientoRepositorio,
    private readonly notificacionRepo: INotificacionRepositorio,
  ) {}

  async crearReporte(dto: CrearReporteDTO): Promise<UUID> {
    const reporte = ReporteFactory.crearReporte(dto);
    await this.reporteRepo.guardar(reporte);

    const seguimientoInicial = SeguimientoReporte.registrarCambio(
      reporte.id,
      EstadoReporte.PENDIENTE,
      EstadoReporte.PENDIENTE,
      'Reporte creado',
    );
    await this.seguimientoRepo.guardar(seguimientoInicial);

    return reporte.id;
  }

  async obtenerReporte(idReporte: UUID): Promise<ReporteCiudadano> {
    const reporte = await this.reporteRepo.buscarPorId(idReporte);
    if (!reporte) {
      throw new NotFoundError(`Reporte no encontrado: ${idReporte}`);
    }
    return reporte;
  }

  async actualizarEstado(
    idReporte: UUID,
    nuevoEstado: EstadoReporte,
    comentario?: string,
    idAdministrador?: UUID,
  ): Promise<void> {
    const reporte = await this.obtenerReporte(idReporte);
    const estadoAnterior = reporte.actualizarEstado(nuevoEstado);
    await this.reporteRepo.actualizar(reporte);

    const seguimiento = SeguimientoReporte.registrarCambio(
      idReporte,
      estadoAnterior,
      nuevoEstado,
      comentario,
      idAdministrador,
    );
    await this.seguimientoRepo.guardar(seguimiento);

    if (!reporte.esAnonimo) {
      const notificacion = NotificacionEstado.crear(
        idReporte,
        reporte.idCiudadano,
        CanalNotificacion.EMAIL,
        `Tu reporte cambió de estado a ${nuevoEstado}`,
      );
      await this.notificacionRepo.guardar(notificacion);
    }
  }

  async listarPorCiudadano(idCiudadano: UUID): Promise<ReporteCiudadano[]> {
    return this.reporteRepo.buscarPorCiudadano(idCiudadano);
  }
}
