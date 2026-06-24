import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreatePublicacionDto {
  @ApiProperty({ example: '64f0c1b2d3e4f5678901234a' })
  @IsNotEmpty()
  @IsMongoId()
  usuario_id!: string;

  @ApiProperty({ example: 'Hola a todos' })
  @IsNotEmpty()
  @IsString()
  contenido!: string;
}
