import { UUID } from '../../../../shared/domain/base';
import { Ruta } from '../aggregates/ruta';
import { HorarioRecoleccion, DiaSemana } from '../value-objects/horario-recoleccion';

export class RutaFactory {
  static crearRuta(params: {
    nombre: string;
    descripcion: string;
    diasSemana: DiaSemana[];
    horaInicio: string;
    horaFin: string;
    frecuenciaDias: number;
    idAdministrador: UUID;
    zonas: UUID[];
  }): Ruta {
    const horario = HorarioRecoleccion.crear(
      params.diasSemana,
      params.horaInicio,
      params.horaFin,
      params.frecuenciaDias,
    );
    return Ruta.crear(params.nombre, params.descripcion, horario, params.idAdministrador, params.zonas);
  }
}
