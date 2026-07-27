import { useCallback, useEffect, useMemo, useState } from 'react';
import EstadoBadge from '../../dashboard/components/EstadoBadge';
import TablaDatos from '../../dashboard/components/TablaDatos';
import { useAuth } from '../../auth/hooks/useAuth';
import RutaForm from '../components/RutaForm';
import {
  actualizarRutaEnApi,
  crearRutaEnApi,
  eliminarRutaEnApi,
  listarRutasDesdeApi,
} from '../services/rutas-api.service';
import type { CrearRutaPayload, Ruta } from '../types/ruta.types';

function RutasPage() {
  const { estaAutenticado } = useAuth();
  const [rutas, setRutas] = useState<Ruta[]>([]);
  const [rutaEnEdicion, setRutaEnEdicion] = useState<Ruta | null>(null);
  const [estaCargando, setEstaCargando] = useState(true);
  const [estaGuardando, setEstaGuardando] = useState(false);
  const [mensajeError, setMensajeError] = useState<string | null>(null);

  const cargarRutas = useCallback(async (signal?: AbortSignal): Promise<void> => {
    setEstaCargando(true);
    setMensajeError(null);

    try {
      setRutas(await listarRutasDesdeApi(signal));
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

    void cargarRutas(controller.signal);

    return () => controller.abort();
  }, [cargarRutas]);

  async function guardarRuta(payload: CrearRutaPayload): Promise<void> {
    setEstaGuardando(true);
    setMensajeError(null);

    try {
      if (rutaEnEdicion) {
        await actualizarRutaEnApi(rutaEnEdicion.id, payload);
        setRutaEnEdicion(null);
      } else {
        await crearRutaEnApi(payload);
      }

      await cargarRutas();
    } catch (error) {
      setMensajeError(obtenerMensajeError(error));
    } finally {
      setEstaGuardando(false);
    }
  }

  const eliminarRuta = useCallback(async (ruta: Ruta): Promise<void> => {
    const debeEliminar = window.confirm(`Deseas eliminar la ruta ${ruta.nombre}?`);

    if (!debeEliminar) {
      return;
    }

    setEstaGuardando(true);
    setMensajeError(null);

    try {
      await eliminarRutaEnApi(ruta.id);
      await cargarRutas();
    } catch (error) {
      setMensajeError(obtenerMensajeError(error));
    } finally {
      setEstaGuardando(false);
    }
  }, [cargarRutas]);

  const columnas = useMemo(
    () => [
      { encabezado: 'Numero', renderizar: (registro: Ruta) => registro.numero },
      { encabezado: 'Nombre', renderizar: (registro: Ruta) => registro.nombre },
      { encabezado: 'Cobertura', renderizar: (registro: Ruta) => registro.descripcionCobertura },
      {
        encabezado: 'Estado',
        renderizar: (registro: Ruta) => <EstadoBadge estado={registro.activa ? 'Activa' : 'Inactiva'} />,
      },
      ...(estaAutenticado
        ? [
            {
              encabezado: 'Acciones',
              renderizar: (registro: Ruta) => (
                <div className="flex flex-wrap gap-2">
                  <button
                    className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-50"
                    onClick={() => setRutaEnEdicion(registro)}
                    type="button"
                  >
                    Editar
                  </button>
                  <button
                    className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-50"
                    onClick={() => void eliminarRuta(registro)}
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
    [eliminarRuta, estaAutenticado],
  );

  return (
    <div className="space-y-4">
      {estaAutenticado && (
        <RutaForm
          estaGuardando={estaGuardando}
          onCancelarEdicion={() => setRutaEnEdicion(null)}
          onGuardar={guardarRuta}
          rutaEnEdicion={rutaEnEdicion}
        />
      )}

      {mensajeError && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {mensajeError}
        </p>
      )}

      {estaCargando ? (
        <p className="rounded-xl border border-slate-200 bg-white px-4 py-6 text-sm font-semibold text-slate-500 shadow-sm">
          Cargando rutas desde la API...
        </p>
      ) : (
        <TablaDatos
          columnas={columnas}
          obtenerClave={(registro) => registro.id}
          registros={rutas}
          titulo="Rutas registradas"
        />
      )}
    </div>
  );
}

function obtenerMensajeError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Ocurrio un error inesperado.';
}

export default RutasPage;
