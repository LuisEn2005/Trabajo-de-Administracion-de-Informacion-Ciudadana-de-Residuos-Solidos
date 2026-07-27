import { AsignacionOperativa } from '../../../asignaciones/dominio/entities/asignacion-operativa.entity';
import { Contenedor } from '../../../contenedores/dominio/entities/contenedor.entity';
import { HorarioRuta } from '../../../gestion-rutas/dominio/entities/horario-ruta.entity';
import { Ruta } from '../../../gestion-rutas/dominio/entities/ruta.entity';
import { Vehiculo } from '../../../gestion-rutas/dominio/entities/vehiculo.entity';
import { PuntoRecoleccion } from '../../../puntos-recoleccion/dominio/entities/punto-recoleccion.entity';

export interface DetalleRutaProgramacionDto {
  ruta: Ruta;
  horarios: HorarioRuta[];
  vehiculos: Vehiculo[];
  puntos: PuntoRecoleccion[];
}

export interface ProgramacionRutaDto {
  ruta: Ruta;
  asignaciones: AsignacionOperativa[];
}

export interface ProgramacionDelDiaDto {
  fecha: Date;
  asignaciones: AsignacionOperativa[];
}

export interface PuntoConContenedoresDto {
  punto: PuntoRecoleccion;
  contenedores: Contenedor[];
}
