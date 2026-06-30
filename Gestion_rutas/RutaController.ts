import { Request, Response, NextFunction } from 'express';
import { IRutaApplicationService } from '../../application/RutaApplicationService';

export class RutaController {
  constructor(private readonly rutaService: IRutaApplicationService) {}

  crear = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const idAdministrador = (req as any).idUsuario;
      const { nombre, descripcion, diasSemana, horaInicio, horaFin, frecuenciaDias, zonas } = req.body;
      const idRuta = await this.rutaService.registrarRuta({
        nombre,
        descripcion,
        diasSemana,
        horaInicio,
        horaFin,
        frecuenciaDias,
        idAdministrador,
        zonas,
      });
      res.status(201).json({ idRuta, estado: 'ACTIVA' });
    } catch (err) {
      next(err);
    }
  };

  listar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const rutas = await this.rutaService.listarActivas();
      res.status(200).json(rutas.map((r) => r.toPersistence()));
    } catch (err) {
      next(err);
    }
  };

  obtenerPorId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const ruta = await this.rutaService.obtenerRuta(req.params.idRuta);
      res.status(200).json(ruta.toPersistence());
    } catch (err) {
      next(err);
    }
  };

  actualizarHorario = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { diasSemana, horaInicio, horaFin } = req.body;
      await this.rutaService.actualizarHorario(req.params.idRuta, diasSemana, horaInicio, horaFin);
      res.status(200).json({ message: 'Horario actualizado' });
    } catch (err) {
      next(err);
    }
  };

  asignarCamion = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { idCamion } = req.body;
      await this.rutaService.asignarCamion(req.params.idRuta, idCamion);
      res.status(200).json({ message: 'Camión asignado' });
    } catch (err) {
      next(err);
    }
  };
}
