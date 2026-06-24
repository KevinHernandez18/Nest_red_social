import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseHelper } from '../../common/helpers/response.helper';
import { CreateReaccionDto } from './dto/create-reaccion.dto';
import { UpdateReaccionDto } from './dto/update-reaccion.dto';
import { Reaccion, ReaccionDocument } from './schemas/reaccion.schema';

@Injectable()
export class ReaccionesService {
  constructor(
    @InjectModel(Reaccion.name)
    private readonly reaccionModel: Model<ReaccionDocument>,
  ) {}

  async create(dto: CreateReaccionDto) {
    const reaccion = await this.reaccionModel.create(dto as any);
    return ResponseHelper.success(reaccion, 201);
  }

  async findAll() {
    const reacciones = await this.reaccionModel
      .find({ activo: true })
      .populate('usuario', '-password')
      .populate('publicacion')
      .lean();

    return ResponseHelper.success(reacciones);
  }

  async findOne(id: string) {
    const reaccion = await this.reaccionModel
      .findById(id)
      .populate('usuario', '-password')
      .populate('publicacion')
      .lean();
    if (!reaccion || !reaccion.activo) {
      throw new NotFoundException('Reacción no encontrada.');
    }
    return ResponseHelper.success(reaccion);
  }

  async update(id: string, dto: UpdateReaccionDto) {
    const reaccion = await this.reaccionModel.findById(id);
    if (!reaccion || !reaccion.activo) {
      throw new NotFoundException('Reacción no encontrada.');
    }

    const updated = await this.reaccionModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('usuario', '-password')
      .populate('publicacion')
      .lean();
    return ResponseHelper.success(updated);
  }

  async remove(id: string) {
    const reaccion = await this.reaccionModel.findById(id);
    if (!reaccion || !reaccion.activo) {
      throw new NotFoundException('Reacción no encontrada.');
    }

    const deleted = await this.reaccionModel
      .findByIdAndUpdate(id, { activo: false }, { new: true })
      .populate('usuario', '-password')
      .populate('publicacion')
      .lean();
    return ResponseHelper.success(deleted);
  }
}
