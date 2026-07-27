import { apiRequest } from '../../../shared/services/api-client';
import { obtenerAccessToken } from '../../auth/services/auth-token.storage';
import type {
  ActualizarHorarioRutaPayload,
  CrearHorarioRutaPayload,
  HorarioRuta,
  HorarioRutaApi,
} from '../types/horario-ruta.types';

export async function listarHorariosDesdeApi(signal?: AbortSignal): Promise<HorarioRuta[]> {
  const horarios = await apiRequest<HorarioRutaApi[]>('/v1/horarios-ruta', { signal });

  return horarios.map(mapearHorarioRutaApi);
}

export async function crearHorarioRutaEnApi(
  rutaId: number,
  payload: CrearHorarioRutaPayload,
): Promise<HorarioRuta> {
  const horario = await apiRequest<HorarioRutaApi>(`/v1/rutas/${rutaId}/horarios`, {
    accessToken: obtenerAccessToken(),
    body: payload,
    method: 'POST',
  });

  return mapearHorarioRutaApi(horario);
}

export async function actualizarHorarioRutaEnApi(
  id: number,
  payload: ActualizarHorarioRutaPayload,
): Promise<HorarioRuta> {
  const horario = await apiRequest<HorarioRutaApi>(`/v1/horarios-ruta/${id}`, {
    accessToken: obtenerAccessToken(),
    body: payload,
    method: 'PATCH',
  });

  return mapearHorarioRutaApi(horario);
}

export async function eliminarHorarioRutaEnApi(id: number): Promise<void> {
  await apiRequest<void>(`/v1/horarios-ruta/${id}`, {
    accessToken: obtenerAccessToken(),
    method: 'DELETE',
  });
}

function mapearHorarioRutaApi(horario: HorarioRutaApi): HorarioRuta {
  const props = horario.props;

  return {
    id: horario.id,
    rutaId: props?.rutaId ?? horario.rutaId ?? 0,
    frecuencia: props?.frecuencia ?? horario.frecuencia ?? 'SEMANAL',
    diaSemana: props?.diaSemana ?? horario.diaSemana ?? 'LUNES',
    turno: props?.turno ?? horario.turno ?? 'MANANA',
    horaInicio: props?.horaInicio ?? horario.horaInicio ?? '00:00',
    horaFin: props?.horaFin ?? horario.horaFin ?? '00:00',
    activo: props?.activo ?? horario.activo ?? false,
  };
}
