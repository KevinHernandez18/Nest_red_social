import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './modules/roles/roles.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { ComentariosModule } from './modules/comentarios/comentarios.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RolesModule,
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    UsuariosModule,
    ComentariosModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
