import { PrismaClient } from '@prisma/client';
import { UUID } from '../../../../shared/types/Base';
import { INotificacionRepositorio } from '../../domain/repositories/IReporteRepositorio';
import { NotificacionEstado, CanalNotificacion, EstadoNotificacion } from '../../domain/model/NotificacionEstado';

export class NotificacionRepositoryImpl implements INotificacionRepositorio {
  constructor(private readonly prisma: PrismaClient) {}

  private toDomain(row: any): NotificacionEstado {
    return NotificacionEstado.reconstruir(row.id, {
      idReporte: row.idReporte,
      idCiudadano: row.idCiudadano,
      canal: row.canal as CanalNotificacion,
      mensaje: row.mensaje,
      estado: row.estado as EstadoNotificacion,
      fechaCreacion: row.fechaCreacion,
      fechaEnvio: row.fechaEnvio ?? undefined,
      intentosFallidos: row.intentosFallidos,
    });
  }

  async guardar(notificacion: NotificacionEstado): Promise<void> {
    const data = notificacion.toPersistence();
    await this.prisma.notificacionEstado.create({ data });
  }

  async buscarPendientes(): Promise<NotificacionEstado[]> {
    const rows = await this.prisma.notificacionEstado.findMany({
      where: { estado: EstadoNotificacion.PENDIENTE },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async buscarFallidas(): Promise<NotificacionEstado[]> {
    const rows = await this.prisma.notificacionEstado.findMany({
      where: { estado: EstadoNotificacion.FALLIDA },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async actualizar(notificacion: NotificacionEstado): Promise<void> {
    const data = notificacion.toPersistence();
    await this.prisma.notificacionEstado.update({ where: { id: notificacion.id }, data });
  }

  async eliminar(idNotificacion: UUID): Promise<void> {
    await this.prisma.notificacionEstado.delete({ where: { id: idNotificacion } });
  }
}
