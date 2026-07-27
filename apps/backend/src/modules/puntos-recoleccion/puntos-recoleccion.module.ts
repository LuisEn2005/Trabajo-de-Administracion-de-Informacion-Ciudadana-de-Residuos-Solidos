import { Module } from '@nestjs/common';
import { PrismaModule } from '../../shared/repositorio/prisma/prisma.module';
import { ContenedoresModule } from '../contenedores/contenedores.module';
import { PuntosRecoleccionService } from './interfaz/services/puntos-recoleccion.service';
import { PuntosRecoleccionController } from './presentacion/controllers/puntos-recoleccion.controller';
import { PrismaPuntoRecoleccionRepository } from './repositorio/prisma/prisma-punto-recoleccion.repository';
import { PUNTO_RECOLECCION_REPOSITORY } from './repositorio/punto-recoleccion.repository';

@Module({
  imports: [PrismaModule, ContenedoresModule],
  controllers: [PuntosRecoleccionController],
  providers: [
    PuntosRecoleccionService,
    {
      provide: PUNTO_RECOLECCION_REPOSITORY,
      useClass: PrismaPuntoRecoleccionRepository,
    },
  ],
  exports: [PuntosRecoleccionService, PUNTO_RECOLECCION_REPOSITORY],
})
export class PuntosRecoleccionModule {}
