import { IsBoolean, IsLatitude, IsLongitude, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CrearPuntoRecoleccionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  referencia?: string;

  @IsLatitude()
  @IsNotEmpty()
  latitud: number;

  @IsLongitude()
  @IsNotEmpty()
  longitud: number;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}