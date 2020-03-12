import { IsNotEmpty } from 'class-validator';

export class PaginationUserDto {
    @IsNotEmpty()
    public page: number;
}
