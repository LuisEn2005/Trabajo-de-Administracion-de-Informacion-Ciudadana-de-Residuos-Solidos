import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { EstadoContenedor, TipoContenedor } from '../../dominio/entities/contenedor.entity';

export class CrearContenedorDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  codigo!: string;

  @IsEnum(TipoContenedor)
  tipo!: TipoContenedor;

  @IsPositive()
  capacidad!: number;

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
