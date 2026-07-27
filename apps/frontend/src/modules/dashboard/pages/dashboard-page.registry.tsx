import type { ComponentType } from 'react';
import AdministradoresPage from '../../auth/pages/AdministradoresPage';
import AsignacionesPage from '../../asignaciones/pages/AsignacionesPage';
import ContenedoresPage from '../../contenedores/pages/ContenedoresPage';
import FlotaPage from '../../flota/pages/FlotaPage';
import HorariosPage from '../../horarios/pages/HorariosPage';
import PuntosRecoleccionPage from '../../puntos-recoleccion/pages/PuntosRecoleccionPage';
import RutasPage from '../../rutas/pages/RutasPage';
import ResumenDashboardPage from './ResumenDashboardPage';
import type { EncabezadoDashboard, RutaDashboard } from '../types/dashboard.types';

type VistaDashboard = EncabezadoDashboard & {
  Componente: ComponentType;
};

const vistasPorRuta: Record<RutaDashboard, VistaDashboard> = {
  '/dashboard': {
    titulo: 'Dashboard operativo',
    descripcion: 'Resumen general de rutas, horarios, flota y asignaciones registradas.',
    Componente: ResumenDashboardPage,
  },
  '/dashboard/rutas': {
    titulo: 'Rutas de recolección',
    descripcion: 'Consulta de rutas definidas para la cobertura del servicio.',
    Componente: RutasPage,
  },
  '/dashboard/horarios': {
    titulo: 'Horarios de ruta',
    descripcion: 'Programación semanal o quincenal de los recorridos.',
    Componente: HorariosPage,
  },
  '/dashboard/flota': {
    titulo: 'Flota vehicular',
    descripcion: 'Vehículos asociados a rutas y su disponibilidad operativa.',
    Componente: FlotaPage,
  },
  '/dashboard/puntos': {
    titulo: 'Puntos de recolección',
    descripcion: 'Ubicaciones donde se registra o consulta recolección de residuos.',
    Componente: PuntosRecoleccionPage,
  },
  '/dashboard/contenedores': {
    titulo: 'Contenedores',
    descripcion: 'Inventario operativo de contenedores asociados a puntos de recolección.',
    Componente: ContenedoresPage,
  },
  '/dashboard/asignaciones': {
    titulo: 'Asignaciones operativas',
    descripcion: 'Relación entre rutas, vehículos y horarios programados.',
    Componente: AsignacionesPage,
  },
  '/dashboard/administradores': {
    titulo: 'Administradores',
    descripcion: 'Usuarios administrativos contemplados por el modelo actual.',
    Componente: AdministradoresPage,
  },
};

export function obtenerVistaDashboard(ruta: RutaDashboard): VistaDashboard {
  return vistasPorRuta[ruta];
}
