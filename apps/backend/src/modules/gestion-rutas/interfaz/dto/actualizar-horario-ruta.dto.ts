import { IsBoolean, IsEnum, IsOptional, Matches } from 'class-validator';
import { DiaSemana, FrecuenciaRuta, Turno } from '../../dominio/entities/horario-ruta.entity';

const FORMATO_HORA = /^([01]\d|2[0-3]):[0-5]\d$/;

export class ActualizarHorarioRutaDto {
  @IsOptional()
  @IsEnum(FrecuenciaRuta)
  frecuencia?: FrecuenciaRuta;

  @IsOptional()
  @IsEnum(DiaSemana)
  diaSemana?: DiaSemana;

  @IsOptional()
  @IsEnum(Turno)
  turno?: Turno;

  @IsOptional()
  @Matches(FORMATO_HORA, { message: 'horaInicio debe tener formato HH:mm' })
  horaInicio?: string;

  @IsOptional()
  @Matches(FORMATO_HORA, { message: 'horaFin debe tener formato HH:mm' })
  horaFin?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
