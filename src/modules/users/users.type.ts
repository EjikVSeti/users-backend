import { UserEntity } from '../../db/profile/user.entity';

export interface IResponseGetUsers {
    list: UserEntity[];
    currentPage: number;
    totalPage: number;
    listTotal: number;
    total: number;
}
