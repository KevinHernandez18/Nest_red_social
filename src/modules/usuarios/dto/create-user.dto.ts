import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: 'Nombre del usuario',
        minLength: 3,
        maxLength: 50,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3,{message: 'El nombre debe tener mínimo 3 caracteres.'})
    @MaxLength(50,{message: 'El nombre excede el número de caracteres. No puede superar los 50 caracteres.'})
    nombre!: string;

    @ApiProperty({
        description: 'Correo del usuario',
        maxLength: 100,
    })
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100,{message: 'El correo no puede superar 100 caracteres.'})
    correo!: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        minLength: 8,
        maxLength: 20,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8,{message: 'La contraseña debe tener mínimo 8 caracteres.'})
    @MaxLength(20,{message: 'La contraseña no puede exceder los 20 caracteres.'})
    password!: string;

    @ApiProperty()
    @IsNotEmpty()
    rol_id!: string;
}