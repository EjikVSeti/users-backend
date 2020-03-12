import { MinLength, ValidateIf } from 'class-validator';

export class FilterUserDto {
    @ValidateIf(val => val && val.length > 0)
    @MinLength(2)
    name: string;

    @ValidateIf(val => val && val.length > 0)
    @MinLength(2)
    surname: string;

    @ValidateIf(val => val && val.length > 0)
    @MinLength(2)
    email: string;
}
