import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PublicacionDocument = Publicacion & Document;

@Schema({
  timestamps: {
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_modificacion',
  },
  collection: 'publicaciones',
})
export class Publicacion {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User',
    alias: 'usuario_id',
  })
  usuarios!: Types.ObjectId;

  @Prop({
    required: true,
  })
  contenido!: string;

  @Prop({
    default: true,
  })
  activo!: boolean;
}

export const PublicacionSchema = SchemaFactory.createForClass(Publicacion);

PublicacionSchema.index({ usuarios: 1, fecha_creacion: -1 });
