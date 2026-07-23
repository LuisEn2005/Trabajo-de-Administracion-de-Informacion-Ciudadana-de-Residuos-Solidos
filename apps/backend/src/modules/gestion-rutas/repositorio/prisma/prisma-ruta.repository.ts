import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service';
import { Ruta } from '../../dominio/entities/ruta.entity';
import {
  ActualizarRutaDatos,
  CrearRutaDatos,
  RutaRepository,
} from '../ruta.repository';

@Injectable()
export class PrismaRutaRepository implements RutaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async crear(datos: CrearRutaDatos): Promise<Ruta> {
    void this.prisma;
    void datos;
    // TODO: Implementar la creación de la ruta mediante Prisma.
    throw new Error('TODO: implementar PrismaRutaRepository.crear');
  }

  async buscarTodos(): Promise<Ruta[]> {
    void this.prisma;
    // TODO: Implementar la búsqueda de todas las rutas mediante Prisma.
    throw new Error('TODO: implementar PrismaRutaRepository.buscarTodos');
  }

  async buscarPorId(id: number): Promise<Ruta | null> {
    void this.prisma;
    void id;
    // TODO: Implementar la búsqueda de la ruta por id mediante Prisma.
    throw new Error('TODO: implementar PrismaRutaRepository.buscarPorId');
  }

  async actualizar(id: number, datos: ActualizarRutaDatos): Promise<Ruta> {
    void this.prisma;
    void id;
    void datos;
    // TODO: Implementar la actualización de la ruta mediante Prisma.
    throw new Error('TODO: implementar PrismaRutaRepository.actualizar');
  }

  async eliminar(id: number): Promise<void> {
    void this.prisma;
    void id;
    // TODO: Implementar la eliminación de la ruta mediante Prisma.
    throw new Error('TODO: implementar PrismaRutaRepository.eliminar');
  }
}
