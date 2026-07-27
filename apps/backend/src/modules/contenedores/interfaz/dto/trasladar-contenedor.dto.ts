import { IsInt, IsOptional, Min } from 'class-validator';

export class TrasladarContenedorDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  puntoRecoleccionId?: number;
}
