import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseHelper } from '../../common/helpers/response.helper';
import { CreateSeguidorDto } from './dto/create-seguidor.dto';
import { UpdateSeguidorDto } from './dto/update-seguidor.dto';
import { Seguidores, SeguidorDocument } from './schemas/seguidor.schema';

@Injectable()
export class SeguidoresService {
  constructor(
    @InjectModel(Seguidores.name)
    private readonly seguidorModel: Model<SeguidorDocument>,
  ) {}

  private async populateSeguidor(doc: any) {
    return this.seguidorModel
      .findById(doc._id)
      .populate('seguidor_id', '-password')
      .populate('seguido_id', '-password')
      .exec();
  }

  async create(dto: CreateSeguidorDto) {
    if (dto.seguidor_id === dto.seguido_id) {
      throw new BadRequestException('Un usuario no puede seguirse a sí mismo.');
    }

    const seguidor = await this.seguidorModel.create(dto);
    const populated = await this.populateSeguidor(seguidor);
    return ResponseHelper.success(populated, 201);
  }

  async findAll() {
    const seguidores = await this.seguidorModel
      .find({ activo: true })
      .populate('seguidor_id', '-password')
      .populate('seguido_id', '-password')
      .exec();
    return ResponseHelper.success(seguidores);
  }

  async findOne(id: string) {
    const seguidor = await this.seguidorModel
      .findById(id)
      .populate('seguidor_id', '-password')
      .populate('seguido_id', '-password')
      .exec();

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
    const populated = await this.populateSeguidor(updated);
    return ResponseHelper.success(populated);
  }

  async partialUpdate(id: string, dto: UpdateSeguidorDto) {
    const seguidor = await this.seguidorModel.findById(id);
    if (!seguidor || !seguidor.activo) {
      throw new NotFoundException('Relación de seguimiento no encontrada.');
    }

    const updated = await this.seguidorModel.findByIdAndUpdate(id, { $set: dto }, { new: true });
    const populated = await this.populateSeguidor(updated);
    return ResponseHelper.success(populated);
  }

  async restore(id: string) {
    const seguidor = await this.seguidorModel.findById(id);
    if (!seguidor) {
      throw new NotFoundException('Relación de seguimiento no encontrada.');
    }

    const restored = await this.seguidorModel.findByIdAndUpdate(id, { activo: true }, { new: true });
    const populated = await this.populateSeguidor(restored);
    return ResponseHelper.success(populated);
  }

  async remove(id: string) {
    const seguidor = await this.seguidorModel.findById(id);
    if (!seguidor || !seguidor.activo) {
      throw new NotFoundException('Relación de seguimiento no encontrada.');
    }

    const deleted = await this.seguidorModel.findByIdAndUpdate(id, { activo: false }, { new: true });
    const populated = await this.populateSeguidor(deleted);
    return ResponseHelper.success(populated);
  }
}
