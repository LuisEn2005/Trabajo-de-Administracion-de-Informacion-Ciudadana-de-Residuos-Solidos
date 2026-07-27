import { CalendarClock, Map, MapPin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { RutaDashboard } from '../types/dashboard.types';

type AccesoPublico = {
  descripcion: string;
  etiqueta: string;
  icono: LucideIcon;
  ruta: RutaDashboard;
  titulo: string;
};

const accesosPublicos: AccesoPublico[] = [
  {
    descripcion: 'Consulta las rutas registradas y la cobertura de cada recorrido.',
    etiqueta: 'Ver rutas',
    icono: Map,
    ruta: '/dashboard/rutas',
    titulo: 'Rutas de recolección',
  },
  {
    descripcion: 'Revisa los días, turnos y horas de atención disponibles.',
    etiqueta: 'Ver horarios',
    icono: CalendarClock,
    ruta: '/dashboard/horarios',
    titulo: 'Horarios de servicio',
  },
  {
    descripcion: 'Ubica los puntos registrados para la recolección de residuos.',
    etiqueta: 'Ver puntos',
    icono: MapPin,
    ruta: '/dashboard/puntos',
    titulo: 'Puntos de recolección',
  },
];

function ResumenDashboardPage() {
  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">Consulta pública</p>
        <h2 className="mt-3 text-2xl font-black text-slate-950">Información de recolección disponible</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
          Revisa información pública sobre rutas, horarios y puntos de recolección del servicio.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3" aria-label="Accesos de consulta pública">
        {accesosPublicos.map((acceso) => {
          const Icono = acceso.icono;

          return (
            <Link
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              key={acceso.ruta}
              to={acceso.ruta}
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                <Icono aria-hidden="true" size={22} />
              </span>
              <h3 className="mt-5 text-lg font-black text-slate-950">{acceso.titulo}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{acceso.descripcion}</p>
              <span className="mt-5 inline-flex text-sm font-black text-blue-700">{acceso.etiqueta}</span>
            </Link>
          );
        })}
      </section>
    </div>
  );
}

export default ResumenDashboardPage;
