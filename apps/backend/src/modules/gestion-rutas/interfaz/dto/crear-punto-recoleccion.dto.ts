import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum, MaxLength } from 'class-validator';
import { EstadoPuntoRecoleccion } from '@prisma/client';

export class CrearPuntoRecoleccionDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  direccion: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  referencia?: string;

  @IsNumber()
  @IsNotEmpty()
  latitud: number;

  @IsNumber()
  @IsNotEmpty()
  longitud: number;

  @IsEnum(EstadoPuntoRecoleccion)
  @IsOptional()
  estado?: EstadoPuntoRecoleccion;
}