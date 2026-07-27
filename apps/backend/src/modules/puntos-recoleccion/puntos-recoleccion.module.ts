import { Module } from '@nestjs/common';
import { PrismaModule } from '../../shared/repositorio/prisma/prisma.module';
import { PuntosRecoleccionController } from './presentacion/controllers/puntos-recoleccion.controller';
import { PuntosRecoleccionService } from './interfaz/services/puntos-recoleccion.service';
import { PUNTO_RECOLECCION_REPOSITORY } from './repositorio/punto-recoleccion.repository';
import { PrismaPuntoRecoleccionRepository } from './repositorio/prisma/prisma-punto-recoleccion.repository';

@Module({
  imports: [PrismaModule],
  controllers: [PuntosRecoleccionController],
  providers: [
    PuntosRecoleccionService,
    {
      provide: PUNTO_RECOLECCION_REPOSITORY,
      useClass: PrismaPuntoRecoleccionRepository,
    },
  ],
  exports: [
    PuntosRecoleccionService,
    PUNTO_RECOLECCION_REPOSITORY,
  ],
})
export class PuntosRecoleccionModule { }