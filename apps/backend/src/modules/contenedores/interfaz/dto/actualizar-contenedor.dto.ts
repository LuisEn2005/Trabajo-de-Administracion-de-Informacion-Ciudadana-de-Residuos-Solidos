import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { EstadoContenedor, TipoContenedor } from '../../dominio/entities/contenedor.entity';

export class ActualizarContenedorDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  codigo?: string;

  @IsOptional()
  @IsEnum(TipoContenedor)
  tipo?: TipoContenedor;

  @IsOptional()
  @IsPositive()
  capacidad?: number;

  @IsOptional()
  @IsEnum(EstadoContenedor)
  estado?: EstadoContenedor;

  @IsOptional()
  @IsInt()
  @Min(1)
  puntoRecoleccionId?: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fechaInstalacion?: Date;
}
