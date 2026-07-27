export type EstadoAsignacionOperativa = 'PROGRAMADA' | 'ACTIVA' | 'FINALIZADA' | 'CANCELADA';

export type AsignacionOperativa = {
  id: number;
  rutaId: number;
  vehiculoId: number;
  horarioId: number;
  estado: EstadoAsignacionOperativa;
  fecha: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type CrearAsignacionPayload = {
  rutaId: number;
  vehiculoId: number;
  horarioId: number;
  estado?: EstadoAsignacionOperativa;
  fecha?: string;
};

export type ActualizarAsignacionPayload = Partial<CrearAsignacionPayload>;

type AsignacionApiProps = Omit<AsignacionOperativa, 'id'>;

export type AsignacionApi = {
  id: number;
  props?: AsignacionApiProps;
  rutaId?: number;
  vehiculoId?: number;
  horarioId?: number;
  estado?: EstadoAsignacionOperativa;
  fecha?: string | null;
  createdAt?: string;
  updatedAt?: string;
};
