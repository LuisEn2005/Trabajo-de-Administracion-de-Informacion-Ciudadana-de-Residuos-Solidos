import { Inject, Injectable, NotImplementedException } from '@nestjs/common';
import {
  ASIGNACION_OPERATIVA_REPOSITORY,
  AsignacionOperativaRepository,
} from '../../../asignaciones/repositorio/asignacion-operativa.repository';
import { HorarioRuta } from '../../../gestion-rutas/dominio/entities/horario-ruta.entity';
import { Vehiculo } from '../../../gestion-rutas/dominio/entities/vehiculo.entity';
import {
  HORARIO_RUTA_REPOSITORY,
  HorarioRutaRepository,
} from '../../../gestion-rutas/repositorio/horario-ruta.repository';
import {
  RUTA_REPOSITORY,
  RutaRepository,
} from '../../../gestion-rutas/repositorio/ruta.repository';
import {
  VEHICULO_REPOSITORY,
  VehiculoRepository,
} from '../../../gestion-rutas/repositorio/vehiculo.repository';
import { PuntoRecoleccion } from '../../../puntos-recoleccion/dominio/entities/punto-recoleccion.entity';
import {
  PUNTO_RECOLECCION_REPOSITORY,
  PuntoRecoleccionRepository,
} from '../../../puntos-recoleccion/repositorio/punto-recoleccion.repository';
import {
  DetalleRutaProgramacionDto,
  ProgramacionDelDiaDto,
  ProgramacionRutaDto,
} from '../dto/programacion-publica.dto';

@Injectable()
export class ProgramacionPublicaService {
  constructor(
    @Inject(RUTA_REPOSITORY)
    private readonly rutaRepository: RutaRepository,
    @Inject(HORARIO_RUTA_REPOSITORY)
    private readonly horarioRutaRepository: HorarioRutaRepository,
    @Inject(VEHICULO_REPOSITORY)
    private readonly vehiculoRepository: VehiculoRepository,
    @Inject(PUNTO_RECOLECCION_REPOSITORY)
    private readonly puntoRecoleccionRepository: PuntoRecoleccionRepository,
    @Inject(ASIGNACION_OPERATIVA_REPOSITORY)
    private readonly asignacionRepository: AsignacionOperativaRepository,
  ) {}

  async buscarDetalleDeRuta(rutaId: number): Promise<DetalleRutaProgramacionDto> {
    void rutaId;
    this.marcarDependenciasPendientes();
    // TODO(S2-INTEGRANTE-5): implementar la consulta pública integrada del detalle de ruta.
    throw new NotImplementedException('La consulta pública de detalle de ruta está pendiente');
  }

  async buscarHorariosPorRuta(rutaId: number): Promise<HorarioRuta[]> {
    void rutaId;
    this.marcarDependenciasPendientes();
    // TODO(S2-INTEGRANTE-5): implementar la consulta pública de horarios por ruta.
    throw new NotImplementedException('La consulta pública de horarios por ruta está pendiente');
  }

  async buscarVehiculosPorRuta(rutaId: number): Promise<Vehiculo[]> {
    void rutaId;
    this.marcarDependenciasPendientes();
    // TODO(S2-INTEGRANTE-5): implementar la consulta pública de vehículos por ruta.
    throw new NotImplementedException('La consulta pública de vehículos por ruta está pendiente');
  }

  async buscarPuntosPorRuta(rutaId: number): Promise<PuntoRecoleccion[]> {
    void rutaId;
    this.marcarDependenciasPendientes();
    // TODO(S2-INTEGRANTE-5): implementar la consulta pública de puntos por ruta.
    throw new NotImplementedException('La consulta pública de puntos por ruta está pendiente');
  }

  async buscarProgramacionDelDia(): Promise<ProgramacionDelDiaDto> {
    this.marcarDependenciasPendientes();
    // TODO(S2-INTEGRANTE-5): implementar la consulta pública de programación del día.
    throw new NotImplementedException('La consulta pública de programación del día está pendiente');
  }

  async buscarProgramacionPorRuta(rutaId: number): Promise<ProgramacionRutaDto> {
    void rutaId;
    this.marcarDependenciasPendientes();
    // TODO(S2-INTEGRANTE-5): implementar la consulta pública de programación por ruta.
    throw new NotImplementedException(
      'La consulta pública de programación por ruta está pendiente',
    );
  }

  private marcarDependenciasPendientes(): void {
    void this.rutaRepository;
    void this.horarioRutaRepository;
    void this.vehiculoRepository;
    void this.puntoRecoleccionRepository;
    void this.asignacionRepository;
  }
}
