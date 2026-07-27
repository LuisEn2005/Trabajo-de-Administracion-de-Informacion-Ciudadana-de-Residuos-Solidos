import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import {
  ConflictError,
  DomainError,
  InvalidStateTransitionError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from '../../domain/domain-error';

interface SolicitudHttp {
  url: string;
}

interface RespuestaHttp {
  status(codigoEstado: number): RespuestaHttp;
  json(cuerpo: RespuestaErrorDominio): void;
}

interface RespuestaErrorDominio {
  statusCode: number;
  error: string;
  code: string;
  message: string;
  path: string;
  timestamp: string;
}

@Catch(DomainError)
export class DomainErrorFilter implements ExceptionFilter<DomainError> {
  catch(exception: DomainError, host: ArgumentsHost): void {
    const contexto = host.switchToHttp();
    const respuesta = contexto.getResponse<RespuestaHttp>();
    const solicitud = contexto.getRequest<SolicitudHttp>();
    const estadoHttp = this.obtenerEstadoHttp(exception);

    respuesta.status(estadoHttp).json({
      statusCode: estadoHttp,
      error: 'Error de dominio',
      code: exception.code,
      message: exception.message,
      path: solicitud.url,
      timestamp: new Date().toISOString(),
    });
  }

  private obtenerEstadoHttp(exception: DomainError): number {
    if (exception instanceof ValidationError) {
      return HttpStatus.BAD_REQUEST;
    }

    if (exception instanceof NotFoundError) {
      return HttpStatus.NOT_FOUND;
    }

    if (exception instanceof UnauthorizedError) {
      return HttpStatus.UNAUTHORIZED;
    }

    if (exception instanceof ConflictError || exception instanceof InvalidStateTransitionError) {
      return HttpStatus.CONFLICT;
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
