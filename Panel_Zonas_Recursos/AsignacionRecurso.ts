import { Entity, UUID, newId } from '../../../../shared/types/Base';

export enum EstadoAsignacion {
  ACTIVA = 'ACTIVA',
  FINALIZADA = 'FINALIZADA',
  REASIGNADA = 'REASIGNADA',
}

interface AsignacionRecursoProps {
  nombre: string;
  idZona: UUID;
  idTrabajador?: UUID;
  idCamion?: UUID;
  fechaAsignacion: Date;
  estado: EstadoAsignacion;
}

export class AsignacionRecurso extends Entity<AsignacionRecurso> {
  private props: AsignacionRecursoProps;

  private constructor(id: UUID, props: AsignacionRecursoProps) {
    super(id);
    this.props = props;
  }

  static asignar(nombre: string, idZona: UUID, idTrabajador?: UUID, idCamion?: UUID): AsignacionRecurso {
    return new AsignacionRecurso(newId(), {
      nombre,
      idZona,
      idTrabajador,
      idCamion,
      fechaAsignacion: new Date(),
      estado: EstadoAsignacion.ACTIVA,
    });
  }

  static reconstruir(id: UUID, props: AsignacionRecursoProps): AsignacionRecurso {
    return new AsignacionRecurso(id, props);
  }

  get idZona(): UUID {
    return this.props.idZona;
  }

  get estado(): EstadoAsignacion {
    return this.props.estado;
  }

  reasignar(nuevaZona: UUID): void {
    this.props.estado = EstadoAsignacion.REASIGNADA;
    this.props.idZona = nuevaZona;
    this.props.fechaAsignacion = new Date();
  }

  finalizar(): void {
    this.props.estado = EstadoAsignacion.FINALIZADA;
  }

  toPersistence() {
    return { id: this.id, ...this.props };
  }
}
