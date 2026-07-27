import { apiRequest } from '../../../shared/services/api-client';
import { obtenerAccessToken } from '../../auth/services/auth-token.storage';
import type {
  ActualizarContenedorPayload,
  Contenedor,
  ContenedorApi,
  CrearContenedorPayload,
} from '../types/contenedor.types';

export async function listarContenedoresDesdeApi(signal?: AbortSignal): Promise<Contenedor[]> {
  const contenedores = await apiRequest<ContenedorApi[]>('/v1/contenedores', {
    accessToken: obtenerAccessToken(),
    signal,
  });

  return contenedores.map(mapearContenedorApi);
}

export async function crearContenedorEnApi(payload: CrearContenedorPayload): Promise<Contenedor> {
  const contenedor = await apiRequest<ContenedorApi>('/v1/contenedores', {
    accessToken: obtenerAccessToken(),
    body: payload,
    method: 'POST',
  });

  return mapearContenedorApi(contenedor);
}

export async function actualizarContenedorEnApi(
  id: number,
  payload: ActualizarContenedorPayload,
): Promise<Contenedor> {
  const contenedor = await apiRequest<ContenedorApi>(`/v1/contenedores/${id}`, {
    accessToken: obtenerAccessToken(),
    body: payload,
    method: 'PATCH',
  });

  return mapearContenedorApi(contenedor);
}

export async function eliminarContenedorEnApi(id: number): Promise<void> {
  await apiRequest<void>(`/v1/contenedores/${id}`, {
    accessToken: obtenerAccessToken(),
    method: 'DELETE',
  });
}

function mapearContenedorApi(contenedor: ContenedorApi): Contenedor {
  const props = contenedor.props;

  return {
    id: contenedor.id,
    codigo: props?.codigo ?? contenedor.codigo ?? '',
    tipo: props?.tipo ?? contenedor.tipo ?? 'MIXTO',
    capacidad: Number(props?.capacidad ?? contenedor.capacidad ?? 0),
    estado: props?.estado ?? contenedor.estado ?? 'OPERATIVO',
    puntoRecoleccionId: props?.puntoRecoleccionId ?? contenedor.puntoRecoleccionId ?? null,
    fechaInstalacion: props?.fechaInstalacion ?? contenedor.fechaInstalacion ?? null,
    createdAt: props?.createdAt ?? contenedor.createdAt,
    updatedAt: props?.updatedAt ?? contenedor.updatedAt,
  };
}
