import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AsignacionesModule } from './modules/asignaciones/asignaciones.module';
import { AuthModule } from './modules/auth/auth.module';
import { ContenedoresModule } from './modules/contenedores/contenedores.module';
import { GestionRutasModule } from './modules/gestion-rutas/gestion-rutas.module';
import { HealthModule } from './modules/health/health.module';
import { ProgramacionPublicaModule } from './modules/programacion-publica/programacion-publica.module';
import { PuntosRecoleccionModule } from './modules/puntos-recoleccion/puntos-recoleccion.module';
import { PrismaModule } from './shared/repositorio/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    HealthModule,
    GestionRutasModule,
    ContenedoresModule,
    PuntosRecoleccionModule,
    AsignacionesModule,
    ProgramacionPublicaModule,
  ],
})
export class AppModule {}
