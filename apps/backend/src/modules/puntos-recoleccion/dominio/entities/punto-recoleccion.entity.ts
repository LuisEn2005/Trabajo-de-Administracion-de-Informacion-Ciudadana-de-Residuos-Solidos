export enum EstadoPuntoRecoleccion {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
  MANTENIMIENTO = 'MANTENIMIENTO',
}

export class PuntoRecoleccion {
  constructor(
    public readonly id: number,
    public readonly nombre: string,
    public readonly direccion: string,
    public readonly referencia: string | null,
    public readonly latitud: number,
    public readonly longitud: number,
    public readonly estado: EstadoPuntoRecoleccion,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
