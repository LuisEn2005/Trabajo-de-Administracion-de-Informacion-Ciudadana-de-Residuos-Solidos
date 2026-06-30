import { Entity, UUID, newId } from '../../../../shared/types/Base';
import { EstadoReporte } from './ReporteCiudadano';

interface SeguimientoReporteProps {
  idReporte: UUID;
  estadoAnterior: EstadoReporte;
  estadoNuevo: EstadoReporte;
  fechaCambio: Date;
  comentario?: string;
  idAdministrador?: UUID;
}

export class SeguimientoReporte extends Entity<SeguimientoReporte> {
  private props: SeguimientoReporteProps;

  private constructor(id: UUID, props: SeguimientoReporteProps) {
    super(id);
    this.props = props;
  }

  static registrarCambio(
    idReporte: UUID,
    estadoAnterior: EstadoReporte,
    estadoNuevo: EstadoReporte,
    comentario?: string,
    idAdministrador?: UUID,
  ): SeguimientoReporte {
    return new SeguimientoReporte(newId(), {
      idReporte,
      estadoAnterior,
      estadoNuevo,
      fechaCambio: new Date(),
      comentario,
      idAdministrador,
    });
  }

  static reconstruir(id: UUID, props: SeguimientoReporteProps): SeguimientoReporte {
    return new SeguimientoReporte(id, props);
  }

  get estadoNuevo(): EstadoReporte {
    return this.props.estadoNuevo;
  }

  toPersistence() {
    return { id: this.id, ...this.props };
  }
}
