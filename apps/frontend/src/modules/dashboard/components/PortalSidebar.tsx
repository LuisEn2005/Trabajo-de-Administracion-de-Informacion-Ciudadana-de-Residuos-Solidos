import { useState } from 'react';
import { AlertTriangle, UserRound } from 'lucide-react';
import LoginModal from '../../auth/components/LoginModal';
import SideMenu from './SideMenu';
import type { RutaDashboard } from '../types/dashboard.types';

type PortalSidebarProps = {
  rutaActual: RutaDashboard;
};

function PortalSidebar({ rutaActual }: PortalSidebarProps) {
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
          <button
            className="flex w-full items-center gap-3 rounded-2xl p-2 text-left transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={abrirLogin}
            type="button"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-slate-600">
              <UserRound aria-hidden="true" size={20} />
            </span>
            <span>
              <span className="block font-black">Usuario Invitado</span>
              <span className="block text-sm text-slate-300">Iniciar sesión</span>
            </span>
          </button>
        </div>
      </aside>

      {estaAbiertoLogin && <LoginModal onClose={cerrarLogin} />}
    </>
  );
}

export default PortalSidebar;
