import { Request, Response, NextFunction } from 'express';
import { DomainError } from './DomainError';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof DomainError) {
    const statusMap: Record<string, number> = {
      VALIDATION_ERROR: 400,
      NOT_FOUND: 404,
      INVALID_STATE_TRANSITION: 409,
      UNAUTHORIZED: 401,
      CONFLICT: 409,
    };
    res.status(statusMap[err.code] ?? 400).json({ error: err.code, message: err.message });
    return;
  }

  console.error(err);
  res.status(500).json({ error: 'INTERNAL_ERROR', message: 'Ha ocurrido un error inesperado' });
}
