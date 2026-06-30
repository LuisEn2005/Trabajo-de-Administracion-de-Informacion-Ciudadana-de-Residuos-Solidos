import { Request, Response, NextFunction } from 'express';
import { IReporteApplicationService } from '../../application/ReporteApplicationService';

export class ReporteController {
  constructor(private readonly reporteService: IReporteApplicationService) {}

  crear = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const idCiudadano = (req as any).idUsuario;
      const { latitud, longitud, distrito, direccionReferencia, descripcion, tipoResiduo, esAnonimo } = req.body;
      const idReporte = await this.reporteService.crearReporte({
        idCiudadano,
        latitud,
        longitud,
        distrito,
        direccionReferencia,
        descripcion,
        tipoResiduo,
        esAnonimo: esAnonimo ?? true,
      });
      res.status(201).json({ idReporte, estado: 'PENDIENTE' });
    } catch (err) {
      next(err);
    }
  };

  obtenerPorId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reporte = await this.reporteService.obtenerReporte(req.params.idReporte);
      res.status(200).json(reporte.toPersistence());
    } catch (err) {
      next(err);
    }
  };

  actualizarEstado = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const idAdministrador = (req as any).idUsuario;
      const { nuevoEstado, comentario } = req.body;
      await this.reporteService.actualizarEstado(req.params.idReporte, nuevoEstado, comentario, idAdministrador);
      res.status(200).json({ message: 'Estado actualizado' });
    } catch (err) {
      next(err);
    }
  };

  listarMisReportes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const idCiudadano = (req as any).idUsuario;
      const reportes = await this.reporteService.listarPorCiudadano(idCiudadano);
      res.status(200).json(reportes.map((r) => r.toPersistence()));
    } catch (err) {
      next(err);
    }
  };
}
