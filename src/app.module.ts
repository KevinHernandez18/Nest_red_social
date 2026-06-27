import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './modules/roles/roles.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { ComentariosModule } from './modules/comentarios/comentarios.module';
import { PublicacionesModule } from './modules/publicaciones/publicaciones.module';
import { ReaccionesModule } from './modules/reacciones/reacciones.module';
import { SeguidoresModule } from './modules/seguidores/seguidores.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RolesModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    UsuariosModule,
    ComentariosModule,
    PublicacionesModule,
    ReaccionesModule,
    SeguidoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
