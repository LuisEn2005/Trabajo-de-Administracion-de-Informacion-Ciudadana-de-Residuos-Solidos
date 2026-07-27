import { useCallback, useEffect, useMemo, useState } from 'react';
import EstadoBadge from '../../dashboard/components/EstadoBadge';
import TablaDatos from '../../dashboard/components/TablaDatos';
import { listarVehiculosDesdeApi } from '../../flota/services/flota-api.service';
import type { Vehiculo } from '../../flota/types/vehiculo.types';
import { listarHorariosDesdeApi } from '../../horarios/services/horarios-api.service';
import type { HorarioRuta } from '../../horarios/types/horario-ruta.types';
import { listarRutasDesdeApi } from '../../rutas/services/rutas-api.service';
import type { Ruta } from '../../rutas/types/ruta.types';
import AsignacionForm from '../components/AsignacionForm';
import {
  actualizarAsignacionEnApi,
  crearAsignacionEnApi,
  eliminarAsignacionEnApi,
  listarAsignacionesDesdeApi,
} from '../services/asignaciones-api.service';
import type { AsignacionOperativa, CrearAsignacionPayload } from '../types/asignacion.types';

function AsignacionesPage() {
  const [asignaciones, setAsignaciones] = useState<AsignacionOperativa[]>([]);
  const [rutas, setRutas] = useState<Ruta[]>([]);
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [horarios, setHorarios] = useState<HorarioRuta[]>([]);
  const [asignacionEnEdicion, setAsignacionEnEdicion] = useState<AsignacionOperativa | null>(null);
  const [estaCargando, setEstaCargando] = useState(true);
  const [estaGuardando, setEstaGuardando] = useState(false);
  const [mensajeError, setMensajeError] = useState<string | null>(null);

  const cargarDatos = useCallback(async (signal?: AbortSignal): Promise<void> => {
    setEstaCargando(true);
    setMensajeError(null);

    try {
      const [asignacionesApi, rutasApi, vehiculosApi, horariosApi] = await Promise.all([
        listarAsignacionesDesdeApi(signal),
        listarRutasDesdeApi(signal),
        listarVehiculosDesdeApi(signal),
        listarHorariosDesdeApi(signal),
      ]);

      setAsignaciones(asignacionesApi);
      setRutas(rutasApi);
      setVehiculos(vehiculosApi);
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

  async function guardarAsignacion(payload: CrearAsignacionPayload): Promise<void> {
    setEstaGuardando(true);
    setMensajeError(null);

    try {
      if (asignacionEnEdicion) {
        await actualizarAsignacionEnApi(asignacionEnEdicion.id, payload);
        setAsignacionEnEdicion(null);
      } else {
        await crearAsignacionEnApi(payload);
      }

      await cargarDatos();
    } catch (error) {
      setMensajeError(obtenerMensajeError(error));
    } finally {
      setEstaGuardando(false);
    }
  }

  const eliminarAsignacion = useCallback(async (asignacion: AsignacionOperativa): Promise<void> => {
    const debeEliminar = window.confirm(`Deseas eliminar la asignacion ${asignacion.id}?`);

    if (!debeEliminar) {
      return;
    }

    setEstaGuardando(true);
    setMensajeError(null);

    try {
      await eliminarAsignacionEnApi(asignacion.id);
      await cargarDatos();
    } catch (error) {
      setMensajeError(obtenerMensajeError(error));
    } finally {
      setEstaGuardando(false);
    }
  }, [cargarDatos]);

  const columnas = useMemo(
    () => [
      {
        encabezado: 'Ruta',
        renderizar: (registro: AsignacionOperativa) => obtenerNombreRuta(registro.rutaId, rutas),
      },
      {
        encabezado: 'Vehiculo',
        renderizar: (registro: AsignacionOperativa) => obtenerPlacaVehiculo(registro.vehiculoId, vehiculos),
      },
      {
        encabezado: 'Horario',
        renderizar: (registro: AsignacionOperativa) => obtenerDescripcionHorario(registro.horarioId, horarios),
      },
      { encabezado: 'Fecha', renderizar: (registro: AsignacionOperativa) => formatearFecha(registro.fecha) },
      {
        encabezado: 'Estado',
        renderizar: (registro: AsignacionOperativa) => <EstadoBadge estado={formatearEtiqueta(registro.estado)} />,
      },
      {
        encabezado: 'Acciones',
        renderizar: (registro: AsignacionOperativa) => (
          <div className="flex flex-wrap gap-2">
            <button
              className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-50"
              onClick={() => setAsignacionEnEdicion(registro)}
              type="button"
            >
              Editar
            </button>
            <button
              className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-50"
              onClick={() => void eliminarAsignacion(registro)}
              type="button"
            >
              Eliminar
            </button>
          </div>
        ),
      },
    ],
    [eliminarAsignacion, horarios, rutas, vehiculos],
  );

  return (
    <div className="space-y-4">
      <AsignacionForm
        asignacionEnEdicion={asignacionEnEdicion}
        estaGuardando={estaGuardando}
        horarios={horarios}
        onCancelarEdicion={() => setAsignacionEnEdicion(null)}
        onGuardar={guardarAsignacion}
        rutas={rutas}
        vehiculos={vehiculos}
      />

      {mensajeError && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {mensajeError}
        </p>
      )}

      {estaCargando ? (
        <p className="rounded-xl border border-slate-200 bg-white px-4 py-6 text-sm font-semibold text-slate-500 shadow-sm">
          Cargando asignaciones desde la API...
        </p>
      ) : (
        <TablaDatos
          columnas={columnas}
          obtenerClave={(registro) => registro.id}
          registros={asignaciones}
          titulo="Asignaciones operativas"
        />
      )}
    </div>
  );
}

function obtenerNombreRuta(rutaId: number, rutas: Ruta[]): string {
  const ruta = rutas.find((item) => item.id === rutaId);

  return ruta ? `${ruta.numero} - ${ruta.nombre}` : `Ruta ${rutaId}`;
}

function obtenerPlacaVehiculo(vehiculoId: number, vehiculos: Vehiculo[]): string {
  const vehiculo = vehiculos.find((item) => item.id === vehiculoId);

  return vehiculo ? vehiculo.placa : `Vehiculo ${vehiculoId}`;
}

function obtenerDescripcionHorario(horarioId: number, horarios: HorarioRuta[]): string {
  const horario = horarios.find((item) => item.id === horarioId);

  if (!horario) {
    return `Horario ${horarioId}`;
  }

  return `${formatearEtiqueta(horario.diaSemana)} ${horario.horaInicio} - ${horario.horaFin}`;
}

function formatearFecha(fecha: string | null): string {
  return fecha ? fecha.slice(0, 10) : 'Sin fecha';
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

export default AsignacionesPage;
