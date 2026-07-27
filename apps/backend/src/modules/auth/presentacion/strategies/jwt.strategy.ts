import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdministradorAutenticado, JwtPayload } from '../../dominio/entities/jwt-payload.entity';
import { AuthService } from '../../interfaz/services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', 'cambiar-este-secreto'),
    });
  }

  validate(payload: JwtPayload): Promise<AdministradorAutenticado> {
    return this.authService.validarAdministrador(payload);
  }
}
