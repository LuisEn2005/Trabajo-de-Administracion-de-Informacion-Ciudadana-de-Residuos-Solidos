import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../../shared/repositorio/prisma/prisma.module';
import { AuthService } from './interfaz/services/auth.service';
import { AuthController } from './presentacion/controllers/auth.controller';
import { JwtAuthGuard } from './presentacion/guards/jwt-auth.guard';
import { JwtStrategy } from './presentacion/strategies/jwt.strategy';
import { ADMINISTRADOR_REPOSITORY } from './repositorio/administrador.repository';
import { PrismaAdministradorRepository } from './repositorio/prisma/prisma-administrador.repository';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const expiresIn = Number(configService.get<string>('JWT_EXPIRES_IN', '3600'));

        return {
          secret: configService.get<string>('JWT_SECRET', 'cambiar-este-secreto'),
          signOptions: {
            expiresIn: Number.isFinite(expiresIn) ? expiresIn : 3600,
          },
        };
      },
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: ADMINISTRADOR_REPOSITORY,
      useClass: PrismaAdministradorRepository,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule { }
