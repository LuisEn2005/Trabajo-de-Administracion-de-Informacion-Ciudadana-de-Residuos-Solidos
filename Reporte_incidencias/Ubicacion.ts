import { ValueObject } from '../../../../shared/types/Base';
import { ValidationError } from '../../../../shared/errors/DomainError';

interface UbicacionProps {
  latitud: number;
  longitud: number;
  distrito: string;
  direccionReferencia: string;
}

export class Ubicacion extends ValueObject<UbicacionProps> {
  private constructor(props: UbicacionProps) {
    super(props);
  }

  static crear(latitud: number, longitud: number, distrito: string, direccionReferencia: string): Ubicacion {
    if (latitud < -90 || latitud > 90) {
      throw new ValidationError(`Latitud fuera de rango: ${latitud}`);
    }
    if (longitud < -180 || longitud > 180) {
      throw new ValidationError(`Longitud fuera de rango: ${longitud}`);
    }
    if (!distrito.trim()) {
      throw new ValidationError('El distrito no puede estar vacío');
    }
    return new Ubicacion({ latitud, longitud, distrito, direccionReferencia });
  }

  get latitud(): number {
    return this.props.latitud;
  }

  get longitud(): number {
    return this.props.longitud;
  }

  get distrito(): string {
    return this.props.distrito;
  }

  get direccionReferencia(): string {
    return this.props.direccionReferencia;
  }

  obtenerCoordenadas(): [number, number] {
    return [this.props.latitud, this.props.longitud];
  }

  esValida(): boolean {
    return (
      this.props.latitud >= -90 &&
      this.props.latitud <= 90 &&
      this.props.longitud >= -180 &&
      this.props.longitud <= 180
    );
  }

  distanciaA(otra: Ubicacion): number {
    const R = 6371e3;
    const phi1 = (this.props.latitud * Math.PI) / 180;
    const phi2 = (otra.latitud * Math.PI) / 180;
    const deltaPhi = ((otra.latitud - this.props.latitud) * Math.PI) / 180;
    const deltaLambda = ((otra.longitud - this.props.longitud) * Math.PI) / 180;

    const a =
      Math.sin(deltaPhi / 2) ** 2 +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }
}
