import {
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { EstadoPuntoRecoleccion } from '../../dominio/entities/punto-recoleccion.entity';

export class CrearPuntoRecoleccionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  direccion!: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  referencia?: string;

  @IsLatitude()
  latitud!: number;

  @IsLongitude()
  longitud!: number;

  @IsOptional()
  @IsEnum(EstadoPuntoRecoleccion)
  estado?: EstadoPuntoRecoleccion;
}
