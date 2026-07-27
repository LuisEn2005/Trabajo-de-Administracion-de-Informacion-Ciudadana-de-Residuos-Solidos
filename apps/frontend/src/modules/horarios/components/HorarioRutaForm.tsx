import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { Ruta } from '../../rutas/types/ruta.types';
import type {
  CrearHorarioRutaPayload,
  DiaSemana,
  FrecuenciaRuta,
  HorarioRuta,
  Turno,
} from '../types/horario-ruta.types';

type HorarioRutaFormProps = {
  estaGuardando: boolean;
  horarioEnEdicion: HorarioRuta | null;
  onCancelarEdicion: () => void;
  onGuardar: (rutaId: number, payload: CrearHorarioRutaPayload) => Promise<void>;
  rutas: Ruta[];
};

type HorarioRutaFormState = CrearHorarioRutaPayload & {
  rutaId: string;
};

const frecuencias: FrecuenciaRuta[] = ['SEMANAL', 'QUINCENAL'];
const diasSemana: DiaSemana[] = [
  'LUNES',
  'MARTES',
  'MIERCOLES',
  'JUEVES',
  'VIERNES',
  'SABADO',
  'DOMINGO',
];
const turnos: Turno[] = ['MANANA', 'TARDE', 'NOCHE'];

const estadoInicial: HorarioRutaFormState = {
  activo: true,
  diaSemana: 'LUNES',
  frecuencia: 'SEMANAL',
  horaFin: '10:00',
  horaInicio: '06:00',
  rutaId: '',
  turno: 'MANANA',
};

function HorarioRutaForm({
  estaGuardando,
  horarioEnEdicion,
  onCancelarEdicion,
  onGuardar,
  rutas,
}: HorarioRutaFormProps) {
  const [formulario, setFormulario] = useState<HorarioRutaFormState>(estadoInicial);

  useEffect(() => {
    if (!horarioEnEdicion) {
      setFormulario({ ...estadoInicial, rutaId: rutas[0] ? String(rutas[0].id) : '' });
      return;
    }

    setFormulario({
      activo: horarioEnEdicion.activo,
      diaSemana: horarioEnEdicion.diaSemana,
      frecuencia: horarioEnEdicion.frecuencia,
      horaFin: horarioEnEdicion.horaFin,
      horaInicio: horarioEnEdicion.horaInicio,
      rutaId: String(horarioEnEdicion.rutaId),
      turno: horarioEnEdicion.turno,
    });
  }, [horarioEnEdicion, rutas]);

  async function manejarEnvio(evento: FormEvent<HTMLFormElement>): Promise<void> {
    evento.preventDefault();

    await onGuardar(Number(formulario.rutaId), {
      activo: formulario.activo,
      diaSemana: formulario.diaSemana,
      frecuencia: formulario.frecuencia,
      horaFin: formulario.horaFin,
      horaInicio: formulario.horaInicio,
      turno: formulario.turno,
    });

    if (!horarioEnEdicion) {
      setFormulario({ ...estadoInicial, rutaId: rutas[0] ? String(rutas[0].id) : '' });
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-950">
            {horarioEnEdicion ? 'Editar horario' : 'Crear horario'}
          </h2>
          <p className="text-sm text-slate-500">
            La lectura es publica; crear, editar y eliminar requiere sesion administrativa.
          </p>
        </div>

        {horarioEnEdicion && (
          <button
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
            onClick={onCancelarEdicion}
            type="button"
          >
            Cancelar edicion
          </button>
        )}
      </div>

      <form className="mt-6 grid gap-4 lg:grid-cols-4" onSubmit={manejarEnvio}>
        <label className="block text-sm font-bold text-slate-700" htmlFor="horario-ruta">
          Ruta
          <select
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            disabled={estaGuardando || Boolean(horarioEnEdicion) || rutas.length === 0}
            id="horario-ruta"
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

        <SelectCampo
          etiqueta="Frecuencia"
          id="horario-frecuencia"
          onChange={(valor) => setFormulario({ ...formulario, frecuencia: valor as FrecuenciaRuta })}
          opciones={frecuencias}
          valor={formulario.frecuencia}
        />

        <SelectCampo
          etiqueta="Dia"
          id="horario-dia"
          onChange={(valor) => setFormulario({ ...formulario, diaSemana: valor as DiaSemana })}
          opciones={diasSemana}
          valor={formulario.diaSemana}
        />

        <SelectCampo
          etiqueta="Turno"
          id="horario-turno"
          onChange={(valor) => setFormulario({ ...formulario, turno: valor as Turno })}
          opciones={turnos}
          valor={formulario.turno}
        />

        <label className="block text-sm font-bold text-slate-700" htmlFor="horario-inicio">
          Hora inicio
          <input
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            disabled={estaGuardando}
            id="horario-inicio"
            onChange={(evento) => setFormulario({ ...formulario, horaInicio: evento.target.value })}
            required
            type="time"
            value={formulario.horaInicio}
          />
        </label>

        <label className="block text-sm font-bold text-slate-700" htmlFor="horario-fin">
          Hora fin
          <input
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            disabled={estaGuardando}
            id="horario-fin"
            onChange={(evento) => setFormulario({ ...formulario, horaFin: evento.target.value })}
            required
            type="time"
            value={formulario.horaFin}
          />
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
            {estaGuardando ? 'Guardando...' : horarioEnEdicion ? 'Guardar cambios' : 'Crear horario'}
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
          <option key={opcion} value={opcion}>
            {formatearEtiqueta(opcion)}
          </option>
        ))}
      </select>
    </label>
  );
}

function formatearEtiqueta(valor: string): string {
  return valor.charAt(0) + valor.slice(1).toLowerCase().replaceAll('_', ' ');
}

export default HorarioRutaForm;
