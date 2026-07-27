import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaService } from '../../../../shared/repositorio/prisma/prisma.service';
import {
  AsignacionOperativa,
  EstadoAsignacionOperativa,
} from '../../dominio/entities/asignacion-operativa.entity';
import {
  ActualizarAsignacionOperativaDatos,
  AsignacionOperativaRepository,
  CrearAsignacionOperativaDatos,
} from '../asignacion-operativa.repository';

export interface AsignacionOperativaPersistencia {
  id: number;
  rutaId: number;
  vehiculoId: number;
  horarioId: number;
  estado: EstadoAsignacionOperativa;
  fecha: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class PrismaAsignacionOperativaRepository implements AsignacionOperativaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async crear(datos: CrearAsignacionOperativaDatos): Promise<AsignacionOperativa> {
    void datos;
    void this.prisma;
    // TODO(S2-INTEGRANTE-4): implementar la creación de asignaciones operativas.
    throw new NotImplementedException('La creación de asignaciones operativas está pendiente');
  }

  async buscarTodos(): Promise<AsignacionOperativa[]> {
    void this.prisma;
    // TODO(S2-INTEGRANTE-4): implementar la consulta de asignaciones operativas.
    throw new NotImplementedException('La consulta de asignaciones operativas está pendiente');
  }

  async buscarPorId(id: number): Promise<AsignacionOperativa | null> {
    void id;
    void this.prisma;
    // TODO(S2-INTEGRANTE-4): implementar la consulta de asignación operativa por id.
    throw new NotImplementedException('La consulta de asignación operativa por id está pendiente');
  }

  async actualizar(
    id: number,
    datos: ActualizarAsignacionOperativaDatos,
  ): Promise<AsignacionOperativa> {
    void id;
    void datos;
    void this.prisma;
    // TODO(S2-INTEGRANTE-4): implementar la actualización de asignaciones operativas.
    throw new NotImplementedException('La actualización de asignaciones operativas está pendiente');
  }

  async eliminar(id: number): Promise<void> {
    void id;
    void this.prisma;
    // TODO(S2-INTEGRANTE-4): implementar la eliminación de asignaciones operativas.
    throw new NotImplementedException('La eliminación de asignaciones operativas está pendiente');
  }

  async buscarPorRuta(rutaId: number): Promise<AsignacionOperativa[]> {
    void rutaId;
    void this.prisma;
    // TODO(S2-INTEGRANTE-4): implementar la consulta de asignaciones por ruta.
    throw new NotImplementedException('La consulta de asignaciones por ruta está pendiente');
  }

  async buscarPorVehiculo(vehiculoId: number): Promise<AsignacionOperativa[]> {
    void vehiculoId;
    void this.prisma;
    // TODO(S2-INTEGRANTE-4): implementar la consulta de asignaciones por vehículo.
    throw new NotImplementedException('La consulta de asignaciones por vehículo está pendiente');
  }

  async buscarProgramacionPublica(): Promise<AsignacionOperativa[]> {
    void this.prisma;
    // TODO(S2-INTEGRANTE-4): implementar la consulta base de programación pública.
    throw new NotImplementedException('La consulta base de programación pública está pendiente');
  }

  mapearAsignacion(registro: AsignacionOperativaPersistencia): AsignacionOperativa {
    void registro;
    // TODO(S2-INTEGRANTE-4): implementar el mapeo de persistencia a dominio.
    throw new NotImplementedException('El mapeo de asignación operativa está pendiente');
  }
}
