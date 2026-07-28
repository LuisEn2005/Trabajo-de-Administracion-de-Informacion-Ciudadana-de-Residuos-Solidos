import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from '../../../../shared/repositorio/prisma/prisma.service';

@Controller()
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  bienvenida() {
    return { mensaje: 'API de gestión de residuos sólidos en construcción' };
  }

  @Get('health')
  estado() {
    return { estado: 'ok' };
  }

  @Get('health/db')
  async estadoBaseDatos() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;

      return {
        estado: 'ok',
        baseDatos: 'conectada',
      };
    } catch {
      throw new ServiceUnavailableException({
        estado: 'error',
        baseDatos: 'no disponible',
        mensaje: 'No se pudo conectar con la base de datos.',
      });
    }
  }
}
