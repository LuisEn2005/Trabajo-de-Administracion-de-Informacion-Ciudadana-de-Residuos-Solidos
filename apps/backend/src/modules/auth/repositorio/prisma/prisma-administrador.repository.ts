import { Injectable } from '@nestjs/common';
import { manejarErrorPrisma } from '../../../../shared/repositorio/prisma/manejar-error-prisma';
import { PrismaService } from '../../../../shared/repositorio/prisma/prisma.service';
import { Administrador } from '../../dominio/entities/administrador.entity';
import { AdministradorRepository } from '../administrador.repository';

type AdministradorPersistencia = {
  id: number;
  nombre: string;
  email: string;
  passwordHash: string;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class PrismaAdministradorRepository implements AdministradorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async buscarPorEmail(email: string): Promise<Administrador | null> {
    try {
      const administrador = await this.prisma.administrador.findUnique({
        where: {
          email,
        },
      });

      return administrador ? this.mapearAdministrador(administrador) : null;
    } catch (error) {
      manejarErrorPrisma(error, 'buscar el administrador por email');
    }
  }

  async buscarPorId(id: number): Promise<Administrador | null> {
    try {
      const administrador = await this.prisma.administrador.findUnique({
        where: {
          id,
        },
      });

      return administrador ? this.mapearAdministrador(administrador) : null;
    } catch (error) {
      manejarErrorPrisma(error, 'buscar el administrador por id');
    }
  }

  private mapearAdministrador(administrador: AdministradorPersistencia): Administrador {
    return new Administrador(
      administrador.id,
      administrador.nombre,
      administrador.email,
      administrador.passwordHash,
      administrador.activo,
      administrador.createdAt,
      administrador.updatedAt,
    );
  }
}
