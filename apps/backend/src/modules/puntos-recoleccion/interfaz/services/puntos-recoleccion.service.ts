import { Inject, Injectable } from '@nestjs/common';
import { NotFoundError } from '../../../../shared/domain/domain-error';
import { PuntoRecoleccion, CoordenadasGeograficas } from '../../dominio/entities/punto-recoleccion.entity';
import {
  PuntoRecoleccionRepository,
  PUNTO_RECOLECCION_REPOSITORY,
  CrearPuntoRecoleccionDatos,
  ActualizarPuntoRecoleccionDatos,
} from '../../repositorio/punto-recoleccion.repository';

@Injectable()
export class PuntosRecoleccionService {
  constructor(
    @Inject(PUNTO_RECOLECCION_REPOSITORY)
    private readonly repository: PuntoRecoleccionRepository,
  ) { }

  async crear(datos: CrearPuntoRecoleccionDatos): Promise<PuntoRecoleccion> {
    return this.repository.crear(datos);
  }

  async buscarTodos(): Promise<PuntoRecoleccion[]> {
    return this.repository.buscarTodos();
  }

  async buscarPorId(id: number): Promise<PuntoRecoleccion> {
    const punto = await this.repository.buscarPorId(id);
    if (!punto) {
      throw new NotFoundError(`Punto de recolección ${id} no encontrado.`);
    }
    return punto;
  }

  async actualizar(id: number, datos: ActualizarPuntoRecoleccionDatos): Promise<PuntoRecoleccion> {
    return this.repository.actualizar(id, datos);
  }

  async eliminar(id: number): Promise<void> {
    return this.repository.eliminar(id);
  }

  async cambiarEstado(id: number, activo: boolean): Promise<PuntoRecoleccion> {
    return this.repository.cambiarEstado(id, activo);
  }

  async mapearPunto(id: number): Promise<CoordenadasGeograficas> {
    const punto = await this.buscarPorId(id);
    return punto.mapearPunto();
  }
}