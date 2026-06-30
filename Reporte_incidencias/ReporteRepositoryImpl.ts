import { PrismaClient } from '@prisma/client';
import { UUID } from '../../../../shared/types/Base';
import { IReporteRepositorio } from '../../domain/repositories/IReporteRepositorio';
import { ReporteCiudadano, EstadoReporte } from '../../domain/model/ReporteCiudadano';
import { Ubicacion } from '../../domain/model/Ubicacion';
import { Foto } from '../../domain/model/Foto';

export class ReporteRepositoryImpl implements IReporteRepositorio {
  constructor(private readonly prisma: PrismaClient) {}

  private toDomain(row: any, fotos: any[] = []): ReporteCiudadano {
    const ubicacion = Ubicacion.crear(row.latitud, row.longitud, row.distrito, row.direccionReferencia);
    return ReporteCiudadano.reconstruir(row.id, {
      idCiudadano: row.idCiudadano,
      ubicacion,
      descripcion: row.descripcion,
      fotos: fotos.map((f) => Foto.reconstruir(f.id, f)),
      estadoReporte: row.estadoReporte as EstadoReporte,
      fechaCreacion: row.fechaCreacion,
      fechaUltimaActualizacion: row.fechaUltimaActualizacion,
      esAnonimo: row.esAnonimo,
      tipoResiduo: row.tipoResiduo,
    });
  }

  async guardar(reporte: ReporteCiudadano): Promise<void> {
    const data = reporte.toPersistence();
    await this.prisma.reporteCiudadano.create({ data });
  }

  async buscarPorId(idReporte: UUID): Promise<ReporteCiudadano | null> {
    const row = await this.prisma.reporteCiudadano.findUnique({
      where: { id: idReporte },
      include: { fotos: true },
    });
    return row ? this.toDomain(row, row.fotos) : null;
  }

  async buscarPorCiudadano(idCiudadano: UUID): Promise<ReporteCiudadano[]> {
    const rows = await this.prisma.reporteCiudadano.findMany({
      where: { idCiudadano },
      include: { fotos: true },
    });
    return rows.map((r) => this.toDomain(r, r.fotos));
  }

  async listarPorEstado(estado: EstadoReporte): Promise<ReporteCiudadano[]> {
    const rows = await this.prisma.reporteCiudadano.findMany({
      where: { estadoReporte: estado },
      include: { fotos: true },
    });
    return rows.map((r) => this.toDomain(r, r.fotos));
  }

  async listarPorZona(idZona: UUID, desde?: Date, hasta?: Date): Promise<ReporteCiudadano[]> {
    const rows = await this.prisma.reporteCiudadano.findMany({
      where: {
        zonaId: idZona,
        ...(desde && hasta ? { fechaCreacion: { gte: desde, lte: hasta } } : {}),
      },
      include: { fotos: true },
    });
    return rows.map((r) => this.toDomain(r, r.fotos));
  }

  async actualizar(reporte: ReporteCiudadano): Promise<void> {
    const data = reporte.toPersistence();
    await this.prisma.reporteCiudadano.update({ where: { id: reporte.id }, data });
  }

  async eliminar(idReporte: UUID): Promise<void> {
    await this.prisma.reporteCiudadano.delete({ where: { id: idReporte } });
  }

  async contarPorZonaYPeriodo(idZona: UUID, desde: Date, hasta: Date): Promise<number> {
    return this.prisma.reporteCiudadano.count({
      where: { zonaId: idZona, fechaCreacion: { gte: desde, lte: hasta } },
    });
  }
}
