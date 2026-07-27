import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdministradorAutenticado, JwtPayload } from '../../dominio/entities/jwt-payload.entity';
import {
  ADMINISTRADOR_REPOSITORY,
  AdministradorRepository,
} from '../../repositorio/administrador.repository';
import { IniciarSesionDto } from '../dto/iniciar-sesion.dto';
import { PerfilAdministradorDto } from '../dto/perfil-administrador.dto';
import { RespuestaLoginDto } from '../dto/respuesta-login.dto';

const MENSAJE_CREDENCIALES_INVALIDAS = 'Credenciales administrativas inválidas';

type DatosAdministradorSeguro = {
  id: number;
  nombre: string;
  email: string;
  activo: boolean;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(ADMINISTRADOR_REPOSITORY)
    private readonly administradorRepository: AdministradorRepository,
  ) {}

  async validarCredenciales(dto: IniciarSesionDto): Promise<AdministradorAutenticado> {
    const administrador = await this.administradorRepository.buscarPorEmail(dto.email);

    if (!administrador?.activo) {
      throw new UnauthorizedException(MENSAJE_CREDENCIALES_INVALIDAS);
    }

    const passwordValido = await bcrypt.compare(dto.password, administrador.passwordHash);

    if (!passwordValido) {
      throw new UnauthorizedException(MENSAJE_CREDENCIALES_INVALIDAS);
    }

    return this.mapearDatosAdministradorSeguro(administrador);
  }

  async iniciarSesion(dto: IniciarSesionDto): Promise<RespuestaLoginDto> {
    const administrador = await this.validarCredenciales(dto);
    const accessToken = await this.generarToken(administrador);

    return {
      accessToken,
      tokenType: 'Bearer',
      administrador: this.obtenerPerfil(administrador),
    };
  }

  async generarToken(administrador: AdministradorAutenticado): Promise<string> {
    const payload: JwtPayload = {
      sub: administrador.id,
      email: administrador.email,
      nombre: administrador.nombre,
      activo: administrador.activo,
    };

    return this.jwtService.signAsync(payload);
  }

  obtenerPerfil(administrador: AdministradorAutenticado): PerfilAdministradorDto {
    return this.mapearDatosAdministradorSeguro(administrador);
  }

  async validarAdministrador(payload: JwtPayload): Promise<AdministradorAutenticado> {
    const administrador = await this.administradorRepository.buscarPorId(payload.sub);

    if (!administrador?.activo || administrador.email !== payload.email) {
      throw new UnauthorizedException('Administrador autenticado inválido');
    }

    return this.mapearDatosAdministradorSeguro(administrador);
  }

  private mapearDatosAdministradorSeguro(administrador: DatosAdministradorSeguro): DatosAdministradorSeguro {
    return {
      id: administrador.id,
      nombre: administrador.nombre,
      email: administrador.email,
      activo: administrador.activo,
    };
  }
}
