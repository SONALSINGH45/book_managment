import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entities/book.entity';
import { MailService } from '../mail/mail.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book) private booksRepository: Repository<Book>,
        @InjectRepository(User) private userrepo: Repository<User>,
        private mailService: MailService,
    ) { }

    async createBook(title: string, description: string, price: number, userId: number) {
        const book = this.booksRepository.create({ title, description, price, createdBy: { id: userId } });
        await this.booksRepository.save(book);
        let emialid: any = await this.userrepo.find({ where: { id: userId } })
        console.log(emialid)

        // Notify SuperAdmin about the new book
        //await this.mailService.sendEmail("Tech@yopmail.com", "", "")
        let yyu = await this.mailService.sendSuperAdminNotification(emialid[0].email, "i have create a new book", "regarding creating a book");
        return yyu;
    }

    findAll() {
        return this.booksRepository.find({ where: { isApproved: true } });
    }

    async approveBook(id: any) {
        const book = await this.booksRepository.findOne(id);
        book.isApproved = true;
        await this.booksRepository.save(book);
        return book;
    }

    async rejectBook(id: any) {
        const book = await this.booksRepository.findOne(id);
        book.isApproved = false;
        await this.booksRepository.save(book);
        let del = this.booksRepository.delete(id);
        let yyu = await this.mailService.sendadminnotification("superAdmin@yopmail.com", "i have reject  your  book", "regarding rejection a book", "admin@yopmail.com");
        return yyu;
    }


    async updateBook(id: number, body) {
        await this.booksRepository.update(id, body);


        // Notify SuperAdmin about the new book
        //await this.mailService.sendEmail("Tech@yopmail.com", "", "")
        return await this.mailService.sendSuperAdminNotification("Tech@yopmail.com", `The book with ID ${id} has been updated.`, "regarding book updation");
    }
}
