import { useCallback, useEffect, useMemo, useState } from 'react';
import EstadoBadge from '../../dashboard/components/EstadoBadge';
import TablaDatos from '../../dashboard/components/TablaDatos';
import { listarRutasDesdeApi } from '../../rutas/services/rutas-api.service';
import type { Ruta } from '../../rutas/types/ruta.types';
import VehiculoForm from '../components/VehiculoForm';
import {
  actualizarVehiculoEnApi,
  crearVehiculoEnApi,
  eliminarVehiculoEnApi,
  listarVehiculosDesdeApi,
} from '../services/flota-api.service';
import type { CrearVehiculoPayload, Vehiculo } from '../types/vehiculo.types';

function FlotaPage() {
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [rutas, setRutas] = useState<Ruta[]>([]);
  const [vehiculoEnEdicion, setVehiculoEnEdicion] = useState<Vehiculo | null>(null);
  const [estaCargando, setEstaCargando] = useState(true);
  const [estaGuardando, setEstaGuardando] = useState(false);
  const [mensajeError, setMensajeError] = useState<string | null>(null);

  const cargarDatos = useCallback(async (signal?: AbortSignal): Promise<void> => {
    setEstaCargando(true);
    setMensajeError(null);

    try {
      const [rutasApi, vehiculosApi] = await Promise.all([
        listarRutasDesdeApi(signal),
        listarVehiculosDesdeApi(signal),
      ]);

      setRutas(rutasApi);
      setVehiculos(vehiculosApi);
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

  async function guardarVehiculo(payload: CrearVehiculoPayload): Promise<void> {
    setEstaGuardando(true);
    setMensajeError(null);

    try {
      if (vehiculoEnEdicion) {
        await actualizarVehiculoEnApi(vehiculoEnEdicion.id, payload);
        setVehiculoEnEdicion(null);
      } else {
        await crearVehiculoEnApi(payload);
      }

      await cargarDatos();
    } catch (error) {
      setMensajeError(obtenerMensajeError(error));
    } finally {
      setEstaGuardando(false);
    }
  }

  const eliminarVehiculo = useCallback(async (vehiculo: Vehiculo): Promise<void> => {
    const debeEliminar = window.confirm(`Deseas eliminar el vehiculo ${vehiculo.placa}?`);

    if (!debeEliminar) {
      return;
    }

    setEstaGuardando(true);
    setMensajeError(null);

    try {
      await eliminarVehiculoEnApi(vehiculo.id);
      await cargarDatos();
    } catch (error) {
      setMensajeError(obtenerMensajeError(error));
    } finally {
      setEstaGuardando(false);
    }
  }, [cargarDatos]);

  const columnas = useMemo(
    () => [
      { encabezado: 'Placa', renderizar: (registro: Vehiculo) => registro.placa },
      { encabezado: 'Carroceria', renderizar: (registro: Vehiculo) => formatearEtiqueta(registro.carroceria) },
      { encabezado: 'Ruta', renderizar: (registro: Vehiculo) => obtenerNombreRuta(registro.rutaId, rutas) },
      {
        encabezado: 'Estado',
        renderizar: (registro: Vehiculo) => <EstadoBadge estado={registro.activo ? 'Activo' : 'Inactivo'} />,
      },
      {
        encabezado: 'Acciones',
        renderizar: (registro: Vehiculo) => (
          <div className="flex flex-wrap gap-2">
            <button
              className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-50"
              onClick={() => setVehiculoEnEdicion(registro)}
              type="button"
            >
              Editar
            </button>
            <button
              className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-50"
              onClick={() => void eliminarVehiculo(registro)}
              type="button"
            >
              Eliminar
            </button>
          </div>
        ),
      },
    ],
    [eliminarVehiculo, rutas],
  );

  return (
    <div className="space-y-4">
      <VehiculoForm
        estaGuardando={estaGuardando}
        onCancelarEdicion={() => setVehiculoEnEdicion(null)}
        onGuardar={guardarVehiculo}
        rutas={rutas}
        vehiculoEnEdicion={vehiculoEnEdicion}
      />

      {mensajeError && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {mensajeError}
        </p>
      )}

      {estaCargando ? (
        <p className="rounded-xl border border-slate-200 bg-white px-4 py-6 text-sm font-semibold text-slate-500 shadow-sm">
          Cargando vehiculos desde la API...
        </p>
      ) : (
        <TablaDatos
          columnas={columnas}
          obtenerClave={(registro) => registro.id}
          registros={vehiculos}
          titulo="Vehiculos registrados"
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

export default FlotaPage;
