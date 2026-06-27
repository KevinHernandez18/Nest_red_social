import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ComentarioDocument = Comentario & Document;

@Schema({
    timestamps: {
      createdAt: 'fecha_creacion',
      updatedAt: 'fecha_modificacion',
    },
})
export class Comentario {
    @Prop({
        type: Types.ObjectId,
        ref: 'Publicacion',
        default: null,
    })
    publicacion_id?: Types.ObjectId | null;

    @Prop({
        type: Types.ObjectId,
        ref: 'User',
        default: null,
    })
    usuario_id?: Types.ObjectId | null;

    @Prop({
        required: true,
        type: String,
    })
    contenido!: string;

    @Prop({
        default: true,
    })
    activo!: boolean;
}

export const ComentarioSchema = SchemaFactory.createForClass(Comentario);

ComentarioSchema.index({ publicacion_id: 1, fecha_creacion: -1 });
