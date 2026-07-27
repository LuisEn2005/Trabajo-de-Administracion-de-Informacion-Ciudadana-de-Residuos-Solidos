import type {
  Administrador,
  AsignacionOperativa,
  Contenedor,
  HorarioRuta,
  PuntoRecoleccion,
  RutaDashboard,
  RutaRecoleccion,
  TarjetaResumen,
  Vehiculo,
} from '../types/dashboard.types';

const rutasValidas: RutaDashboard[] = [
  '/dashboard',
  '/dashboard/rutas',
  '/dashboard/horarios',
  '/dashboard/flota',
  '/dashboard/puntos',
  '/dashboard/contenedores',
  '/dashboard/asignaciones',
  '/dashboard/administradores',
];

const rutas: RutaRecoleccion[] = [
  {
    id: 1,
    numero: 101,
    nombre: 'Ruta Norte',
    descripcionCobertura: 'Urbanizaciones del sector norte y avenidas principales.',
    activa: true,
  },
  {
    id: 2,
    numero: 102,
    nombre: 'Ruta Sur',
    descripcionCobertura: 'Mercados, parques y zonas residenciales del sector sur.',
    activa: true,
  },
  {
    id: 3,
    numero: 103,
    nombre: 'Ruta Centro',
    descripcionCobertura: 'Centro histórico, instituciones y calles de alta circulación.',
    activa: true,
  },
];

const horarios: HorarioRuta[] = [
  {
    id: 1,
    ruta: 'Ruta Norte',
    frecuencia: 'Semanal',
    diaSemana: 'Lunes',
    turno: 'Mañana',
    horaInicio: '06:00',
    horaFin: '10:00',
    activo: true,
  },
  {
    id: 2,
    ruta: 'Ruta Sur',
    frecuencia: 'Semanal',
    diaSemana: 'Miércoles',
    turno: 'Tarde',
    horaInicio: '14:00',
    horaFin: '18:00',
    activo: true,
  },
  {
    id: 3,
    ruta: 'Ruta Centro',
    frecuencia: 'Quincenal',
    diaSemana: 'Viernes',
    turno: 'Noche',
    horaInicio: '20:00',
    horaFin: '23:30',
    activo: true,
  },
];

const vehiculos: Vehiculo[] = [
  { id: 1, placa: 'T-101', carroceria: 'Compactador', ruta: 'Ruta Norte', activo: true },
  { id: 2, placa: 'T-102', carroceria: 'Baranda', ruta: 'Ruta Sur', activo: true },
  { id: 3, placa: 'T-103', carroceria: 'Compactador', ruta: 'Ruta Centro', activo: false },
];

const puntosRecoleccion: PuntoRecoleccion[] = [
  { id: 1, nombre: 'Parque Industrial', direccion: 'Av. Principal 120', estado: 'Activo' },
  { id: 2, nombre: 'Mercado Central', direccion: 'Calle Comercio 450', estado: 'Activo' },
  { id: 3, nombre: 'Plaza Norte', direccion: 'Jr. Los Pinos 220', estado: 'Mantenimiento' },
];

const contenedores: Contenedor[] = [
  {
    id: 1,
    codigo: 'CNT-001',
    tipo: 'Orgánico',
    capacidad: '120 L',
    estado: 'Operativo',
    puntoRecoleccion: 'Mercado Central',
  },
  {
    id: 2,
    codigo: 'CNT-002',
    tipo: 'Reciclable',
    capacidad: '240 L',
    estado: 'Lleno',
    puntoRecoleccion: 'Parque Industrial',
  },
  {
    id: 3,
    codigo: 'CNT-003',
    tipo: 'Mixto',
    capacidad: '360 L',
    estado: 'En mantenimiento',
    puntoRecoleccion: 'Plaza Norte',
  },
];

const asignaciones: AsignacionOperativa[] = [
  {
    id: 1,
    ruta: 'Ruta Norte',
    vehiculo: 'T-101',
    horario: 'Lunes 06:00 - 10:00',
    estado: 'Programada',
    fecha: '2026-07-27',
  },
  {
    id: 2,
    ruta: 'Ruta Sur',
    vehiculo: 'T-102',
    horario: 'Miércoles 14:00 - 18:00',
    estado: 'Activa',
    fecha: '2026-07-29',
  },
  {
    id: 3,
    ruta: 'Ruta Centro',
    vehiculo: 'T-103',
    horario: 'Viernes 20:00 - 23:30',
    estado: 'Finalizada',
    fecha: '2026-07-24',
  },
];

const administradores: Administrador[] = [
  { id: 1, nombre: 'Usuario Invitado', email: 'invitado@is1.local', activo: true },
];

const zonasGeograficas = ['Todas las zonas', 'Norte', 'Sur', 'Centro', 'Este', 'Oeste'];

export function obtenerRutaValida(rutaActual: string): RutaDashboard {
  if (rutasValidas.includes(rutaActual as RutaDashboard)) {
    return rutaActual as RutaDashboard;
  }

  return '/dashboard';
}

export function listarZonasGeograficas(): string[] {
  return zonasGeograficas;
}

export function listarTarjetasResumen(): TarjetaResumen[] {
  return [
    {
      titulo: 'Rutas activas',
      valor: String(rutas.filter((ruta) => ruta.activa).length),
      descripcion: 'Rutas listas para programación',
    },
    {
      titulo: 'Horarios',
      valor: String(horarios.length),
      descripcion: 'Ventanas de recolección registradas',
    },
    {
      titulo: 'Vehículos',
      valor: String(vehiculos.length),
      descripcion: 'Unidades asociadas a rutas',
    },
    {
      titulo: 'Puntos',
      valor: String(puntosRecoleccion.length),
      descripcion: 'Puntos de recolección monitoreados',
    },
  ];
}

export function listarRutas(): RutaRecoleccion[] {
  return rutas;
}

export function listarHorarios(): HorarioRuta[] {
  return horarios;
}

export function listarVehiculos(): Vehiculo[] {
  return vehiculos;
}

export function listarPuntosRecoleccion(): PuntoRecoleccion[] {
  return puntosRecoleccion;
}

export function listarContenedores(): Contenedor[] {
  return contenedores;
}

export function listarAsignaciones(): AsignacionOperativa[] {
  return asignaciones;
}

export function listarAdministradores(): Administrador[] {
  return administradores;
}
