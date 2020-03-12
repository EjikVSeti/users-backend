import { FilterUserDto } from './filter-user.dto';
import { PaginationUserDto } from './pagination-user.dto';

export class GetUsersDto {
    filter: FilterUserDto;

    pagination: PaginationUserDto;
}
