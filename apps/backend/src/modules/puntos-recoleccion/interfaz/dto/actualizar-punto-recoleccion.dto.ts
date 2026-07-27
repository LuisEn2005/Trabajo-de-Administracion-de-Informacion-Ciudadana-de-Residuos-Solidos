import { IsBoolean, IsLatitude, IsLongitude, IsOptional, IsString, MaxLength } from 'class-validator';

export class ActualizarPuntoRecoleccionDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  nombre?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  referencia?: string;

  @IsLatitude()
  @IsOptional()
  latitud?: number;

  @IsLongitude()
  @IsOptional()
  longitud?: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}