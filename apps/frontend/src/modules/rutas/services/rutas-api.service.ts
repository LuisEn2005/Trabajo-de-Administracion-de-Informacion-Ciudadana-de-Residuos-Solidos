import { apiRequest } from '../../../shared/services/api-client';
import { obtenerAccessToken } from '../../auth/services/auth-token.storage';
import type { ActualizarRutaPayload, CrearRutaPayload, Ruta, RutaApi } from '../types/ruta.types';

export async function listarRutasDesdeApi(signal?: AbortSignal): Promise<Ruta[]> {
  const rutas = await apiRequest<RutaApi[]>('/v1/rutas', { signal });

  return rutas.map(mapearRutaApi);
}

export async function crearRutaEnApi(payload: CrearRutaPayload): Promise<Ruta> {
  const ruta = await apiRequest<RutaApi>('/v1/rutas', {
    accessToken: obtenerAccessToken(),
    body: payload,
    method: 'POST',
  });

  return mapearRutaApi(ruta);
}

export async function actualizarRutaEnApi(id: number, payload: ActualizarRutaPayload): Promise<Ruta> {
  const ruta = await apiRequest<RutaApi>(`/v1/rutas/${id}`, {
    accessToken: obtenerAccessToken(),
    body: payload,
    method: 'PATCH',
  });

  return mapearRutaApi(ruta);
}

export async function eliminarRutaEnApi(id: number): Promise<void> {
  await apiRequest<void>(`/v1/rutas/${id}`, {
    accessToken: obtenerAccessToken(),
    method: 'DELETE',
  });
}

function mapearRutaApi(ruta: RutaApi): Ruta {
  const props = ruta.props;

  return {
    id: ruta.id,
    numero: props?.numero ?? ruta.numero ?? 0,
    nombre: props?.nombre ?? ruta.nombre ?? '',
    descripcionCobertura: props?.descripcionCobertura ?? ruta.descripcionCobertura ?? '',
    activa: props?.activa ?? ruta.activa ?? false,
    createdAt: props?.createdAt ?? ruta.createdAt,
    updatedAt: props?.updatedAt ?? ruta.updatedAt,
  };
}
