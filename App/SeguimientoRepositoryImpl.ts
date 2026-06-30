import { PrismaClient } from '@prisma/client';
import { UUID } from '../../../../shared/types/Base';
import { ISeguimientoRepositorio } from '../../domain/repositories/IReporteRepositorio';
import { SeguimientoReporte } from '../../domain/model/SeguimientoReporte';

export class SeguimientoRepositoryImpl implements ISeguimientoRepositorio {
  constructor(private readonly prisma: PrismaClient) {}

  private toDomain(row: any): SeguimientoReporte {
    return SeguimientoReporte.reconstruir(row.id, {
      idReporte: row.idReporte,
      estadoAnterior: row.estadoAnterior,
      estadoNuevo: row.estadoNuevo,
      fechaCambio: row.fechaCambio,
      comentario: row.comentario ?? undefined,
      idAdministrador: row.idAdministrador ?? undefined,
    });
  }

  async guardar(seguimiento: SeguimientoReporte): Promise<void> {
    const data = seguimiento.toPersistence();
    await this.prisma.seguimientoReporte.create({ data });
  }

  async buscarPorReporte(idReporte: UUID): Promise<SeguimientoReporte[]> {
    const rows = await this.prisma.seguimientoReporte.findMany({
      where: { idReporte },
      orderBy: { fechaCambio: 'asc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async obtenerUltimoCambio(idReporte: UUID): Promise<SeguimientoReporte | null> {
    const row = await this.prisma.seguimientoReporte.findFirst({
      where: { idReporte },
      orderBy: { fechaCambio: 'desc' },
    });
    return row ? this.toDomain(row) : null;
  }
}
