import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { PuntoRecoleccion } from '../../puntos-recoleccion/types/punto-recoleccion.types';
import type {
  Contenedor,
  CrearContenedorPayload,
  EstadoContenedor,
  TipoContenedor,
} from '../types/contenedor.types';

type ContenedorFormProps = {
  contenedorEnEdicion: Contenedor | null;
  estaGuardando: boolean;
  onCancelarEdicion: () => void;
  onGuardar: (payload: CrearContenedorPayload) => Promise<void>;
  puntos: PuntoRecoleccion[];
};

type ContenedorFormState = {
  capacidad: string;
  codigo: string;
  estado: EstadoContenedor;
  fechaInstalacion: string;
  puntoRecoleccionId: string;
  tipo: TipoContenedor;
};

const tipos: TipoContenedor[] = ['ORGANICO', 'INORGANICO', 'RECICLABLE', 'MIXTO'];
const estados: EstadoContenedor[] = [
  'OPERATIVO',
  'LLENO',
  'DANADO',
  'EN_MANTENIMIENTO',
  'RETIRADO',
];

const estadoInicial: ContenedorFormState = {
  capacidad: '',
  codigo: '',
  estado: 'OPERATIVO',
  fechaInstalacion: '',
  puntoRecoleccionId: '',
  tipo: 'MIXTO',
};

function ContenedorForm({
  contenedorEnEdicion,
  estaGuardando,
  onCancelarEdicion,
  onGuardar,
  puntos,
}: ContenedorFormProps) {
  const [formulario, setFormulario] = useState<ContenedorFormState>(estadoInicial);

  useEffect(() => {
    if (!contenedorEnEdicion) {
      setFormulario(estadoInicial);
      return;
    }

    setFormulario({
      capacidad: String(contenedorEnEdicion.capacidad),
      codigo: contenedorEnEdicion.codigo,
      estado: contenedorEnEdicion.estado,
      fechaInstalacion: normalizarFechaInput(contenedorEnEdicion.fechaInstalacion),
      puntoRecoleccionId: contenedorEnEdicion.puntoRecoleccionId
        ? String(contenedorEnEdicion.puntoRecoleccionId)
        : '',
      tipo: contenedorEnEdicion.tipo,
    });
  }, [contenedorEnEdicion]);

  async function manejarEnvio(evento: FormEvent<HTMLFormElement>): Promise<void> {
    evento.preventDefault();

    await onGuardar({
      capacidad: Number(formulario.capacidad),
      codigo: formulario.codigo.trim().toUpperCase(),
      estado: formulario.estado,
      fechaInstalacion: formulario.fechaInstalacion || undefined,
      puntoRecoleccionId: formulario.puntoRecoleccionId
        ? Number(formulario.puntoRecoleccionId)
        : undefined,
      tipo: formulario.tipo,
    });

    if (!contenedorEnEdicion) {
      setFormulario(estadoInicial);
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-950">
            {contenedorEnEdicion ? 'Editar contenedor' : 'Crear contenedor'}
          </h2>
          <p className="text-sm text-slate-500">Gestion de inventario protegida por sesion administrativa.</p>
        </div>

        {contenedorEnEdicion && (
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
        <label className="block text-sm font-bold text-slate-700" htmlFor="contenedor-codigo">
          Codigo
          <input
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm uppercase outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            disabled={estaGuardando}
            id="contenedor-codigo"
            maxLength={50}
            onChange={(evento) => setFormulario({ ...formulario, codigo: evento.target.value })}
            required
            type="text"
            value={formulario.codigo}
          />
        </label>

        <SelectCampo
          etiqueta="Tipo"
          id="contenedor-tipo"
          onChange={(valor) => setFormulario({ ...formulario, tipo: valor as TipoContenedor })}
          opciones={tipos}
          valor={formulario.tipo}
        />

        <label className="block text-sm font-bold text-slate-700" htmlFor="contenedor-capacidad">
          Capacidad
          <input
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            disabled={estaGuardando}
            id="contenedor-capacidad"
            min={1}
            onChange={(evento) => setFormulario({ ...formulario, capacidad: evento.target.value })}
            required
            step="any"
            type="number"
            value={formulario.capacidad}
          />
        </label>

        <SelectCampo
          etiqueta="Estado"
          id="contenedor-estado"
          onChange={(valor) => setFormulario({ ...formulario, estado: valor as EstadoContenedor })}
          opciones={estados}
          valor={formulario.estado}
        />

        <label className="block text-sm font-bold text-slate-700" htmlFor="contenedor-punto">
          Punto de recoleccion
          <select
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            disabled={estaGuardando || puntos.length === 0}
            id="contenedor-punto"
            onChange={(evento) => setFormulario({ ...formulario, puntoRecoleccionId: evento.target.value })}
            value={formulario.puntoRecoleccionId}
          >
            <option value="">Sin punto asignado</option>
            {puntos.map((punto) => (
              <option key={punto.id} value={punto.id}>
                {punto.nombre}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-bold text-slate-700" htmlFor="contenedor-fecha">
          Fecha instalacion
          <input
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            disabled={estaGuardando}
            id="contenedor-fecha"
            onChange={(evento) => setFormulario({ ...formulario, fechaInstalacion: evento.target.value })}
            type="date"
            value={formulario.fechaInstalacion}
          />
        </label>

        <div className="flex items-end lg:col-span-3">
          <button
            className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-auto"
            disabled={estaGuardando}
            type="submit"
          >
            {estaGuardando ? 'Guardando...' : contenedorEnEdicion ? 'Guardar cambios' : 'Crear contenedor'}
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

function normalizarFechaInput(fecha: string | null): string {
  return fecha ? fecha.slice(0, 10) : '';
}

export default ContenedorForm;
