import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post('purchase')
    purchaseBook(
        @Body() purchaseBookDto: { userId: number; bookId: number },
    ) {
        return this.ordersService.createOrder(
            purchaseBookDto.userId,
            purchaseBookDto.bookId,
        );
    }

    @Get()
    findAllOrders() {
        return this.ordersService.findAll();
    }

    @Get(':id')
    findOrderById(@Param('id') id: number) {
        return this.ordersService.findOne(id);
    }
}
