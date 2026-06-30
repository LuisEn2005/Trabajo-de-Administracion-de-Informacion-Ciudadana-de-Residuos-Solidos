import { Request, Response, NextFunction } from 'express';
import { IZonaApplicationService } from '../../application/ZonaApplicationService';
import { IMapaCalorApplicationService } from '../../application/ZonaApplicationService';
import { IAsignacionApplicationService } from '../../application/ZonaApplicationService';
import { IReporteSemanalApplicationService } from '../../application/ZonaApplicationService';

export class ZonaController {
  constructor(private readonly zonaService: IZonaApplicationService) {}

  listarCriticas = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const zonas = await this.zonaService.listarZonasCriticas();
      res.status(200).json(zonas.map((z) => z.toPersistence()));
    } catch (err) {
      next(err);
    }
  };

  calcularCriticidad = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { densidadPoblacional } = req.body;
      const nivel = await this.zonaService.calcularCriticidad(req.params.idZona, densidadPoblacional);
      res.status(200).json({ nivelCriticidad: nivel });
    } catch (err) {
      next(err);
    }
  };
}

export class MapaCalorController {
  constructor(private readonly mapaService: IMapaCalorApplicationService) {}

  obtenerUltimo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const mapa = await this.mapaService.obtenerUltimo();
      res.status(200).json(mapa.toPersistence());
    } catch (err) {
      next(err);
    }
  };
}

export class AsignacionController {
  constructor(private readonly asignacionService: IAsignacionApplicationService) {}

  asignar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { nombre, idZona, idTrabajador, idCamion } = req.body;
      const idAsignacion = await this.asignacionService.asignar(nombre, idZona, idTrabajador, idCamion);
      res.status(201).json({ idAsignacion });
    } catch (err) {
      next(err);
    }
  };

  reasignar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { nuevaZona } = req.body;
      await this.asignacionService.reasignar(req.params.idAsignacion, nuevaZona);
      res.status(200).json({ message: 'Reasignado' });
    } catch (err) {
      next(err);
    }
  };
}

export class ReporteSemanalController {
  constructor(private readonly reporteService: IReporteSemanalApplicationService) {}

  generar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { semanaInicio, semanaFin } = req.body;
      const idReporte = await this.reporteService.generar(new Date(semanaInicio), new Date(semanaFin));
      res.status(201).json({ idReporte });
    } catch (err) {
      next(err);
    }
  };

  exportarPDF = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const url = await this.reporteService.exportarPDF(req.params.idReporte);
      res.status(200).json({ urlPdf: url });
    } catch (err) {
      next(err);
    }
  };
}
