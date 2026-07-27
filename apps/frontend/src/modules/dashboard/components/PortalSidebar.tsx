import { AlertTriangle, UserRound } from 'lucide-react';
import SideMenu from './SideMenu';
import type { RutaDashboard } from '../types/dashboard.types';

type PortalSidebarProps = {
  rutaActual: RutaDashboard;
};

function PortalSidebar({ rutaActual }: PortalSidebarProps) {
  return (
    <aside className="flex min-h-screen w-full flex-col bg-slate-800 text-white lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:h-screen lg:w-72 lg:overflow-hidden">
      <div className="flex items-center gap-3 border-b border-white/10 px-7 py-8">
        <span className="flex size-8 items-center justify-center">
          <AlertTriangle aria-hidden="true" size={18} />
        </span>
        <span className="text-xl font-black">Gestor de Residuos Sólidos</span>
      </div>

      <SideMenu rutaActual={rutaActual} />

      <div className="border-t border-white/10 px-7 py-5">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-slate-600">
            <UserRound aria-hidden="true" size={20} />
          </span>
          <div>
            <p className="font-black">Usuario Invitado</p>
            <p className="text-sm text-slate-300">sesión temporal</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default PortalSidebar;
