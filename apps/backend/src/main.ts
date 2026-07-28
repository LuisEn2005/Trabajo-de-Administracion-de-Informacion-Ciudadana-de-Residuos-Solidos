import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DomainErrorFilter } from './shared/presentacion/filters/domain-error.filter';
import { ErrorPersistenciaFilter } from './shared/presentacion/filters/error-persistencia.filter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const origenesPermitidos = [
    'http://localhost:5173',
    'https://trabajo-de-administracion-de-inform-indol.vercel.app',
  ];

  app.setGlobalPrefix('api');
  app.enableCors({ origin: origenesPermitidos });
  app.useGlobalFilters(new DomainErrorFilter(), new ErrorPersistenciaFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(config.get<number>('PORT', 3000));
}

void bootstrap();
