import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { EstadoAsignacionOperativa } from '../../dominio/entities/asignacion-operativa.entity';

export class CrearAsignacionDto {
  @IsInt()
  @Min(1)
  rutaId!: number;

  @IsInt()
  @Min(1)
  vehiculoId!: number;

  @IsInt()
  @Min(1)
  horarioId!: number;

  @IsOptional()
  @IsEnum(EstadoAsignacionOperativa)
  estado?: EstadoAsignacionOperativa;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fecha?: Date;
}
