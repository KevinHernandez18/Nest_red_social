import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

import {
    ApiProperty,
} from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({
        example: 'Administrador'
    })
    
    @IsNotEmpty()
    @IsString()
    nombre: string;
}