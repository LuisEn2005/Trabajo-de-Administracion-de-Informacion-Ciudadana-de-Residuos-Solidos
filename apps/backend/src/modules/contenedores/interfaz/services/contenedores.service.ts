import { Inject, Injectable } from '@nestjs/common';
import {
  Contenedor,
  ResumenInventarioContenedores,
} from '../../dominio/entities/contenedor.entity';
import {
  CONTENEDOR_REPOSITORY,
  ContenedorRepository,
} from '../../repositorio/contenedor.repository';
import { ActualizarContenedorDto } from '../dto/actualizar-contenedor.dto';
import { CambiarEstadoContenedorDto } from '../dto/cambiar-estado-contenedor.dto';
import { CrearContenedorDto } from '../dto/crear-contenedor.dto';
import { TrasladarContenedorDto } from '../dto/trasladar-contenedor.dto';

@Injectable()
export class ContenedoresService {
  constructor(
    @Inject(CONTENEDOR_REPOSITORY)
    private readonly contenedorRepository: ContenedorRepository,
  ) {}

  crear(dto: CrearContenedorDto): Promise<Contenedor> {
    return this.contenedorRepository.crear(dto);
  }

  buscarTodos(): Promise<Contenedor[]> {
    return this.contenedorRepository.buscarTodos();
  }

  buscarPorId(id: number): Promise<Contenedor | null> {
    return this.contenedorRepository.buscarPorId(id);
  }

  actualizar(id: number, dto: ActualizarContenedorDto): Promise<Contenedor> {
    return this.contenedorRepository.actualizar(id, dto);
  }

  eliminar(id: number): Promise<void> {
    return this.contenedorRepository.eliminar(id);
  }

  buscarPorPunto(puntoId: number): Promise<Contenedor[]> {
    return this.contenedorRepository.buscarPorPunto(puntoId);
  }

  cambiarEstado(id: number, dto: CambiarEstadoContenedorDto): Promise<Contenedor> {
    return this.contenedorRepository.cambiarEstado(id, dto.estado);
  }

  trasladarAPunto(id: number, dto: TrasladarContenedorDto): Promise<Contenedor> {
    return this.contenedorRepository.trasladarAPunto(id, dto.puntoRecoleccionId ?? null);
  }

  obtenerResumenInventario(): Promise<ResumenInventarioContenedores> {
    return this.contenedorRepository.obtenerResumenInventario();
  }
}
