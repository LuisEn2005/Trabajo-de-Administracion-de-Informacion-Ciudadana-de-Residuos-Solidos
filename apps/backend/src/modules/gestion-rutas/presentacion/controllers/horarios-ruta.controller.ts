import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Public } from '../../../../shared/presentacion/decorators/public.decorator';
import { ActualizarHorarioRutaDto } from '../../interfaz/dto/actualizar-horario-ruta.dto';
import { CrearHorarioRutaDto } from '../../interfaz/dto/crear-horario-ruta.dto';
import { HorariosRutaService } from '../../interfaz/services/horarios-ruta.service';

@Controller('v1')
export class HorariosRutaController {
  constructor(private readonly horariosRutaService: HorariosRutaService) {}

  @Post('rutas/:rutaId/horarios')
  crear(@Param('rutaId', ParseIntPipe) rutaId: number, @Body() dto: CrearHorarioRutaDto) {
    return this.horariosRutaService.crear(rutaId, dto);
  }

  @Public()
  @Get('rutas/:rutaId/horarios')
  buscarPorRutaId(@Param('rutaId', ParseIntPipe) rutaId: number) {
    return this.horariosRutaService.buscarPorRutaId(rutaId);
  }

  @Public()
  @Get('horarios-ruta')
  buscarTodos() {
    return this.horariosRutaService.buscarTodos();
  }

  @Public()
  @Get('horarios-ruta/:id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.horariosRutaService.buscarPorId(id);
  }

  @Patch('horarios-ruta/:id')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarHorarioRutaDto) {
    return this.horariosRutaService.actualizar(id, dto);
  }

  @Delete('horarios-ruta/:id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.horariosRutaService.eliminar(id);
  }
}
