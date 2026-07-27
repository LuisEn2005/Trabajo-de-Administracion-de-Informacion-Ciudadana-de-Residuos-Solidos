import { apiRequest } from '../../../shared/services/api-client';
import { obtenerAccessToken } from '../../auth/services/auth-token.storage';
import type {
  ActualizarAsignacionPayload,
  AsignacionApi,
  AsignacionOperativa,
  CrearAsignacionPayload,
} from '../types/asignacion.types';

export async function listarAsignacionesDesdeApi(signal?: AbortSignal): Promise<AsignacionOperativa[]> {
  const asignaciones = await apiRequest<AsignacionApi[]>('/v1/asignaciones', {
    accessToken: obtenerAccessToken(),
    signal,
  });

  return asignaciones.map(mapearAsignacionApi);
}

export async function crearAsignacionEnApi(
  payload: CrearAsignacionPayload,
): Promise<AsignacionOperativa> {
  const asignacion = await apiRequest<AsignacionApi>('/v1/asignaciones', {
    accessToken: obtenerAccessToken(),
    body: payload,
    method: 'POST',
  });

  return mapearAsignacionApi(asignacion);
}

export async function actualizarAsignacionEnApi(
  id: number,
  payload: ActualizarAsignacionPayload,
): Promise<AsignacionOperativa> {
  const asignacion = await apiRequest<AsignacionApi>(`/v1/asignaciones/${id}`, {
    accessToken: obtenerAccessToken(),
    body: payload,
    method: 'PATCH',
  });

  return mapearAsignacionApi(asignacion);
}

export async function eliminarAsignacionEnApi(id: number): Promise<void> {
  await apiRequest<void>(`/v1/asignaciones/${id}`, {
    accessToken: obtenerAccessToken(),
    method: 'DELETE',
  });
}

function mapearAsignacionApi(asignacion: AsignacionApi): AsignacionOperativa {
  const props = asignacion.props;

  return {
    id: asignacion.id,
    rutaId: props?.rutaId ?? asignacion.rutaId ?? 0,
    vehiculoId: props?.vehiculoId ?? asignacion.vehiculoId ?? 0,
    horarioId: props?.horarioId ?? asignacion.horarioId ?? 0,
    estado: props?.estado ?? asignacion.estado ?? 'PROGRAMADA',
    fecha: props?.fecha ?? asignacion.fecha ?? null,
    createdAt: props?.createdAt ?? asignacion.createdAt,
    updatedAt: props?.updatedAt ?? asignacion.updatedAt,
  };
}
