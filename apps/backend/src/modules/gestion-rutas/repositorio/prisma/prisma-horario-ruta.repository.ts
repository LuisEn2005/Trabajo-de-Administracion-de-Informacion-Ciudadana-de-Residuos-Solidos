import { Injectable } from '@nestjs/common';
import {
  DiaSemana as DiaSemanaPrisma,
  FrecuenciaRuta as FrecuenciaRutaPrisma,
  HorarioRuta as HorarioRutaPrisma,
  Turno as TurnoPrisma,
} from '@prisma/client';
import { PrismaService } from '../../../../shared/infrastructure/prisma/prisma.service';
import {
  DiaSemana,
  FrecuenciaRuta,
  HorarioRuta,
  Turno,
} from '../../dominio/entities/horario-ruta.entity';
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
        frecuencia: this.toPrismaFrecuencia(datos.frecuencia),
        diaSemana: this.toPrismaDiaSemana(datos.diaSemana),
        turno: this.toPrismaTurno(datos.turno),
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
        ...(datos.frecuencia !== undefined
          ? { frecuencia: this.toPrismaFrecuencia(datos.frecuencia) }
          : {}),
        ...(datos.diaSemana !== undefined
          ? { diaSemana: this.toPrismaDiaSemana(datos.diaSemana) }
          : {}),
        ...(datos.turno !== undefined ? { turno: this.toPrismaTurno(datos.turno) } : {}),
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
      frecuencia: this.toDomainFrecuencia(horarioRuta.frecuencia),
      diaSemana: this.toDomainDiaSemana(horarioRuta.diaSemana),
      turno: this.toDomainTurno(horarioRuta.turno),
      horaInicio: this.fromPrismaTime(horarioRuta.horaInicio),
      horaFin: this.fromPrismaTime(horarioRuta.horaFin),
      activo: horarioRuta.activo,
    });
  }

  private toDomainFrecuencia(frecuencia: FrecuenciaRutaPrisma): FrecuenciaRuta {
    switch (frecuencia) {
      case FrecuenciaRutaPrisma.SEMANAL:
        return FrecuenciaRuta.SEMANAL;
      case FrecuenciaRutaPrisma.QUINCENAL:
        return FrecuenciaRuta.QUINCENAL;
    }
  }

  private toDomainDiaSemana(diaSemana: DiaSemanaPrisma): DiaSemana {
    switch (diaSemana) {
      case DiaSemanaPrisma.LUNES:
        return DiaSemana.LUNES;
      case DiaSemanaPrisma.MARTES:
        return DiaSemana.MARTES;
      case DiaSemanaPrisma.MIERCOLES:
        return DiaSemana.MIERCOLES;
      case DiaSemanaPrisma.JUEVES:
        return DiaSemana.JUEVES;
      case DiaSemanaPrisma.VIERNES:
        return DiaSemana.VIERNES;
      case DiaSemanaPrisma.SABADO:
        return DiaSemana.SABADO;
      case DiaSemanaPrisma.DOMINGO:
        return DiaSemana.DOMINGO;
    }
  }

  private toDomainTurno(turno: TurnoPrisma): Turno {
    switch (turno) {
      case TurnoPrisma.MANANA:
        return Turno.MANANA;
      case TurnoPrisma.TARDE:
        return Turno.TARDE;
      case TurnoPrisma.NOCHE:
        return Turno.NOCHE;
    }
  }

  private toPrismaFrecuencia(frecuencia: FrecuenciaRuta): FrecuenciaRutaPrisma {
    switch (frecuencia) {
      case FrecuenciaRuta.SEMANAL:
        return FrecuenciaRutaPrisma.SEMANAL;
      case FrecuenciaRuta.QUINCENAL:
        return FrecuenciaRutaPrisma.QUINCENAL;
    }
  }

  private toPrismaDiaSemana(diaSemana: DiaSemana): DiaSemanaPrisma {
    switch (diaSemana) {
      case DiaSemana.LUNES:
        return DiaSemanaPrisma.LUNES;
      case DiaSemana.MARTES:
        return DiaSemanaPrisma.MARTES;
      case DiaSemana.MIERCOLES:
        return DiaSemanaPrisma.MIERCOLES;
      case DiaSemana.JUEVES:
        return DiaSemanaPrisma.JUEVES;
      case DiaSemana.VIERNES:
        return DiaSemanaPrisma.VIERNES;
      case DiaSemana.SABADO:
        return DiaSemanaPrisma.SABADO;
      case DiaSemana.DOMINGO:
        return DiaSemanaPrisma.DOMINGO;
    }
  }

  private toPrismaTurno(turno: Turno): TurnoPrisma {
    switch (turno) {
      case Turno.MANANA:
        return TurnoPrisma.MANANA;
      case Turno.TARDE:
        return TurnoPrisma.TARDE;
      case Turno.NOCHE:
        return TurnoPrisma.NOCHE;
    }
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
