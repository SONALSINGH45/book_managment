import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Role, User } from '../entities/user.entity';

import * as bcrypt from 'bcrypt'; // For password hashing


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) { }

    async findByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async createUser(email: string, password: string, role: string): Promise<any> {
        const user = this.usersRepository.create({ email, password, role: Role.USER });
        return this.usersRepository.save(user);
    }
    async updateResetToken(id: number, resetToken: string) {
        return this.usersRepository.update(id, { resetToken });
    }

    async updatePassword(id: number, password: string) {
        return this.usersRepository.update(id, { password, resetToken: null });
    }

    async createUserreg(email: string, password: string): Promise<any> {
        const user = this.usersRepository.create({ email, password });
        return this.usersRepository.save(user);
    }

}
