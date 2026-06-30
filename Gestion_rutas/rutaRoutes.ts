import { Router } from 'express';
import { RutaController } from '../controllers/RutaController';
import { requireAuth, requireRole } from '../../../../shared/utils/authMiddleware';

export function rutaRoutes(controller: RutaController): Router {
  const router = Router();

  router.get('/rutas', controller.listar);
  router.get('/rutas/:idRuta', controller.obtenerPorId);
  router.post('/rutas', requireAuth, requireRole('ADMINISTRADOR'), controller.crear);
  router.put('/rutas/:idRuta/horario', requireAuth, requireRole('ADMINISTRADOR'), controller.actualizarHorario);
  router.post('/rutas/:idRuta/camion', requireAuth, requireRole('ADMINISTRADOR'), controller.asignarCamion);

  return router;
}
