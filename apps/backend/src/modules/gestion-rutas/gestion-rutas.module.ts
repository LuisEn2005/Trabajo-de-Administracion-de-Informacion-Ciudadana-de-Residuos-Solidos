import { Module } from '@nestjs/common';

import { PrismaModule } from '../../shared/repositorio/prisma/prisma.module';
import { HorariosRutaService } from './interfaz/services/horarios-ruta.service';
import { RutasService } from './interfaz/services/rutas.service';
import { VehiculosService } from './interfaz/services/vehiculos.service';
import { PuntosRecoleccionService } from './interfaz/services/puntos-recoleccion.service';

import { HORARIO_RUTA_REPOSITORY } from './repositorio/horario-ruta.repository';
import { RUTA_REPOSITORY } from './repositorio/ruta.repository';
import { VEHICULO_REPOSITORY } from './repositorio/vehiculo.repository';
import { PUNTO_RECOLECCION_REPOSITORY } from './repositorio/punto-recoleccion.repository';

import { PrismaPuntoRecoleccionRepository } from './repositorio/prisma/prisma-punto-recoleccion.repository';
import { PrismaHorarioRutaRepository } from './repositorio/prisma/prisma-horario-ruta.repository';
import { PrismaRutaRepository } from './repositorio/prisma/prisma-ruta.repository';
import { PrismaVehiculoRepository } from './repositorio/prisma/prisma-vehiculo.repository';

import { HorariosRutaController } from './presentacion/controllers/horarios-ruta.controller';
import { PuntosRecoleccionController } from './presentacion/controllers/puntos-recoleccion.controller';
import { RutasController } from './presentacion/controllers/rutas.controller';

import { VehiculosController } from './presentacion/controllers/vehiculos.controller';

@Module({
  imports: [PrismaModule],
  controllers: [RutasController, HorariosRutaController, VehiculosController, PuntosRecoleccionController,],
  providers: [
    RutasService,
    HorariosRutaService,
    VehiculosService,
    PuntosRecoleccionService,
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
    {
      provide: PUNTO_RECOLECCION_REPOSITORY,
      useClass: PrismaPuntoRecoleccionRepository,
    },
  ],
  exports: [
    RutasService,
    HorariosRutaService,
    VehiculosService,
    PuntosRecoleccionService,
    RUTA_REPOSITORY,
    HORARIO_RUTA_REPOSITORY,
    VEHICULO_REPOSITORY,
  ],
})
export class GestionRutasModule { }
