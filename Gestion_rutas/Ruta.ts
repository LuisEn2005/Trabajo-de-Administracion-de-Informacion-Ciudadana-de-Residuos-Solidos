import { AggregateRoot, UUID, newId } from '../../../../shared/types/Base';
import { ValidationError, InvalidStateTransitionError } from '../../../../shared/errors/DomainError';
import { HorarioRecoleccion, DiaSemana } from './HorarioRecoleccion';

export enum EstadoRuta {
  ACTIVA = 'ACTIVA',
  INACTIVA = 'INACTIVA',
  SUSPENDIDA = 'SUSPENDIDA',
}

interface RutaProps {
  nombre: string;
  descripcion: string;
  horario: HorarioRecoleccion;
  idCamionAsignado?: UUID;
  idAdministrador: UUID;
  estado: EstadoRuta;
  fechaCreacion: Date;
  fechaUltimaActualizacion: Date;
  zonas: UUID[];
}

export class Ruta extends AggregateRoot<Ruta> {
  private props: RutaProps;

  private constructor(id: UUID, props: RutaProps) {
    super(id);
    this.props = props;
  }

  static crear(
    nombre: string,
    descripcion: string,
    horario: HorarioRecoleccion,
    idAdministrador: UUID,
    zonas: UUID[],
  ): Ruta {
    if (!nombre.trim()) {
      throw new ValidationError('El nombre de la ruta no puede estar vacío');
    }
    if (!horario.esValida()) {
      throw new ValidationError('El horario de recolección no es válido');
    }
    const ahora = new Date();
    return new Ruta(newId(), {
      nombre,
      descripcion,
      horario,
      idAdministrador,
      estado: EstadoRuta.ACTIVA,
      fechaCreacion: ahora,
      fechaUltimaActualizacion: ahora,
      zonas,
    });
  }

  static reconstruir(id: UUID, props: RutaProps): Ruta {
    return new Ruta(id, props);
  }

  get nombre(): string {
    return this.props.nombre;
  }

  get horario(): HorarioRecoleccion {
    return this.props.horario;
  }

  get estado(): EstadoRuta {
    return this.props.estado;
  }

  get idCamionAsignado(): UUID | undefined {
    return this.props.idCamionAsignado;
  }

  get zonas(): UUID[] {
    return this.props.zonas;
  }

  registrar(): void {
    this.props.estado = EstadoRuta.ACTIVA;
  }

  actualizarHorario(diasSemana: DiaSemana[], horaInicio: string, horaFin: string): boolean {
    const horarioAnterior = this.props.horario;
    this.props.horario = horarioAnterior.actualizar(diasSemana, horaInicio, horaFin);
    this.props.fechaUltimaActualizacion = new Date();
    return true; // indica que cambió y requiere notificación
  }

  asignarCamion(idCamion: UUID): void {
    if (this.props.estado === EstadoRuta.SUSPENDIDA) {
      throw new InvalidStateTransitionError('No se puede asignar camión a una ruta suspendida');
    }
    this.props.idCamionAsignado = idCamion;
  }

  liberarCamion(): void {
    this.props.idCamionAsignado = undefined;
  }

  suspender(): void {
    this.props.estado = EstadoRuta.SUSPENDIDA;
  }

  reactivar(): void {
    this.props.estado = EstadoRuta.ACTIVA;
  }

  obtenerProximoPase(): Date | undefined {
    return this.props.horario.obtenerProximosPases(new Date(), 1)[0];
  }

  toPersistence() {
    return {
      id: this.id,
      nombre: this.props.nombre,
      descripcion: this.props.descripcion,
      diasSemana: this.props.horario.diasSemana,
      horaInicio: this.props.horario.horaInicio,
      horaFin: this.props.horario.horaFin,
      idCamionAsignado: this.props.idCamionAsignado,
      idAdministrador: this.props.idAdministrador,
      estado: this.props.estado,
      fechaCreacion: this.props.fechaCreacion,
      fechaUltimaActualizacion: this.props.fechaUltimaActualizacion,
      zonas: this.props.zonas,
    };
  }
}
