import { PartialType } from '@nestjs/mapped-types';
import { CrearPuntoRecoleccionDto } from './crear-punto-recoleccion.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { EstadoPuntoRecoleccion } from '@prisma/client';

export class ActualizarPuntoRecoleccionDto extends PartialType(CrearPuntoRecoleccionDto) { }

export class CambiarEstadoPuntoRecoleccionDto {
  @IsEnum(EstadoPuntoRecoleccion)
  estado: EstadoPuntoRecoleccion;
}