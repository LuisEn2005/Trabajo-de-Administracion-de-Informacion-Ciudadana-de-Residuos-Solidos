import { PrismaClient } from '@prisma/client';
import { UUID } from '../../../../shared/types/Base';
import { ISesionRepositorio } from '../../domain/repositories/IUsuarioRepositorio';
import { Sesion, EstadoSesion } from '../../domain/model/Sesion';

export class SesionRepositoryImpl implements ISesionRepositorio {
  constructor(private readonly prisma: PrismaClient) {}

  private toDomain(row: any): Sesion {
    return Sesion.reconstruir(row.id, {
      idUsuario: row.idUsuario,
      token: row.token,
      fechaInicio: row.fechaInicio,
      fechaExpiracion: row.fechaExpiracion,
      ipOrigen: row.ipOrigen ?? undefined,
      estado: row.estado as EstadoSesion,
    });
  }

  async guardar(sesion: Sesion): Promise<void> {
    const data = sesion.toPersistence();
    await this.prisma.sesion.create({ data });
  }

  async buscarPorToken(token: string): Promise<Sesion | null> {
    const row = await this.prisma.sesion.findUnique({ where: { token } });
    return row ? this.toDomain(row) : null;
  }

  async buscarPorIdUsuario(idUsuario: UUID): Promise<Sesion[]> {
    const rows = await this.prisma.sesion.findMany({ where: { idUsuario } });
    return rows.map((r) => this.toDomain(r));
  }

  async actualizar(sesion: Sesion): Promise<void> {
    const data = sesion.toPersistence();
    await this.prisma.sesion.update({ where: { id: sesion.id }, data });
  }

  async eliminarPorIdUsuario(idUsuario: UUID): Promise<number> {
    const result = await this.prisma.sesion.updateMany({
      where: { idUsuario },
      data: { estado: EstadoSesion.CERRADA },
    });
    return result.count;
  }

  async limpiarExpiradas(): Promise<number> {
    const result = await this.prisma.sesion.updateMany({
      where: { fechaExpiracion: { lt: new Date() } },
      data: { estado: EstadoSesion.EXPIRADA },
    });
    return result.count;
  }
}
