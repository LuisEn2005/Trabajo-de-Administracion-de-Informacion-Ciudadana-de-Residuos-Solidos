import { Injectable } from '@nestjs/common';
import { Prisma, PuntoRecoleccion as PuntoRecoleccionPrisma, EstadoPuntoRecoleccion } from '@prisma/client';
import { NotFoundError } from '../../../../shared/domain/domain-error';
import { PrismaService } from '../../../../shared/repositorio/prisma/prisma.service';
import { PuntoRecoleccion } from '../../dominio/entities/punto-recoleccion.entity';
import {
  ActualizarPuntoRecoleccionDatos,
  CrearPuntoRecoleccionDatos,
  PuntoRecoleccionRepository,
} from '../punto-recoleccion.repository';

const PRISMA_RECORD_NOT_FOUND = 'P2025';

@Injectable()
export class PrismaPuntoRecoleccionRepository implements PuntoRecoleccionRepository {
  constructor(private readonly prisma: PrismaService) { }

  async crear(datos: CrearPuntoRecoleccionDatos): Promise<PuntoRecoleccion> {
    const estadoEnum = datos.activo === false
      ? EstadoPuntoRecoleccion.INACTIVO
      : EstadoPuntoRecoleccion.ACTIVO;

    const punto = await this.prisma.puntoRecoleccion.create({
      data: {
        nombre: datos.nombre,
        direccion: (datos as any).direccion ?? '',
        referencia: datos.referencia,
        latitud: datos.latitud,
        longitud: datos.longitud,
        estado: estadoEnum,
      },
    });
    return this.toDomain(punto);
  }

  async buscarTodos(): Promise<PuntoRecoleccion[]> {
    const puntos = await this.prisma.puntoRecoleccion.findMany({
      orderBy: { id: 'asc' },
    });
    return puntos.map((p: PuntoRecoleccionPrisma) => this.toDomain(p));
  }

  async buscarPorId(id: number): Promise<PuntoRecoleccion | null> {
    const punto = await this.prisma.puntoRecoleccion.findUnique({ where: { id } });
    return punto ? this.toDomain(punto) : null;
  }

  async actualizar(id: number, datos: ActualizarPuntoRecoleccionDatos): Promise<PuntoRecoleccion> {
    try {
      const estadoEnum = datos.activo !== undefined
        ? (datos.activo ? EstadoPuntoRecoleccion.ACTIVO : EstadoPuntoRecoleccion.INACTIVO)
        : undefined;

      const punto = await this.prisma.puntoRecoleccion.update({
        where: { id },
        data: {
          ...(datos.nombre !== undefined && { nombre: datos.nombre }),
          ...(datos.referencia !== undefined && { referencia: datos.referencia }),
          ...(datos.latitud !== undefined && { latitud: datos.latitud }),
          ...(datos.longitud !== undefined && { longitud: datos.longitud }),
          ...(estadoEnum !== undefined && { estado: estadoEnum }),
        },
      });
      return this.toDomain(punto);
    } catch (error) {
      throw this.traducirErrorPrisma(error, id);
    }
  }

  async cambiarEstado(id: number, activo: boolean): Promise<PuntoRecoleccion> {
    return this.actualizar(id, { activo });
  }

  async eliminar(id: number): Promise<void> {
    try {
      await this.prisma.puntoRecoleccion.delete({ where: { id } });
    } catch (error) {
      throw this.traducirErrorPrisma(error, id);
    }
  }

  private toDomain(punto: PuntoRecoleccionPrisma): PuntoRecoleccion {
    return new PuntoRecoleccion(
      punto.id,
      punto.nombre,
      punto.direccion,
      punto.referencia,
      punto.latitud.toNumber(),
      punto.longitud.toNumber(),
      punto.estado as unknown as import('../../dominio/entities/punto-recoleccion.entity').EstadoPuntoRecoleccion,
      punto.createdAt,
      punto.updatedAt,
    );
  }

  private traducirErrorPrisma(error: unknown, id?: number): Error {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === PRISMA_RECORD_NOT_FOUND) {
        return new NotFoundError(`No se encontró el punto de recolección con ID ${id}.`);
      }
    }
    return error instanceof Error ? error : new Error('Error inesperado en Prisma.');
  }
}