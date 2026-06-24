import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReaccionesController } from './reacciones.controller';
import { ReaccionesService } from './reacciones.service';
import { Reaccion, ReaccionSchema } from './schemas/reaccion.schema';
import { User, UserSchema } from '../usuarios/schemas/user.schema';
import { Publicacion, PublicacionSchema } from '../publicaciones/schemas/publicacion.schema';

@Module({
  controllers: [ReaccionesController],
  providers: [ReaccionesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Reaccion.name,
        schema: ReaccionSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Publicacion.name,
        schema: PublicacionSchema,
      },
    ]),
  ],
})
export class ReaccionesModule {}
