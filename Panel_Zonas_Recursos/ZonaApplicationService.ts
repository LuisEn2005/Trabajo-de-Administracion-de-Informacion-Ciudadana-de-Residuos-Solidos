import { UUID } from '../../../shared/types/Base';
import { NotFoundError } from '../../../shared/errors/DomainError';
import { Zona } from '../domain/model/Zona';
import { MapaCalor, PuntoCalor } from '../domain/model/MapaCalor';
import { AsignacionRecurso } from '../domain/model/AsignacionRecurso';
import { ReporteSemanal } from '../domain/model/ReporteSemanal';
import { ClasificadorZonasCriticas } from '../domain/services/ClasificadorZonasCriticas';
import {
  IZonaRepositorio,
  IMapaCalorRepositorio,
  IAsignacionRepositorio,
  IReporteSemanalRepositorio,
} from '../domain/repositories/IZonaRepositorio';
import { IReporteRepositorio } from '../../reporte-incidencias/domain/repositories/IReporteRepositorio';

export interface IZonaApplicationService {
  calcularCriticidad(idZona: UUID, densidadPoblacional: number): Promise<number>;
  listarZonasCriticas(): Promise<Zona[]>;
}

export class ZonaApplicationService implements IZonaApplicationService {
  private clasificador: ClasificadorZonasCriticas;

  constructor(
    private readonly zonaRepo: IZonaRepositorio,
    reporteRepo: IReporteRepositorio,
  ) {
    this.clasificador = new ClasificadorZonasCriticas(reporteRepo);
  }

  async calcularCriticidad(idZona: UUID, densidadPoblacional: number): Promise<number> {
    const zona = await this.zonaRepo.buscarPorId(idZona);
    if (!zona) {
      throw new NotFoundError(`Zona no encontrada: ${idZona}`);
    }
    const nivel = await this.clasificador.clasificar(zona, densidadPoblacional);
    await this.zonaRepo.actualizar(zona);
    return nivel;
  }

  async listarZonasCriticas(): Promise<Zona[]> {
    return this.zonaRepo.listarPorCriticidad();
  }
}

export interface IMapaCalorApplicationService {
  generar(datos: PuntoCalor[]): Promise<UUID>;
  obtenerUltimo(): Promise<MapaCalor>;
}

export class MapaCalorApplicationService implements IMapaCalorApplicationService {
  constructor(private readonly mapaRepo: IMapaCalorRepositorio) {}

  async generar(datos: PuntoCalor[]): Promise<UUID> {
    const mapa = MapaCalor.generar(datos);
    await this.mapaRepo.guardar(mapa);
    return mapa.id;
  }

  async obtenerUltimo(): Promise<MapaCalor> {
    const mapa = await this.mapaRepo.obtenerUltimo();
    if (!mapa) {
      throw new NotFoundError('No hay mapas de calor generados');
    }
    return mapa;
  }
}

export interface IAsignacionApplicationService {
  asignar(nombre: string, idZona: UUID, idTrabajador?: UUID, idCamion?: UUID): Promise<UUID>;
  reasignar(idAsignacion: UUID, nuevaZona: UUID): Promise<void>;
}

export class AsignacionApplicationService implements IAsignacionApplicationService {
  constructor(private readonly asignacionRepo: IAsignacionRepositorio) {}

  async asignar(nombre: string, idZona: UUID, idTrabajador?: UUID, idCamion?: UUID): Promise<UUID> {
    const asignacion = AsignacionRecurso.asignar(nombre, idZona, idTrabajador, idCamion);
    await this.asignacionRepo.guardar(asignacion);
    return asignacion.id;
  }

  async reasignar(idAsignacion: UUID, nuevaZona: UUID): Promise<void> {
    const asignacion = await this.asignacionRepo.buscarPorId(idAsignacion);
    if (!asignacion) {
      throw new NotFoundError(`Asignación no encontrada: ${idAsignacion}`);
    }
    asignacion.reasignar(nuevaZona);
    await this.asignacionRepo.actualizar(asignacion);
  }
}

export interface IReporteSemanalApplicationService {
  generar(semanaInicio: Date, semanaFin: Date): Promise<UUID>;
  exportarPDF(idReporte: UUID): Promise<string>;
}

export class ReporteSemanalApplicationService implements IReporteSemanalApplicationService {
  constructor(
    private readonly reporteSemanalRepo: IReporteSemanalRepositorio,
    private readonly reporteRepo: IReporteRepositorio,
  ) {}

  async generar(semanaInicio: Date, semanaFin: Date): Promise<UUID> {
    const total = await this.reporteRepo.contarPorZonaYPeriodo('all', semanaInicio, semanaFin);
    const resumen = `Reporte de ${semanaInicio.toISOString()} a ${semanaFin.toISOString()}`;
    const reporte = ReporteSemanal.generar(semanaInicio, semanaFin, total, resumen);
    await this.reporteSemanalRepo.guardar(reporte);
    return reporte.id;
  }

  async exportarPDF(idReporte: UUID): Promise<string> {
    const reporte = await this.reporteSemanalRepo.buscarPorId(idReporte);
    if (!reporte) {
      throw new NotFoundError(`Reporte no encontrado: ${idReporte}`);
    }
    const url = `/reportes-pdf/${idReporte}.pdf`;
    reporte.marcarPdfGenerado(url);
    return url;
  }
}
