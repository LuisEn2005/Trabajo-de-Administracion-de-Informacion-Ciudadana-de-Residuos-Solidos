import { UUID } from '../../../../shared/domain/base';
import { Usuario, RolUsuario } from '../aggregates/usuario';
import { Sesion } from '../entities/sesion';

export interface IUsuarioRepositorio {
  guardar(usuario: Usuario): Promise<void>;
  buscarPorId(idUsuario: UUID): Promise<Usuario | null>;
  buscarPorCorreo(correo: string): Promise<Usuario | null>;
  actualizar(usuario: Usuario): Promise<void>;
  eliminar(idUsuario: UUID): Promise<void>;
  listarPorRol(rol: RolUsuario): Promise<Usuario[]>;
}

export interface ISesionRepositorio {
  guardar(sesion: Sesion): Promise<void>;
  buscarPorToken(token: string): Promise<Sesion | null>;
  buscarPorIdUsuario(idUsuario: UUID): Promise<Sesion[]>;
  actualizar(sesion: Sesion): Promise<void>;
  eliminarPorIdUsuario(idUsuario: UUID): Promise<number>;
  limpiarExpiradas(): Promise<number>;
}
