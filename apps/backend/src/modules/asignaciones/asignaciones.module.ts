import { Module } from '@nestjs/common';
import { PrismaModule } from '../../shared/repositorio/prisma/prisma.module';
import { AsignacionesService } from './interfaz/services/asignaciones.service';
import { AsignacionesController } from './presentacion/controllers/asignaciones.controller';
import { ASIGNACION_OPERATIVA_REPOSITORY } from './repositorio/asignacion-operativa.repository';
import { PrismaAsignacionOperativaRepository } from './repositorio/prisma/prisma-asignacion-operativa.repository';

@Module({
  imports: [PrismaModule],
  controllers: [AsignacionesController],
  providers: [
    AsignacionesService,
    {
      provide: ASIGNACION_OPERATIVA_REPOSITORY,
      useClass: PrismaAsignacionOperativaRepository,
    },
  ],
  exports: [AsignacionesService, ASIGNACION_OPERATIVA_REPOSITORY],
})
export class AsignacionesModule {}
