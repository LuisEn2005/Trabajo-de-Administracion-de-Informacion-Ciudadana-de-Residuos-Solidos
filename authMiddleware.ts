import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/DomainError';

export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    next(new UnauthorizedError('Token no proporcionado'));
    return;
  }
  // En producción: validar JWT y extraer idUsuario, rol
  (req as any).idUsuario = 'placeholder-from-token';
  next();
}

export function requireRole(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const rol = (req as any).rol;
    if (!roles.includes(rol)) {
      next(new UnauthorizedError('No tiene permisos para esta acción'));
      return;
    }
    next();
  };
}
