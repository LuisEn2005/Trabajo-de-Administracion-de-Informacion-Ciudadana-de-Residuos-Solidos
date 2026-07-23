import { Inject, Injectable } from '@nestjs/common';
import { ActualizarHorarioRutaDto } from '../dto/actualizar-horario-ruta.dto';
import { CrearHorarioRutaDto } from '../dto/crear-horario-ruta.dto';
import { HorarioRuta } from '../../dominio/entities/horario-ruta.entity';
import {
  HORARIO_RUTA_REPOSITORY,
  HorarioRutaRepository,
} from '../../repositorio/horario-ruta.repository';

@Injectable()
export class HorariosRutaService {
  constructor(
    @Inject(HORARIO_RUTA_REPOSITORY)
    private readonly horarioRutaRepository: HorarioRutaRepository,
  ) {}

  crear(rutaId: number, dto: CrearHorarioRutaDto): Promise<HorarioRuta> {
    return this.horarioRutaRepository.crear({ rutaId, ...dto });
  }

  buscarTodos(): Promise<HorarioRuta[]> {
    return this.horarioRutaRepository.buscarTodos();
  }

  buscarPorId(id: number): Promise<HorarioRuta | null> {
    return this.horarioRutaRepository.buscarPorId(id);
  }

  buscarPorRutaId(rutaId: number): Promise<HorarioRuta[]> {
    return this.horarioRutaRepository.buscarPorRutaId(rutaId);
  }

  actualizar(id: number, dto: ActualizarHorarioRutaDto): Promise<HorarioRuta> {
    // TODO: Agregar reglas de negocio antes de actualizar el horario de la ruta.
    return this.horarioRutaRepository.actualizar(id, dto);
  }

  eliminar(id: number): Promise<void> {
    return this.horarioRutaRepository.eliminar(id);
  }
}
