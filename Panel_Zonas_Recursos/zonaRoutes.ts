import { Router } from 'express';
import {
  ZonaController,
  MapaCalorController,
  AsignacionController,
  ReporteSemanalController,
} from '../controllers/ZonaController';
import { requireAuth, requireRole } from '../../../../shared/utils/authMiddleware';

export function zonaRoutes(
  zonaController: ZonaController,
  mapaController: MapaCalorController,
  asignacionController: AsignacionController,
  reporteSemanalController: ReporteSemanalController,
): Router {
  const router = Router();

  router.get('/zonas/criticas', requireAuth, requireRole('ADMINISTRADOR'), zonaController.listarCriticas);
  router.post(
    '/zonas/:idZona/calcular-criticidad',
    requireAuth,
    requireRole('ADMINISTRADOR'),
    zonaController.calcularCriticidad,
  );

  router.get('/mapa-calor', requireAuth, requireRole('ADMINISTRADOR'), mapaController.obtenerUltimo);

  router.post('/asignaciones', requireAuth, requireRole('ADMINISTRADOR'), asignacionController.asignar);
  router.put(
    '/asignaciones/:idAsignacion/reasignar',
    requireAuth,
    requireRole('ADMINISTRADOR'),
    asignacionController.reasignar,
  );

  router.post(
    '/reportes-semanales',
    requireAuth,
    requireRole('ADMINISTRADOR'),
    reporteSemanalController.generar,
  );
  router.get(
    '/reportes-semanales/:idReporte/pdf',
    requireAuth,
    requireRole('ADMINISTRADOR'),
    reporteSemanalController.exportarPDF,
  );

  return router;
}
