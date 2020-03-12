import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto } from './dto/get-users.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiQuery({ name: 'filter[name]', type: String, required: false })
    @ApiQuery({ name: 'filter[surname]', type: String, required: false })
    @ApiQuery({ name: 'filter[email]', type: String, required: false })
    @ApiQuery({ name: 'pagination[page]', type: Number, required: true })
    getUsers(@Query()userDto: GetUsersDto) {
        return this.userService.getUsers(userDto.filter, userDto.pagination);
    }

    @Post()
    @ApiOperation({ summary: 'Create new user' })
    createUser(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete exists user by id' })
    deleteUser(@Param('id') userId: string) {
        return this.userService.deleteUser(userId);
    }
}
