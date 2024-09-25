import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Book } from '../entities/book.entity';
import { MailModule } from '../mail/mail.module';
import { BooksService } from './book.service';
import { BooksController } from './book.controller';
import { User } from 'src/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Book, User]), MailModule],
    providers: [BooksService],
    controllers: [BooksController],
})
export class BooksModule { }
