import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import PortalSidebar from '../components/PortalSidebar';
import {
  obtenerRutaValida,
  rutaRequiereAutenticacion,
} from '../services/dashboard-data.service';
import { obtenerVistaDashboard } from './dashboard-page.registry';

function DashboardPage() {
  const location = useLocation();
  const { estaAutenticado, estaCargandoSesion } = useAuth();
  const ruta = obtenerRutaValida(location.pathname);
  const vista = obtenerVistaDashboard(ruta);
  const requiereAutenticacion = rutaRequiereAutenticacion(ruta);

  if (requiereAutenticacion && !estaCargandoSesion && !estaAutenticado) {
    return <Navigate replace to="/dashboard" />;
  }

  const estaValidandoAcceso = requiereAutenticacion && estaCargandoSesion;
  const ContenidoDashboard = vista.Componente;
  const titulo = estaValidandoAcceso ? 'Validando sesi?n' : vista.titulo;
  const descripcion = estaValidandoAcceso
    ? 'Estamos comprobando si tienes permisos para acceder a esta secci?n.'
    : vista.descripcion;

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950 lg:pl-72">
      <PortalSidebar rutaActual={ruta} />

      <section className="space-y-4 p-4 sm:p-8">
        <header className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">Panel administrativo</p>
          <h1 className="mt-2 text-3xl font-black text-slate-950">{titulo}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">{descripcion}</p>
        </header>

        {!estaValidandoAcceso && <ContenidoDashboard />}
      </section>
    </main>
  );
}

export default DashboardPage;
