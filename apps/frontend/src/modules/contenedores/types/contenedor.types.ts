export type TipoContenedor = 'ORGANICO' | 'INORGANICO' | 'RECICLABLE' | 'MIXTO';
export type EstadoContenedor = 'OPERATIVO' | 'LLENO' | 'DANADO' | 'EN_MANTENIMIENTO' | 'RETIRADO';

export type Contenedor = {
  id: number;
  codigo: string;
  tipo: TipoContenedor;
  capacidad: number;
  estado: EstadoContenedor;
  puntoRecoleccionId: number | null;
  fechaInstalacion: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type CrearContenedorPayload = {
  codigo: string;
  tipo: TipoContenedor;
  capacidad: number;
  estado?: EstadoContenedor;
  puntoRecoleccionId?: number;
  fechaInstalacion?: string;
};

export type ActualizarContenedorPayload = Partial<CrearContenedorPayload>;

type ContenedorApiProps = Omit<Contenedor, 'id'>;

export type ContenedorApi = {
  id: number;
  props?: ContenedorApiProps;
  codigo?: string;
  tipo?: TipoContenedor;
  capacidad?: number | string;
  estado?: EstadoContenedor;
  puntoRecoleccionId?: number | null;
  fechaInstalacion?: string | null;
  createdAt?: string;
  updatedAt?: string;
};
