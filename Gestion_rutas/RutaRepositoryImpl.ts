import { PrismaClient } from '@prisma/client';
import { UUID } from '../../../../shared/types/Base';
import { IRutaRepositorio } from '../../domain/repositories/IRutaRepositorio';
import { Ruta, EstadoRuta } from '../../domain/model/Ruta';
import { HorarioRecoleccion } from '../../domain/model/HorarioRecoleccion';

export class RutaRepositoryImpl implements IRutaRepositorio {
  constructor(private readonly prisma: PrismaClient) {}

  private toDomain(row: any): Ruta {
    const horario = HorarioRecoleccion.crear(row.diasSemana, row.horaInicio, row.horaFin, row.frecuenciaDias ?? 1);
    return Ruta.reconstruir(row.id, {
      nombre: row.nombre,
      descripcion: row.descripcion,
      horario,
      idCamionAsignado: row.idCamionAsignado ?? undefined,
      idAdministrador: row.idAdministrador,
      estado: row.estado as EstadoRuta,
      fechaCreacion: row.fechaCreacion,
      fechaUltimaActualizacion: row.fechaUltimaActualizacion,
      zonas: row.zonas ?? [],
    });
  }

  async guardar(ruta: Ruta): Promise<void> {
    const data = ruta.toPersistence();
    await this.prisma.ruta.create({ data });
  }

  async buscarPorId(idRuta: UUID): Promise<Ruta | null> {
    const row = await this.prisma.ruta.findUnique({ where: { id: idRuta } });
    return row ? this.toDomain(row) : null;
  }

  async listarActivas(): Promise<Ruta[]> {
    const rows = await this.prisma.ruta.findMany({ where: { estado: EstadoRuta.ACTIVA } });
    return rows.map((r) => this.toDomain(r));
  }

  async listarPorZona(idZona: UUID): Promise<Ruta[]> {
    const rows = await this.prisma.ruta.findMany({ where: { zonas: { has: idZona } } });
    return rows.map((r) => this.toDomain(r));
  }

  async listarPorCamion(idCamion: UUID): Promise<Ruta[]> {
    const rows = await this.prisma.ruta.findMany({ where: { idCamionAsignado: idCamion } });
    return rows.map((r) => this.toDomain(r));
  }

  async actualizar(ruta: Ruta): Promise<void> {
    const data = ruta.toPersistence();
    await this.prisma.ruta.update({ where: { id: ruta.id }, data });
  }

  async eliminar(idRuta: UUID): Promise<void> {
    await this.prisma.ruta.delete({ where: { id: idRuta } });
  }

  async buscarPorNombre(nombre: string): Promise<Ruta | null> {
    const row = await this.prisma.ruta.findUnique({ where: { nombre } });
    return row ? this.toDomain(row) : null;
  }
}
