import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseHelper } from '../../common/helpers/response.helper';
import { CreateComentarioDto } from './dto/create-comentario.dto';
import { UpdateComentarioDto } from './dto/update-comentario.dto';
import { Comentario, ComentarioDocument } from './schemas/comentario.schema';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectModel(Comentario.name)
    private readonly comentarioModel: Model<ComentarioDocument>,
  ) {}

  async create(dto: CreateComentarioDto) {
    const comentario = await this.comentarioModel.create(dto);
    return ResponseHelper.success(comentario, 201);
  }

  async findAll() {
    const comentarios = await this.comentarioModel
      .find({ activo: true })
      .populate('usuario_id')
      .populate('publicacion_id')
      .sort({ createdAt: -1 });
    return ResponseHelper.success(comentarios);
  }

  async findOne(id: string) {
    const comentario = await this.comentarioModel
      .findById(id)
      .populate('usuario_id')
      .populate('publicacion_id');
    if (!comentario || !comentario.activo) {
      throw new NotFoundException('Comentario no encontrado.');
    }
    return ResponseHelper.success(comentario);
  }

  async update(id: string, dto: UpdateComentarioDto) {
    const comentario = await this.comentarioModel.findById(id);
    if (!comentario || !comentario.activo) {
      throw new NotFoundException('Comentario no encontrado.');
    }

    const updated = await this.comentarioModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('usuario_id')
      .populate('publicacion_id');
    return ResponseHelper.success(updated);
  }

  async remove(id: string) {
    const comentario = await this.comentarioModel.findById(id);
    if (!comentario || !comentario.activo) {
      throw new NotFoundException('Comentario no encontrado.');
    }

    const deleted = await this.comentarioModel
      .findByIdAndUpdate(id, { activo: false }, { new: true })
      .populate('usuario_id')
      .populate('publicacion_id');
    return ResponseHelper.success(deleted);
  }
}
