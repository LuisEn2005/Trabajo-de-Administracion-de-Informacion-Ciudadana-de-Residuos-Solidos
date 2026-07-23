import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/repositorio/prisma/prisma.service';
import { HorarioRuta } from '../../dominio/entities/horario-ruta.entity';
import {
  ActualizarHorarioRutaDatos,
  CrearHorarioRutaDatos,
  HorarioRutaRepository,
} from '../horario-ruta.repository';

@Injectable()
export class PrismaHorarioRutaRepository implements HorarioRutaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async crear(datos: CrearHorarioRutaDatos): Promise<HorarioRuta> {
    void this.prisma;
    void datos;
    // TODO: Implementar la creación del horario de ruta mediante Prisma.
    throw new Error('TODO: implementar PrismaHorarioRutaRepository.crear');
  }

  async buscarTodos(): Promise<HorarioRuta[]> {
    void this.prisma;
    // TODO: Implementar la búsqueda de todos los horarios de ruta mediante Prisma.
    throw new Error('TODO: implementar PrismaHorarioRutaRepository.buscarTodos');
  }

  async buscarPorId(id: number): Promise<HorarioRuta | null> {
    void this.prisma;
    void id;
    // TODO: Implementar la búsqueda del horario de ruta por id mediante Prisma.
    throw new Error('TODO: implementar PrismaHorarioRutaRepository.buscarPorId');
  }

  async buscarPorRutaId(rutaId: number): Promise<HorarioRuta[]> {
    void this.prisma;
    void rutaId;
    // TODO: Implementar la búsqueda de horarios por ruta mediante Prisma.
    throw new Error('TODO: implementar PrismaHorarioRutaRepository.buscarPorRutaId');
  }

  async actualizar(id: number, datos: ActualizarHorarioRutaDatos): Promise<HorarioRuta> {
    void this.prisma;
    void id;
    void datos;
    // TODO: Implementar la actualización del horario de ruta mediante Prisma.
    throw new Error('TODO: implementar PrismaHorarioRutaRepository.actualizar');
  }

  async eliminar(id: number): Promise<void> {
    void this.prisma;
    void id;
    // TODO: Implementar la eliminación del horario de ruta mediante Prisma.
    throw new Error('TODO: implementar PrismaHorarioRutaRepository.eliminar');
  }
}
