import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateSeguidorDto {
  @ApiProperty({ example: '64f0c1b2d3e4f5678901234b' })
  @IsNotEmpty()
  @IsMongoId()
  seguidor_id: string;

  @ApiProperty({ example: '64f0c1b2d3e4f5678901234c' })
  @IsNotEmpty()
  @IsMongoId()
  seguido_id: string;
}
