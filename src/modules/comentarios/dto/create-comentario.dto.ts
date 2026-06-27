import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateComentarioDto {
  @ApiPropertyOptional({ example: '64f0c1b2d3e4f5678901234a' })
  @IsOptional()
  @IsMongoId()
  publicacion_id?: string;

  @ApiPropertyOptional({ example: '64f0c1b2d3e4f5678901234b' })
  @IsOptional()
  @IsMongoId()
  usuario_id?: string;

  @ApiPropertyOptional({ example: 'Excelente publicación' })
  @IsOptional()
  @IsString()
  contenido?: string;
}
