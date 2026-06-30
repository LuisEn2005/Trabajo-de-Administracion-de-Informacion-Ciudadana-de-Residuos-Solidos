import { Zona } from '../model/Zona';
import { IReporteRepositorio } from '../../../reporte-incidencias/domain/repositories/IReporteRepositorio';
import { EstadoReporte } from '../../../reporte-incidencias/domain/model/ReporteCiudadano';

const UMBRAL_ALTA_CRITICIDAD = 70;

export class ClasificadorZonasCriticas {
  constructor(private readonly reporteRepo: IReporteRepositorio) {}

  async clasificar(zona: Zona, densidadPoblacional: number): Promise<number> {
    const desde = new Date();
    desde.setDate(desde.getDate() - 30);
    const reportesPendientes = await this.reporteRepo.contarPorZonaYPeriodo(zona.id, desde, new Date());

    return zona.calcularCriticidad(reportesPendientes, densidadPoblacional);
  }

  esAltaCriticidad(nivelCriticidad: number): boolean {
    return nivelCriticidad >= UMBRAL_ALTA_CRITICIDAD;
  }
}
