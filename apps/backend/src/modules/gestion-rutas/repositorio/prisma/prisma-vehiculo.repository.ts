import { Injectable } from '@nestjs/common';
import { Prisma, Vehiculo as VehiculoPrisma } from '@prisma/client';
import { ConflictError, NotFoundError } from '../../../../shared/domain/domain-error';
import { PrismaService } from '../../../../shared/repositorio/prisma/prisma.service';
import { TipoCarroceria, Vehiculo, VehiculoProps } from '../../dominio/entities/vehiculo.entity';
import {
  ActualizarVehiculoDatos,
  CrearVehiculoDatos,
  VehiculoRepository,
} from '../vehiculo.repository';

const PRISMA_UNIQUE_CONSTRAINT = 'P2002';
const PRISMA_RECORD_NOT_FOUND = 'P2025';

@Injectable()
export class PrismaVehiculoRepository implements VehiculoRepository {
  constructor(private readonly prisma: PrismaService) { }

  async crear(datos: CrearVehiculoDatos): Promise<Vehiculo> {
    try {
      const vehiculo = await this.prisma.vehiculo.create({
        data: {
          placa: datos.placa,
          carroceria: datos.carroceria,
          rutaId: datos.rutaId,
          activo: datos.activo ?? true,
        },
      });
      return this.toDomain(vehiculo);
    } catch (error) {
      throw this.traducirErrorPrisma(error, datos.placa);
    }
  }

  async buscarTodos(): Promise<Vehiculo[]> {
    const vehiculos = await this.prisma.vehiculo.findMany({
      orderBy: { id: 'asc' },
    });
    return vehiculos.map((vehiculo: VehiculoPrisma) => this.toDomain(vehiculo));
  }

  async buscarPorId(id: number): Promise<Vehiculo | null> {
    const vehiculo = await this.prisma.vehiculo.findUnique({ where: { id } });
    return vehiculo ? this.toDomain(vehiculo) : null;
  }

  async buscarPorRutaId(rutaId: number): Promise<Vehiculo[]> {
    const vehiculos = await this.prisma.vehiculo.findMany({
      where: { rutaId },
      orderBy: { id: 'asc' },
    });
    return vehiculos.map((vehiculo: VehiculoPrisma) => this.toDomain(vehiculo));
  }

  async actualizar(id: number, datos: ActualizarVehiculoDatos): Promise<Vehiculo> {
    try {
      const vehiculo = await this.prisma.vehiculo.update({
        where: { id },
        data: {
          ...(datos.placa !== undefined && { placa: datos.placa }),
          ...(datos.carroceria !== undefined && { carroceria: datos.carroceria }),
          ...(datos.rutaId !== undefined && { rutaId: datos.rutaId }),
          ...(datos.activo !== undefined && { activo: datos.activo }),
        },
      });
      return this.toDomain(vehiculo);
    } catch (error) {
      throw this.traducirErrorPrisma(error, datos.placa, id);
    }
  }

  async eliminar(id: number): Promise<void> {
    try {
      await this.prisma.vehiculo.delete({ where: { id } });
    } catch (error) {
      throw this.traducirErrorPrisma(error, undefined, id);
    }
  }

  private toDomain(vehiculo: VehiculoPrisma): Vehiculo {
    const props: VehiculoProps = {
      placa: vehiculo.placa,
      carroceria: vehiculo.carroceria as TipoCarroceria,
      rutaId: vehiculo.rutaId,
      activo: vehiculo.activo,
      createdAt: vehiculo.createdAt,
      updatedAt: vehiculo.updatedAt,
    };
    return new Vehiculo(vehiculo.id, props);
  }

  private traducirErrorPrisma(error: unknown, placa?: string, id?: number): Error {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === PRISMA_UNIQUE_CONSTRAINT) {
        return new ConflictError(`Ya existe un vehiculo con placa "${placa}".`);
      }
      if (error.code === PRISMA_RECORD_NOT_FOUND) {
        return new NotFoundError(`No se encontro vehiculo ${id}.`);
      }
    }
    return error instanceof Error ? error : new Error('Error inesperado en Prisma.');
  }
}
