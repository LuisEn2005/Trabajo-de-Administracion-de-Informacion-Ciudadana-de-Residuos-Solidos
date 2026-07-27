import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';
import EstadoBadge from '../../dashboard/components/EstadoBadge';
import TablaDatos from '../../dashboard/components/TablaDatos';
import PuntoRecoleccionForm from '../components/PuntoRecoleccionForm';
import {
  actualizarPuntoRecoleccionEnApi,
  crearPuntoRecoleccionEnApi,
  eliminarPuntoRecoleccionEnApi,
  listarPuntosRecoleccionDesdeApi,
} from '../services/puntos-recoleccion-api.service';
import type {
  CrearPuntoRecoleccionPayload,
  PuntoRecoleccion,
} from '../types/punto-recoleccion.types';

function PuntosRecoleccionPage() {
  const { estaAutenticado } = useAuth();
  const [puntos, setPuntos] = useState<PuntoRecoleccion[]>([]);
  const [puntoEnEdicion, setPuntoEnEdicion] = useState<PuntoRecoleccion | null>(null);
  const [estaCargando, setEstaCargando] = useState(true);
  const [estaGuardando, setEstaGuardando] = useState(false);
  const [mensajeError, setMensajeError] = useState<string | null>(null);

  const cargarPuntos = useCallback(async (signal?: AbortSignal): Promise<void> => {
    setEstaCargando(true);
    setMensajeError(null);

    try {
      setPuntos(await listarPuntosRecoleccionDesdeApi(signal));
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

    void cargarPuntos(controller.signal);

    return () => controller.abort();
  }, [cargarPuntos]);

  async function guardarPunto(payload: CrearPuntoRecoleccionPayload): Promise<void> {
    setEstaGuardando(true);
    setMensajeError(null);

    try {
      if (puntoEnEdicion) {
        await actualizarPuntoRecoleccionEnApi(puntoEnEdicion.id, payload);
        setPuntoEnEdicion(null);
      } else {
        await crearPuntoRecoleccionEnApi(payload);
      }

      await cargarPuntos();
    } catch (error) {
      setMensajeError(obtenerMensajeError(error));
    } finally {
      setEstaGuardando(false);
    }
  }

  const eliminarPunto = useCallback(async (punto: PuntoRecoleccion): Promise<void> => {
    const debeEliminar = window.confirm(`Deseas eliminar el punto ${punto.nombre}?`);

    if (!debeEliminar) {
      return;
    }

    setEstaGuardando(true);
    setMensajeError(null);

    try {
      await eliminarPuntoRecoleccionEnApi(punto.id);
      await cargarPuntos();
    } catch (error) {
      setMensajeError(obtenerMensajeError(error));
    } finally {
      setEstaGuardando(false);
    }
  }, [cargarPuntos]);

  const columnas = useMemo(
    () => [
      { encabezado: 'Nombre', renderizar: (registro: PuntoRecoleccion) => registro.nombre },
      { encabezado: 'Direccion', renderizar: (registro: PuntoRecoleccion) => registro.direccion },
      {
        encabezado: 'Referencia',
        renderizar: (registro: PuntoRecoleccion) => registro.referencia ?? 'Sin referencia',
      },
      {
        encabezado: 'Coordenadas',
        renderizar: (registro: PuntoRecoleccion) => `${registro.latitud}, ${registro.longitud}`,
      },
      {
        encabezado: 'Estado',
        renderizar: (registro: PuntoRecoleccion) => <EstadoBadge estado={formatearEtiqueta(registro.estado)} />,
      },
      ...(estaAutenticado
        ? [
            {
              encabezado: 'Acciones',
              renderizar: (registro: PuntoRecoleccion) => (
                <div className="flex flex-wrap gap-2">
                  <button
                    className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-50"
                    onClick={() => setPuntoEnEdicion(registro)}
                    type="button"
                  >
                    Editar
                  </button>
                  <button
                    className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-50"
                    onClick={() => void eliminarPunto(registro)}
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
    [eliminarPunto, estaAutenticado],
  );

  return (
    <div className="space-y-4">
      {estaAutenticado && (
        <PuntoRecoleccionForm
          estaGuardando={estaGuardando}
          onCancelarEdicion={() => setPuntoEnEdicion(null)}
          onGuardar={guardarPunto}
          puntoEnEdicion={puntoEnEdicion}
        />
      )}

      {mensajeError && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {mensajeError}
        </p>
      )}

      {estaCargando ? (
        <p className="rounded-xl border border-slate-200 bg-white px-4 py-6 text-sm font-semibold text-slate-500 shadow-sm">
          Cargando puntos desde la API...
        </p>
      ) : (
        <TablaDatos
          columnas={columnas}
          obtenerClave={(registro) => registro.id}
          registros={puntos}
          titulo="Puntos de recoleccion"
        />
      )}
    </div>
  );
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

export default PuntosRecoleccionPage;
