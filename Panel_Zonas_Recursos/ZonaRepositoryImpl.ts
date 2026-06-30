import { PrismaClient } from '@prisma/client';
import { UUID } from '../../../../shared/types/Base';
import { IZonaRepositorio } from '../../domain/repositories/IZonaRepositorio';
import { Zona } from '../../domain/model/Zona';

export class ZonaRepositoryImpl implements IZonaRepositorio {
  constructor(private readonly prisma: PrismaClient) {}

  private toDomain(row: any): Zona {
    return Zona.reconstruir(row.id, {
      nombre: row.nombre,
      distrito: row.distrito,
      nivelCriticidad: row.nivelCriticidad,
      fechaUltimoCalculo: row.fechaUltimoCalculo,
    });
  }

  async guardar(zona: Zona): Promise<void> {
    const data = zona.toPersistence();
    await this.prisma.zona.create({ data });
  }

  async buscarPorId(idZona: UUID): Promise<Zona | null> {
    const row = await this.prisma.zona.findUnique({ where: { id: idZona } });
    return row ? this.toDomain(row) : null;
  }

  async listarPorCriticidad(): Promise<Zona[]> {
    const rows = await this.prisma.zona.findMany({ orderBy: { nivelCriticidad: 'desc' } });
    return rows.map((r) => this.toDomain(r));
  }

  async actualizar(zona: Zona): Promise<void> {
    const data = zona.toPersistence();
    await this.prisma.zona.update({ where: { id: zona.id }, data });
  }
}
