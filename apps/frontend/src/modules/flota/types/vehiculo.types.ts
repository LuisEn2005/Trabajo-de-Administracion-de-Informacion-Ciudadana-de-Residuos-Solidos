export type TipoCarroceria = 'COMPACTADOR' | 'BARANDA';

export type Vehiculo = {
  id: number;
  placa: string;
  carroceria: TipoCarroceria;
  rutaId: number;
  activo: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type CrearVehiculoPayload = {
  placa: string;
  carroceria: TipoCarroceria;
  rutaId: number;
  activo?: boolean;
};

export type ActualizarVehiculoPayload = Partial<CrearVehiculoPayload>;

type VehiculoApiProps = Omit<Vehiculo, 'id'>;

export type VehiculoApi = {
  id: number;
  props?: VehiculoApiProps;
  placa?: string;
  carroceria?: TipoCarroceria;
  rutaId?: number;
  activo?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
