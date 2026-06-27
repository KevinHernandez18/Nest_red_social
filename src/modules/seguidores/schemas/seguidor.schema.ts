import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SeguidorDocument = Seguidores & Document;

@Schema({
    timestamps: {
      createdAt: 'fecha_creacion',
      updatedAt: 'fecha_modificacion',
    },
})
export class Seguidores {
    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: 'User',
    })
    seguidor_id!: Types.ObjectId;

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: 'User',
    })
    seguido_id!: Types.ObjectId;

    @Prop({
        default: true,
    })
    activo!: boolean;
}

export const SeguidorSchema = SchemaFactory.createForClass(Seguidores);

SeguidorSchema.index({ seguidor_id: 1, seguido_id: 1 }, { unique: true });
