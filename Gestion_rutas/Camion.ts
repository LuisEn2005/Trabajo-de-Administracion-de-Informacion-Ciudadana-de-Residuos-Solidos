import { Entity, UUID, newId } from '../../../../shared/types/Base';
import { ValidationError, InvalidStateTransitionError } from '../../../../shared/errors/DomainError';

export enum EstadoCamion {
  OPERATIVO = 'OPERATIVO',
  EN_MANTENIMIENTO = 'EN_MANTENIMIENTO',
  RETIRADO = 'RETIRADO',
}

interface CamionProps {
  placa: string;
  modelo: string;
  marca: string;
  capacidadToneladas: number;
  estado: EstadoCamion;
  ultimoMantenimiento?: Date;
  idRutaActual?: UUID;
}

export class Camion extends Entity<Camion> {
  private props: CamionProps;

  private constructor(id: UUID, props: CamionProps) {
    super(id);
    this.props = props;
  }

  static crear(placa: string, modelo: string, marca: string, capacidadToneladas: number): Camion {
    if (!placa.trim()) {
      throw new ValidationError('La placa no puede estar vacía');
    }
    return new Camion(newId(), {
      placa,
      modelo,
      marca,
      capacidadToneladas,
      estado: EstadoCamion.OPERATIVO,
    });
  }

  static reconstruir(id: UUID, props: CamionProps): Camion {
    return new Camion(id, props);
  }

  get placa(): string {
    return this.props.placa;
  }

  get estado(): EstadoCamion {
    return this.props.estado;
  }

  get idRutaActual(): UUID | undefined {
    return this.props.idRutaActual;
  }

  asignarRuta(idRuta: UUID): void {
    if (this.props.estado !== EstadoCamion.OPERATIVO) {
      throw new InvalidStateTransitionError(`El camión no está operativo: ${this.props.estado}`);
    }
    this.props.idRutaActual = idRuta;
  }

  liberar(): void {
    this.props.idRutaActual = undefined;
  }

  marcarMantenimiento(): void {
    this.props.estado = EstadoCamion.EN_MANTENIMIENTO;
    this.props.idRutaActual = undefined;
  }

  finalizarMantenimiento(): void {
    this.props.estado = EstadoCamion.OPERATIVO;
    this.props.ultimoMantenimiento = new Date();
  }

  toPersistence() {
    return { id: this.id, ...this.props };
  }
}
