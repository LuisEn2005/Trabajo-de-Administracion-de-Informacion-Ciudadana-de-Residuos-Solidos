import { UUID } from '../../../shared/types/Base';
import { NotFoundError, UnauthorizedError } from '../../../shared/errors/DomainError';
import { Ciudadano, Administrador, Usuario } from '../domain/model/Usuario';
import { Sesion } from '../domain/model/Sesion';
import { IUsuarioRepositorio, ISesionRepositorio } from '../domain/repositories/IUsuarioRepositorio';
import { randomBytes } from 'crypto';

export interface IUsuarioApplicationService {
  registrarCiudadano(nombre: string, email: string, contrasena: string, telefono?: string): Promise<UUID>;
  registrarAdministrador(nombre: string, email: string, contrasena: string, cargo: string): Promise<UUID>;
  autenticar(email: string, contrasena: string): Promise<{ token: string; idUsuario: UUID; rol: string }>;
  cerrarSesion(token: string): Promise<void>;
  cambiarContrasena(idUsuario: UUID, actual: string, nueva: string): Promise<void>;
}

export class UsuarioApplicationService implements IUsuarioApplicationService {
  constructor(
    private readonly usuarioRepo: IUsuarioRepositorio,
    private readonly sesionRepo: ISesionRepositorio,
  ) {}

  async registrarCiudadano(nombre: string, email: string, contrasena: string, telefono?: string): Promise<UUID> {
    const existente = await this.usuarioRepo.buscarPorCorreo(email);
    if (existente) {
      throw new UnauthorizedError('El correo ya está registrado');
    }
    const ciudadano = await Ciudadano.crear(nombre, email, contrasena, telefono);
    await this.usuarioRepo.guardar(ciudadano);
    return ciudadano.id;
  }

  async registrarAdministrador(nombre: string, email: string, contrasena: string, cargo: string): Promise<UUID> {
    const existente = await this.usuarioRepo.buscarPorCorreo(email);
    if (existente) {
      throw new UnauthorizedError('El correo ya está registrado');
    }
    const admin = await Administrador.crear(nombre, email, contrasena, cargo);
    await this.usuarioRepo.guardar(admin);
    return admin.id;
  }

  async autenticar(email: string, contrasena: string): Promise<{ token: string; idUsuario: UUID; rol: string }> {
    const usuario = await this.usuarioRepo.buscarPorCorreo(email);
    if (!usuario) {
      throw new UnauthorizedError('Credenciales inválidas');
    }
    const { valido } = await usuario.autenticar(contrasena);
    if (!valido) {
      throw new UnauthorizedError('Credenciales inválidas');
    }
    const token = randomBytes(32).toString('hex');
    const sesion = Sesion.crear(usuario.id, token);
    await this.sesionRepo.guardar(sesion);
    return { token, idUsuario: usuario.id, rol: usuario.rol };
  }

  async cerrarSesion(token: string): Promise<void> {
    const sesion = await this.sesionRepo.buscarPorToken(token);
    if (!sesion) {
      throw new NotFoundError('Sesión no encontrada');
    }
    sesion.cerrar();
    await this.sesionRepo.actualizar(sesion);
  }

  async cambiarContrasena(idUsuario: UUID, actual: string, nueva: string): Promise<void> {
    const usuario = await this.usuarioRepo.buscarPorId(idUsuario);
    if (!usuario) {
      throw new NotFoundError('Usuario no encontrado');
    }
    await usuario.cambiarContrasena(actual, nueva);
    await this.usuarioRepo.actualizar(usuario);
    await this.sesionRepo.eliminarPorIdUsuario(idUsuario);
  }
}
