import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSeguidorDto } from './dto/create-seguidor.dto';
import { UpdateSeguidorDto } from './dto/update-seguidor.dto';
import { SeguidoresService } from './seguidores.service';

@ApiTags('Seguidores')
@Controller('seguidores')
export class SeguidoresController {
  constructor(private readonly service: SeguidoresService) {}

  @Post()
  create(@Body() dto: CreateSeguidorDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateSeguidorDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
