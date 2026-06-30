import { AggregateRoot, UUID, newId } from '../../../../shared/types/Base';
import { ValidationError } from '../../../../shared/errors/DomainError';

interface ZonaProps {
  nombre: string;
  distrito: string;
  nivelCriticidad: number;
  fechaUltimoCalculo: Date;
}

const PESO_REPORTES_PENDIENTES = 0.6;
const PESO_DENSIDAD_POBLACIONAL = 0.4;

export class Zona extends AggregateRoot<Zona> {
  private props: ZonaProps;

  private constructor(id: UUID, props: ZonaProps) {
    super(id);
    this.props = props;
  }

  static crear(nombre: string, distrito: string): Zona {
    if (!nombre.trim()) {
      throw new ValidationError('El nombre de la zona no puede estar vacío');
    }
    return new Zona(newId(), { nombre, distrito, nivelCriticidad: 0, fechaUltimoCalculo: new Date() });
  }

  static reconstruir(id: UUID, props: ZonaProps): Zona {
    return new Zona(id, props);
  }

  get nombre(): string {
    return this.props.nombre;
  }

  get distrito(): string {
    return this.props.distrito;
  }

  get nivelCriticidad(): number {
    return this.props.nivelCriticidad;
  }

  calcularCriticidad(reportesPendientes: number, densidadPoblacional: number): number {
    const score = reportesPendientes * PESO_REPORTES_PENDIENTES + densidadPoblacional * PESO_DENSIDAD_POBLACIONAL;
    this.props.nivelCriticidad = Math.min(100, Math.round(score));
    this.props.fechaUltimoCalculo = new Date();
    return this.props.nivelCriticidad;
  }

  toPersistence() {
    return { id: this.id, ...this.props };
  }
}
