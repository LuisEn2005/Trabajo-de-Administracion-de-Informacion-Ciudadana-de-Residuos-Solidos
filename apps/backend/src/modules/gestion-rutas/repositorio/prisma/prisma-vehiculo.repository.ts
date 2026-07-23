import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service';
import { Vehiculo } from '../../dominio/entities/vehiculo.entity';
import {
  ActualizarVehiculoDatos,
  CrearVehiculoDatos,
  VehiculoRepository,
} from '../vehiculo.repository';

@Injectable()
export class PrismaVehiculoRepository implements VehiculoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async crear(datos: CrearVehiculoDatos): Promise<Vehiculo> {
    void this.prisma;
    void datos;
    // TODO: Implementar la creación del vehículo mediante Prisma.
    throw new Error('TODO: implementar PrismaVehiculoRepository.crear');
  }

  async buscarTodos(): Promise<Vehiculo[]> {
    void this.prisma;
    // TODO: Implementar la búsqueda de todos los vehículos mediante Prisma.
    throw new Error('TODO: implementar PrismaVehiculoRepository.buscarTodos');
  }

  async buscarPorId(id: number): Promise<Vehiculo | null> {
    void this.prisma;
    void id;
    // TODO: Implementar la búsqueda del vehículo por id mediante Prisma.
    throw new Error('TODO: implementar PrismaVehiculoRepository.buscarPorId');
  }

  async buscarPorRutaId(rutaId: number): Promise<Vehiculo[]> {
    void this.prisma;
    void rutaId;
    // TODO: Implementar la búsqueda de vehículos por ruta mediante Prisma.
    throw new Error('TODO: implementar PrismaVehiculoRepository.buscarPorRutaId');
  }

  async actualizar(id: number, datos: ActualizarVehiculoDatos): Promise<Vehiculo> {
    void this.prisma;
    void id;
    void datos;
    // TODO: Implementar la actualización del vehículo mediante Prisma.
    throw new Error('TODO: implementar PrismaVehiculoRepository.actualizar');
  }

  async eliminar(id: number): Promise<void> {
    void this.prisma;
    void id;
    // TODO: Implementar la eliminación del vehículo mediante Prisma.
    throw new Error('TODO: implementar PrismaVehiculoRepository.eliminar');
  }
}
