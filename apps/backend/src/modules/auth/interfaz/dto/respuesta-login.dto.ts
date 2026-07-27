import { PerfilAdministradorDto } from './perfil-administrador.dto';

export interface RespuestaLoginDto {
  accessToken: string;
  tokenType: 'Bearer';
  administrador: PerfilAdministradorDto;
}
