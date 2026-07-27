export class Administrador {
  constructor(
    public readonly id: number,
    public readonly nombre: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly activo: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
