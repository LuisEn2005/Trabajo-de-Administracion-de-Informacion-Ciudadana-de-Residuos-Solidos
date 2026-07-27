export type Ruta = {
  id: number;
  numero: number;
  nombre: string;
  descripcionCobertura: string;
  activa: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type CrearRutaPayload = {
  numero: number;
  nombre: string;
  descripcionCobertura: string;
  activa?: boolean;
};

export type ActualizarRutaPayload = Partial<CrearRutaPayload>;

type RutaApiProps = {
  numero: number;
  nombre: string;
  descripcionCobertura: string;
  activa: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type RutaApi = {
  id: number;
  props?: RutaApiProps;
  numero?: number;
  nombre?: string;
  descripcionCobertura?: string;
  activa?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
