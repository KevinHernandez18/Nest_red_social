import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

/**
 * Colección de Usuarios
 */

@Schema({
    timestamps: {
      createdAt: 'fecha_creacion',
      updatedAt: 'fecha_modificacion',
    },
})
export class User {
    @Prop({
        required: true,
    })
    nombre!: string;

    @Prop({
        required: true,
        unique: true,
    })
    correo!: string;

    @Prop({
        required: true,
    })
    password!: string;

    @Prop({
        type: Types.ObjectId,
        ref: 'Role',
    })
    rol_id!: Types.ObjectId;

    @Prop({
        default: true,
    })
    activo!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({correo: 1});