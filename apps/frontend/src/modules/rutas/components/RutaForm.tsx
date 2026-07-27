import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { CrearRutaPayload, Ruta } from '../types/ruta.types';

type RutaFormProps = {
  rutaEnEdicion: Ruta | null;
  estaGuardando: boolean;
  onCancelarEdicion: () => void;
  onGuardar: (payload: CrearRutaPayload) => Promise<void>;
};

type RutaFormState = {
  activa: boolean;
  descripcionCobertura: string;
  nombre: string;
  numero: string;
};

const estadoInicial: RutaFormState = {
  activa: true,
  descripcionCobertura: '',
  nombre: '',
  numero: '',
};

function RutaForm({ rutaEnEdicion, estaGuardando, onCancelarEdicion, onGuardar }: RutaFormProps) {
  const [formulario, setFormulario] = useState<RutaFormState>(estadoInicial);

  useEffect(() => {
    if (!rutaEnEdicion) {
      setFormulario(estadoInicial);
      return;
    }

    setFormulario({
      activa: rutaEnEdicion.activa,
      descripcionCobertura: rutaEnEdicion.descripcionCobertura,
      nombre: rutaEnEdicion.nombre,
      numero: String(rutaEnEdicion.numero),
    });
  }, [rutaEnEdicion]);

  async function manejarEnvio(evento: FormEvent<HTMLFormElement>): Promise<void> {
    evento.preventDefault();

    await onGuardar({
      activa: formulario.activa,
      descripcionCobertura: formulario.descripcionCobertura.trim(),
      nombre: formulario.nombre.trim(),
      numero: Number(formulario.numero),
    });

    if (!rutaEnEdicion) {
      setFormulario(estadoInicial);
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-950">
            {rutaEnEdicion ? 'Editar ruta' : 'Crear ruta'}
          </h2>
          <p className="text-sm text-slate-500">
            Estas acciones requieren una sesion administrativa activa.
          </p>
        </div>

        {rutaEnEdicion && (
          <button
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
            onClick={onCancelarEdicion}
            type="button"
          >
            Cancelar edicion
          </button>
        )}
      </div>

      <form className="mt-6 grid gap-4 lg:grid-cols-[0.7fr_1fr_1.5fr_auto]" onSubmit={manejarEnvio}>
        <label className="block text-sm font-bold text-slate-700" htmlFor="ruta-numero">
          Numero
          <input
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            disabled={estaGuardando}
            id="ruta-numero"
            min={1}
            onChange={(evento) => setFormulario({ ...formulario, numero: evento.target.value })}
            required
            type="number"
            value={formulario.numero}
          />
        </label>

        <label className="block text-sm font-bold text-slate-700" htmlFor="ruta-nombre">
          Nombre
          <input
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            disabled={estaGuardando}
            id="ruta-nombre"
            maxLength={100}
            onChange={(evento) => setFormulario({ ...formulario, nombre: evento.target.value })}
            required
            type="text"
            value={formulario.nombre}
          />
        </label>

        <label className="block text-sm font-bold text-slate-700" htmlFor="ruta-cobertura">
          Cobertura
          <input
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            disabled={estaGuardando}
            id="ruta-cobertura"
            onChange={(evento) =>
              setFormulario({ ...formulario, descripcionCobertura: evento.target.value })
            }
            required
            type="text"
            value={formulario.descripcionCobertura}
          />
        </label>

        <div className="flex flex-col justify-end gap-3">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
            <input
              checked={formulario.activa}
              className="size-4 rounded border-slate-300"
              disabled={estaGuardando}
              onChange={(evento) => setFormulario({ ...formulario, activa: evento.target.checked })}
              type="checkbox"
            />
            Activa
          </label>

          <button
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            disabled={estaGuardando}
            type="submit"
          >
            {estaGuardando ? 'Guardando...' : rutaEnEdicion ? 'Guardar cambios' : 'Crear ruta'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default RutaForm;
