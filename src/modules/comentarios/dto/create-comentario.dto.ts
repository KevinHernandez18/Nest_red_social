import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateComentarioDto {
  @ApiProperty({ example: '64f0c1b2d3e4f5678901234a' })
  @IsNotEmpty()
  @IsMongoId()
  publicacion_id!: string;

  @ApiProperty({ example: '64f0c1b2d3e4f5678901234b' })
  @IsNotEmpty()
  @IsMongoId()
  usuario_id!: string;

  @ApiProperty({ example: 'Excelente publicación' })
  @IsNotEmpty()
  @IsString()
  contenido!: string;
}
