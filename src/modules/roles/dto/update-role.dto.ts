import { PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';

/**
 * DTO para actualizar un rol
 * PartialType convierte las propiedades
 * CreateRoleDTO campos opcionales
 */

export class UpdateRoleDto extends PartialType(
    CreateRoleDto,
){}