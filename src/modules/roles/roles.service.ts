import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { ResponseHelper } from '../../common/helpers/response.helper';
import { UpdateRoleDto } from './dto/update-role.dto'

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role.name)
        private roleModel:
        Model<RoleDocument>,
    ) {}

    /**
     * Metodo para crear un rol
     */

    async create(
        dto:CreateRoleDto,
    ){
        const role = 
        await this.roleModel.create(dto);

        return ResponseHelper.success(
            role,
            201,
        );
    }

    /**
     * Método para consultar roles
     */

    async findAll(){
        const roles = await this.roleModel.find({ activo: true });
        return ResponseHelper.success(roles);
    }

    /**
     * Buscar un rol por ID
     */
    async findOne( id: string ) {
        const role = await this.roleModel.findById(id);
        if(!role){
            throw new NotFoundException('Rol no encontrado');
        }
        return ResponseHelper.success(role,);
        /**
         * Actualizar completamente un rol
         */
    }

    async update(id: string, dto:UpdateRoleDto){
        const role = await this.roleModel.findById(id)
        if(!role){
            throw new NotFoundException('Rol no encontrado');
        }
        const updateRole = await this.roleModel.findByIdAndUpdate(id, dto, {new: true})
        return ResponseHelper.success(updateRole);
    }

    async partialUpdate( id: string, dto: UpdateRoleDto){
        const role= await this.roleModel.findById(id);
        if(!role){
            throw new NotFoundException('Rol no encontrado');
        }
        const updatedRole= await this.roleModel.findByIdAndUpdate(id, {$set:dto},{new:true});
        return ResponseHelper.success(updatedRole)
    }

    /**
     *  Eliminación lógica
     */

    async remove(id: string){
        const role= await this.roleModel.findById(id);
        if (!role) {
            throw new NotFoundException('Rol no encontrado');
        }

        const deletedRole= await this.roleModel.findByIdAndUpdate(id, {activo: false,}, {new: true});
        return ResponseHelper.success(deletedRole)
    }

    async findInactive(){
        const roles = await this.roleModel.find({ activo: false });
        return ResponseHelper.success(roles);
    }

    /**
     * Restaurar rol eliminado
     */

    async restore (id: string){
        const role= await this.roleModel.findById(id);
        if (!role) {
            throw new NotFoundException('Rol no encontrado');
        }

        const restoreRole = await this.roleModel.findByIdAndUpdate(id, {activo: true,}, {new: true});
        return ResponseHelper.success(restoreRole)
    } 
}
