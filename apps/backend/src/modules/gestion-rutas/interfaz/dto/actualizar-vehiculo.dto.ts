import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { TipoCarroceria } from '../../dominio/entities/vehiculo.entity';

export class ActualizarVehiculoDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  placa?: string;

  @IsOptional()
  @IsEnum(TipoCarroceria)
  carroceria?: TipoCarroceria;

  @IsOptional()
  @IsInt()
  @Min(1)
  rutaId?: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
