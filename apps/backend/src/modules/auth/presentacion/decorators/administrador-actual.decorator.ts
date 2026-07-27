import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AdministradorAutenticado } from '../../dominio/entities/jwt-payload.entity';

interface RequestConAdministrador {
  user?: AdministradorAutenticado;
}

export const AdministradorActual = createParamDecorator(
  (
    data: keyof AdministradorAutenticado | undefined,
    ctx: ExecutionContext,
  ):
    | AdministradorAutenticado
    | AdministradorAutenticado[keyof AdministradorAutenticado]
    | undefined => {
    const request = ctx.switchToHttp().getRequest<RequestConAdministrador>();
    const administrador = request.user;

    if (!administrador || !data) {
      return administrador;
    }

    return administrador[data];
  },
);
