import { Entity, UUID, newId } from '../../../../shared/types/Base';
import { ValidationError } from '../../../../shared/errors/DomainError';

const MIME_TYPES_PERMITIDOS = ['image/jpeg', 'image/png', 'image/webp'];

interface FotoProps {
  urlImagen: string;
  fechaCaptura: Date;
  tamanio: number;
  mimeType: string;
}

export class Foto extends Entity<Foto> {
  private props: FotoProps;

  private constructor(id: UUID, props: FotoProps) {
    super(id);
    this.props = props;
  }

  static crear(urlImagen: string, tamanio: number, mimeType: string): Foto {
    if (!MIME_TYPES_PERMITIDOS.includes(mimeType)) {
      throw new ValidationError(`Tipo de archivo no permitido: ${mimeType}`);
    }
    return new Foto(newId(), { urlImagen, fechaCaptura: new Date(), tamanio, mimeType });
  }

  static reconstruir(id: UUID, props: FotoProps): Foto {
    return new Foto(id, props);
  }

  get urlImagen(): string {
    return this.props.urlImagen;
  }

  esValida(): boolean {
    return MIME_TYPES_PERMITIDOS.includes(this.props.mimeType);
  }

  toPersistence() {
    return { id: this.id, ...this.props };
  }
}
