import { Inject, Injectable } from '@nestjs/common';
import { Contenedor } from '../../../contenedores/dominio/entities/contenedor.entity';
import { ContenedoresService } from '../../../contenedores/interfaz/services/contenedores.service';
import { PuntoRecoleccion } from '../../dominio/entities/punto-recoleccion.entity';
import {
  PUNTO_RECOLECCION_REPOSITORY,
  PuntoRecoleccionRepository,
} from '../../repositorio/punto-recoleccion.repository';
import { ActualizarPuntoRecoleccionDto } from '../dto/actualizar-punto-recoleccion.dto';
import { CambiarEstadoPuntoRecoleccionDto } from '../dto/cambiar-estado-punto-recoleccion.dto';
import { CrearPuntoRecoleccionDto } from '../dto/crear-punto-recoleccion.dto';

@Injectable()
export class PuntosRecoleccionService {
  constructor(
    @Inject(PUNTO_RECOLECCION_REPOSITORY)
    private readonly puntoRecoleccionRepository: PuntoRecoleccionRepository,
    private readonly contenedoresService: ContenedoresService,
  ) {}

  crear(dto: CrearPuntoRecoleccionDto): Promise<PuntoRecoleccion> {
    return this.puntoRecoleccionRepository.crear(dto);
  }

  buscarTodos(): Promise<PuntoRecoleccion[]> {
    return this.puntoRecoleccionRepository.buscarTodos();
  }

  buscarPorId(id: number): Promise<PuntoRecoleccion | null> {
    return this.puntoRecoleccionRepository.buscarPorId(id);
  }

  actualizar(id: number, dto: ActualizarPuntoRecoleccionDto): Promise<PuntoRecoleccion> {
    return this.puntoRecoleccionRepository.actualizar(id, dto);
  }

  eliminar(id: number): Promise<void> {
    return this.puntoRecoleccionRepository.eliminar(id);
  }

  cambiarEstado(id: number, dto: CambiarEstadoPuntoRecoleccionDto): Promise<PuntoRecoleccion> {
    return this.puntoRecoleccionRepository.cambiarEstado(id, dto.estado);
  }

  buscarContenedores(id: number): Promise<Contenedor[]> {
    return this.contenedoresService.buscarPorPunto(id);
  }
}
