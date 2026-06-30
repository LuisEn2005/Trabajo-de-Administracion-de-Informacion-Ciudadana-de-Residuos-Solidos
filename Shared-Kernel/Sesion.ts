import { Entity, UUID, newId } from '../../../../shared/types/Base';

export enum EstadoSesion {
  ACTIVA = 'ACTIVA',
  EXPIRADA = 'EXPIRADA',
  CERRADA = 'CERRADA',
}

interface SesionProps {
  idUsuario: UUID;
  token: string;
  fechaInicio: Date;
  fechaExpiracion: Date;
  ipOrigen?: string;
  estado: EstadoSesion;
}

const DURACION_SESION_HORAS = 24;

export class Sesion extends Entity<Sesion> {
  private props: SesionProps;

  private constructor(id: UUID, props: SesionProps) {
    super(id);
    this.props = props;
  }

  static crear(idUsuario: UUID, token: string, ipOrigen?: string): Sesion {
    const fechaInicio = new Date();
    const fechaExpiracion = new Date(fechaInicio.getTime() + DURACION_SESION_HORAS * 3600 * 1000);
    return new Sesion(newId(), {
      idUsuario,
      token,
      fechaInicio,
      fechaExpiracion,
      ipOrigen,
      estado: EstadoSesion.ACTIVA,
    });
  }

  static reconstruir(id: UUID, props: SesionProps): Sesion {
    return new Sesion(id, props);
  }

  get idUsuario(): UUID {
    return this.props.idUsuario;
  }

  get token(): string {
    return this.props.token;
  }

  get estado(): EstadoSesion {
    return this.props.estado;
  }

  get fechaExpiracion(): Date {
    return this.props.fechaExpiracion;
  }

  esValida(): boolean {
    return this.props.estado === EstadoSesion.ACTIVA && this.props.fechaExpiracion > new Date();
  }

  cerrar(): void {
    this.props.estado = EstadoSesion.CERRADA;
  }

  renovar(): void {
    this.props.fechaExpiracion = new Date(Date.now() + DURACION_SESION_HORAS * 3600 * 1000);
  }

  toPersistence(): SesionProps & { id: UUID } {
    return { id: this.id, ...this.props };
  }
}
