import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Public } from '../../../../shared/presentacion/decorators/public.decorator';
import { ActualizarPuntoRecoleccionDto } from '../../interfaz/dto/actualizar-punto-recoleccion.dto';
import { CambiarEstadoPuntoRecoleccionDto } from '../../interfaz/dto/cambiar-estado-punto-recoleccion.dto';
import { CrearPuntoRecoleccionDto } from '../../interfaz/dto/crear-punto-recoleccion.dto';
import { PuntosRecoleccionService } from '../../interfaz/services/puntos-recoleccion.service';

@Controller('v1/puntos-recoleccion')
export class PuntosRecoleccionController {
  constructor(private readonly puntosRecoleccionService: PuntosRecoleccionService) {}

  @Public()
  @Get()
  buscarTodos() {
    return this.puntosRecoleccionService.buscarTodos();
  }

  @Public()
  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.puntosRecoleccionService.buscarPorId(id);
  }

  @Post()
  crear(@Body() dto: CrearPuntoRecoleccionDto) {
    return this.puntosRecoleccionService.crear(dto);
  }

  @Patch(':id')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarPuntoRecoleccionDto) {
    return this.puntosRecoleccionService.actualizar(id, dto);
  }

  @Patch(':id/estado')
  cambiarEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CambiarEstadoPuntoRecoleccionDto,
  ) {
    return this.puntosRecoleccionService.cambiarEstado(id, dto);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.puntosRecoleccionService.eliminar(id);
  }

  @Public()
  @Get(':id/contenedores')
  buscarContenedores(@Param('id', ParseIntPipe) id: number) {
    return this.puntosRecoleccionService.buscarContenedores(id);
  }
}
