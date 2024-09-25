

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { BooksModule } from './books/book.module';
import { User } from './entities/user.entity';
import { Book } from './entities/book.entity';
import { Order } from './entities/order.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { JwtModule } from '@nestjs/jwt';
import { UserActivity } from './entities/userActivity.entity';
import { UserActivityService } from './useractivity/useractivity.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './loging/logging.interceptor';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp-relay.brevo.com',
        port: 587, // or 465 for SSL
        secure: false, // true for 465, false for other ports
        auth: {
          user: "*****",
          pass: '*****', // Replace with your SMTP password
        },
      },
    }),

    JwtModule.register({
      secret: 'bookmng',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '**********', // Your DB host
      port: 3306,        // Your DB port
      username: '', // Your DB username
      password: '', // Your DB password
      database: '', // Your DB name
      entities: [User, Book, Order, UserActivity], // Your entities
      synchronize: true, // Set to true for development; make sure to turn off in production
    }),
    UsersModule,
    BooksModule,
    OrdersModule,
    AuthModule,
  ],
  // providers: [
  //   UserActivityService,
  //   {
  //     provide: APP_INTERCEPTOR,
  //     useClass: LoggingInterceptor,
  //   },
  // ],
})
export class AppModule { }


