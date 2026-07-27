import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, SetMetadata } from '@nestjs/common';
import { PuntosRecoleccionService } from '../../interfaz/services/puntos-recoleccion.service';
import { CrearPuntoRecoleccionDto } from '../../interfaz/dto/crear-punto-recoleccion.dto';
import { ActualizarPuntoRecoleccionDto } from '../../interfaz/dto/actualizar-punto-recoleccion.dto';
import { CambiarEstadoPuntoRecoleccionDto } from '../../interfaz/dto/cambiar-estado-punto-recoleccion.dto';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller('v1/puntos-recoleccion')
export class PuntosRecoleccionController {
  constructor(private readonly service: PuntosRecoleccionService) { }

  @Public()
  @Get()
  buscarTodos() {
    return this.service.buscarTodos();
  }

  @Public()
  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.service.buscarPorId(id);
  }

  @Public()
  @Get(':id/mapa')
  mapearPunto(@Param('id', ParseIntPipe) id: number) {
    return this.service.mapearPunto(id);
  }

  @Post()
  crear(@Body() dto: CrearPuntoRecoleccionDto) {
    return this.service.crear(dto);
  }

  @Put(':id')
  actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ActualizarPuntoRecoleccionDto,
  ) {
    return this.service.actualizar(id, dto);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.service.eliminar(id);
  }

  @Patch(':id/estado')
  cambiarEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CambiarEstadoPuntoRecoleccionDto,
  ) {
    return this.service.cambiarEstado(id, dto.activo);
  }
}
