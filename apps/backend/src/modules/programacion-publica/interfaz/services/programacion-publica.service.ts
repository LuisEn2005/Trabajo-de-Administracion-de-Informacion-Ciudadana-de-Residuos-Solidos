import { Inject, Injectable, NotImplementedException, NotFoundException  } from '@nestjs/common';
import { manejarErrorPrisma } from '../../../../shared/repositorio/prisma/manejar-error-prisma';
import { PrismaService } from '../../../../shared/repositorio/prisma/prisma.service';
import {
  ASIGNACION_OPERATIVA_REPOSITORY,
  AsignacionOperativaRepository,
} from '../../../asignaciones/repositorio/asignacion-operativa.repository';
import { HorarioRuta } from '../../../gestion-rutas/dominio/entities/horario-ruta.entity';
import { Ruta } from '../../../gestion-rutas/dominio/entities/ruta.entity';
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
import {
  EstadoPuntoRecoleccion,
  PuntoRecoleccion,
} from '../../../puntos-recoleccion/dominio/entities/punto-recoleccion.entity';
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
    private readonly prisma: PrismaService,
  ) {}

  async buscarDetalleDeRuta(rutaId: number): Promise<DetalleRutaProgramacionDto> {
    const ruta = await this.obtenerRutaOFallar(rutaId);
    const [horarios, vehiculos, puntos] = await Promise.all([
      this.horarioRutaRepository.buscarPorRutaId(rutaId),
      this.vehiculoRepository.buscarPorRutaId(rutaId),
      this.buscarPuntosPorRuta(rutaId),
    ]);

    return { ruta, horarios, vehiculos, puntos };
  }

  async buscarHorariosPorRuta(rutaId: number): Promise<HorarioRuta[]> {
    await this.obtenerRutaOFallar(rutaId);
    return this.horarioRutaRepository.buscarPorRutaId(rutaId);
  }

  async buscarVehiculosPorRuta(rutaId: number): Promise<Vehiculo[]> {
    await this.obtenerRutaOFallar(rutaId);
    return this.vehiculoRepository.buscarPorRutaId(rutaId);
  }
  /**
   * Puntos de recolección de una ruta, en el orden definido para el recorrido.
   *
   * PuntoRecoleccionRepository no expone ninguna consulta por rutaId (no es
   * parte de sus métodos asignados), así que leemos directamente, vía Prisma,
   * la tabla puente `RutaPuntoRecoleccion` que relaciona rutas y puntos. No
   * duplica el CRUD de `puntos-recoleccion`: solo lee la relación.
   */
  async buscarPuntosPorRuta(rutaId: number): Promise<PuntoRecoleccion[]> {
    await this.obtenerRutaOFallar(rutaId);

    try {
      const relaciones = await this.prisma.rutaPuntoRecoleccion.findMany({
        where: { rutaId },
        orderBy: { orden: 'asc' },
        include: { puntoRecoleccion: true },
      });

      return relaciones.map(
        (relacion) =>
          new PuntoRecoleccion(
            relacion.puntoRecoleccion.id,
            relacion.puntoRecoleccion.nombre,
            relacion.puntoRecoleccion.direccion,
            relacion.puntoRecoleccion.referencia,
            Number(relacion.puntoRecoleccion.latitud),
            Number(relacion.puntoRecoleccion.longitud),
            relacion.puntoRecoleccion.estado as unknown as EstadoPuntoRecoleccion,
            relacion.puntoRecoleccion.createdAt,
            relacion.puntoRecoleccion.updatedAt,
          ),
      );
    } catch (error) {
      manejarErrorPrisma(error, 'buscar los puntos de recolección de la ruta');
    }
  }

/**
   * Programación pública del día: delega en
   * `AsignacionOperativaRepository.buscarProgramacionPublica()`, que es quien
   * decide qué asignaciones cuentan como "públicas" (p. ej. programadas o
   * activas). Aquí solo se agrega la fecha de referencia.
   */
  async buscarProgramacionDelDia(): Promise<ProgramacionDelDiaDto> {
    const asignaciones = await this.asignacionRepository.buscarProgramacionPublica();

    return { fecha: new Date(), asignaciones };
  }

  async buscarProgramacionPorRuta(rutaId: number): Promise<ProgramacionRutaDto> {
    const ruta = await this.obtenerRutaOFallar(rutaId);
    const asignaciones = await this.asignacionRepository.buscarPorRuta(rutaId);

    return { ruta, asignaciones };
  }


  private marcarDependenciasPendientes(): void {
    void this.rutaRepository;
    void this.horarioRutaRepository;
    void this.vehiculoRepository;
    void this.puntoRecoleccionRepository;
    void this.asignacionRepository;
  }

  private async obtenerRutaOFallar(rutaId: number): Promise<Ruta> {
    const ruta = await this.rutaRepository.buscarPorId(rutaId);

    if (!ruta) {
      throw new NotFoundException(`No existe la ruta con id ${rutaId}.`);
    }

    return ruta;
  }
}
