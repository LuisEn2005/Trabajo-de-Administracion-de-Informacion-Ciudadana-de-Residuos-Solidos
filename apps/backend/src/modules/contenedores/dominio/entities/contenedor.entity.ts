export enum TipoContenedor {
  ORGANICO = 'ORGANICO',
  INORGANICO = 'INORGANICO',
  RECICLABLE = 'RECICLABLE',
  MIXTO = 'MIXTO',
}

export enum EstadoContenedor {
  OPERATIVO = 'OPERATIVO',
  LLENO = 'LLENO',
  DANADO = 'DANADO',
  EN_MANTENIMIENTO = 'EN_MANTENIMIENTO',
  RETIRADO = 'RETIRADO',
}

export class Contenedor {
  constructor(
    public readonly id: number,
    public readonly codigo: string,
    public readonly tipo: TipoContenedor,
    public readonly capacidad: number,
    public readonly estado: EstadoContenedor,
    public readonly puntoRecoleccionId: number | null,
    public readonly fechaInstalacion: Date | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}

export interface ResumenInventarioContenedores {
  total: number;
  porEstado: Record<EstadoContenedor, number>;
  porTipo: Record<TipoContenedor, number>;
}
