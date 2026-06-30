import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { requireAuth } from '../../../../shared/utils/authMiddleware';

export function authRoutes(controller: AuthController): Router {
  const router = Router();

  router.post('/auth/registro/ciudadano', controller.registrarCiudadano);
  router.post('/auth/registro/administrador', controller.registrarAdministrador);
  router.post('/auth/login', controller.login);
  router.post('/auth/logout', requireAuth, controller.logout);
  router.post('/usuarios/cambiar-contrasena', requireAuth, controller.cambiarContrasena);

  return router;
}
