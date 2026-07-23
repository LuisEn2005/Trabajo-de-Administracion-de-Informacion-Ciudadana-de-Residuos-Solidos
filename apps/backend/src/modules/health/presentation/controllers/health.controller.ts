import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get()
  bienvenida() {
    return { mensaje: 'API de gestión de residuos sólidos en construcción' };
  }

  @Get('health')
  estado() {
    return { estado: 'ok' };
  }
}
