import { Controller, Post, Body, Param, Put, Delete, Get } from '@nestjs/common';
import { BooksService } from './book.service';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Post('create')
    createBook(@Body() createBookDto: { title: string; description: string; price: number; userId: number }) {
        return this.booksService.createBook(createBookDto.title, createBookDto.description, createBookDto.price, createBookDto.userId);
    }

    @Put('approve/:id')
    approveBook(@Param('id') id: number) {
        return this.booksService.approveBook(id);
    }

    @Delete('reject/:id')
    rejectBook(@Param('id') id: number) {
        return this.booksService.rejectBook(id);
    }
    @Put(':id')
    async updateBook(@Param('id') id: number, @Param('createdBy') createdBy: number, @Body() updateBookDto: { title: string; author: string; description: string }) {
        return this.booksService.updateBook(id, updateBookDto);
    }

    @Get("view")
    findAllOrders() {
        return this.booksService.findAll();
    }
}
