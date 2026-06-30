import { UUID } from '../../../shared/types/Base';
import { NotFoundError } from '../../../shared/errors/DomainError';
import { RutaFactory } from '../domain/factories/RutaFactory';
import { Ruta } from '../domain/model/Ruta';
import { DiaSemana } from '../domain/model/HorarioRecoleccion';
import { NotificacionHorario, TipoNotificacionHorario } from '../domain/model/NotificacionHorario';
import {
  IRutaRepositorio,
  ICamionRepositorio,
  INotificacionHorarioRepositorio,
} from '../domain/repositories/IRutaRepositorio';

export interface CrearRutaDTO {
  nombre: string;
  descripcion: string;
  diasSemana: DiaSemana[];
  horaInicio: string;
  horaFin: string;
  frecuenciaDias: number;
  idAdministrador: UUID;
  zonas: UUID[];
}

export interface IRutaApplicationService {
  registrarRuta(dto: CrearRutaDTO): Promise<UUID>;
  obtenerRuta(idRuta: UUID): Promise<Ruta>;
  actualizarHorario(idRuta: UUID, diasSemana: DiaSemana[], horaInicio: string, horaFin: string): Promise<void>;
  asignarCamion(idRuta: UUID, idCamion: UUID): Promise<void>;
  suspenderRuta(idRuta: UUID): Promise<void>;
  listarActivas(): Promise<Ruta[]>;
}

export class RutaApplicationService implements IRutaApplicationService {
  constructor(
    private readonly rutaRepo: IRutaRepositorio,
    private readonly camionRepo: ICamionRepositorio,
    private readonly notificacionRepo: INotificacionHorarioRepositorio,
  ) {}

  async registrarRuta(dto: CrearRutaDTO): Promise<UUID> {
    const ruta = RutaFactory.crearRuta(dto);
    ruta.registrar();
    await this.rutaRepo.guardar(ruta);

    const notificacion = NotificacionHorario.crear(ruta.id, TipoNotificacionHorario.RUTA_CREADA, `Nueva ruta: ${ruta.nombre}`);
    await this.notificacionRepo.guardar(notificacion);

    return ruta.id;
  }

  async obtenerRuta(idRuta: UUID): Promise<Ruta> {
    const ruta = await this.rutaRepo.buscarPorId(idRuta);
    if (!ruta) {
      throw new NotFoundError(`Ruta no encontrada: ${idRuta}`);
    }
    return ruta;
  }

  async actualizarHorario(idRuta: UUID, diasSemana: DiaSemana[], horaInicio: string, horaFin: string): Promise<void> {
    const ruta = await this.obtenerRuta(idRuta);
    const cambio = ruta.actualizarHorario(diasSemana, horaInicio, horaFin);
    await this.rutaRepo.actualizar(ruta);

    if (cambio) {
      const notificacion = NotificacionHorario.crear(
        idRuta,
        TipoNotificacionHorario.CAMBIO_HORARIO,
        `El horario de la ruta ${ruta.nombre} ha cambiado`,
      );
      await this.notificacionRepo.guardar(notificacion);
    }
  }

  async asignarCamion(idRuta: UUID, idCamion: UUID): Promise<void> {
    const ruta = await this.obtenerRuta(idRuta);
    const camion = await this.camionRepo.buscarPorId(idCamion);
    if (!camion) {
      throw new NotFoundError(`Camión no encontrado: ${idCamion}`);
    }
    camion.asignarRuta(idRuta);
    ruta.asignarCamion(idCamion);
    await this.camionRepo.actualizar(camion);
    await this.rutaRepo.actualizar(ruta);
  }

  async suspenderRuta(idRuta: UUID): Promise<void> {
    const ruta = await this.obtenerRuta(idRuta);
    ruta.suspender();
    await this.rutaRepo.actualizar(ruta);

    const notificacion = NotificacionHorario.crear(
      idRuta,
      TipoNotificacionHorario.RUTA_SUSPENDIDA,
      `La ruta ${ruta.nombre} ha sido suspendida`,
    );
    await this.notificacionRepo.guardar(notificacion);
  }

  async listarActivas(): Promise<Ruta[]> {
    return this.rutaRepo.listarActivas();
  }
}
