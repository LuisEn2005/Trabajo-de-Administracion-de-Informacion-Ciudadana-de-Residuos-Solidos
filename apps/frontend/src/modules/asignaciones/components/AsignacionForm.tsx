import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import type { HorarioRuta } from '../../horarios/types/horario-ruta.types';
import type { Ruta } from '../../rutas/types/ruta.types';
import type { Vehiculo } from '../../flota/types/vehiculo.types';
import type {
  AsignacionOperativa,
  CrearAsignacionPayload,
  EstadoAsignacionOperativa,
} from '../types/asignacion.types';

type AsignacionFormProps = {
  asignacionEnEdicion: AsignacionOperativa | null;
  estaGuardando: boolean;
  horarios: HorarioRuta[];
  onCancelarEdicion: () => void;
  onGuardar: (payload: CrearAsignacionPayload) => Promise<void>;
  rutas: Ruta[];
  vehiculos: Vehiculo[];
};

type AsignacionFormState = {
  estado: EstadoAsignacionOperativa;
  fecha: string;
  horarioId: string;
  rutaId: string;
  vehiculoId: string;
};

const estados: EstadoAsignacionOperativa[] = ['PROGRAMADA', 'ACTIVA', 'FINALIZADA', 'CANCELADA'];

const estadoInicial: AsignacionFormState = {
  estado: 'PROGRAMADA',
  fecha: '',
  horarioId: '',
  rutaId: '',
  vehiculoId: '',
};

function AsignacionForm({
  asignacionEnEdicion,
  estaGuardando,
  horarios,
  onCancelarEdicion,
  onGuardar,
  rutas,
  vehiculos,
}: AsignacionFormProps) {
  const [formulario, setFormulario] = useState<AsignacionFormState>(estadoInicial);

  const horariosFiltrados = useMemo(
    () => horarios.filter((horario) => !formulario.rutaId || horario.rutaId === Number(formulario.rutaId)),
    [formulario.rutaId, horarios],
  );

  useEffect(() => {
    if (!asignacionEnEdicion) {
      setFormulario({
        ...estadoInicial,
        horarioId: horarios[0] ? String(horarios[0].id) : '',
        rutaId: rutas[0] ? String(rutas[0].id) : '',
        vehiculoId: vehiculos[0] ? String(vehiculos[0].id) : '',
      });
      return;
    }

    setFormulario({
      estado: asignacionEnEdicion.estado,
      fecha: normalizarFechaInput(asignacionEnEdicion.fecha),
      horarioId: String(asignacionEnEdicion.horarioId),
      rutaId: String(asignacionEnEdicion.rutaId),
      vehiculoId: String(asignacionEnEdicion.vehiculoId),
    });
  }, [asignacionEnEdicion, horarios, rutas, vehiculos]);

  useEffect(() => {
    if (!formulario.rutaId || horariosFiltrados.some((horario) => String(horario.id) === formulario.horarioId)) {
      return;
    }

    setFormulario((estadoActual) => ({
      ...estadoActual,
      horarioId: horariosFiltrados[0] ? String(horariosFiltrados[0].id) : '',
    }));
  }, [formulario.horarioId, formulario.rutaId, horariosFiltrados]);

  async function manejarEnvio(evento: FormEvent<HTMLFormElement>): Promise<void> {
    evento.preventDefault();

    await onGuardar({
      estado: formulario.estado,
      fecha: formulario.fecha || undefined,
      horarioId: Number(formulario.horarioId),
      rutaId: Number(formulario.rutaId),
      vehiculoId: Number(formulario.vehiculoId),
    });
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-950">
            {asignacionEnEdicion ? 'Editar asignacion' : 'Crear asignacion'}
          </h2>
          <p className="text-sm text-slate-500">Relaciona ruta, vehiculo y horario para la operacion.</p>
        </div>

        {asignacionEnEdicion && (
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
        <label className="block text-sm font-bold text-slate-700" htmlFor="asignacion-ruta">
          Ruta
          <select
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            disabled={estaGuardando || rutas.length === 0}
            id="asignacion-ruta"
            onChange={(evento) => setFormulario({ ...formulario, rutaId: evento.target.value })}
            required
            value={formulario.rutaId}
          >
            <option value="" disabled>Seleccionar ruta</option>
            {rutas.map((ruta) => (
              <option key={ruta.id} value={ruta.id}>{ruta.numero} - {ruta.nombre}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-bold text-slate-700" htmlFor="asignacion-vehiculo">
          Vehiculo
          <select
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            disabled={estaGuardando || vehiculos.length === 0}
            id="asignacion-vehiculo"
            onChange={(evento) => setFormulario({ ...formulario, vehiculoId: evento.target.value })}
            required
            value={formulario.vehiculoId}
          >
            <option value="" disabled>Seleccionar vehiculo</option>
            {vehiculos.map((vehiculo) => (
              <option key={vehiculo.id} value={vehiculo.id}>{vehiculo.placa}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-bold text-slate-700" htmlFor="asignacion-horario">
          Horario
          <select
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            disabled={estaGuardando || horariosFiltrados.length === 0}
            id="asignacion-horario"
            onChange={(evento) => setFormulario({ ...formulario, horarioId: evento.target.value })}
            required
            value={formulario.horarioId}
          >
            <option value="" disabled>Seleccionar horario</option>
            {horariosFiltrados.map((horario) => (
              <option key={horario.id} value={horario.id}>
                {formatearEtiqueta(horario.diaSemana)} {horario.horaInicio} - {horario.horaFin}
              </option>
            ))}
          </select>
        </label>

        <SelectCampo
          etiqueta="Estado"
          id="asignacion-estado"
          onChange={(valor) => setFormulario({ ...formulario, estado: valor as EstadoAsignacionOperativa })}
          opciones={estados}
          valor={formulario.estado}
        />

        <label className="block text-sm font-bold text-slate-700" htmlFor="asignacion-fecha">
          Fecha
          <input
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            disabled={estaGuardando}
            id="asignacion-fecha"
            onChange={(evento) => setFormulario({ ...formulario, fecha: evento.target.value })}
            type="date"
            value={formulario.fecha}
          />
        </label>

        <div className="flex items-end">
          <button
            className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            disabled={estaGuardando || !formulario.rutaId || !formulario.vehiculoId || !formulario.horarioId}
            type="submit"
          >
            {estaGuardando ? 'Guardando...' : asignacionEnEdicion ? 'Guardar cambios' : 'Crear asignacion'}
          </button>
        </div>
      </form>
    </section>
  );
}

type SelectCampoProps = {
  etiqueta: string;
  id: string;
  onChange: (valor: string) => void;
  opciones: string[];
  valor: string;
};

function SelectCampo({ etiqueta, id, onChange, opciones, valor }: SelectCampoProps) {
  return (
    <label className="block text-sm font-bold text-slate-700" htmlFor={id}>
      {etiqueta}
      <select
        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        id={id}
        onChange={(evento) => onChange(evento.target.value)}
        value={valor}
      >
        {opciones.map((opcion) => (
          <option key={opcion} value={opcion}>{formatearEtiqueta(opcion)}</option>
        ))}
      </select>
    </label>
  );
}

function formatearEtiqueta(valor: string): string {
  return valor.charAt(0) + valor.slice(1).toLowerCase().replaceAll('_', ' ');
}

function normalizarFechaInput(fecha: string | null): string {
  return fecha ? fecha.slice(0, 10) : '';
}

export default AsignacionForm;
