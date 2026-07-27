export interface JwtPayload {
  sub: number;
  email: string;
  nombre: string;
  activo: boolean;
}

export interface AdministradorAutenticado {
  id: number;
  email: string;
  nombre: string;
  activo: boolean;
}
