import { RolesService } from './roles.service';
import { Controller, Body, Get, Post, Param, Put, Patch, Delete } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto'

@Controller('roles')
export class RolesController {
    constructor( private service: RolesService, ) {}
    /**
     * Crear rol
     */
    @Post()
    create(
        @Body() dto: CreateRoleDto,
    ){
        return this.service.create(dto);
    }

    @Get()
    findAll(){
        return this.service.findAll();
    }

    /**
     * Consulta roles eliminados lógicamente / inactivos
     */

    @Get('inactivos')
    findInactive(){
        return this.service.findInactive();
    }

    /**
     * Buscar Rol por Id
     */

    @Get(':id')
    findOne(
        @Param('id')
        id: string,
    ){
        return this.service.findOne(id);
    }

    /**
     * Actualizar rol
     */

    @Put(':id')
    update(
        @Param('id')
        id: string,

        @Body()
        dto: UpdateRoleDto
    ){
        return this.service.update(id, dto);
    }

    /**
     * Actualización Parcial del rol
     */
    @Patch(':id')
    partialUpdate(
        @Param('id')
        id: string,

        @Body()
        dto: UpdateRoleDto,
    ){
        return this.service.partialUpdate(id, dto);
    }

    /**
     * Restaurar rol eliminado
     */

    @Patch(':id/restore')
    restore(
        @Param('id')
        id: string,
    ){
        return this.service.restore(id);
    }

    /**
     * Eliminar rol de manera lógica
     */

    @Delete(':id')
    remove(
        @Param('id')
        id: string,
    ){
        return this.service.remove(id);
    }
}