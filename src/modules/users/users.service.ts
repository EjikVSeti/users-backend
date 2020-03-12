import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InsertResult } from 'typeorm/query-builder/result/InsertResult';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from '../../db/profile/user.entity';
import { FilterUserDto } from './dto/filter-user.dto';
import { PaginationUserDto } from './dto/pagination-user.dto';
import { IResponseGetUsers } from './users.type';

const errorMessage = (err) => {
    throw new Error(err);
};

const COUNT_PAGINATION = 10;

@Injectable()
export class UsersService {
    private error = errorMessage.bind(this.userRepository);

    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

    async getUsers(filter: FilterUserDto, pagination: PaginationUserDto): Promise<IResponseGetUsers> {
        const nameSubstring = filter?.name?.toUpperCase();
        const surnameSubstring = filter?.surname?.toUpperCase();
        const emailSubstring = filter?.email?.toUpperCase();

        const [list, total] = await this.userRepository.createQueryBuilder()
            .where(
                nameSubstring ? 'name LIKE :name' : 'TRUE',
                { name: `%${nameSubstring}%` },
            )
            .andWhere(
                surnameSubstring ? 'surname LIKE :surname' : 'TRUE',
                { surname: `%${surnameSubstring}%` },
            )
            .andWhere(
                emailSubstring ? 'email LIKE :email' : 'TRUE',
                { email: `%${emailSubstring}%` },
            )
            .limit(COUNT_PAGINATION)
            .offset((pagination.page - 1) * COUNT_PAGINATION)
            .getManyAndCount()
            .catch(this.error);
        return {
            list,
            currentPage: pagination.page,
            totalPage: Math.floor(-total / COUNT_PAGINATION) * -1,
            listTotal: list.length,
            total,
        };

    }

    async createUser(userDto: CreateUserDto): Promise<ObjectLiteral> {
        const result: InsertResult = await this.userRepository.insert(userDto).catch(this.error);
        return result.identifiers[0];
    }

    async deleteUser(userId: string): Promise<ObjectLiteral> {
        const data: UserEntity[] = await this.userRepository.findByIds([userId]).catch(this.error);

        if (!data.length) {
            throw new Error(`User with id: ${userId} not found`);
        }

        await this.userRepository.remove(data[0]).catch(this.error);

        return { id: userId };
    }
}
