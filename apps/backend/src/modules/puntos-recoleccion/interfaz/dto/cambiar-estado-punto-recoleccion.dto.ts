import { IsEnum } from 'class-validator';
import { EstadoPuntoRecoleccion } from '../../dominio/entities/punto-recoleccion.entity';

export class CambiarEstadoPuntoRecoleccionDto {
  @IsEnum(EstadoPuntoRecoleccion)
  estado!: EstadoPuntoRecoleccion;
}
