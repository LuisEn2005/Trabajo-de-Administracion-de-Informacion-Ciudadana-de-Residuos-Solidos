import { Entity, UUID, newId } from '../../../../shared/types/Base';

interface ReporteSemanalProps {
  semanaInicio: Date;
  semanaFin: Date;
  totalIncidencias: number;
  resumen: string;
  urlPdf?: string;
}

export class ReporteSemanal extends Entity<ReporteSemanal> {
  private props: ReporteSemanalProps;

  private constructor(id: UUID, props: ReporteSemanalProps) {
    super(id);
    this.props = props;
  }

  static generar(semanaInicio: Date, semanaFin: Date, totalIncidencias: number, resumen: string): ReporteSemanal {
    return new ReporteSemanal(newId(), { semanaInicio, semanaFin, totalIncidencias, resumen });
  }

  static reconstruir(id: UUID, props: ReporteSemanalProps): ReporteSemanal {
    return new ReporteSemanal(id, props);
  }

  get totalIncidencias(): number {
    return this.props.totalIncidencias;
  }

  marcarPdfGenerado(url: string): void {
    this.props.urlPdf = url;
  }

  toPersistence() {
    return { id: this.id, ...this.props };
  }
}
