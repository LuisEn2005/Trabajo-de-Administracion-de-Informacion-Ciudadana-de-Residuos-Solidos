export enum EstadoAsignacionOperativa {
  PROGRAMADA = 'PROGRAMADA',
  ACTIVA = 'ACTIVA',
  FINALIZADA = 'FINALIZADA',
  CANCELADA = 'CANCELADA',
}

export class AsignacionOperativa {
  constructor(
    public readonly id: number,
    public readonly rutaId: number,
    public readonly vehiculoId: number,
    public readonly horarioId: number,
    public readonly estado: EstadoAsignacionOperativa,
    public readonly fecha: Date | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
