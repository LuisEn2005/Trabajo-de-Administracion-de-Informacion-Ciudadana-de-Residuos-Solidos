import { PuntoRecoleccionEntity } from '../dominio/entities/punto-recoleccion.entity';
import { CrearPuntoRecoleccionDto } from '../interfaz/dto/crear-punto-recoleccion.dto';
import { ActualizarPuntoRecoleccionDto } from '../interfaz/dto/actualizar-punto-recoleccion.dto';
import { EstadoPuntoRecoleccion } from '@prisma/client';

export interface PuntoRecoleccionRepository {
  crear(data: CrearPuntoRecoleccionDto): Promise<PuntoRecoleccionEntity>;
  buscarTodos(): Promise<PuntoRecoleccionEntity[]>;
  buscarPorId(id: number): Promise<PuntoRecoleccionEntity | null>;
  actualizar(id: number, data: ActualizarPuntoRecoleccionDto): Promise<PuntoRecoleccionEntity>;
  eliminar(id: number): Promise<PuntoRecoleccionEntity>;
  cambiarEstado(id: number, estado: EstadoPuntoRecoleccion): Promise<PuntoRecoleccionEntity>;
}

export const PUNTO_RECOLECCION_REPOSITORY = 'PUNTO_RECOLECCION_REPOSITORY';