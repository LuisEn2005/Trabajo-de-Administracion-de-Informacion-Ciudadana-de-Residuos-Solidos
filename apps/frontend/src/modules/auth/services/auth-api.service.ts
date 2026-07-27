import type {
  AdministradorSesion,
  CredencialesLogin,
  RespuestaLogin,
} from '../types/auth.types';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

export async function iniciarSesionAdministrativa(
  credenciales: CredencialesLogin,
): Promise<RespuestaLogin> {
  const respuesta = await fetch(`${API_BASE_URL}/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credenciales),
  });

  return leerRespuestaApi<RespuestaLogin>(respuesta);
}

export async function obtenerPerfilAdministrativo(
  accessToken: string,
): Promise<AdministradorSesion> {
  const respuesta = await fetch(`${API_BASE_URL}/v1/auth/perfil`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return leerRespuestaApi<AdministradorSesion>(respuesta);
}

async function leerRespuestaApi<TRespuesta>(respuesta: Response): Promise<TRespuesta> {
  if (respuesta.ok) {
    return respuesta.json() as Promise<TRespuesta>;
  }

  throw new Error(await obtenerMensajeError(respuesta));
}

async function obtenerMensajeError(respuesta: Response): Promise<string> {
  try {
    const cuerpo = (await respuesta.json()) as { message?: string | string[] };

    if (Array.isArray(cuerpo.message)) {
      return cuerpo.message.join(', ');
    }

    return cuerpo.message ?? 'No se pudo completar la solicitud.';
  } catch {
    return 'No se pudo conectar correctamente con el servidor.';
  }
}
