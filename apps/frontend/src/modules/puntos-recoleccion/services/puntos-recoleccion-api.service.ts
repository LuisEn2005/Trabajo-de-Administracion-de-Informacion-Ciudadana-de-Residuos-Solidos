import { apiRequest } from '../../../shared/services/api-client';
import { obtenerAccessToken } from '../../auth/services/auth-token.storage';
import type {
  ActualizarPuntoRecoleccionPayload,
  CrearPuntoRecoleccionPayload,
  PuntoRecoleccion,
  PuntoRecoleccionApi,
} from '../types/punto-recoleccion.types';

const PUNTOS_RECOLECCION_ENDPOINT = '/puntos-recoleccion';

export async function listarPuntosRecoleccionDesdeApi(
  signal?: AbortSignal,
): Promise<PuntoRecoleccion[]> {
  const puntos = await apiRequest<PuntoRecoleccionApi[]>(PUNTOS_RECOLECCION_ENDPOINT, { signal });

  return puntos.map(mapearPuntoRecoleccionApi);
}

export async function crearPuntoRecoleccionEnApi(
  payload: CrearPuntoRecoleccionPayload,
): Promise<PuntoRecoleccion> {
  const punto = await apiRequest<PuntoRecoleccionApi>(PUNTOS_RECOLECCION_ENDPOINT, {
    accessToken: obtenerAccessToken(),
    body: payload,
    method: 'POST',
  });

  return mapearPuntoRecoleccionApi(punto);
}

export async function actualizarPuntoRecoleccionEnApi(
  id: number,
  payload: ActualizarPuntoRecoleccionPayload,
): Promise<PuntoRecoleccion> {
  const punto = await apiRequest<PuntoRecoleccionApi>(`${PUNTOS_RECOLECCION_ENDPOINT}/${id}`, {
    accessToken: obtenerAccessToken(),
    body: payload,
    method: 'PATCH',
  });

  return mapearPuntoRecoleccionApi(punto);
}

export async function eliminarPuntoRecoleccionEnApi(id: number): Promise<void> {
  await apiRequest<void>(`${PUNTOS_RECOLECCION_ENDPOINT}/${id}`, {
    accessToken: obtenerAccessToken(),
    method: 'DELETE',
  });
}

function mapearPuntoRecoleccionApi(punto: PuntoRecoleccionApi): PuntoRecoleccion {
  const props = punto.props;

  return {
    id: punto.id,
    nombre: props?.nombre ?? punto.nombre ?? '',
    direccion: props?.direccion ?? punto.direccion ?? '',
    referencia: props?.referencia ?? punto.referencia ?? null,
    latitud: Number(props?.latitud ?? punto.latitud ?? 0),
    longitud: Number(props?.longitud ?? punto.longitud ?? 0),
    estado: props?.estado ?? punto.estado ?? 'ACTIVO',
    createdAt: props?.createdAt ?? punto.createdAt,
    updatedAt: props?.updatedAt ?? punto.updatedAt,
  };
}
