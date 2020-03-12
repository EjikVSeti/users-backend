import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IsValidName } from '../validators/is-valid-name';

export class CreateUserDto {
    @ApiProperty({
        required: true,
        description: 'User name',
        example: 'Elon',
        type: 'string',
    })
    @IsValidName({message: 'Name must begin from the uppercase letter and contains only English letters'})
    name: string;

    @ApiProperty({
        required: true,
        description: 'User surname',
        example: 'Musk',
        type: 'string',
    })
    @IsValidName({message: 'Surname must begin from the uppercase letter and contains only English letters'})
    surname: string;

    @ApiProperty({
        required: true,
        description: 'User email',
        example: 'bla@bla.com',
        type: 'email',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
