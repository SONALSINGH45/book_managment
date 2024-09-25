import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/user.module';
import { JwtStrategy } from 'src/jwt.statgy';
import { MailService } from 'src/mail/mail.service';


@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: 'secret', // Hard-coded secret key
            signOptions: { expiresIn: '60m' }, // Token expiration time
        }),
    ],
    providers: [AuthService, JwtStrategy, MailService],
    controllers: [AuthController],
})
export class AuthModule { }
