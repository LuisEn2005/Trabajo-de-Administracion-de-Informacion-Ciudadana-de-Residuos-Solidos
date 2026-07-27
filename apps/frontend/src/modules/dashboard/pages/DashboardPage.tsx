import PortalSidebar from '../components/PortalSidebar';
import { obtenerRutaValida } from '../services/dashboard-data.service';
import { obtenerVistaDashboard } from './dashboard-page.registry';

type DashboardPageProps = {
  rutaActual: string;
};

function DashboardPage({ rutaActual }: DashboardPageProps) {
  const ruta = obtenerRutaValida(rutaActual);
  const vista = obtenerVistaDashboard(ruta);
  const ContenidoDashboard = vista.Componente;

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950 lg:pl-72">
      <PortalSidebar rutaActual={ruta} />

      <section className="space-y-4 p-4 sm:p-8">
        <header className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">Panel administrativo</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">{vista.titulo}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">{vista.descripcion}</p>
        </header>

        <ContenidoDashboard />
      </section>
    </main>
  );
}

export default DashboardPage;
