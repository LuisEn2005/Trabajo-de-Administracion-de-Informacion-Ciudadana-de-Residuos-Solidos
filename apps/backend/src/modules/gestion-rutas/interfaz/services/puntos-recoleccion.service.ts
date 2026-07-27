import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PUNTO_RECOLECCION_REPOSITORY, PuntoRecoleccionRepository } from '../../repositorio/punto-recoleccion.repository';
import { CrearPuntoRecoleccionDto } from '../dto/crear-punto-recoleccion.dto';
import { ActualizarPuntoRecoleccionDto } from '../dto/actualizar-punto-recoleccion.dto';
import { EstadoPuntoRecoleccion } from '@prisma/client';

@Injectable()
export class PuntosRecoleccionService {
  constructor(
    @Inject(PUNTO_RECOLECCION_REPOSITORY)
    private readonly puntoRepo: PuntoRecoleccionRepository,
  ) { }

  async crear(dto: CrearPuntoRecoleccionDto) {
    return this.puntoRepo.crear(dto);
  }

  async buscarTodos() {
    return this.puntoRepo.buscarTodos();
  }

  async buscarPorId(id: number) {
    const punto = await this.puntoRepo.buscarPorId(id);
    if (!punto) {
      throw new NotFoundException(`Punto de recolección con ID ${id} no encontrado`);
    }
    return punto;
  }

  async actualizar(id: number, dto: ActualizarPuntoRecoleccionDto) {
    await this.buscarPorId(id);
    return this.puntoRepo.actualizar(id, dto);
  }

  async eliminar(id: number) {
    await this.buscarPorId(id);
    return this.puntoRepo.eliminar(id);
  }

  async cambiarEstado(id: number, estado: EstadoPuntoRecoleccion) {
    await this.buscarPorId(id);
    return this.puntoRepo.cambiarEstado(id, estado);
  }
}