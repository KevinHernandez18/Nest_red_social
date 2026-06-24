import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseHelper } from '../../common/helpers/response.helper';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';
import { UpdatePublicacionDto } from './dto/update-publicacion.dto';
import { Publicacion, PublicacionDocument } from './schemas/publicacion.schema';

@Injectable()
export class PublicacionesService {
  constructor(
    @InjectModel(Publicacion.name)
    private readonly publicacionModel: Model<PublicacionDocument>,
  ) {}

  async create(dto: CreatePublicacionDto) {
    const publicacion = await this.publicacionModel.create(dto);
    return ResponseHelper.success(publicacion, 201);
  }

  async findAll() {
    const publicaciones = await this.publicacionModel.find({ activo: true }).sort({ createdAt: -1 });
    return ResponseHelper.success(publicaciones);
  }

  async findOne(id: string) {
    const publicacion = await this.publicacionModel.findById(id);
    if (!publicacion || !publicacion.activo) {
      throw new NotFoundException('Publicación no encontrada.');
    }
    return ResponseHelper.success(publicacion);
  }

  async update(id: string, dto: UpdatePublicacionDto) {
    const publicacion = await this.publicacionModel.findById(id);
    if (!publicacion || !publicacion.activo) {
      throw new NotFoundException('Publicación no encontrada.');
    }

    const updated = await this.publicacionModel.findByIdAndUpdate(id, dto, { new: true });
    return ResponseHelper.success(updated);
  }

  async remove(id: string) {
    const publicacion = await this.publicacionModel.findById(id);
    if (!publicacion || !publicacion.activo) {
      throw new NotFoundException('Publicación no encontrada.');
    }

    const deleted = await this.publicacionModel.findByIdAndUpdate(id, { activo: false }, { new: true });
    return ResponseHelper.success(deleted);
  }
}
