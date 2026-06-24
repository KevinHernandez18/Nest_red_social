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
    const publicaciones = await this.publicacionModel
      .find({ activo: true })
      .populate('usuarios', '-password')
      .sort({ createdAt: -1 })
      .lean();

    const data = publicaciones.map((publicacion: any) => ({
      ...publicacion,
      usuario_id: publicacion.usuarios,
    }));

    return ResponseHelper.success(data);
  }

  async findOne(id: string) {
    const publicacion = await this.publicacionModel
      .findById(id)
      .populate('usuarios', '-password')
      .lean();
    if (!publicacion || !publicacion.activo) {
      throw new NotFoundException('Publicación no encontrada.');
    }
    return ResponseHelper.success({
      ...publicacion,
      usuario_id: publicacion.usuarios,
    });
  }

  async update(id: string, dto: UpdatePublicacionDto) {
    const publicacion = await this.publicacionModel.findById(id);
    if (!publicacion || !publicacion.activo) {
      throw new NotFoundException('Publicación no encontrada.');
    }

    const updated = await this.publicacionModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('usuarios', '-password')
      .lean();
    return ResponseHelper.success(updated);
  }

  async remove(id: string) {
    const publicacion = await this.publicacionModel.findById(id);
    if (!publicacion || !publicacion.activo) {
      throw new NotFoundException('Publicación no encontrada.');
    }

    const deleted = await this.publicacionModel
      .findByIdAndUpdate(id, { activo: false }, { new: true })
      .populate('usuarios', '-password')
      .lean();
    return ResponseHelper.success(deleted);
  }
}
