import { obtenerPerfilAdministrativo } from './auth-api.service';
import { obtenerAccessToken } from './auth-token.storage';
import type { AdministradorSesion } from '../types/auth.types';

export async function listarAdministradoresDesdeApi(): Promise<AdministradorSesion[]> {
  const accessToken = obtenerAccessToken();

  if (!accessToken) {
    return [];
  }

  const perfil = await obtenerPerfilAdministrativo(accessToken);

  return [perfil];
}
