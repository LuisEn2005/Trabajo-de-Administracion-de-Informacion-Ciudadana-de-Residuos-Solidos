import { UUID } from '../../../../shared/types/Base';
import { Ruta } from '../model/Ruta';
import { Camion, EstadoCamion } from '../model/Camion';
import { NotificacionHorario } from '../model/NotificacionHorario';

export interface IRutaRepositorio {
  guardar(ruta: Ruta): Promise<void>;
  buscarPorId(idRuta: UUID): Promise<Ruta | null>;
  listarActivas(): Promise<Ruta[]>;
  listarPorZona(idZona: UUID): Promise<Ruta[]>;
  listarPorCamion(idCamion: UUID): Promise<Ruta[]>;
  actualizar(ruta: Ruta): Promise<void>;
  eliminar(idRuta: UUID): Promise<void>;
  buscarPorNombre(nombre: string): Promise<Ruta | null>;
}

export interface ICamionRepositorio {
  guardar(camion: Camion): Promise<void>;
  buscarPorId(idCamion: UUID): Promise<Camion | null>;
  buscarPorPlaca(placa: string): Promise<Camion | null>;
  listarPorEstado(estado: EstadoCamion): Promise<Camion[]>;
  listarDisponibles(): Promise<Camion[]>;
  actualizar(camion: Camion): Promise<void>;
  eliminar(idCamion: UUID): Promise<void>;
}

export interface INotificacionHorarioRepositorio {
  guardar(notificacion: NotificacionHorario): Promise<void>;
  buscarPendientes(): Promise<NotificacionHorario[]>;
  buscarPorRuta(idRuta: UUID): Promise<NotificacionHorario[]>;
  actualizar(notificacion: NotificacionHorario): Promise<void>;
  eliminar(idNotificacion: UUID): Promise<void>;
}
