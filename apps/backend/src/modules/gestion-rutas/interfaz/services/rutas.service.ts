import { Inject, Injectable } from '@nestjs/common';
import { NotFoundError } from '../../../../shared/domain/domain-error';
import { ActualizarRutaDto } from '../dto/actualizar-ruta.dto';
import { CrearRutaDto } from '../dto/crear-ruta.dto';
import { Ruta } from '../../dominio/entities/ruta.entity';
import { RUTA_REPOSITORY, RutaRepository } from '../../repositorio/ruta.repository';

@Injectable()
export class RutasService {
  constructor(
    @Inject(RUTA_REPOSITORY)
    private readonly rutaRepository: RutaRepository,
  ) {}

  crear(dto: CrearRutaDto): Promise<Ruta> {
    return this.rutaRepository.crear(dto);
  }

  buscarTodos(): Promise<Ruta[]> {
    return this.rutaRepository.buscarTodos();
  }

  async buscarPorId(id: number): Promise<Ruta> {
    const ruta = await this.rutaRepository.buscarPorId(id);

    if (!ruta) {
      throw new NotFoundError(`No se encontró una ruta con el id ${id}.`);
    }

    return ruta;
  }

  actualizar(id: number, dto: ActualizarRutaDto): Promise<Ruta> {
    // TODO: Agregar reglas de negocio antes de actualizar la ruta.
    return this.rutaRepository.actualizar(id, dto);
  }

  eliminar(id: number): Promise<void> {
    return this.rutaRepository.eliminar(id);
  }
}
