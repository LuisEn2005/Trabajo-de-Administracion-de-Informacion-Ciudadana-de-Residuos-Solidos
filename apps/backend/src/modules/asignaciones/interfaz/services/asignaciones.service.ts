import { Inject, Injectable } from '@nestjs/common';
import { AsignacionOperativa } from '../../dominio/entities/asignacion-operativa.entity';
import {
  ASIGNACION_OPERATIVA_REPOSITORY,
  AsignacionOperativaRepository,
} from '../../repositorio/asignacion-operativa.repository';
import { ActualizarAsignacionDto } from '../dto/actualizar-asignacion.dto';
import { CrearAsignacionDto } from '../dto/crear-asignacion.dto';

@Injectable()
export class AsignacionesService {
  constructor(
    @Inject(ASIGNACION_OPERATIVA_REPOSITORY)
    private readonly asignacionRepository: AsignacionOperativaRepository,
  ) {}

  crear(dto: CrearAsignacionDto): Promise<AsignacionOperativa> {
    return this.asignacionRepository.crear(dto);
  }

  buscarTodos(): Promise<AsignacionOperativa[]> {
    return this.asignacionRepository.buscarTodos();
  }

  buscarPorId(id: number): Promise<AsignacionOperativa | null> {
    return this.asignacionRepository.buscarPorId(id);
  }

  actualizar(id: number, dto: ActualizarAsignacionDto): Promise<AsignacionOperativa> {
    return this.asignacionRepository.actualizar(id, dto);
  }

  eliminar(id: number): Promise<void> {
    return this.asignacionRepository.eliminar(id);
  }

  buscarPorRuta(rutaId: number): Promise<AsignacionOperativa[]> {
    return this.asignacionRepository.buscarPorRuta(rutaId);
  }

  buscarPorVehiculo(vehiculoId: number): Promise<AsignacionOperativa[]> {
    return this.asignacionRepository.buscarPorVehiculo(vehiculoId);
  }
}
