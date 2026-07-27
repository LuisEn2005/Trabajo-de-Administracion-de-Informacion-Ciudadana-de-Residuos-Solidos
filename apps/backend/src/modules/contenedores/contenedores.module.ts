import { Module } from '@nestjs/common';
import { PrismaModule } from '../../shared/repositorio/prisma/prisma.module';
import { ContenedoresService } from './interfaz/services/contenedores.service';
import { ContenedoresController } from './presentacion/controllers/contenedores.controller';
import { CONTENEDOR_REPOSITORY } from './repositorio/contenedor.repository';
import {
  PrismaContenedorRepository,
  ContenedorMapper,
  CONTENEDOR_MAPPER_TOKEN,
} from './repositorio/prisma/prisma-contenedor.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ContenedoresController],
  providers: [
    ContenedoresService,
    {
      provide: CONTENEDOR_MAPPER_TOKEN,
      useClass: ContenedorMapper,
    },
    {
      provide: CONTENEDOR_REPOSITORY,
      useClass: PrismaContenedorRepository,
    },
  ],
  exports: [ContenedoresService, CONTENEDOR_REPOSITORY],
})
export class ContenedoresModule {}