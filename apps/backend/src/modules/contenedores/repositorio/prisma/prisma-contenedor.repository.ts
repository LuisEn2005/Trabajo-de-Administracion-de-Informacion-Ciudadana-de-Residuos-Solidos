import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaService } from '../../../../shared/repositorio/prisma/prisma.service';
import {
  Contenedor,
  EstadoContenedor,
  ResumenInventarioContenedores,
  TipoContenedor,
} from '../../dominio/entities/contenedor.entity';
import {
  ActualizarContenedorDatos,
  ContenedorRepository,
  CrearContenedorDatos,
} from '../contenedor.repository';

export interface ContenedorPersistencia {
  id: number;
  codigo: string;
  tipo: TipoContenedor;
  capacidad: number;
  estado: EstadoContenedor;
  puntoRecoleccionId: number | null;
  fechaInstalacion: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class PrismaContenedorRepository implements ContenedorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async crear(datos: CrearContenedorDatos): Promise<Contenedor> {
    void datos;
    void this.prisma;
    // TODO(S2-INTEGRANTE-3): implementar la creación de contenedores.
    throw new NotImplementedException('La creación de contenedores está pendiente');
  }

  async buscarTodos(): Promise<Contenedor[]> {
    void this.prisma;
    // TODO(S2-INTEGRANTE-3): implementar la consulta de contenedores.
    throw new NotImplementedException('La consulta de contenedores está pendiente');
  }

  async buscarPorId(id: number): Promise<Contenedor | null> {
    void id;
    void this.prisma;
    // TODO(S2-INTEGRANTE-3): implementar la consulta de contenedor por id.
    throw new NotImplementedException('La consulta de contenedor por id está pendiente');
  }

  async actualizar(id: number, datos: ActualizarContenedorDatos): Promise<Contenedor> {
    void id;
    void datos;
    void this.prisma;
    // TODO(S2-INTEGRANTE-3): implementar la actualización de contenedores.
    throw new NotImplementedException('La actualización de contenedores está pendiente');
  }

  async eliminar(id: number): Promise<void> {
    void id;
    void this.prisma;
    // TODO(S2-INTEGRANTE-3): implementar la eliminación de contenedores.
    throw new NotImplementedException('La eliminación de contenedores está pendiente');
  }

  async buscarPorPunto(puntoId: number): Promise<Contenedor[]> {
    void puntoId;
    void this.prisma;
    // TODO(S2-INTEGRANTE-3): implementar la consulta de contenedores por punto.
    throw new NotImplementedException('La consulta de contenedores por punto está pendiente');
  }

  async cambiarEstado(id: number, estado: EstadoContenedor): Promise<Contenedor> {
    void id;
    void estado;
    void this.prisma;
    // TODO(S2-INTEGRANTE-3): implementar el cambio de estado del contenedor.
    throw new NotImplementedException('El cambio de estado del contenedor está pendiente');
  }

  async trasladarAPunto(id: number, puntoRecoleccionId: number | null): Promise<Contenedor> {
    void id;
    void puntoRecoleccionId;
    void this.prisma;
    // TODO(S2-INTEGRANTE-3): implementar el traslado de contenedor a un punto.
    throw new NotImplementedException('El traslado de contenedor está pendiente');
  }

  async obtenerResumenInventario(): Promise<ResumenInventarioContenedores> {
    void this.prisma;
    // TODO(S2-INTEGRANTE-3): implementar el resumen interno del inventario.
    throw new NotImplementedException('El resumen interno del inventario está pendiente');
  }

  mapearContenedor(registro: ContenedorPersistencia): Contenedor {
    void registro;
    // TODO(S2-INTEGRANTE-3): implementar el mapeo de persistencia a dominio.
    throw new NotImplementedException('El mapeo de contenedor está pendiente');
  }
}
