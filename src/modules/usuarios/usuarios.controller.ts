import { ApiTags } from "@nestjs/swagger";
import { Controller, Post, Body, Param, Put, Delete, Get, Patch, Query } from "@nestjs/common";
import { UsuariosService } from "./usuarios.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { SearchUserDto } from "./dto/search-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiTags('Usuarios')
@Controller('usuarios')

export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService,){}
    @Post()
    create(
        @Body()
        dto:CreateUserDto
    ){
        return this.usuariosService.create(dto);
    }

    @Get()
    findAll(
        @Query()
        search: SearchUserDto
    ){
        return this.usuariosService.findAll(search);
    }

    @Get('inactivos')
    findInactive(){
        return this.usuariosService.findInactive();
    }

    @Get(':id')
    findOne(
        @Param('id')
        id:string
    ){
        return this.usuariosService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id')
        id:string,
        @Body()
        dto:UpdateUserDto
    ){
        return this.usuariosService.update(id,dto);
    }

    @Patch(':id')
    partialUpdate(
        @Param('id')
        id:string,
        @Body()
        dto:UpdateUserDto
    ){
        return this.usuariosService.partialUpdate(id,dto);
    }

    @Patch(':id/restore')
    restore(
        @Param('id')
        id:string,
    ){
        return this.usuariosService.restore(id);
    }

    @Delete(':id')
    remove(
        @Param('id')
        id:string,
    ){
        return this.usuariosService.remove(id);
    }
}