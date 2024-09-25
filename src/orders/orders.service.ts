import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { Book } from '../entities/book.entity';
import { MailService } from '../mail/mail.service';
import { UsersService } from 'src/users/user.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private ordersRepository: Repository<Order>,
        @InjectRepository(Book) private booksRepository: Repository<Book>,
        @InjectRepository(Book) private userRepository: Repository<User>,


        private mailService: MailService,

    ) { }

    async createOrder(userId: number, bookId: any) {
        const book = await this.booksRepository.findOne(bookId);

        if (!book || !book.isApproved) {
            throw new NotFoundException('Book not found or not approved.');
        }

        const order = this.ordersRepository.create({
            user: { id: userId },
            book,
            purchaseDate: new Date(),
        });

        await this.ordersRepository.save(order);

        let emialid: any = await this.userRepository.find({ where: { id: userId } })
        console.log(emialid)

        // Notify Super Admin about the new order
        await this.mailService.sendSuperAdminNotification(emialid[0].email,
            `New book order: Book - ${book.title}, User ID - ${userId}.`, "regarding book order",
        );

        return order;
    }

    findAll() {
        return this.ordersRepository.find({ relations: ['user', 'book'] });
    }

    findOne(id: number) {
        return this.ordersRepository.findOne({ where: { id }, relations: ['user', 'book'] });
    }
}
