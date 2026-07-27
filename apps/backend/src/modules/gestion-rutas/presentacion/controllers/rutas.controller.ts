import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Public } from '../../../../shared/presentacion/decorators/public.decorator';
import { ActualizarRutaDto } from '../../interfaz/dto/actualizar-ruta.dto';
import { CrearRutaDto } from '../../interfaz/dto/crear-ruta.dto';
import { RutasService } from '../../interfaz/services/rutas.service';

@Controller('v1/rutas')
export class RutasController {
  constructor(private readonly rutasService: RutasService) {}

  @Post()
  crear(@Body() dto: CrearRutaDto) {
    return this.rutasService.crear(dto);
  }

  @Public()
  @Get()
  buscarTodos() {
    return this.rutasService.buscarTodos();
  }

  @Public()
  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.rutasService.buscarPorId(id);
  }

  @Patch(':id')
  actualizar(@Param('id', ParseIntPipe) id: number, @Body() dto: ActualizarRutaDto) {
    return this.rutasService.actualizar(id, dto);
  }

  @Delete(':id')
  eliminar(@Param('id', ParseIntPipe) id: number) {
    return this.rutasService.eliminar(id);
  }
}
