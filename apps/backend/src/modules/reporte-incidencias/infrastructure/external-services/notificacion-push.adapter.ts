import { NotificacionEstado, CanalNotificacion } from '../../domain/entities/notificacion-estado';

export interface INotificadorServicio {
  notificar(notificacion: NotificacionEstado): Promise<void>;
}

export class NotificacionPushAdapter implements INotificadorServicio {
  async notificar(notificacion: NotificacionEstado): Promise<void> {
    try {
      switch (notificacion.canal) {
        case CanalNotificacion.EMAIL:
          await this.enviarEmail(notificacion.mensaje);
          break;
        case CanalNotificacion.SMS:
          await this.enviarSMS(notificacion.mensaje);
          break;
        case CanalNotificacion.PUSH:
          await this.enviarPush(notificacion.mensaje);
          break;
        case CanalNotificacion.APP:
          break;
      }
      notificacion.marcarEnviada();
    } catch (error) {
      notificacion.marcarFallida();
      throw error;
    }
  }

  private async enviarEmail(mensaje: string): Promise<void> {
    void mensaje;
  }

  private async enviarSMS(mensaje: string): Promise<void> {
    void mensaje;
  }

  private async enviarPush(mensaje: string): Promise<void> {
    void mensaje;
  }
}
