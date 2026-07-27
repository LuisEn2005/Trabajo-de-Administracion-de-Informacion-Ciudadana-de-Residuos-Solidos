import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { Ruta } from '../../rutas/types/ruta.types';
import type { CrearVehiculoPayload, TipoCarroceria, Vehiculo } from '../types/vehiculo.types';

type VehiculoFormProps = {
  estaGuardando: boolean;
  onCancelarEdicion: () => void;
  onGuardar: (payload: CrearVehiculoPayload) => Promise<void>;
  rutas: Ruta[];
  vehiculoEnEdicion: Vehiculo | null;
};

type VehiculoFormState = {
  activo: boolean;
  carroceria: TipoCarroceria;
  placa: string;
  rutaId: string;
};

const estadoInicial: VehiculoFormState = {
  activo: true,
  carroceria: 'COMPACTADOR',
  placa: '',
  rutaId: '',
};

const carrocerias: TipoCarroceria[] = ['COMPACTADOR', 'BARANDA'];

function VehiculoForm({
  estaGuardando,
  onCancelarEdicion,
  onGuardar,
  rutas,
  vehiculoEnEdicion,
}: VehiculoFormProps) {
  const [formulario, setFormulario] = useState<VehiculoFormState>(estadoInicial);

  useEffect(() => {
    if (!vehiculoEnEdicion) {
      setFormulario({ ...estadoInicial, rutaId: rutas[0] ? String(rutas[0].id) : '' });
      return;
    }

    setFormulario({
      activo: vehiculoEnEdicion.activo,
      carroceria: vehiculoEnEdicion.carroceria,
      placa: vehiculoEnEdicion.placa,
      rutaId: String(vehiculoEnEdicion.rutaId),
    });
  }, [rutas, vehiculoEnEdicion]);

  async function manejarEnvio(evento: FormEvent<HTMLFormElement>): Promise<void> {
    evento.preventDefault();

    await onGuardar({
      activo: formulario.activo,
      carroceria: formulario.carroceria,
      placa: formulario.placa.trim().toUpperCase(),
      rutaId: Number(formulario.rutaId),
    });

    if (!vehiculoEnEdicion) {
      setFormulario({ ...estadoInicial, rutaId: rutas[0] ? String(rutas[0].id) : '' });
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-950">
            {vehiculoEnEdicion ? 'Editar vehiculo' : 'Crear vehiculo'}
          </h2>
          <p className="text-sm text-slate-500">
            La flota pertenece al inventario operativo y requiere sesion administrativa.
          </p>
        </div>

        {vehiculoEnEdicion && (
          <button
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
            onClick={onCancelarEdicion}
            type="button"
          >
            Cancelar edicion
          </button>
        )}
      </div>

      <form className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr_1fr_auto]" onSubmit={manejarEnvio}>
        <label className="block text-sm font-bold text-slate-700" htmlFor="vehiculo-placa">
          Placa
          <input
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm uppercase outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            disabled={estaGuardando}
            id="vehiculo-placa"
            maxLength={10}
            onChange={(evento) => setFormulario({ ...formulario, placa: evento.target.value })}
            required
            type="text"
            value={formulario.placa}
          />
        </label>

        <label className="block text-sm font-bold text-slate-700" htmlFor="vehiculo-carroceria">
          Carroceria
          <select
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            disabled={estaGuardando}
            id="vehiculo-carroceria"
            onChange={(evento) =>
              setFormulario({ ...formulario, carroceria: evento.target.value as TipoCarroceria })
            }
            value={formulario.carroceria}
          >
            {carrocerias.map((carroceria) => (
              <option key={carroceria} value={carroceria}>
                {formatearEtiqueta(carroceria)}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-bold text-slate-700" htmlFor="vehiculo-ruta">
          Ruta
          <select
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            disabled={estaGuardando || rutas.length === 0}
            id="vehiculo-ruta"
            onChange={(evento) => setFormulario({ ...formulario, rutaId: evento.target.value })}
            required
            value={formulario.rutaId}
          >
            <option value="" disabled>
              Seleccionar ruta
            </option>
            {rutas.map((ruta) => (
              <option key={ruta.id} value={ruta.id}>
                {ruta.numero} - {ruta.nombre}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-col justify-end gap-3">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700">
            <input
              checked={formulario.activo}
              className="size-4 rounded border-slate-300"
              disabled={estaGuardando}
              onChange={(evento) => setFormulario({ ...formulario, activo: evento.target.checked })}
              type="checkbox"
            />
            Activo
          </label>

          <button
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            disabled={estaGuardando || rutas.length === 0}
            type="submit"
          >
            {estaGuardando ? 'Guardando...' : vehiculoEnEdicion ? 'Guardar cambios' : 'Crear vehiculo'}
          </button>
        </div>
      </form>
    </section>
  );
}

function formatearEtiqueta(valor: string): string {
  return valor.charAt(0) + valor.slice(1).toLowerCase().replaceAll('_', ' ');
}

export default VehiculoForm;
