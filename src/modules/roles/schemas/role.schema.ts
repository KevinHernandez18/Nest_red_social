import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoleDocument = Role & Document;

@Schema({
    timestamps: {
      createdAt: 'fecha_creacion',
      updatedAt: 'fecha_modificacion',
    },
})
export class Role {
    @Prop({
        required: true,
        unique: true,
    })
    nombre! : string;

    @Prop({
        default: true,
    })
    activo!: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);