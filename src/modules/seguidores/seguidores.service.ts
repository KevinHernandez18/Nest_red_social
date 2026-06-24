import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseHelper } from '../../common/helpers/response.helper';
import { CreateSeguidorDto } from './dto/create-seguidor.dto';
import { UpdateSeguidorDto } from './dto/update-seguidor.dto';
import { Seguidor, SeguidorDocument } from './schemas/seguidor.schema';

@Injectable()
export class SeguidoresService {
  constructor(
    @InjectModel(Seguidor.name)
    private readonly seguidorModel: Model<SeguidorDocument>,
  ) {}

  async create(dto: CreateSeguidorDto) {
    const seguidor = await this.seguidorModel.create(dto);
    return ResponseHelper.success(seguidor, 201);
  }

  async findAll() {
    const seguidores = await this.seguidorModel.find({ activo: true });
    return ResponseHelper.success(seguidores);
  }

  async findOne(id: string) {
    const seguidor = await this.seguidorModel.findById(id);
    if (!seguidor || !seguidor.activo) {
      throw new NotFoundException('Relación de seguimiento no encontrada.');
    }
    return ResponseHelper.success(seguidor);
  }

  async update(id: string, dto: UpdateSeguidorDto) {
    const seguidor = await this.seguidorModel.findById(id);
    if (!seguidor || !seguidor.activo) {
      throw new NotFoundException('Relación de seguimiento no encontrada.');
    }

    const updated = await this.seguidorModel.findByIdAndUpdate(id, dto, { new: true });
    return ResponseHelper.success(updated);
  }

  async remove(id: string) {
    const seguidor = await this.seguidorModel.findById(id);
    if (!seguidor || !seguidor.activo) {
      throw new NotFoundException('Relación de seguimiento no encontrada.');
    }

    const deleted = await this.seguidorModel.findByIdAndUpdate(id, { activo: false }, { new: true });
    return ResponseHelper.success(deleted);
  }
}
