import { Entity, UUID, newId } from '../../../../shared/types/Base';

export interface PuntoCalor {
  idZona: UUID;
  latitud: number;
  longitud: number;
  intensidad: number;
}

interface MapaCalorProps {
  fechaGeneracion: Date;
  datos: PuntoCalor[];
}

export class MapaCalor extends Entity<MapaCalor> {
  private props: MapaCalorProps;

  private constructor(id: UUID, props: MapaCalorProps) {
    super(id);
    this.props = props;
  }

  static generar(datos: PuntoCalor[]): MapaCalor {
    return new MapaCalor(newId(), { fechaGeneracion: new Date(), datos });
  }

  static reconstruir(id: UUID, props: MapaCalorProps): MapaCalor {
    return new MapaCalor(id, props);
  }

  get datos(): PuntoCalor[] {
    return this.props.datos;
  }

  get fechaGeneracion(): Date {
    return this.props.fechaGeneracion;
  }

  actualizar(datos: PuntoCalor[]): void {
    this.props.datos = datos;
    this.props.fechaGeneracion = new Date();
  }

  toPersistence() {
    return { id: this.id, ...this.props };
  }
}
