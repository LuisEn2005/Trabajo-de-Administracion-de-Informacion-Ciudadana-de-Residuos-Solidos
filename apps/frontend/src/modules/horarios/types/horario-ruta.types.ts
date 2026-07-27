export type FrecuenciaRuta = 'SEMANAL' | 'QUINCENAL';
export type DiaSemana =
  | 'LUNES'
  | 'MARTES'
  | 'MIERCOLES'
  | 'JUEVES'
  | 'VIERNES'
  | 'SABADO'
  | 'DOMINGO';
export type Turno = 'MANANA' | 'TARDE' | 'NOCHE';

export type HorarioRuta = {
  id: number;
  rutaId: number;
  frecuencia: FrecuenciaRuta;
  diaSemana: DiaSemana;
  turno: Turno;
  horaInicio: string;
  horaFin: string;
  activo: boolean;
};

export type CrearHorarioRutaPayload = {
  frecuencia: FrecuenciaRuta;
  diaSemana: DiaSemana;
  turno: Turno;
  horaInicio: string;
  horaFin: string;
  activo?: boolean;
};

export type ActualizarHorarioRutaPayload = Partial<CrearHorarioRutaPayload>;

type HorarioRutaApiProps = Omit<HorarioRuta, 'id'>;

export type HorarioRutaApi = {
  id: number;
  props?: HorarioRutaApiProps;
  rutaId?: number;
  frecuencia?: FrecuenciaRuta;
  diaSemana?: DiaSemana;
  turno?: Turno;
  horaInicio?: string;
  horaFin?: string;
  activo?: boolean;
};
