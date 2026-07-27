import { Module } from '@nestjs/common';
import { AsignacionesModule } from '../asignaciones/asignaciones.module';
import { GestionRutasModule } from '../gestion-rutas/gestion-rutas.module';
import { PuntosRecoleccionModule } from '../puntos-recoleccion/puntos-recoleccion.module';
import { ProgramacionPublicaService } from './interfaz/services/programacion-publica.service';
import { ProgramacionPublicaController } from './presentacion/controllers/programacion-publica.controller';

@Module({
  imports: [GestionRutasModule, PuntosRecoleccionModule, AsignacionesModule],
  controllers: [ProgramacionPublicaController],
  providers: [ProgramacionPublicaService],
})
export class ProgramacionPublicaModule {}
