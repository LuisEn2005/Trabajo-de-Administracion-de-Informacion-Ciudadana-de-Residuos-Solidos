import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ActualizarAsignacionDto } from '../../interfaz/dto/actualizar-asignacion.dto';
import { CrearAsignacionDto } from '../../interfaz/dto/crear-asignacion.dto';
import { AsignacionesService } from '../../interfaz/services/asignaciones.service';

@Controller('v1/asignaciones')
export class AsignacionesController {
  constructor(private readonly asignacionesService: AsignacionesService) {}

  @Get('ruta/:rutaId')
  buscarPorRuta(@Param('rutaId', ParseIntPipe) rutaId: number) {
    return this.asignacionesService.buscarPorRuta(rutaId);
  }

  @Get('vehiculo/:vehiculoId')
  buscarPorVehiculo(@Param('vehiculoId', ParseIntPipe) vehiculoId: number) {
    return this.asignacionesService.buscarPorVehiculo(vehiculoId);
  }

  @Get()
  buscarTodos() {
    return this.asignacionesService.buscarTodos();
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.asignacionesService.buscarPorId(id);
  }

  @Post()
  crear(@Body() dto: CrearAsignacionDto) {
    return this.asignacionesService.crear(dto);
  }

  @Patch(':id')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarAsignacionDto) {
    return this.asignacionesService.actualizar(id, dto);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.asignacionesService.eliminar(id);
  }
}
