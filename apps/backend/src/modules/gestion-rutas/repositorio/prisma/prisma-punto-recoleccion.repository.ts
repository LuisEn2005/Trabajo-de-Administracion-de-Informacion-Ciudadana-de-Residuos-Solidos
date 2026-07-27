import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/repositorio/prisma/prisma.service';
import { PuntoRecoleccionRepository } from '../punto-recoleccion.repository';
import { PuntoRecoleccionEntity } from '../../dominio/entities/punto-recoleccion.entity';
import { CrearPuntoRecoleccionDto } from '../../interfaz/dto/crear-punto-recoleccion.dto';
import { ActualizarPuntoRecoleccionDto } from '../../interfaz/dto/actualizar-punto-recoleccion.dto';
import { EstadoPuntoRecoleccion, PuntoRecoleccion } from '@prisma/client';

@Injectable()
export class PrismaPuntoRecoleccionRepository implements PuntoRecoleccionRepository {
  constructor(private readonly prisma: PrismaService) { }

  mapearPunto(punto: PuntoRecoleccion): PuntoRecoleccionEntity {
    return new PuntoRecoleccionEntity({
      ...punto,
      latitud: punto.latitud.toNumber(),
      longitud: punto.longitud.toNumber(),
    });
  }

  async crear(data: CrearPuntoRecoleccionDto): Promise<PuntoRecoleccionEntity> {
    const nuevo = await this.prisma.puntoRecoleccion.create({ data });
    return this.mapearPunto(nuevo);
  }

  async buscarTodos(): Promise<PuntoRecoleccionEntity[]> {
    const puntos = await this.prisma.puntoRecoleccion.findMany();
    return puntos.map((p) => this.mapearPunto(p));
  }

  async buscarPorId(id: number): Promise<PuntoRecoleccionEntity | null> {
    const punto = await this.prisma.puntoRecoleccion.findUnique({ where: { id } });
    return punto ? this.mapearPunto(punto) : null;
  }

  async actualizar(id: number, data: ActualizarPuntoRecoleccionDto): Promise<PuntoRecoleccionEntity> {
    const actualizado = await this.prisma.puntoRecoleccion.update({
      where: { id },
      data,
    });
    return this.mapearPunto(actualizado);
  }

  async eliminar(id: number): Promise<PuntoRecoleccionEntity> {
    const eliminado = await this.prisma.puntoRecoleccion.delete({ where: { id } });
    return this.mapearPunto(eliminado);
  }

  async cambiarEstado(id: number, estado: EstadoPuntoRecoleccion): Promise<PuntoRecoleccionEntity> {
    const actualizado = await this.prisma.puntoRecoleccion.update({
      where: { id },
      data: { estado },
    });
    return this.mapearPunto(actualizado);
  }
}