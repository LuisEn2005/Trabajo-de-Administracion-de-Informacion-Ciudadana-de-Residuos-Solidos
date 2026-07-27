import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaService } from '../../../../shared/repositorio/prisma/prisma.service';
import { Administrador } from '../../dominio/entities/administrador.entity';
import { AdministradorRepository } from '../administrador.repository';

@Injectable()
export class PrismaAdministradorRepository implements AdministradorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async buscarPorEmail(email: string): Promise<Administrador | null> {
    void email;
    void this.prisma;
    // TODO(S2-JUAN): implementar la consulta de administrador por email.
    throw new NotImplementedException('La consulta de administrador por email está pendiente');
  }

  async buscarPorId(id: number): Promise<Administrador | null> {
    void id;
    void this.prisma;
    // TODO(S2-JUAN): implementar la consulta de administrador por id.
    throw new NotImplementedException('La consulta de administrador por id está pendiente');
  }
}
