import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CambiarEstadoPuntoRecoleccionDto {
  @IsBoolean()
  @IsNotEmpty()
  activo: boolean;
}