import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateReaccionDto } from './dto/create-reaccion.dto';
import { UpdateReaccionDto } from './dto/update-reaccion.dto';
import { ReaccionesService } from './reacciones.service';

@ApiTags('Reacciones')
@Controller('reacciones')
export class ReaccionesController {
  constructor(private readonly service: ReaccionesService) {}

  @Post()
  create(@Body() dto: CreateReaccionDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateReaccionDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
