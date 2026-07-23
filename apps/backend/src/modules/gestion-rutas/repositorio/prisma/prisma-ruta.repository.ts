import { Injectable } from '@nestjs/common';
import { manejarErrorPrisma } from '../../../../shared/repositorio/prisma/manejar-error-prisma';
import { PrismaService } from '../../../../shared/repositorio/prisma/prisma.service';
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
    try {
      const ruta = await this.prisma.ruta.create({
        data: {
          numero: datos.numero,
          nombre: datos.nombre,
          descripcionCobertura: datos.descripcionCobertura,
          activa: datos.activa,
        },
      });

      return this.mapearRuta(ruta);
    } catch (error) {
      manejarErrorPrisma(error, 'crear la ruta');
    }
  }

  async buscarTodos(): Promise<Ruta[]> {
    try {
      const rutas = await this.prisma.ruta.findMany({
        orderBy: {
          numero: 'asc',
        },
      });

      return rutas.map((ruta) => this.mapearRuta(ruta));
    } catch (error) {
      manejarErrorPrisma(error, 'buscar todas las rutas');
    }
  }

  async buscarPorId(id: number): Promise<Ruta | null> {
    try {
      const ruta = await this.prisma.ruta.findUnique({
        where: {
          id,
        },
      });

      return ruta ? this.mapearRuta(ruta) : null;
    } catch (error) {
      manejarErrorPrisma(error, 'buscar la ruta por id');
    }
  }

  async actualizar(id: number, datos: ActualizarRutaDatos): Promise<Ruta> {
    try {
      const ruta = await this.prisma.ruta.update({
        where: {
          id,
        },
        data: {
          numero: datos.numero,
          nombre: datos.nombre,
          descripcionCobertura: datos.descripcionCobertura,
          activa: datos.activa,
        },
      });

      return this.mapearRuta(ruta);
    } catch (error) {
      manejarErrorPrisma(error, 'actualizar la ruta');
    }
  }

  async eliminar(id: number): Promise<void> {
    try {
      await this.prisma.ruta.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      manejarErrorPrisma(error, 'eliminar la ruta');
    }
  }

  private mapearRuta(ruta: {
    id: number;
    numero: number;
    nombre: string;
    descripcionCobertura: string;
    activa: boolean;
    createdAt: Date;
    updatedAt: Date;
  }): Ruta {
    return new Ruta(ruta.id, {
      numero: ruta.numero,
      nombre: ruta.nombre,
      descripcionCobertura: ruta.descripcionCobertura,
      activa: ruta.activa,
      createdAt: ruta.createdAt,
      updatedAt: ruta.updatedAt,
    });
  }
}
