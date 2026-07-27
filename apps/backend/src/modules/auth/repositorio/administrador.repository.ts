import { Administrador } from '../dominio/entities/administrador.entity';

export const ADMINISTRADOR_REPOSITORY = Symbol('ADMINISTRADOR_REPOSITORY');

export interface AdministradorRepository {
  buscarPorEmail(email: string): Promise<Administrador | null>;
  buscarPorId(id: number): Promise<Administrador | null>;
}
