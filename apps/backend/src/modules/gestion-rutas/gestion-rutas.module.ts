import { Module } from '@nestjs/common';
import { PrismaModule } from '../../shared/repositorio/prisma/prisma.module';
import { HorariosRutaService } from './interfaz/services/horarios-ruta.service';
import { RutasService } from './interfaz/services/rutas.service';
import { VehiculosService } from './interfaz/services/vehiculos.service';
import { HORARIO_RUTA_REPOSITORY } from './repositorio/horario-ruta.repository';
import { RUTA_REPOSITORY } from './repositorio/ruta.repository';
import { VEHICULO_REPOSITORY } from './repositorio/vehiculo.repository';
import { PrismaHorarioRutaRepository } from './repositorio/prisma/prisma-horario-ruta.repository';
import { PrismaRutaRepository } from './repositorio/prisma/prisma-ruta.repository';
import { PrismaVehiculoRepository } from './repositorio/prisma/prisma-vehiculo.repository';
import { HorariosRutaController } from './presentacion/controllers/horarios-ruta.controller';
import { RutasController } from './presentacion/controllers/rutas.controller';
import { VehiculosController } from './presentacion/controllers/vehiculos.controller';

@Module({
  imports: [PrismaModule],
  controllers: [RutasController, HorariosRutaController, VehiculosController],
  providers: [
    RutasService,
    HorariosRutaService,
    VehiculosService,
    {
      provide: RUTA_REPOSITORY,
      useClass: PrismaRutaRepository,
    },
    {
      provide: HORARIO_RUTA_REPOSITORY,
      useClass: PrismaHorarioRutaRepository,
    },
    {
      provide: VEHICULO_REPOSITORY,
      useClass: PrismaVehiculoRepository,
    },
  ],
})
export class GestionRutasModule {}
