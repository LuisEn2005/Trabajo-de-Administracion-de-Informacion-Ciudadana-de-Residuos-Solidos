import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GestionRutasModule } from './modules/gestion-rutas/gestion-rutas.module';
import { HealthModule } from './modules/health/health.module';
import { PrismaModule } from './shared/infrastructure/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    HealthModule,
    GestionRutasModule,
  ],
})
export class AppModule {}
