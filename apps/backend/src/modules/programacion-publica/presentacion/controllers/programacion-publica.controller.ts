import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Public } from '../../../../shared/presentacion/decorators/public.decorator';
import { ProgramacionPublicaService } from '../../interfaz/services/programacion-publica.service';

@Public()
@Controller('v1/programacion')
export class ProgramacionPublicaController {
  constructor(private readonly programacionPublicaService: ProgramacionPublicaService) {}

  @Get('hoy')
  buscarProgramacionDelDia() {
    return this.programacionPublicaService.buscarProgramacionDelDia();
  }

  @Get('rutas/:rutaId')
  buscarProgramacionPorRuta(@Param('rutaId', ParseIntPipe) rutaId: number) {
    return this.programacionPublicaService.buscarProgramacionPorRuta(rutaId);
  }

  @Get('rutas/:rutaId/detalle')
  buscarDetalleDeRuta(@Param('rutaId', ParseIntPipe) rutaId: number) {
    return this.programacionPublicaService.buscarDetalleDeRuta(rutaId);
  }

  @Get('rutas/:rutaId/horarios')
  buscarHorariosPorRuta(@Param('rutaId', ParseIntPipe) rutaId: number) {
    return this.programacionPublicaService.buscarHorariosPorRuta(rutaId);
  }

  @Get('rutas/:rutaId/vehiculos')
  buscarVehiculosPorRuta(@Param('rutaId', ParseIntPipe) rutaId: number) {
    return this.programacionPublicaService.buscarVehiculosPorRuta(rutaId);
  }

  @Get('rutas/:rutaId/puntos')
  buscarPuntosPorRuta(@Param('rutaId', ParseIntPipe) rutaId: number) {
    return this.programacionPublicaService.buscarPuntosPorRuta(rutaId);
  }
}
