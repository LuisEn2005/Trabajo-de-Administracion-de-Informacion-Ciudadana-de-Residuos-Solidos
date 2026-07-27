import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PuntosRecoleccionService } from '../../interfaz/services/puntos-recoleccion.service';
import { CrearPuntoRecoleccionDto } from '../../interfaz/dto/crear-punto-recoleccion.dto';
import { ActualizarPuntoRecoleccionDto, CambiarEstadoPuntoRecoleccionDto } from '../../interfaz/dto/actualizar-punto-recoleccion.dto';

@Controller('puntos-recoleccion')
export class PuntosRecoleccionController {
  constructor(private readonly puntosService: PuntosRecoleccionService) { }

  @Get()
  buscarTodos() {
    return this.puntosService.buscarTodos();
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.puntosService.buscarPorId(id);
  }

  @Post()
  crear(@Body() dto: CrearPuntoRecoleccionDto) {
    return this.puntosService.crear(dto);
  }

  @Patch(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarPuntoRecoleccionDto,
  ) {
    return this.puntosService.actualizar(id, dto);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.puntosService.eliminar(id);
  }

  @Patch(':id/estado')
  cambiarEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CambiarEstadoPuntoRecoleccionDto,
  ) {
    return this.puntosService.cambiarEstado(id, dto.estado);
  }
}