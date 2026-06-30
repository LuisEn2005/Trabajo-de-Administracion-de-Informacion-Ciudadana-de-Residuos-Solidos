import { AggregateRoot, UUID, newId } from '../../../../shared/types/Base';
import { ValidationError, UnauthorizedError } from '../../../../shared/errors/DomainError';
import { Credenciales } from './Credenciales';
import { Sesion } from './Sesion';

export enum RolUsuario {
  CIUDADANO = 'CIUDADANO',
  ADMINISTRADOR = 'ADMINISTRADOR',
  TRABAJADOR = 'TRABAJADOR',
}

export enum EstadoUsuario {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
  BLOQUEADO = 'BLOQUEADO',
}

interface UsuarioBaseProps {
  nombre: string;
  credenciales: Credenciales;
  rol: RolUsuario;
  estado: EstadoUsuario;
  fechaCreacion: Date;
}

export abstract class Usuario extends AggregateRoot<Usuario> {
  protected props: UsuarioBaseProps;

  protected constructor(id: UUID, props: UsuarioBaseProps) {
    super(id);
    this.props = props;
  }

  get nombre(): string {
    return this.props.nombre;
  }

  get correo(): string {
    return this.props.credenciales.email;
  }

  get rol(): RolUsuario {
    return this.props.rol;
  }

  get estado(): EstadoUsuario {
    return this.props.estado;
  }

  async autenticar(contrasena: string): Promise<{ valido: boolean }> {
    if (this.props.estado !== EstadoUsuario.ACTIVO) {
      throw new UnauthorizedError('Usuario no está activo');
    }
    const valido = await this.props.credenciales.validar(contrasena);
    return { valido };
  }

  async cambiarContrasena(contrasenaActual: string, contrasenaNueva: string): Promise<void> {
    const esValida = await this.props.credenciales.validar(contrasenaActual);
    if (!esValida) {
      throw new ValidationError('La contraseña actual es incorrecta');
    }
    this.props.credenciales = await this.props.credenciales.actualizar(contrasenaNueva);
  }

  actualizarPerfil(nombre: string): void {
    if (!nombre.trim()) {
      throw new ValidationError('El nombre no puede estar vacío');
    }
    this.props.nombre = nombre;
  }

  protected toBasePersistence() {
    return {
      id: this.id,
      nombre: this.props.nombre,
      email: this.props.credenciales.email,
      hashContrasena: this.props.credenciales.hashContrasena,
      rol: this.props.rol,
      estado: this.props.estado,
      fechaCreacion: this.props.fechaCreacion,
    };
  }
}

interface CiudadanoProps extends UsuarioBaseProps {
  telefono?: string;
  direccion?: string;
  notificacionesActivas: boolean;
}

export class Ciudadano extends Usuario {
  private ciudadanoProps: Omit<CiudadanoProps, keyof UsuarioBaseProps>;

  private constructor(id: UUID, base: UsuarioBaseProps, extra: Omit<CiudadanoProps, keyof UsuarioBaseProps>) {
    super(id, base);
    this.ciudadanoProps = extra;
  }

  static async crear(nombre: string, email: string, contrasena: string, telefono?: string): Promise<Ciudadano> {
    const credenciales = await Credenciales.crear(email, contrasena);
    return new Ciudadano(
      newId(),
      { nombre, credenciales, rol: RolUsuario.CIUDADANO, estado: EstadoUsuario.ACTIVO, fechaCreacion: new Date() },
      { telefono, notificacionesActivas: true },
    );
  }

  static reconstruir(id: UUID, base: UsuarioBaseProps, extra: Omit<CiudadanoProps, keyof UsuarioBaseProps>): Ciudadano {
    return new Ciudadano(id, base, extra);
  }

  get telefono(): string | undefined {
    return this.ciudadanoProps.telefono;
  }

  get notificacionesActivas(): boolean {
    return this.ciudadanoProps.notificacionesActivas;
  }

  subscribirANotificaciones(): void {
    this.ciudadanoProps.notificacionesActivas = true;
  }

  desuscribir(): void {
    this.ciudadanoProps.notificacionesActivas = false;
  }

  toPersistence() {
    return { ...this.toBasePersistence(), ...this.ciudadanoProps };
  }
}

interface AdministradorProps extends UsuarioBaseProps {
  cargo: string;
  permisosEspeciales: Set<string>;
}

export class Administrador extends Usuario {
  private adminProps: Omit<AdministradorProps, keyof UsuarioBaseProps>;

  private constructor(id: UUID, base: UsuarioBaseProps, extra: Omit<AdministradorProps, keyof UsuarioBaseProps>) {
    super(id, base);
    this.adminProps = extra;
  }

  static async crear(nombre: string, email: string, contrasena: string, cargo: string): Promise<Administrador> {
    const credenciales = await Credenciales.crear(email, contrasena);
    return new Administrador(
      newId(),
      { nombre, credenciales, rol: RolUsuario.ADMINISTRADOR, estado: EstadoUsuario.ACTIVO, fechaCreacion: new Date() },
      { cargo, permisosEspeciales: new Set() },
    );
  }

  static reconstruir(id: UUID, base: UsuarioBaseProps, extra: Omit<AdministradorProps, keyof UsuarioBaseProps>): Administrador {
    return new Administrador(id, base, extra);
  }

  get cargo(): string {
    return this.adminProps.cargo;
  }

  tienePermiso(permiso: string): boolean {
    return this.adminProps.permisosEspeciales.has(permiso);
  }

  asignarPermisos(permisos: string[]): void {
    permisos.forEach((p) => this.adminProps.permisosEspeciales.add(p));
  }

  revocarPermisos(permisos: string[]): void {
    permisos.forEach((p) => this.adminProps.permisosEspeciales.delete(p));
  }

  toPersistence() {
    return {
      ...this.toBasePersistence(),
      cargo: this.adminProps.cargo,
      permisosEspeciales: Array.from(this.adminProps.permisosEspeciales),
    };
  }
}
