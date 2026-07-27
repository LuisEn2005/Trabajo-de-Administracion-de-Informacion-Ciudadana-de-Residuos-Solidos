import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type {
  CrearPuntoRecoleccionPayload,
  EstadoPuntoRecoleccion,
  PuntoRecoleccion,
} from '../types/punto-recoleccion.types';

type PuntoRecoleccionFormProps = {
  estaGuardando: boolean;
  onCancelarEdicion: () => void;
  onGuardar: (payload: CrearPuntoRecoleccionPayload) => Promise<void>;
  puntoEnEdicion: PuntoRecoleccion | null;
};

type PuntoRecoleccionFormState = {
  direccion: string;
  estado: EstadoPuntoRecoleccion;
  latitud: string;
  longitud: string;
  nombre: string;
  referencia: string;
};

const estados: EstadoPuntoRecoleccion[] = ['ACTIVO', 'INACTIVO', 'MANTENIMIENTO'];

const estadoInicial: PuntoRecoleccionFormState = {
  direccion: '',
  estado: 'ACTIVO',
  latitud: '',
  longitud: '',
  nombre: '',
  referencia: '',
};

function PuntoRecoleccionForm({
  estaGuardando,
  onCancelarEdicion,
  onGuardar,
  puntoEnEdicion,
}: PuntoRecoleccionFormProps) {
  const [formulario, setFormulario] = useState<PuntoRecoleccionFormState>(estadoInicial);

  useEffect(() => {
    if (!puntoEnEdicion) {
      setFormulario(estadoInicial);
      return;
    }

    setFormulario({
      direccion: puntoEnEdicion.direccion,
      estado: puntoEnEdicion.estado,
      latitud: String(puntoEnEdicion.latitud),
      longitud: String(puntoEnEdicion.longitud),
      nombre: puntoEnEdicion.nombre,
      referencia: puntoEnEdicion.referencia ?? '',
    });
  }, [puntoEnEdicion]);

  async function manejarEnvio(evento: FormEvent<HTMLFormElement>): Promise<void> {
    evento.preventDefault();

    await onGuardar({
      direccion: formulario.direccion.trim(),
      estado: formulario.estado,
      latitud: Number(formulario.latitud),
      longitud: Number(formulario.longitud),
      nombre: formulario.nombre.trim(),
      referencia: formulario.referencia.trim() || undefined,
    });

    if (!puntoEnEdicion) {
      setFormulario(estadoInicial);
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-950">
            {puntoEnEdicion ? 'Editar punto de recoleccion' : 'Crear punto de recoleccion'}
          </h2>
          <p className="text-sm text-slate-500">
            La consulta es publica; las modificaciones requieren sesion administrativa.
          </p>
        </div>

        {puntoEnEdicion && (
          <button
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
            onClick={onCancelarEdicion}
            type="button"
          >
            Cancelar edicion
          </button>
        )}
      </div>

      <form className="mt-6 grid gap-4 lg:grid-cols-3" onSubmit={manejarEnvio}>
        <label className="block text-sm font-bold text-slate-700" htmlFor="punto-nombre">
          Nombre
          <input
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            disabled={estaGuardando}
            id="punto-nombre"
            maxLength={120}
            onChange={(evento) => setFormulario({ ...formulario, nombre: evento.target.value })}
            required
            type="text"
            value={formulario.nombre}
          />
        </label>

        <label className="block text-sm font-bold text-slate-700" htmlFor="punto-direccion">
          Direccion
          <input
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            disabled={estaGuardando}
            id="punto-direccion"
            maxLength={200}
            onChange={(evento) => setFormulario({ ...formulario, direccion: evento.target.value })}
            required
            type="text"
            value={formulario.direccion}
          />
        </label>

        <label className="block text-sm font-bold text-slate-700" htmlFor="punto-referencia">
          Referencia
          <input
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            disabled={estaGuardando}
            id="punto-referencia"
            maxLength={200}
            onChange={(evento) => setFormulario({ ...formulario, referencia: evento.target.value })}
            type="text"
            value={formulario.referencia}
          />
        </label>

        <label className="block text-sm font-bold text-slate-700" htmlFor="punto-latitud">
          Latitud
          <input
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            disabled={estaGuardando}
            id="punto-latitud"
            max={90}
            min={-90}
            onChange={(evento) => setFormulario({ ...formulario, latitud: evento.target.value })}
            required
            step="any"
            type="number"
            value={formulario.latitud}
          />
        </label>

        <label className="block text-sm font-bold text-slate-700" htmlFor="punto-longitud">
          Longitud
          <input
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            disabled={estaGuardando}
            id="punto-longitud"
            max={180}
            min={-180}
            onChange={(evento) => setFormulario({ ...formulario, longitud: evento.target.value })}
            required
            step="any"
            type="number"
            value={formulario.longitud}
          />
        </label>

        <label className="block text-sm font-bold text-slate-700" htmlFor="punto-estado">
          Estado
          <select
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            disabled={estaGuardando}
            id="punto-estado"
            onChange={(evento) =>
              setFormulario({ ...formulario, estado: evento.target.value as EstadoPuntoRecoleccion })
            }
            value={formulario.estado}
          >
            {estados.map((estado) => (
              <option key={estado} value={estado}>
                {formatearEtiqueta(estado)}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-end lg:col-span-3">
          <button
            className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-auto"
            disabled={estaGuardando}
            type="submit"
          >
            {estaGuardando ? 'Guardando...' : puntoEnEdicion ? 'Guardar cambios' : 'Crear punto'}
          </button>
        </div>
      </form>
    </section>
  );
}

function formatearEtiqueta(valor: string): string {
  return valor.charAt(0) + valor.slice(1).toLowerCase().replaceAll('_', ' ');
}

export default PuntoRecoleccionForm;
