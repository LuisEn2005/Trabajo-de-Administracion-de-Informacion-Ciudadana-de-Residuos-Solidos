export enum FrecuenciaRuta {
  SEMANAL = 'SEMANAL',
  QUINCENAL = 'QUINCENAL',
}

export enum DiaSemana {
  LUNES = 'LUNES',
  MARTES = 'MARTES',
  MIERCOLES = 'MIERCOLES',
  JUEVES = 'JUEVES',
  VIERNES = 'VIERNES',
  SABADO = 'SABADO',
  DOMINGO = 'DOMINGO',
}

export enum Turno {
  MANANA = 'MANANA',
  TARDE = 'TARDE',
  NOCHE = 'NOCHE',
}

export interface HorarioRutaProps {
  rutaId: number;
  frecuencia: FrecuenciaRuta;
  diaSemana: DiaSemana;
  turno: Turno;
  horaInicio: string;
  horaFin: string;
  activo: boolean;
}

export class HorarioRuta {
  constructor(
    public readonly id: number,
    public readonly props: HorarioRutaProps,
  ) {}
}
