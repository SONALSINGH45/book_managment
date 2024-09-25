import { Controller, Post, Body, Get } from '@nestjs/common';
import { Role } from '../entities/user.entity';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('create-user')
    createUser(@Body() createUserDto: { email: string; password: string, role: string }) {
        return this.usersService.createUser(createUserDto.email, createUserDto.password, createUserDto.role);
    }

    @Post('create-admin')
    createAdmin(@Body() createAdminDto: { email: string; password: string, role: string }) {
        return this.usersService.createUser(createAdminDto.email, createAdminDto.password, createAdminDto.role);
    }

}
