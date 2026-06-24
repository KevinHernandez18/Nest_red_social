import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComentariosController } from './comentarios.controller';
import { ComentariosService } from './comentarios.service';
import { Comentario, ComentarioSchema } from './schemas/comentario.schema';
import { User, UserSchema } from '../usuarios/schemas/user.schema';
import { Publicacion, PublicacionSchema } from '../publicaciones/schemas/publicacion.schema';

@Module({
  controllers: [ComentariosController],
  providers: [ComentariosService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Comentario.name,
        schema: ComentarioSchema,
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
export class ComentariosModule {}
