export type RutaDashboard =
  | '/dashboard'
  | '/dashboard/rutas'
  | '/dashboard/horarios'
  | '/dashboard/flota'
  | '/dashboard/puntos'
  | '/dashboard/contenedores'
  | '/dashboard/asignaciones'
  | '/dashboard/administradores';

export type EncabezadoDashboard = {
  titulo: string;
  descripcion: string;
};

export type TarjetaResumen = {
  titulo: string;
  valor: string;
  descripcion: string;
};

export type RutaRecoleccion = {
  id: number;
  numero: number;
  nombre: string;
  descripcionCobertura: string;
  activa: boolean;
};

export type HorarioRuta = {
  id: number;
  ruta: string;
  frecuencia: string;
  diaSemana: string;
  turno: string;
  horaInicio: string;
  horaFin: string;
  activo: boolean;
};

export type Vehiculo = {
  id: number;
  placa: string;
  carroceria: string;
  ruta: string;
  activo: boolean;
};

export type PuntoRecoleccion = {
  id: number;
  nombre: string;
  direccion: string;
  estado: string;
};

export type Contenedor = {
  id: number;
  codigo: string;
  tipo: string;
  capacidad: string;
  estado: string;
  puntoRecoleccion: string;
};

export type AsignacionOperativa = {
  id: number;
  ruta: string;
  vehiculo: string;
  horario: string;
  estado: string;
  fecha: string;
};

export type Administrador = {
  id: number;
  nombre: string;
  email: string;
  activo: boolean;
};
