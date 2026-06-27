import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReaccionDocument = Reaccion & Document;

@Schema({
    timestamps: {
      createdAt: 'fecha_creacion',
      updatedAt: 'fecha_modificacion',
    },
    collection: 'reacciones',
})
export class Reaccion {
    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: 'Publicacion',
    })
    publicacion!: Types.ObjectId;

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: 'User',
    })
    usuario!: Types.ObjectId;

    @Prop({
        required: true,
    })
    tipo_reaccion!: string;

    @Prop({
        default: true,
    })
    activo!: boolean;
}

export const ReaccionSchema = SchemaFactory.createForClass(Reaccion);

ReaccionSchema.index({ publicacion: 1, usuario: 1 }, { unique: true });
