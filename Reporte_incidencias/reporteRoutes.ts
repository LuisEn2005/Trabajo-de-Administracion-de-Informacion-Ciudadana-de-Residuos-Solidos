import { Router } from 'express';
import { ReporteController } from '../controllers/ReporteController';
import { requireAuth, requireRole } from '../../../../shared/utils/authMiddleware';

export function reporteRoutes(controller: ReporteController): Router {
  const router = Router();

  router.post('/reportes', requireAuth, controller.crear);
  router.get('/reportes/mios', requireAuth, controller.listarMisReportes);
  router.get('/reportes/:idReporte', requireAuth, controller.obtenerPorId);
  router.put('/reportes/:idReporte/estado', requireAuth, requireRole('ADMINISTRADOR'), controller.actualizarEstado);

  return router;
}
