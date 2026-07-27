import { Injectable } from '@nestjs/common';
import { HorarioRuta as HorarioRutaPrisma } from '@prisma/client';
import { manejarErrorPrisma } from '../../../../shared/repositorio/prisma/manejar-error-prisma';
import { PrismaService } from '../../../../shared/repositorio/prisma/prisma.service';
import {
  ActualizarHorarioRutaDatos,
  CrearHorarioRutaDatos,
  HorarioRutaRepository,
} from '../horario-ruta.repository';
import {
  DiaSemana,
  FrecuenciaRuta,
  HorarioRuta,
  Turno,
} from '../../dominio/entities/horario-ruta.entity';

@Injectable()
export class PrismaHorarioRutaRepository implements HorarioRutaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async crear(datos: CrearHorarioRutaDatos): Promise<HorarioRuta> {
    try {
      const horarioRuta = await this.prisma.horarioRuta.create({
        data: {
          rutaId: datos.rutaId,
          frecuencia: datos.frecuencia,
          diaSemana: datos.diaSemana,
          turno: datos.turno,
          horaInicio: this.convertirHoraAFecha(datos.horaInicio),
          horaFin: this.convertirHoraAFecha(datos.horaFin),
          activo: datos.activo ?? true,
        },
      });

      return this.mapearHorarioRuta(horarioRuta);
    } catch (error) {
      return manejarErrorPrisma(error, 'crear el horario de ruta');
    }
  }

  async buscarTodos(): Promise<HorarioRuta[]> {
    try {
      const horariosRuta = await this.prisma.horarioRuta.findMany({
        orderBy: {
          id: 'asc',
        },
      });

      return horariosRuta.map((horarioRuta) => this.mapearHorarioRuta(horarioRuta));
    } catch (error) {
      return manejarErrorPrisma(error, 'buscar todos los horarios de ruta');
    }
  }

  async buscarPorId(id: number): Promise<HorarioRuta | null> {
    try {
      const horarioRuta = await this.prisma.horarioRuta.findUnique({
        where: { id },
      });

      return horarioRuta ? this.mapearHorarioRuta(horarioRuta) : null;
    } catch (error) {
      manejarErrorPrisma(error, 'buscar el horario de ruta por id');
    }
  }

  async buscarPorRutaId(rutaId: number): Promise<HorarioRuta[]> {
    // Nota: este método ya estaba declarado en la interfaz pero también estaba
    // pendiente (TODO). Lo implementamos aquí porque las nuevas consultas
    // públicas de Sprint 2 (buscarHorariosPorRuta, buscarProgramacionPorRuta)
    // dependen de él y así evitamos duplicar la lógica de acceso a datos.
    try {
      const horariosRuta = await this.prisma.horarioRuta.findMany({
        where: { rutaId },
        orderBy: [{ diaSemana: 'asc' }, { horaInicio: 'asc' }],
      });

      return horariosRuta.map((horarioRuta) => this.mapearHorarioRuta(horarioRuta));
    } catch (error) {
      manejarErrorPrisma(error, 'buscar los horarios de la ruta');
    }
  }
  async actualizar(id: number, datos: ActualizarHorarioRutaDatos): Promise<HorarioRuta> {
    try {
      const horarioRuta = await this.prisma.horarioRuta.update({
        where: {
          id,
        },
        data: {
          frecuencia: datos.frecuencia,
          diaSemana: datos.diaSemana,
          turno: datos.turno,
          horaInicio: datos.horaInicio ? this.convertirHoraAFecha(datos.horaInicio) : undefined,
          horaFin: datos.horaFin ? this.convertirHoraAFecha(datos.horaFin) : undefined,
          activo: datos.activo,
        },
      });

      return this.mapearHorarioRuta(horarioRuta);
    } catch (error) {
      return manejarErrorPrisma(error, 'actualizar el horario de ruta');
    }
  }

  async eliminar(id: number): Promise<void> {
    try {
      await this.prisma.horarioRuta.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      return manejarErrorPrisma(error, 'eliminar el horario de ruta');
    }
  }

  private mapearHorarioRuta(horarioRuta: {
    id: number;
    rutaId: number;
    frecuencia: string;
    diaSemana: string;
    turno: string;
    horaInicio: Date;
    horaFin: Date;
    activo: boolean;
  }): HorarioRuta {
    return new HorarioRuta(horarioRuta.id, {
      rutaId: horarioRuta.rutaId,
      frecuencia: horarioRuta.frecuencia as HorarioRuta['props']['frecuencia'],
      diaSemana: horarioRuta.diaSemana as HorarioRuta['props']['diaSemana'],
      turno: horarioRuta.turno as HorarioRuta['props']['turno'],
      horaInicio: this.formatearFechaAHora(horarioRuta.horaInicio),
      horaFin: this.formatearFechaAHora(horarioRuta.horaFin),
      activo: horarioRuta.activo,
    });
  }

  private convertirHoraAFecha(hora: string): Date {
    return new Date(`1970-01-01T${hora}:00.000Z`);
  }

  private formatearFechaAHora(fecha: Date): string {
    return fecha.toISOString().slice(11, 16);
  }

  private formatearHora(hora: Date): string {
    return hora.toISOString().slice(11, 16);
  }
}
