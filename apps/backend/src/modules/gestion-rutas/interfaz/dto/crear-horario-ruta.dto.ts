import { IsBoolean, IsEnum, IsOptional, Matches } from 'class-validator';
import { DiaSemana, FrecuenciaRuta, Turno } from '../../dominio/entities/horario-ruta.entity';

const FORMATO_HORA = /^([01]\d|2[0-3]):[0-5]\d$/;

export class CrearHorarioRutaDto {
  @IsEnum(FrecuenciaRuta)
  frecuencia!: FrecuenciaRuta;

  @IsEnum(DiaSemana)
  diaSemana!: DiaSemana;

  @IsEnum(Turno)
  turno!: Turno;

  @Matches(FORMATO_HORA, { message: 'horaInicio debe tener formato HH:mm' })
  horaInicio!: string;

  @Matches(FORMATO_HORA, { message: 'horaFin debe tener formato HH:mm' })
  horaFin!: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
