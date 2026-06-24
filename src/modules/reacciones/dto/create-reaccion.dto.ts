import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateReaccionDto {
  @ApiProperty({ example: '64f0c1b2d3e4f5678901234a' })
  @IsNotEmpty()
  @IsMongoId()
  publicacion_id!: string;

  @ApiProperty({ example: '64f0c1b2d3e4f5678901234b' })
  @IsNotEmpty()
  @IsMongoId()
  usuario_id!: string;

  @ApiProperty({ example: 'like' })
  @IsNotEmpty()
  @IsIn(['like', 'love', 'haha', 'wow', 'sad', 'angry'])
  tipo!: string;
}
