import { UUID } from '../../../../shared/types/Base';
import { ValidationError } from '../../../../shared/errors/DomainError';
import { ReporteCiudadano } from '../model/ReporteCiudadano';
import { Ubicacion } from '../model/Ubicacion';

const TIPOS_RESIDUO_VALIDOS = ['mixto', 'organico', 'inorganico', 'reciclable', 'peligroso'];

export class ReporteFactory {
  static crearReporte(params: {
    idCiudadano: UUID;
    latitud: number;
    longitud: number;
    distrito: string;
    direccionReferencia: string;
    descripcion: string;
    tipoResiduo: string;
    esAnonimo: boolean;
  }): ReporteCiudadano {
    const { idCiudadano, latitud, longitud, distrito, direccionReferencia, descripcion, tipoResiduo, esAnonimo } =
      params;

    if (!TIPOS_RESIDUO_VALIDOS.includes(tipoResiduo)) {
      throw new ValidationError(`Tipo de residuo no válido: ${tipoResiduo}`);
    }

    const ubicacion = Ubicacion.crear(latitud, longitud, distrito, direccionReferencia);
    const reporte = ReporteCiudadano.crear(idCiudadano, ubicacion, descripcion, tipoResiduo, esAnonimo);
    reporte.enviar();

    return reporte;
  }
}
