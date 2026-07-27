import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from '../../../../shared/presentacion/decorators/public.decorator';
import { AdministradorAutenticado } from '../../dominio/entities/jwt-payload.entity';
import { IniciarSesionDto } from '../../interfaz/dto/iniciar-sesion.dto';
import { AuthService } from '../../interfaz/services/auth.service';
import { AdministradorActual } from '../decorators/administrador-actual.decorator';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  iniciarSesion(@Body() dto: IniciarSesionDto) {
    return this.authService.iniciarSesion(dto);
  }

  @Get('perfil')
  obtenerPerfil(@AdministradorActual() administrador: AdministradorAutenticado) {
    return this.authService.obtenerPerfil(administrador);
  }
}
