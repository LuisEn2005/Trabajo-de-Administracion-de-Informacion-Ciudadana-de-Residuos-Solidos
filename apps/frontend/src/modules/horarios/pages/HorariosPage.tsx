import { useCallback, useEffect, useMemo, useState } from 'react';
import EstadoBadge from '../../dashboard/components/EstadoBadge';
import TablaDatos from '../../dashboard/components/TablaDatos';
import { useAuth } from '../../auth/hooks/useAuth';
import { listarRutasDesdeApi } from '../../rutas/services/rutas-api.service';
import type { Ruta } from '../../rutas/types/ruta.types';
import HorarioRutaForm from '../components/HorarioRutaForm';
import {
  actualizarHorarioRutaEnApi,
  crearHorarioRutaEnApi,
  eliminarHorarioRutaEnApi,
  listarHorariosDesdeApi,
} from '../services/horarios-api.service';
import type { CrearHorarioRutaPayload, HorarioRuta } from '../types/horario-ruta.types';

function HorariosPage() {
  const { estaAutenticado } = useAuth();
  const [horarios, setHorarios] = useState<HorarioRuta[]>([]);
  const [rutas, setRutas] = useState<Ruta[]>([]);
  const [horarioEnEdicion, setHorarioEnEdicion] = useState<HorarioRuta | null>(null);
  const [estaCargando, setEstaCargando] = useState(true);
  const [estaGuardando, setEstaGuardando] = useState(false);
  const [mensajeError, setMensajeError] = useState<string | null>(null);

  const cargarDatos = useCallback(async (signal?: AbortSignal): Promise<void> => {
    setEstaCargando(true);
    setMensajeError(null);

    try {
      const [rutasApi, horariosApi] = await Promise.all([
        listarRutasDesdeApi(signal),
        listarHorariosDesdeApi(signal),
      ]);

      setRutas(rutasApi);
      setHorarios(horariosApi);
    } catch (error) {
      if (!signal?.aborted) {
        setMensajeError(obtenerMensajeError(error));
      }
    } finally {
      if (!signal?.aborted) {
        setEstaCargando(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    void cargarDatos(controller.signal);

    return () => controller.abort();
  }, [cargarDatos]);

  async function guardarHorario(rutaId: number, payload: CrearHorarioRutaPayload): Promise<void> {
    setEstaGuardando(true);
    setMensajeError(null);

    try {
      if (horarioEnEdicion) {
        await actualizarHorarioRutaEnApi(horarioEnEdicion.id, payload);
        setHorarioEnEdicion(null);
      } else {
        await crearHorarioRutaEnApi(rutaId, payload);
      }

      await cargarDatos();
    } catch (error) {
      setMensajeError(obtenerMensajeError(error));
    } finally {
      setEstaGuardando(false);
    }
  }

  const eliminarHorario = useCallback(async (horario: HorarioRuta): Promise<void> => {
    const ruta = obtenerNombreRuta(horario.rutaId, rutas);
    const debeEliminar = window.confirm(`Deseas eliminar el horario de ${ruta}?`);

    if (!debeEliminar) {
      return;
    }

    setEstaGuardando(true);
    setMensajeError(null);

    try {
      await eliminarHorarioRutaEnApi(horario.id);
      await cargarDatos();
    } catch (error) {
      setMensajeError(obtenerMensajeError(error));
    } finally {
      setEstaGuardando(false);
    }
  }, [cargarDatos, rutas]);

  const columnas = useMemo(
    () => [
      {
        encabezado: 'Ruta',
        renderizar: (registro: HorarioRuta) => obtenerNombreRuta(registro.rutaId, rutas),
      },
      { encabezado: 'Frecuencia', renderizar: (registro: HorarioRuta) => formatearEtiqueta(registro.frecuencia) },
      { encabezado: 'Dia', renderizar: (registro: HorarioRuta) => formatearEtiqueta(registro.diaSemana) },
      { encabezado: 'Turno', renderizar: (registro: HorarioRuta) => formatearEtiqueta(registro.turno) },
      {
        encabezado: 'Horario',
        renderizar: (registro: HorarioRuta) => `${registro.horaInicio} - ${registro.horaFin}`,
      },
      {
        encabezado: 'Estado',
        renderizar: (registro: HorarioRuta) => <EstadoBadge estado={registro.activo ? 'Activo' : 'Inactivo'} />,
      },
      ...(estaAutenticado
        ? [
            {
              encabezado: 'Acciones',
              renderizar: (registro: HorarioRuta) => (
                <div className="flex flex-wrap gap-2">
                  <button
                    className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-50"
                    onClick={() => setHorarioEnEdicion(registro)}
                    type="button"
                  >
                    Editar
                  </button>
                  <button
                    className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-50"
                    onClick={() => void eliminarHorario(registro)}
                    type="button"
                  >
                    Eliminar
                  </button>
                </div>
              ),
            },
          ]
        : []),
    ],
    [eliminarHorario, estaAutenticado, rutas],
  );

  return (
    <div className="space-y-4">
      {estaAutenticado && (
        <HorarioRutaForm
          estaGuardando={estaGuardando}
          horarioEnEdicion={horarioEnEdicion}
          onCancelarEdicion={() => setHorarioEnEdicion(null)}
          onGuardar={guardarHorario}
          rutas={rutas}
        />
      )}

      {mensajeError && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {mensajeError}
        </p>
      )}

      {estaCargando ? (
        <p className="rounded-xl border border-slate-200 bg-white px-4 py-6 text-sm font-semibold text-slate-500 shadow-sm">
          Cargando horarios desde la API...
        </p>
      ) : (
        <TablaDatos
          columnas={columnas}
          obtenerClave={(registro) => registro.id}
          registros={horarios}
          titulo="Horarios registrados"
        />
      )}
    </div>
  );
}

function obtenerNombreRuta(rutaId: number, rutas: Ruta[]): string {
  const ruta = rutas.find((item) => item.id === rutaId);

  return ruta ? `${ruta.numero} - ${ruta.nombre}` : `Ruta ${rutaId}`;
}

function formatearEtiqueta(valor: string): string {
  return valor.charAt(0) + valor.slice(1).toLowerCase().replaceAll('_', ' ');
}

function obtenerMensajeError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Ocurrio un error inesperado.';
}

export default HorariosPage;
