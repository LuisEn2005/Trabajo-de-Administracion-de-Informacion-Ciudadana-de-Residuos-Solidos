import { Entity, UUID, newId } from '../../../../shared/types/Base';

export enum TipoNotificacionHorario {
  CAMBIO_HORARIO = 'CAMBIO_HORARIO',
  RUTA_CREADA = 'RUTA_CREADA',
  RUTA_SUSPENDIDA = 'RUTA_SUSPENDIDA',
  PROXIMO_PASE = 'PROXIMO_PASE',
}

interface NotificacionHorarioProps {
  idRuta: UUID;
  idCiudadano?: UUID;
  esGlobal: boolean;
  tipo: TipoNotificacionHorario;
  mensaje: string;
  fechaCreacion: Date;
  fechaEnvio?: Date;
  enviada: boolean;
}

export class NotificacionHorario extends Entity<NotificacionHorario> {
  private props: NotificacionHorarioProps;

  private constructor(id: UUID, props: NotificacionHorarioProps) {
    super(id);
    this.props = props;
  }

  static crear(
    idRuta: UUID,
    tipo: TipoNotificacionHorario,
    mensaje: string,
    idCiudadano?: UUID,
  ): NotificacionHorario {
    return new NotificacionHorario(newId(), {
      idRuta,
      idCiudadano,
      esGlobal: !idCiudadano,
      tipo,
      mensaje,
      fechaCreacion: new Date(),
      enviada: false,
    });
  }

  static reconstruir(id: UUID, props: NotificacionHorarioProps): NotificacionHorario {
    return new NotificacionHorario(id, props);
  }

  enviar(): void {
    this.props.enviada = true;
    this.props.fechaEnvio = new Date();
  }

  toPersistence() {
    return { id: this.id, ...this.props };
  }
}
