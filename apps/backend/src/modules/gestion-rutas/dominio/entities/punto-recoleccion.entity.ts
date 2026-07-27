import { EstadoPuntoRecoleccion } from '@prisma/client';

export class PuntoRecoleccionEntity {
  id: number;
  nombre: string;
  direccion: string;
  referencia?: string | null;
  latitud: number;
  longitud: number;
  estado: EstadoPuntoRecoleccion;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<PuntoRecoleccionEntity>) {
    Object.assign(this, partial);
  }
}
