export type EstadoPuntoRecoleccion = 'ACTIVO' | 'INACTIVO' | 'MANTENIMIENTO';

export type PuntoRecoleccion = {
  id: number;
  nombre: string;
  direccion: string;
  referencia: string | null;
  latitud: number;
  longitud: number;
  estado: EstadoPuntoRecoleccion;
  createdAt?: string;
  updatedAt?: string;
};

export type CrearPuntoRecoleccionPayload = {
  nombre: string;
  direccion: string;
  referencia?: string;
  latitud: number;
  longitud: number;
  estado?: EstadoPuntoRecoleccion;
};

export type ActualizarPuntoRecoleccionPayload = Partial<CrearPuntoRecoleccionPayload>;

type PuntoRecoleccionApiProps = Omit<PuntoRecoleccion, 'id'>;

export type PuntoRecoleccionApi = {
  id: number;
  props?: PuntoRecoleccionApiProps;
  nombre?: string;
  direccion?: string;
  referencia?: string | null;
  latitud?: number | string;
  longitud?: number | string;
  estado?: EstadoPuntoRecoleccion;
  createdAt?: string;
  updatedAt?: string;
};
