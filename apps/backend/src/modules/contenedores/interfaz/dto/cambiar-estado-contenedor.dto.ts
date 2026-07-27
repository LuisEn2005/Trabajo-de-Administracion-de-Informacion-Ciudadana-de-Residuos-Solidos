import { IsEnum } from 'class-validator';
import { EstadoContenedor } from '../../dominio/entities/contenedor.entity';

export class CambiarEstadoContenedorDto {
  @IsEnum(EstadoContenedor)
  estado!: EstadoContenedor;
}
