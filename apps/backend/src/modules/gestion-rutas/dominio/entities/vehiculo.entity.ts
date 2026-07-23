export enum TipoCarroceria {
  COMPACTADOR = 'COMPACTADOR',
  BARANDA = 'BARANDA',
}

export interface VehiculoProps {
  placa: string;
  carroceria: TipoCarroceria;
  rutaId: number;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Vehiculo {
  constructor(
    public readonly id: number,
    public readonly props: VehiculoProps,
  ) {}
}
