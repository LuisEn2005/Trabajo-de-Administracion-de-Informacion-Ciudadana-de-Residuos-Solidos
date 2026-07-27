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

    private mapearHorarioRuta(horarioRuta: HorarioRutaPrisma): HorarioRuta {
    return new HorarioRuta(horarioRuta.id, {
      rutaId: horarioRuta.rutaId,
      // Los enums generados por Prisma tienen los mismos valores que los del
      // dominio (SEMANAL, LUNES, MANANA, etc.), pero son tipos nominales
      // distintos, por eso el cast explícito.
      frecuencia: horarioRuta.frecuencia as unknown as FrecuenciaRuta,
      diaSemana: horarioRuta.diaSemana as unknown as DiaSemana,
      turno: horarioRuta.turno as unknown as Turno,
      horaInicio: this.formatearHora(horarioRuta.horaInicio),
      horaFin: this.formatearHora(horarioRuta.horaFin),
      activo: horarioRuta.activo,
    });
  }

  private formatearHora(hora: Date): string {
    return hora.toISOString().slice(11, 16);
  }
}
