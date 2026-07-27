import { useState } from 'react';
import { AlertTriangle, LogOut, UserRound } from 'lucide-react';
import LoginModal from '../../auth/components/LoginModal';
import { useAuth } from '../../auth/hooks/useAuth';
import SideMenu from './SideMenu';
import type { RutaDashboard } from '../types/dashboard.types';

type PortalSidebarProps = {
  rutaActual: RutaDashboard;
};

function PortalSidebar({ rutaActual }: PortalSidebarProps) {
  const { administrador, cerrarSesion, estaAutenticado, estaCargandoSesion } = useAuth();
  const [estaAbiertoLogin, setEstaAbiertoLogin] = useState(false);

  function abrirLogin(): void {
    setEstaAbiertoLogin(true);
  }

  function cerrarLogin(): void {
    setEstaAbiertoLogin(false);
  }

  return (
    <>
      <aside className="flex min-h-screen w-full flex-col bg-slate-800 text-white lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:h-screen lg:w-72 lg:overflow-hidden">
        <div className="flex items-center gap-3 border-b border-white/10 px-7 py-8">
          <span className="flex size-8 items-center justify-center">
            <AlertTriangle aria-hidden="true" size={18} />
          </span>
          <span className="text-xl font-black">Gestor de Residuos Sólidos</span>
        </div>

        <SideMenu rutaActual={rutaActual} />

        <div className="border-t border-white/10 px-7 py-5">
          {estaAutenticado && administrador ? (
            <div className="space-y-3 rounded-2xl bg-white/5 p-2">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-blue-600">
                  <UserRound aria-hidden="true" size={20} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-black">{administrador.nombre}</span>
                  <span className="block truncate text-sm text-slate-300">{administrador.email}</span>
                </span>
              </div>

              <button
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-bold text-slate-100 transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={cerrarSesion}
                type="button"
              >
                <LogOut aria-hidden="true" size={16} />
                Cerrar sesión
              </button>
            </div>
          ) : (
            <button
              className="flex w-full items-center gap-3 rounded-2xl p-2 text-left transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={estaCargandoSesion}
              onClick={abrirLogin}
              type="button"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-slate-600">
                <UserRound aria-hidden="true" size={20} />
              </span>
              <span>
                <span className="block font-black">Usuario Invitado</span>
                <span className="block text-sm text-slate-300">
                  {estaCargandoSesion ? 'Validando sesión' : 'Iniciar sesión'}
                </span>
              </span>
            </button>
          )}
        </div>
      </aside>

      {estaAbiertoLogin && <LoginModal onClose={cerrarLogin} />}
    </>
  );
}

export default PortalSidebar;
