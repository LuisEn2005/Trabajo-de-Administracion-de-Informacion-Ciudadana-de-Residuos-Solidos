export enum EstadoPuntoRecoleccion {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
}

export interface PuntoRecoleccionProps {
  id: number;
  nombre: string;
  direccion: string;
  referencia?: string | null;
  latitud: number;
  longitud: number;
  estado: EstadoPuntoRecoleccion;
  createdAt: Date;
  updatedAt: Date;
}

export interface CoordenadasGeograficas {
  latitud: number;
  longitud: number;
  googleMapsUrl: string;
}

export class PuntoRecoleccion {
  constructor(
    public readonly id: number,
    public nombre: string,
    public direccion: string,
    public referencia: string | null,
    public latitud: number,
    public longitud: number,
    public estado: EstadoPuntoRecoleccion,
    public createdAt: Date,
    public updatedAt: Date,
  ) { }

  get activo(): boolean {
    return this.estado === EstadoPuntoRecoleccion.ACTIVO;
  }

  public cambiarEstado(activo: boolean): void {
    this.estado = activo ? EstadoPuntoRecoleccion.ACTIVO : EstadoPuntoRecoleccion.INACTIVO;
  }

  public mapearPunto(): CoordenadasGeograficas {
    return {
      latitud: this.latitud,
      longitud: this.longitud,
      googleMapsUrl: `https://www.google.com/maps?q=${this.latitud},${this.longitud}`,
    };
  }
}