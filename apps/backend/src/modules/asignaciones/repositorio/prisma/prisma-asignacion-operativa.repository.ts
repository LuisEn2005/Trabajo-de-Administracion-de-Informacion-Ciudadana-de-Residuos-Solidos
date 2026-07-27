import { Injectable } from '@nestjs/common';
import { manejarErrorPrisma } from '../../../../shared/repositorio/prisma/manejar-error-prisma';
import { PrismaService } from '../../../../shared/repositorio/prisma/prisma.service';
import {
  AsignacionOperativa,
  EstadoAsignacionOperativa,
} from '../../dominio/entities/asignacion-operativa.entity';
import {
  ActualizarAsignacionOperativaDatos,
  AsignacionOperativaRepository,
  CrearAsignacionOperativaDatos,
} from '../asignacion-operativa.repository';

export interface AsignacionOperativaPersistencia {
  id: number;
  rutaId: number;
  vehiculoId: number;
  horarioId: number;
  estado: EstadoAsignacionOperativa;
  fecha: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface AsignacionOperativaDelegate {
  create(args: {
    data: {
      rutaId: number;
      vehiculoId: number;
      horarioId: number;
      estado: EstadoAsignacionOperativa;
      fecha?: Date;
    };
  }): Promise<AsignacionOperativaPersistencia>;
  findMany(args?: {
    where?: {
      rutaId?: number;
      vehiculoId?: number;
      estado?: {
        in: EstadoAsignacionOperativa[];
      };
    };
    orderBy?: Array<{ fecha?: 'asc' | 'desc' } | { id?: 'asc' | 'desc' }>;
  }): Promise<AsignacionOperativaPersistencia[]>;
  findUnique(args: { where: { id: number } }): Promise<AsignacionOperativaPersistencia | null>;
  update(args: {
    where: { id: number };
    data: {
      rutaId?: number;
      vehiculoId?: number;
      horarioId?: number;
      estado?: EstadoAsignacionOperativa;
      fecha?: Date;
    };
  }): Promise<AsignacionOperativaPersistencia>;
  delete(args: { where: { id: number } }): Promise<AsignacionOperativaPersistencia>;
}

@Injectable()
export class PrismaAsignacionOperativaRepository implements AsignacionOperativaRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get asignacionOperativa(): AsignacionOperativaDelegate {
    return (this.prisma as unknown as { asignacionOperativa: AsignacionOperativaDelegate })
      .asignacionOperativa;
  }

  async crear(datos: CrearAsignacionOperativaDatos): Promise<AsignacionOperativa> {
    try {
      const registro = await this.asignacionOperativa.create({
        data: {
          rutaId: datos.rutaId,
          vehiculoId: datos.vehiculoId,
          horarioId: datos.horarioId,
          estado: datos.estado ?? EstadoAsignacionOperativa.PROGRAMADA,
          fecha: datos.fecha ?? undefined,
        },
      });

      return this.mapearAsignacion(registro);
    } catch (error) {
      return manejarErrorPrisma(error, 'crear la asignación operativa');
    }
  }

  async buscarTodos(): Promise<AsignacionOperativa[]> {
    try {
      const registros = await this.asignacionOperativa.findMany({
        orderBy: [
          {
            fecha: 'asc',
          },
          {
            id: 'asc',
          },
        ],
      });

      return registros.map((registro: AsignacionOperativaPersistencia) =>
        this.mapearAsignacion(registro),
      );
    } catch (error) {
      return manejarErrorPrisma(error, 'buscar las asignaciones operativas');
    }
  }

  async buscarPorId(id: number): Promise<AsignacionOperativa | null> {
    try {
      const registro = await this.asignacionOperativa.findUnique({
        where: {
          id,
        },
      });

      return registro ? this.mapearAsignacion(registro) : null;
    } catch (error) {
      return manejarErrorPrisma(error, 'buscar la asignación operativa por id');
    }
  }

  async actualizar(
    id: number,
    datos: ActualizarAsignacionOperativaDatos,
  ): Promise<AsignacionOperativa> {
    try {
      const registro = await this.asignacionOperativa.update({
        where: {
          id,
        },
        data: {
          rutaId: datos.rutaId,
          vehiculoId: datos.vehiculoId,
          horarioId: datos.horarioId,
          estado: datos.estado,
          fecha: datos.fecha ?? undefined,
        },
      });

      return this.mapearAsignacion(registro);
    } catch (error) {
      return manejarErrorPrisma(error, 'actualizar la asignación operativa');
    }
  }

  async eliminar(id: number): Promise<void> {
    try {
      await this.asignacionOperativa.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      return manejarErrorPrisma(error, 'eliminar la asignación operativa');
    }
  }

  async buscarPorRuta(rutaId: number): Promise<AsignacionOperativa[]> {
    try {
      const registros = await this.asignacionOperativa.findMany({
        where: {
          rutaId,
        },
        orderBy: [
          {
            fecha: 'asc',
          },
          {
            id: 'asc',
          },
        ],
      });

      return registros.map((registro: AsignacionOperativaPersistencia) =>
        this.mapearAsignacion(registro),
      );
    } catch (error) {
      return manejarErrorPrisma(error, 'buscar las asignaciones operativas por ruta');
    }
  }

  async buscarPorVehiculo(vehiculoId: number): Promise<AsignacionOperativa[]> {
    try {
      const registros = await this.asignacionOperativa.findMany({
        where: {
          vehiculoId,
        },
        orderBy: [
          {
            fecha: 'asc',
          },
          {
            id: 'asc',
          },
        ],
      });

      return registros.map((registro: AsignacionOperativaPersistencia) =>
        this.mapearAsignacion(registro),
      );
    } catch (error) {
      return manejarErrorPrisma(error, 'buscar las asignaciones operativas por vehículo');
    }
  }

  async buscarProgramacionPublica(): Promise<AsignacionOperativa[]> {
    try {
      const registros = await this.asignacionOperativa.findMany({
        where: {
          estado: {
            in: [EstadoAsignacionOperativa.PROGRAMADA, EstadoAsignacionOperativa.ACTIVA],
          },
        },
        orderBy: [
          {
            fecha: 'asc',
          },
          {
            id: 'asc',
          },
        ],
      });

      return registros.map((registro: AsignacionOperativaPersistencia) =>
        this.mapearAsignacion(registro),
      );
    } catch (error) {
      return manejarErrorPrisma(error, 'buscar la programación pública de asignaciones');
    }
  }

  mapearAsignacion(registro: AsignacionOperativaPersistencia): AsignacionOperativa {
    return new AsignacionOperativa(
      registro.id,
      registro.rutaId,
      registro.vehiculoId,
      registro.horarioId,
      registro.estado,
      registro.fecha,
      registro.createdAt,
      registro.updatedAt,
    );
  }
}
