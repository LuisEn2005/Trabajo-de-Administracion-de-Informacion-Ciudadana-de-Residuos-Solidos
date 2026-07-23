import { Inject, Injectable } from '@nestjs/common';
import { ActualizarVehiculoDto } from '../dto/actualizar-vehiculo.dto';
import { CrearVehiculoDto } from '../dto/crear-vehiculo.dto';
import { Vehiculo } from '../../dominio/entities/vehiculo.entity';
import {
  VEHICULO_REPOSITORY,
  VehiculoRepository,
} from '../../repositorio/vehiculo.repository';

@Injectable()
export class VehiculosService {
  constructor(
    @Inject(VEHICULO_REPOSITORY)
    private readonly vehiculoRepository: VehiculoRepository,
  ) {}

  crear(dto: CrearVehiculoDto): Promise<Vehiculo> {
    return this.vehiculoRepository.crear(dto);
  }

  buscarTodos(): Promise<Vehiculo[]> {
    return this.vehiculoRepository.buscarTodos();
  }

  buscarPorId(id: number): Promise<Vehiculo | null> {
    return this.vehiculoRepository.buscarPorId(id);
  }

  buscarPorRutaId(rutaId: number): Promise<Vehiculo[]> {
    return this.vehiculoRepository.buscarPorRutaId(rutaId);
  }

  actualizar(id: number, dto: ActualizarVehiculoDto): Promise<Vehiculo> {
    // TODO: Agregar reglas de negocio antes de actualizar el vehículo.
    return this.vehiculoRepository.actualizar(id, dto);
  }

  eliminar(id: number): Promise<void> {
    return this.vehiculoRepository.eliminar(id);
  }
}
