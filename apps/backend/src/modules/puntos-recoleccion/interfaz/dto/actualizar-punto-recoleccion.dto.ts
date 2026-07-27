import { IsEnum, IsLatitude, IsLongitude, IsOptional, IsString, MaxLength } from 'class-validator';
import { EstadoPuntoRecoleccion } from '../../dominio/entities/punto-recoleccion.entity';

export class ActualizarPuntoRecoleccionDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  nombre?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  direccion?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  referencia?: string;

  @IsOptional()
  @IsLatitude()
  latitud?: number;

  @IsOptional()
  @IsLongitude()
  longitud?: number;

  @IsOptional()
  @IsEnum(EstadoPuntoRecoleccion)
  estado?: EstadoPuntoRecoleccion;
}
