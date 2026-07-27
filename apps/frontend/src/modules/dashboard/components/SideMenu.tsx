import {
  CalendarClock,
  ClipboardList,
  Container,
  LayoutDashboard,
  Map,
  MapPin,
  ShieldUser,
  Truck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { RutaDashboard } from '../types/dashboard.types';

type ElementoMenu = {
  etiqueta: string;
  icono: LucideIcon;
  ruta: RutaDashboard;
};

type SideMenuProps = {
  rutaActual: RutaDashboard;
};

const elementosMenu: ElementoMenu[] = [
  { etiqueta: 'Dashboard', icono: LayoutDashboard, ruta: '/dashboard' },
  { etiqueta: 'Rutas', icono: Map, ruta: '/dashboard/rutas' },
  { etiqueta: 'Horarios', icono: CalendarClock, ruta: '/dashboard/horarios' },
  { etiqueta: 'Flota', icono: Truck, ruta: '/dashboard/flota' },
  { etiqueta: 'Puntos', icono: MapPin, ruta: '/dashboard/puntos' },
  { etiqueta: 'Contenedores', icono: Container, ruta: '/dashboard/contenedores' },
  { etiqueta: 'Asignaciones', icono: ClipboardList, ruta: '/dashboard/asignaciones' },
  { etiqueta: 'Administradores', icono: ShieldUser, ruta: '/dashboard/administradores' },
];

function SideMenu({ rutaActual }: SideMenuProps) {
  return (
    <nav className="flex-1 space-y-3 overflow-y-auto px-7 py-8" aria-label="Menú principal del dashboard">
      {elementosMenu.map((elemento) => {
        const Icono = elemento.icono;
        const estaActivo = rutaActual === elemento.ruta;

        return (
          <a
            className={`flex items-center gap-4 rounded-xl px-5 py-4 text-sm font-bold transition ${
              estaActivo ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-white/10'
            }`}
            href={elemento.ruta}
            key={elemento.ruta}
          >
            <Icono aria-hidden="true" size={20} />
            {elemento.etiqueta}
          </a>
        );
      })}
    </nav>
  );
}

export default SideMenu;
