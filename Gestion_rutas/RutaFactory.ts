import { UUID } from '../../../../shared/types/Base';
import { Ruta } from '../model/Ruta';
import { HorarioRecoleccion, DiaSemana } from '../model/HorarioRecoleccion';

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
