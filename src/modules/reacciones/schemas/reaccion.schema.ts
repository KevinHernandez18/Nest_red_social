import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReaccionDocument = Reaccion & Document;

@Schema({
    timestamps: true,
})
export class Reaccion {
    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: 'Publicacion',
    })
    publicacion_id!: Types.ObjectId;

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: 'User',
    })
    usuario_id!: Types.ObjectId;

    @Prop({
        required: true,
        enum: ['like', 'love', 'haha', 'wow', 'sad', 'angry'],
    })
    tipo!: string;

    @Prop({
        default: true,
    })
    activo!: boolean;
}

export const ReaccionSchema = SchemaFactory.createForClass(Reaccion);

ReaccionSchema.index({ publicacion_id: 1, usuario_id: 1 }, { unique: true });
