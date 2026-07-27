import { Prisma } from '@prisma/client';

export enum CodigoErrorPersistencia {
  TABLA_NO_EXISTE = 'TABLA_NO_EXISTE',
  REGISTRO_NO_ENCONTRADO = 'REGISTRO_NO_ENCONTRADO',
  CONEXION_NO_DISPONIBLE = 'CONEXION_NO_DISPONIBLE',
  ERROR_CONOCIDO = 'ERROR_CONOCIDO',
  ERROR_DESCONOCIDO = 'ERROR_DESCONOCIDO',
}

export class ErrorPersistencia extends Error {
  readonly code = 'PERSISTENCE_ERROR';

  constructor(
    message: string,
    public readonly codigo: CodigoErrorPersistencia,
    public readonly originalError?: unknown,
  ) {
    super(message);
    this.name = 'ErrorPersistencia';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export function manejarErrorPrisma(error: unknown, operacion: string): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    throw new ErrorPersistencia(
      obtenerMensajeErrorConocido(error, operacion),
      obtenerCodigoErrorConocido(error),
      error,
    );
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    throw new ErrorPersistencia(
      `No se pudo ${operacion}: no fue posible inicializar la conexión con la base de datos.`,
      CodigoErrorPersistencia.CONEXION_NO_DISPONIBLE,
      error,
    );
  }

  throw new ErrorPersistencia(
    `No se pudo ${operacion}.`,
    CodigoErrorPersistencia.ERROR_DESCONOCIDO,
    error,
  );
}

function obtenerMensajeErrorConocido(
  error: Prisma.PrismaClientKnownRequestError,
  operacion: string,
): string {
  if (error.code === 'P2021') {
    return `No se pudo ${operacion}: la tabla requerida no existe en la base de datos.`;
  }

  if (error.code === 'P2025') {
    return `No se pudo ${operacion}: el registro solicitado no existe.`;
  }

  return `No se pudo ${operacion}. Código de Prisma: ${error.code}.`;
}

function obtenerCodigoErrorConocido(
  error: Prisma.PrismaClientKnownRequestError,
): CodigoErrorPersistencia {
  if (error.code === 'P2021') {
    return CodigoErrorPersistencia.TABLA_NO_EXISTE;
  }

  if (error.code === 'P2025') {
    return CodigoErrorPersistencia.REGISTRO_NO_ENCONTRADO;
  }

  return CodigoErrorPersistencia.ERROR_CONOCIDO;
}
