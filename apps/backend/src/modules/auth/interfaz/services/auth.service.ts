import { Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdministradorAutenticado, JwtPayload } from '../../dominio/entities/jwt-payload.entity';
import {
  ADMINISTRADOR_REPOSITORY,
  AdministradorRepository,
} from '../../repositorio/administrador.repository';
import { IniciarSesionDto } from '../dto/iniciar-sesion.dto';
import { PerfilAdministradorDto } from '../dto/perfil-administrador.dto';
import { RespuestaLoginDto } from '../dto/respuesta-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(ADMINISTRADOR_REPOSITORY)
    private readonly administradorRepository: AdministradorRepository,
  ) {}

  async validarCredenciales(dto: IniciarSesionDto): Promise<AdministradorAutenticado> {
    void dto;
    void this.administradorRepository;
    // TODO(S2-JUAN): implementar validación de credenciales administrativas.
    throw new NotImplementedException(
      'La validación de credenciales administrativas está pendiente',
    );
  }

  async iniciarSesion(dto: IniciarSesionDto): Promise<RespuestaLoginDto> {
    void dto;
    // TODO(S2-JUAN): implementar el flujo de inicio de sesión administrativo.
    throw new NotImplementedException('El inicio de sesión administrativo está pendiente');
  }

  async generarToken(administrador: AdministradorAutenticado): Promise<string> {
    void administrador;
    void this.jwtService;
    // TODO(S2-JUAN): implementar la generación del token JWT administrativo.
    throw new NotImplementedException('La generación del token administrativo está pendiente');
  }

  async obtenerPerfil(administrador: AdministradorAutenticado): Promise<PerfilAdministradorDto> {
    void administrador;
    // TODO(S2-JUAN): implementar la consulta del perfil administrativo autenticado.
    throw new NotImplementedException('La consulta del perfil administrativo está pendiente');
  }

  async validarAdministrador(payload: JwtPayload): Promise<AdministradorAutenticado> {
    void payload;
    void this.administradorRepository;
    // TODO(S2-JUAN): implementar la validación del administrador desde el payload JWT.
    throw new NotImplementedException('La validación del administrador autenticado está pendiente');
  }
}
