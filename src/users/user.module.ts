import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../entities/user.entity';
import { MailModule } from '../mail/mail.module';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User]), MailModule],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule { }
