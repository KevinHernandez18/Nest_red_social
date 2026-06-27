import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateReaccionDto {
  @ApiProperty({ example: '64f0c1b2d3e4f5678901234a' })
  @IsNotEmpty()
  @IsMongoId()
  publicacion!: string;

  @ApiProperty({ example: '64f0c1b2d3e4f5678901234b' })
  @IsNotEmpty()
  @IsMongoId()
  usuario!: string;

  @ApiProperty({ example: 'LIKE' })
  @IsNotEmpty()
  @IsIn(['LIKE', 'LOVE', 'HAHA', 'WOW', 'SAD', 'ANGRY'])
  tipo_reaccion!: string;
}
