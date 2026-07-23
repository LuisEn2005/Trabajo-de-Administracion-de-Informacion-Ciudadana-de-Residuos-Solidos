export interface RutaProps {
  numero: number;
  nombre: string;
  descripcionCobertura: string;
  activa: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Ruta {
  constructor(
    public readonly id: number,
    public readonly props: RutaProps,
  ) {}
}
