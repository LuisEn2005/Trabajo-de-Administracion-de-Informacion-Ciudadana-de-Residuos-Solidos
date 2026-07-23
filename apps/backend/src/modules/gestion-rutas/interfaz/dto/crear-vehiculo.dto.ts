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

export class CrearVehiculoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  placa!: string;

  @IsEnum(TipoCarroceria)
  carroceria!: TipoCarroceria;

  @IsInt()
  @Min(1)
  rutaId!: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
