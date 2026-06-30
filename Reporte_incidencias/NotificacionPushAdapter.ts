import { NotificacionEstado, CanalNotificacion } from '../../domain/model/NotificacionEstado';

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
    // En producción: integrar nodemailer / SendGrid / SES
  }

  private async enviarSMS(mensaje: string): Promise<void> {
    // En producción: integrar Twilio
  }

  private async enviarPush(mensaje: string): Promise<void> {
    // En producción: integrar Firebase Cloud Messaging
  }
}
