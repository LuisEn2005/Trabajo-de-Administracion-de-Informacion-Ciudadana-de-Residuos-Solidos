import { Injectable } from '@nestjs/common';
import { Prisma, HorarioRuta as HorarioRutaPrisma } from '@prisma/client';
import { PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service';
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
    const horarioRuta = await this.prisma.horarioRuta.create({
      data: {
        rutaId: datos.rutaId,
        frecuencia: datos.frecuencia,
        diaSemana: datos.diaSemana,
        turno: datos.turno,
        horaInicio: this.toPrismaTime(datos.horaInicio),
        horaFin: this.toPrismaTime(datos.horaFin),
        activo: datos.activo ?? true,
      },
    });

    return this.toDomain(horarioRuta);
  }

  async buscarTodos(): Promise<HorarioRuta[]> {
    const horariosRuta = await this.prisma.horarioRuta.findMany({
      orderBy: [{ rutaId: 'asc' }, { diaSemana: 'asc' }, { horaInicio: 'asc' }],
    });

    return horariosRuta.map((horarioRuta) => this.toDomain(horarioRuta));
  }

  async buscarPorId(id: number): Promise<HorarioRuta | null> {
    const horarioRuta = await this.prisma.horarioRuta.findUnique({
      where: { id },
    });

    return horarioRuta ? this.toDomain(horarioRuta) : null;
  }

  async buscarPorRutaId(rutaId: number): Promise<HorarioRuta[]> {
    const horariosRuta = await this.prisma.horarioRuta.findMany({
      where: { rutaId },
      orderBy: [{ diaSemana: 'asc' }, { horaInicio: 'asc' }],
    });

    return horariosRuta.map((horarioRuta) => this.toDomain(horarioRuta));
  }

  async actualizar(id: number, datos: ActualizarHorarioRutaDatos): Promise<HorarioRuta> {
    const horarioRuta = await this.prisma.horarioRuta.update({
      where: { id },
      data: {
        ...(datos.frecuencia !== undefined ? { frecuencia: datos.frecuencia } : {}),
        ...(datos.diaSemana !== undefined ? { diaSemana: datos.diaSemana } : {}),
        ...(datos.turno !== undefined ? { turno: datos.turno } : {}),
        ...(datos.horaInicio !== undefined
          ? { horaInicio: this.toPrismaTime(datos.horaInicio) }
          : {}),
        ...(datos.horaFin !== undefined ? { horaFin: this.toPrismaTime(datos.horaFin) } : {}),
        ...(datos.activo !== undefined ? { activo: datos.activo } : {}),
      },
    });

    return this.toDomain(horarioRuta);
  }

  async eliminar(id: number): Promise<void> {
    await this.prisma.horarioRuta.delete({
      where: { id },
    });
  }

  private toDomain(horarioRuta: HorarioRutaPrisma): HorarioRuta {
    return new HorarioRuta(horarioRuta.id, {
      rutaId: horarioRuta.rutaId,
      frecuencia: horarioRuta.frecuencia,
      diaSemana: horarioRuta.diaSemana,
      turno: horarioRuta.turno,
      horaInicio: this.fromPrismaTime(horarioRuta.horaInicio),
      horaFin: this.fromPrismaTime(horarioRuta.horaFin),
      activo: horarioRuta.activo,
    });
  }

  private toPrismaTime(hora: string): Date {
    const [horas, minutos] = hora.split(':').map(Number);
    const fecha = new Date(0);

    fecha.setUTCHours(horas, minutos, 0, 0);

    return fecha;
  }

  private fromPrismaTime(hora: Date): string {
    return hora.toISOString().slice(11, 16);
  }
}
