import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { Order } from '../entities/order.entity';
import { Book } from '../entities/book.entity';
import { MailModule } from '../mail/mail.module';
import { OrdersController } from './order.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Order, Book]), MailModule],
    controllers: [OrdersController],
    providers: [OrdersService],
})
export class OrdersModule { }
