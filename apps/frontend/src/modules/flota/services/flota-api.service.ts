import { apiRequest } from '../../../shared/services/api-client';
import { obtenerAccessToken } from '../../auth/services/auth-token.storage';
import type {
  ActualizarVehiculoPayload,
  CrearVehiculoPayload,
  Vehiculo,
  VehiculoApi,
} from '../types/vehiculo.types';

export async function listarVehiculosDesdeApi(signal?: AbortSignal): Promise<Vehiculo[]> {
  const vehiculos = await apiRequest<VehiculoApi[]>('/v1/vehiculos', {
    accessToken: obtenerAccessToken(),
    signal,
  });

  return vehiculos.map(mapearVehiculoApi);
}

export async function crearVehiculoEnApi(payload: CrearVehiculoPayload): Promise<Vehiculo> {
  const vehiculo = await apiRequest<VehiculoApi>('/v1/vehiculos', {
    accessToken: obtenerAccessToken(),
    body: payload,
    method: 'POST',
  });

  return mapearVehiculoApi(vehiculo);
}

export async function actualizarVehiculoEnApi(
  id: number,
  payload: ActualizarVehiculoPayload,
): Promise<Vehiculo> {
  const vehiculo = await apiRequest<VehiculoApi>(`/v1/vehiculos/${id}`, {
    accessToken: obtenerAccessToken(),
    body: payload,
    method: 'PATCH',
  });

  return mapearVehiculoApi(vehiculo);
}

export async function eliminarVehiculoEnApi(id: number): Promise<void> {
  await apiRequest<void>(`/v1/vehiculos/${id}`, {
    accessToken: obtenerAccessToken(),
    method: 'DELETE',
  });
}

function mapearVehiculoApi(vehiculo: VehiculoApi): Vehiculo {
  const props = vehiculo.props;

  return {
    id: vehiculo.id,
    placa: props?.placa ?? vehiculo.placa ?? '',
    carroceria: props?.carroceria ?? vehiculo.carroceria ?? 'COMPACTADOR',
    rutaId: props?.rutaId ?? vehiculo.rutaId ?? 0,
    activo: props?.activo ?? vehiculo.activo ?? false,
    createdAt: props?.createdAt ?? vehiculo.createdAt,
    updatedAt: props?.updatedAt ?? vehiculo.updatedAt,
  };
}
