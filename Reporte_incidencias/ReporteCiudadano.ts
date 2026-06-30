import { AggregateRoot, UUID, newId } from '../../../../shared/types/Base';
import { ValidationError, InvalidStateTransitionError } from '../../../../shared/errors/DomainError';
import { Ubicacion } from './Ubicacion';
import { Foto } from './Foto';

export enum EstadoReporte {
  PENDIENTE = 'PENDIENTE',
  EN_ATENCION = 'EN_ATENCION',
  RESUELTO = 'RESUELTO',
  RECHAZADO = 'RECHAZADO',
}

const MAX_FOTOS = 5;
const ESTADOS_FINALES = [EstadoReporte.RECHAZADO];

interface ReporteCiudadanoProps {
  idCiudadano: UUID;
  ubicacion: Ubicacion;
  descripcion: string;
  fotos: Foto[];
  estadoReporte: EstadoReporte;
  fechaCreacion: Date;
  fechaUltimaActualizacion: Date;
  esAnonimo: boolean;
  tipoResiduo: string;
}

export class ReporteCiudadano extends AggregateRoot<ReporteCiudadano> {
  private props: ReporteCiudadanoProps;

  private constructor(id: UUID, props: ReporteCiudadanoProps) {
    super(id);
    this.props = props;
  }

  static crear(
    idCiudadano: UUID,
    ubicacion: Ubicacion,
    descripcion: string,
    tipoResiduo: string,
    esAnonimo: boolean,
  ): ReporteCiudadano {
    if (!descripcion.trim()) {
      throw new ValidationError('La descripción no puede estar vacía');
    }
    if (descripcion.length > 500) {
      throw new ValidationError('La descripción no puede superar 500 caracteres');
    }
    const ahora = new Date();
    return new ReporteCiudadano(newId(), {
      idCiudadano,
      ubicacion,
      descripcion,
      fotos: [],
      estadoReporte: EstadoReporte.PENDIENTE,
      fechaCreacion: ahora,
      fechaUltimaActualizacion: ahora,
      esAnonimo,
      tipoResiduo,
    });
  }

  static reconstruir(id: UUID, props: ReporteCiudadanoProps): ReporteCiudadano {
    return new ReporteCiudadano(id, props);
  }

  get idCiudadano(): UUID {
    return this.props.idCiudadano;
  }

  get ubicacion(): Ubicacion {
    return this.props.ubicacion;
  }

  get descripcion(): string {
    return this.props.descripcion;
  }

  get estadoReporte(): EstadoReporte {
    return this.props.estadoReporte;
  }

  get esAnonimo(): boolean {
    return this.props.esAnonimo;
  }

  get fotos(): ReadonlyArray<Foto> {
    return this.props.fotos;
  }

  enviar(): void {
    if (!this.props.ubicacion.esValida()) {
      throw new ValidationError('Ubicación inválida');
    }
    this.props.estadoReporte = EstadoReporte.PENDIENTE;
    this.props.fechaUltimaActualizacion = new Date();
  }

  actualizarEstado(nuevoEstado: EstadoReporte): EstadoReporte {
    if (ESTADOS_FINALES.includes(this.props.estadoReporte)) {
      throw new InvalidStateTransitionError(
        `No se puede cambiar el estado de un reporte ${this.props.estadoReporte}`,
      );
    }
    const estadoAnterior = this.props.estadoReporte;
    this.props.estadoReporte = nuevoEstado;
    this.props.fechaUltimaActualizacion = new Date();
    return estadoAnterior;
  }

  adjuntarFoto(foto: Foto): void {
    if (this.props.fotos.length >= MAX_FOTOS) {
      throw new ValidationError(`No se pueden adjuntar más de ${MAX_FOTOS} fotos`);
    }
    this.props.fotos.push(foto);
  }

  marcarResuelto(): void {
    this.actualizarEstado(EstadoReporte.RESUELTO);
  }

  obtenerEdadDias(): number {
    const msPorDia = 1000 * 60 * 60 * 24;
    return Math.floor((Date.now() - this.props.fechaCreacion.getTime()) / msPorDia);
  }

  toPersistence() {
    return {
      id: this.id,
      idCiudadano: this.props.idCiudadano,
      latitud: this.props.ubicacion.latitud,
      longitud: this.props.ubicacion.longitud,
      distrito: this.props.ubicacion.distrito,
      direccionReferencia: this.props.ubicacion.direccionReferencia,
      descripcion: this.props.descripcion,
      estadoReporte: this.props.estadoReporte,
      fechaCreacion: this.props.fechaCreacion,
      fechaUltimaActualizacion: this.props.fechaUltimaActualizacion,
      esAnonimo: this.props.esAnonimo,
      tipoResiduo: this.props.tipoResiduo,
    };
  }
}
