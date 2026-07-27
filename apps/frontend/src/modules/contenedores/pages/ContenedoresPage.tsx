import { useCallback, useEffect, useMemo, useState } from 'react';
import EstadoBadge from '../../dashboard/components/EstadoBadge';
import TablaDatos from '../../dashboard/components/TablaDatos';
import { listarPuntosRecoleccionDesdeApi } from '../../puntos-recoleccion/services/puntos-recoleccion-api.service';
import type { PuntoRecoleccion } from '../../puntos-recoleccion/types/punto-recoleccion.types';
import ContenedorForm from '../components/ContenedorForm';
import {
  actualizarContenedorEnApi,
  crearContenedorEnApi,
  eliminarContenedorEnApi,
  listarContenedoresDesdeApi,
} from '../services/contenedores-api.service';
import type { Contenedor, CrearContenedorPayload } from '../types/contenedor.types';

function ContenedoresPage() {
  const [contenedores, setContenedores] = useState<Contenedor[]>([]);
  const [puntos, setPuntos] = useState<PuntoRecoleccion[]>([]);
  const [contenedorEnEdicion, setContenedorEnEdicion] = useState<Contenedor | null>(null);
  const [estaCargando, setEstaCargando] = useState(true);
  const [estaGuardando, setEstaGuardando] = useState(false);
  const [mensajeError, setMensajeError] = useState<string | null>(null);
  const [mensajeAdvertencia, setMensajeAdvertencia] = useState<string | null>(null);

  const cargarContenedores = useCallback(async (signal?: AbortSignal): Promise<void> => {
    setEstaCargando(true);
    setMensajeError(null);

    try {
      setContenedores(await listarContenedoresDesdeApi(signal));
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

  const cargarPuntos = useCallback(async (signal?: AbortSignal): Promise<void> => {
    setMensajeAdvertencia(null);

    try {
      setPuntos(await listarPuntosRecoleccionDesdeApi(signal));
    } catch {
      if (!signal?.aborted) {
        setPuntos([]);
        setMensajeAdvertencia(
          'No se pudieron cargar los puntos de recoleccion. Puedes registrar contenedores sin punto asignado.',
        );
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    void cargarContenedores(controller.signal);
    void cargarPuntos(controller.signal);

    return () => controller.abort();
  }, [cargarContenedores, cargarPuntos]);

  async function guardarContenedor(payload: CrearContenedorPayload): Promise<void> {
    setEstaGuardando(true);
    setMensajeError(null);

    try {
      if (contenedorEnEdicion) {
        await actualizarContenedorEnApi(contenedorEnEdicion.id, payload);
        setContenedorEnEdicion(null);
      } else {
        await crearContenedorEnApi(payload);
      }

      await cargarContenedores();
    } catch (error) {
      setMensajeError(obtenerMensajeError(error));
    } finally {
      setEstaGuardando(false);
    }
  }

  const eliminarContenedor = useCallback(async (contenedor: Contenedor): Promise<void> => {
    const debeEliminar = window.confirm(`Deseas eliminar el contenedor ${contenedor.codigo}?`);

    if (!debeEliminar) {
      return;
    }

    setEstaGuardando(true);
    setMensajeError(null);

    try {
      await eliminarContenedorEnApi(contenedor.id);
      await cargarContenedores();
    } catch (error) {
      setMensajeError(obtenerMensajeError(error));
    } finally {
      setEstaGuardando(false);
    }
  }, [cargarContenedores]);

  const columnas = useMemo(
    () => [
      { encabezado: 'Codigo', renderizar: (registro: Contenedor) => registro.codigo },
      { encabezado: 'Tipo', renderizar: (registro: Contenedor) => formatearEtiqueta(registro.tipo) },
      { encabezado: 'Capacidad', renderizar: (registro: Contenedor) => `${registro.capacidad} L` },
      {
        encabezado: 'Punto',
        renderizar: (registro: Contenedor) => obtenerNombrePunto(registro.puntoRecoleccionId, puntos),
      },
      {
        encabezado: 'Estado',
        renderizar: (registro: Contenedor) => <EstadoBadge estado={formatearEtiqueta(registro.estado)} />,
      },
      {
        encabezado: 'Acciones',
        renderizar: (registro: Contenedor) => (
          <div className="flex flex-wrap gap-2">
            <button
              className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-50"
              onClick={() => setContenedorEnEdicion(registro)}
              type="button"
            >
              Editar
            </button>
            <button
              className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-50"
              onClick={() => void eliminarContenedor(registro)}
              type="button"
            >
              Eliminar
            </button>
          </div>
        ),
      },
    ],
    [eliminarContenedor, puntos],
  );

  return (
    <div className="space-y-4">
      <ContenedorForm
        contenedorEnEdicion={contenedorEnEdicion}
        estaGuardando={estaGuardando}
        onCancelarEdicion={() => setContenedorEnEdicion(null)}
        onGuardar={guardarContenedor}
        puntos={puntos}
      />

      {mensajeAdvertencia && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700">
          {mensajeAdvertencia}
        </p>
      )}

      {mensajeError && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {mensajeError}
        </p>
      )}

      {estaCargando ? (
        <p className="rounded-xl border border-slate-200 bg-white px-4 py-6 text-sm font-semibold text-slate-500 shadow-sm">
          Cargando contenedores desde la API...
        </p>
      ) : (
        <TablaDatos
          columnas={columnas}
          obtenerClave={(registro) => registro.id}
          registros={contenedores}
          titulo="Contenedores registrados"
        />
      )}
    </div>
  );
}

function obtenerNombrePunto(puntoId: number | null, puntos: PuntoRecoleccion[]): string {
  if (!puntoId) {
    return 'Sin punto asignado';
  }

  const punto = puntos.find((item) => item.id === puntoId);

  return punto ? punto.nombre : `Punto ${puntoId}`;
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

export default ContenedoresPage;
