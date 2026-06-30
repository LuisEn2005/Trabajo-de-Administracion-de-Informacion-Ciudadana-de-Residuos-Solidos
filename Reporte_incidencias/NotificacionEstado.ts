import { Entity, UUID, newId } from '../../../../shared/types/Base';

export enum CanalNotificacion {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
  APP = 'APP',
}

export enum EstadoNotificacion {
  PENDIENTE = 'PENDIENTE',
  ENVIADA = 'ENVIADA',
  FALLIDA = 'FALLIDA',
  LEIDA = 'LEIDA',
}

interface NotificacionEstadoProps {
  idReporte: UUID;
  idCiudadano: UUID;
  canal: CanalNotificacion;
  mensaje: string;
  estado: EstadoNotificacion;
  fechaCreacion: Date;
  fechaEnvio?: Date;
  intentosFallidos: number;
}

const MAX_INTENTOS = 3;

export class NotificacionEstado extends Entity<NotificacionEstado> {
  private props: NotificacionEstadoProps;

  private constructor(id: UUID, props: NotificacionEstadoProps) {
    super(id);
    this.props = props;
  }

  static crear(idReporte: UUID, idCiudadano: UUID, canal: CanalNotificacion, mensaje: string): NotificacionEstado {
    return new NotificacionEstado(newId(), {
      idReporte,
      idCiudadano,
      canal,
      mensaje,
      estado: EstadoNotificacion.PENDIENTE,
      fechaCreacion: new Date(),
      intentosFallidos: 0,
    });
  }

  static reconstruir(id: UUID, props: NotificacionEstadoProps): NotificacionEstado {
    return new NotificacionEstado(id, props);
  }

  get estado(): EstadoNotificacion {
    return this.props.estado;
  }

  get canal(): CanalNotificacion {
    return this.props.canal;
  }

  get mensaje(): string {
    return this.props.mensaje;
  }

  marcarEnviada(): void {
    this.props.estado = EstadoNotificacion.ENVIADA;
    this.props.fechaEnvio = new Date();
  }

  marcarFallida(): void {
    this.props.intentosFallidos += 1;
    this.props.estado = this.props.intentosFallidos >= MAX_INTENTOS
      ? EstadoNotificacion.FALLIDA
      : EstadoNotificacion.PENDIENTE;
  }

  puedeReintentar(): boolean {
    return this.props.intentosFallidos < MAX_INTENTOS;
  }

  toPersistence() {
    return { id: this.id, ...this.props };
  }
}
