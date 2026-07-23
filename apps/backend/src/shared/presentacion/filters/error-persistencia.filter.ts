import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import {
  CodigoErrorPersistencia,
  ErrorPersistencia,
} from '../../repositorio/prisma/manejar-error-prisma';

interface SolicitudHttp {
  url: string;
}

interface RespuestaHttp {
  status(codigoEstado: number): RespuestaHttp;
  json(cuerpo: RespuestaErrorPersistencia): void;
}

interface RespuestaErrorPersistencia {
  statusCode: number;
  error: string;
  code: string;
  persistenceCode: CodigoErrorPersistencia;
  message: string;
  path: string;
  timestamp: string;
}

@Catch(ErrorPersistencia)
export class ErrorPersistenciaFilter implements ExceptionFilter<ErrorPersistencia> {
  catch(exception: ErrorPersistencia, host: ArgumentsHost): void {
    const contexto = host.switchToHttp();
    const respuesta = contexto.getResponse<RespuestaHttp>();
    const solicitud = contexto.getRequest<SolicitudHttp>();
    const estadoHttp = this.obtenerEstadoHttp(exception.codigo);

    respuesta.status(estadoHttp).json({
      statusCode: estadoHttp,
      error: 'Error de persistencia',
      code: exception.code,
      persistenceCode: exception.codigo,
      message: exception.message,
      path: solicitud.url,
      timestamp: new Date().toISOString(),
    });
  }

  private obtenerEstadoHttp(codigo: CodigoErrorPersistencia): number {
    if (codigo === CodigoErrorPersistencia.REGISTRO_NO_ENCONTRADO) {
      return HttpStatus.NOT_FOUND;
    }

    if (
      codigo === CodigoErrorPersistencia.TABLA_NO_EXISTE ||
      codigo === CodigoErrorPersistencia.CONEXION_NO_DISPONIBLE
    ) {
      return HttpStatus.SERVICE_UNAVAILABLE;
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
