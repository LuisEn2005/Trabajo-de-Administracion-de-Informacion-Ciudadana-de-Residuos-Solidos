import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaService } from '../../../../shared/repositorio/prisma/prisma.service';
import {
  EstadoPuntoRecoleccion,
  PuntoRecoleccion,
} from '../../dominio/entities/punto-recoleccion.entity';
import {
  ActualizarPuntoRecoleccionDatos,
  CrearPuntoRecoleccionDatos,
  PuntoRecoleccionRepository,
} from '../punto-recoleccion.repository';

export interface PuntoRecoleccionPersistencia {
  id: number;
  nombre: string;
  direccion: string;
  referencia: string | null;
  latitud: number;
  longitud: number;
  estado: EstadoPuntoRecoleccion;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class PrismaPuntoRecoleccionRepository implements PuntoRecoleccionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async crear(datos: CrearPuntoRecoleccionDatos): Promise<PuntoRecoleccion> {
    void datos;
    void this.prisma;
    // TODO(S2-INTEGRANTE-2): implementar la creación de puntos de recolección.
    throw new NotImplementedException('La creación de puntos de recolección está pendiente');
  }

  async buscarTodos(): Promise<PuntoRecoleccion[]> {
    void this.prisma;
    // TODO(S2-INTEGRANTE-2): implementar la consulta de puntos de recolección.
    throw new NotImplementedException('La consulta de puntos de recolección está pendiente');
  }

  async buscarPorId(id: number): Promise<PuntoRecoleccion | null> {
    void id;
    void this.prisma;
    // TODO(S2-INTEGRANTE-2): implementar la consulta de punto de recolección por id.
    throw new NotImplementedException('La consulta de punto de recolección por id está pendiente');
  }

  async actualizar(id: number, datos: ActualizarPuntoRecoleccionDatos): Promise<PuntoRecoleccion> {
    void id;
    void datos;
    void this.prisma;
    // TODO(S2-INTEGRANTE-2): implementar la actualización de puntos de recolección.
    throw new NotImplementedException('La actualización de puntos de recolección está pendiente');
  }

  async eliminar(id: number): Promise<void> {
    void id;
    void this.prisma;
    // TODO(S2-INTEGRANTE-2): implementar la eliminación de puntos de recolección.
    throw new NotImplementedException('La eliminación de puntos de recolección está pendiente');
  }

  async cambiarEstado(id: number, estado: EstadoPuntoRecoleccion): Promise<PuntoRecoleccion> {
    void id;
    void estado;
    void this.prisma;
    // TODO(S2-INTEGRANTE-2): implementar el cambio de estado del punto de recolección.
    throw new NotImplementedException(
      'El cambio de estado del punto de recolección está pendiente',
    );
  }

  mapearPunto(registro: PuntoRecoleccionPersistencia): PuntoRecoleccion {
    void registro;
    // TODO(S2-INTEGRANTE-2): implementar el mapeo de persistencia a dominio.
    throw new NotImplementedException('El mapeo de punto de recolección está pendiente');
  }
}
