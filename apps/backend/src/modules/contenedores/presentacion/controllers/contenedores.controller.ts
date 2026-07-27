import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Public } from '../../../../shared/presentacion/decorators/public.decorator';
import { ActualizarContenedorDto } from '../../interfaz/dto/actualizar-contenedor.dto';
import { CambiarEstadoContenedorDto } from '../../interfaz/dto/cambiar-estado-contenedor.dto';
import { CrearContenedorDto } from '../../interfaz/dto/crear-contenedor.dto';
import { TrasladarContenedorDto } from '../../interfaz/dto/trasladar-contenedor.dto';
import { ContenedoresService } from '../../interfaz/services/contenedores.service';

@Controller('v1/contenedores')
export class ContenedoresController {
  constructor(private readonly contenedoresService: ContenedoresService) {}

  @Get('resumen')
  obtenerResumenInventario() {
    return this.contenedoresService.obtenerResumenInventario();
  }

  @Public()
  @Get('punto/:puntoId')
  buscarPorPunto(@Param('puntoId', ParseIntPipe) puntoId: number) {
    return this.contenedoresService.buscarPorPunto(puntoId);
  }

  @Get()
  buscarTodos() {
    return this.contenedoresService.buscarTodos();
  }

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.contenedoresService.buscarPorId(id);
  }

  @Post()
  crear(@Body() dto: CrearContenedorDto) {
    return this.contenedoresService.crear(dto);
  }

  @Patch(':id')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarContenedorDto) {
    return this.contenedoresService.actualizar(id, dto);
  }

  @Patch(':id/estado')
  cambiarEstado(@Param('id', ParseIntPipe) id: number, @Body() dto: CambiarEstadoContenedorDto) {
    return this.contenedoresService.cambiarEstado(id, dto);
  }

  @Patch(':id/trasladar')
  trasladarAPunto(@Param('id', ParseIntPipe) id: number, @Body() dto: TrasladarContenedorDto) {
    return this.contenedoresService.trasladarAPunto(id, dto);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.contenedoresService.eliminar(id);
  }
}
