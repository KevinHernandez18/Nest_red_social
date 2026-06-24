import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { ResponseHelper } from 'src/common/helpers/response.helper';
import { SearchUserDto } from './dto/search-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsuariosService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel:
        Model<UserDocument>
    ){}
    async create(dto: CreateUserDto){
        /**
         * Verificación de correo
         */
        const exists = await this.userModel.findOne({correo: dto.correo});
            if (exists)
                throw new Error('El correo ya está registrado.');

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.userModel.create({...dto, password: hashedPassword});
        return ResponseHelper.success(user, 201);
    }
    /**
     * Consulta usuario
     */
    async findAll(search?: SearchUserDto){
        /**
         * Crear filtro
         */
        const filter: any = {activo:true};
        /**
         * Crear filtro por nombre
         */
        if (search?.nombre) {
            filter.nombre = { $regex: search.nombre, $options: 'i' };
        }

        const page = Number(search?.page) || 1;

        const limit = Number(search?.limit) || 10;
        /**
         * Consulta
         */

        const data = await this.userModel.find(filter).populate('rol_id').skip((page - 1) * limit).limit(limit);
        // Contador de documentos
        const total = await this.userModel.countDocuments(filter);

        return ResponseHelper.success({total, page, limit, data}, 201);
    }
    
    /**
     * Consulta por id de usuario
     */

    async findOne(id: string){
        const user = await this.userModel.findById(id).populate('rol_id');  
        if (!user || !user.activo) {
            throw new NotFoundException('Usuario no encontrado.');
        }
        return ResponseHelper.success(user);
    }

    async update(id: string, dto: UpdateUserDto){
        const user = await this.userModel.findById(id)
        if (!user || !user.activo) {
            throw new NotFoundException('Usuario no encontrado.');
        }
        if (dto.password) {
            dto.password = await bcrypt.hash(dto.password, 10);
        }
        const updateuser = await this.userModel.findByIdAndUpdate(id, dto, {new:true});
        return ResponseHelper.success(updateuser, 200);
    }

    async partialUpdate(id: string, dto: UpdateUserDto){
        const user = await this.userModel.findById(id)
        if (!user || !user.activo) {
            throw new NotFoundException('Usuario no encontrado.');
        }
        if (dto.password) {
            dto.password = await bcrypt.hash(dto.password, 10);
        }
        const updateuser = await this.userModel.findByIdAndUpdate(id, { $set: dto }, {new:true});
        return ResponseHelper.success(updateuser, 200);
    }

    async restore(id: string){
        const user = await this.userModel.findById(id)
        if (!user) {
            throw new NotFoundException('Usuario no encontrado.');
        }

        const restoredUser = await this.userModel.findByIdAndUpdate(id, {activo:true}, {new:true});
        return ResponseHelper.success(restoredUser);
    }

    async remove(id: string){
        const user = await this.userModel.findById(id)
        if (!user || !user.activo) {
            throw new NotFoundException('Usuario no encontrado.');
        }   

        const deletedUser = await this.userModel.findByIdAndUpdate(id, {activo:false}, {new:true});
        return ResponseHelper.success(deletedUser);
    }
}
