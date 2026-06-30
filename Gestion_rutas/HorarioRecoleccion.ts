import { ValueObject } from '../../../../shared/types/Base';
import { ValidationError } from '../../../../shared/errors/DomainError';

export enum DiaSemana {
  LUNES = 1,
  MARTES = 2,
  MIERCOLES = 3,
  JUEVES = 4,
  VIERNES = 5,
  SABADO = 6,
  DOMINGO = 0,
}

interface HorarioRecoleccionProps {
  diasSemana: DiaSemana[];
  horaInicio: string;
  horaFin: string;
  frecuenciaDias: number;
}

export class HorarioRecoleccion extends ValueObject<HorarioRecoleccionProps> {
  private constructor(props: HorarioRecoleccionProps) {
    super(props);
  }

  static crear(diasSemana: DiaSemana[], horaInicio: string, horaFin: string, frecuenciaDias: number): HorarioRecoleccion {
    if (diasSemana.length === 0) {
      throw new ValidationError('Debe especificar al menos un día de la semana');
    }
    if (horaInicio >= horaFin) {
      throw new ValidationError('La hora de inicio debe ser menor que la hora de fin');
    }
    if (frecuenciaDias < 1) {
      throw new ValidationError('La frecuencia debe ser al menos 1 día');
    }
    return new HorarioRecoleccion({ diasSemana, horaInicio, horaFin, frecuenciaDias });
  }

  get diasSemana(): DiaSemana[] {
    return this.props.diasSemana;
  }

  get horaInicio(): string {
    return this.props.horaInicio;
  }

  get horaFin(): string {
    return this.props.horaFin;
  }

  esValida(): boolean {
    return this.props.diasSemana.length > 0 && this.props.horaInicio < this.props.horaFin;
  }

  pasaEn(fecha: Date): boolean {
    return this.props.diasSemana.includes(fecha.getDay() as DiaSemana);
  }

  obtenerProximosPases(desde: Date, cantidad: number): Date[] {
    const pases: Date[] = [];
    const fecha = new Date(desde);
    const [hh, mm] = this.props.horaInicio.split(':').map(Number);

    let intentos = 0;
    while (pases.length < cantidad && intentos < 365) {
      if (this.pasaEn(fecha)) {
        const pase = new Date(fecha);
        pase.setHours(hh, mm, 0, 0);
        if (pase >= desde) {
          pases.push(new Date(pase));
        }
      }
      fecha.setDate(fecha.getDate() + 1);
      intentos += 1;
    }
    return pases;
  }

  actualizar(diasSemana: DiaSemana[], horaInicio: string, horaFin: string): HorarioRecoleccion {
    return HorarioRecoleccion.crear(diasSemana, horaInicio, horaFin, this.props.frecuenciaDias);
  }
}
