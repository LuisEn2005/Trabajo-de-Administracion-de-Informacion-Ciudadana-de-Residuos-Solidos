import { Injectable, Inject } from '@nestjs/common';
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
  IContenedorMapper,
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

export const CONTENEDOR_MAPPER_TOKEN = 'CONTENEDOR_MAPPER_TOKEN';

@Injectable()
export class ContenedorMapper implements IContenedorMapper {
  toDomain(registro: ContenedorPersistencia): Contenedor {
    return new Contenedor(
      registro.id,
      registro.codigo,
      registro.tipo,
      registro.capacidad,
      registro.estado,
      registro.puntoRecoleccionId,
      registro.fechaInstalacion,
      registro.createdAt,
      registro.updatedAt,
    );
  }

  fromPrisma(contenedor: any): ContenedorPersistencia {
    return {
      ...contenedor,
      tipo: contenedor.tipo as TipoContenedor,
      estado: contenedor.estado as EstadoContenedor,
      capacidad: Number(contenedor.capacidad),
    };
  }
}

@Injectable()
export class PrismaContenedorRepository implements ContenedorRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CONTENEDOR_MAPPER_TOKEN) 
    private readonly mapper: IContenedorMapper,
  ) {}

  mapearContenedor(registro: ContenedorPersistencia): Contenedor {
    return new Contenedor(
      registro.id,
      registro.codigo,
      registro.tipo,
      registro.capacidad,
      registro.estado,
      registro.puntoRecoleccionId,
      registro.fechaInstalacion,
      registro.createdAt,
      registro.updatedAt,
    );
  }

  async crear(datos: CrearContenedorDatos): Promise<Contenedor> {
    const contenedor = await this.prisma.contenedor.create({
      data: {
        codigo: datos.codigo,
        tipo: datos.tipo,
        capacidad: datos.capacidad,
        estado: datos.estado || EstadoContenedor.OPERATIVO,
        puntoRecoleccionId: datos.puntoRecoleccionId || null,
        fechaInstalacion: datos.fechaInstalacion || new Date(),
      },
    });

    return this.mapper.toDomain(this.mapper.fromPrisma(contenedor));
  }

  async buscarTodos(): Promise<Contenedor[]> {
    const contenedores = await this.prisma.contenedor.findMany();
    return contenedores.map((c) =>
      this.mapper.toDomain(this.mapper.fromPrisma(c)),
    );
  }

   async buscarPorId(id: number): Promise<Contenedor | null> {
    const contenedor = await this.prisma.contenedor.findUnique({
      where: { id },
    });

    if (!contenedor) return null;
    return this.mapper.toDomain(this.mapper.fromPrisma(contenedor));
  }

  async actualizar(id: number, datos: ActualizarContenedorDatos): Promise<Contenedor> {
    const contenedor = await this.prisma.contenedor.update({
      where: { id },
      data: {
        codigo: datos.codigo,
        tipo: datos.tipo,
        capacidad: datos.capacidad,
        estado: datos.estado,
        puntoRecoleccionId: datos.puntoRecoleccionId,
        fechaInstalacion: datos.fechaInstalacion,
      },
    });

    return this.mapper.toDomain(this.mapper.fromPrisma(contenedor));
  }

  async eliminar(id: number): Promise<void> {
    await this.prisma.contenedor.delete({
      where: { id },
    });
  }

  async buscarPorPunto(puntoId: number): Promise<Contenedor[]> {
    const contenedores = await this.prisma.contenedor.findMany({
      where: { puntoRecoleccionId: puntoId },
    });

    return contenedores.map((c) =>
      this.mapper.toDomain(this.mapper.fromPrisma(c)),
    );
  }

 async cambiarEstado(id: number, estado: EstadoContenedor): Promise<Contenedor> {
    const contenedor = await this.prisma.contenedor.update({
      where: { id },
      data: { estado },
    });

    return this.mapper.toDomain(this.mapper.fromPrisma(contenedor));
  }

  async trasladarAPunto(id: number, puntoRecoleccionId: number | null): Promise<Contenedor> {
    const contenedor = await this.prisma.contenedor.update({
      where: { id },
      data: { puntoRecoleccionId },
    });

    return this.mapper.toDomain(this.mapper.fromPrisma(contenedor));
  }

   async obtenerResumenInventario(): Promise<ResumenInventarioContenedores> {
    const contenedores = await this.prisma.contenedor.findMany();

    const total = contenedores.length;

    const porEstado: Record<EstadoContenedor, number> = {
      [EstadoContenedor.OPERATIVO]: 0,
      [EstadoContenedor.LLENO]: 0,
      [EstadoContenedor.DANADO]: 0,
      [EstadoContenedor.EN_MANTENIMIENTO]: 0,
      [EstadoContenedor.RETIRADO]: 0,
    };

    const porTipo: Record<TipoContenedor, number> = {
      [TipoContenedor.ORGANICO]: 0,
      [TipoContenedor.INORGANICO]: 0,
      [TipoContenedor.RECICLABLE]: 0,
      [TipoContenedor.MIXTO]: 0,
    };

    for (const c of contenedores) {
      const estadoKey = c.estado as EstadoContenedor;
      const tipoKey = c.tipo as TipoContenedor;
      porEstado[estadoKey] = (porEstado[estadoKey] || 0) + 1;
      porTipo[tipoKey] = (porTipo[tipoKey] || 0) + 1;
    }

    return {
      total,
      porEstado,
      porTipo,
    };
  }
}