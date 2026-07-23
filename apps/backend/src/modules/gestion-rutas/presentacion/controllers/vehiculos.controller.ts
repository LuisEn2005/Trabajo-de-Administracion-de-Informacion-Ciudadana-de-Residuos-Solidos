import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ActualizarVehiculoDto } from '../../interfaz/dto/actualizar-vehiculo.dto';
import { CrearVehiculoDto } from '../../interfaz/dto/crear-vehiculo.dto';
import { VehiculosService } from '../../interfaz/services/vehiculos.service';

@Controller('v1')
export class VehiculosController {
  constructor(private readonly vehiculosService: VehiculosService) {}

  @Post('vehiculos')
  crear(@Body() dto: CrearVehiculoDto) {
    return this.vehiculosService.crear(dto);
  }

  @Get('vehiculos')
  buscarTodos() {
    return this.vehiculosService.buscarTodos();
  }

  @Get('vehiculos/:id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.vehiculosService.buscarPorId(id);
  }

  @Get('rutas/:rutaId/vehiculos')
  buscarPorRutaId(@Param('rutaId', ParseIntPipe) rutaId: number) {
    return this.vehiculosService.buscarPorRutaId(rutaId);
  }

  @Patch('vehiculos/:id')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarVehiculoDto) {
    return this.vehiculosService.actualizar(id, dto);
  }

  @Delete('vehiculos/:id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.vehiculosService.eliminar(id);
  }
}
