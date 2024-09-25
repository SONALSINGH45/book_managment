// import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { User } from '../entities/user.entity';
// import * as bcrypt from 'bcrypt';
// import { UsersService } from 'src/users/user.service';
// import { MailService } from 'src/mail/mail.service';

// @Injectable()
// export class AuthService {
//     constructor(
//         private readonly usersService: UsersService,
//         private readonly jwtService: JwtService,
//         private readonly mailService: MailService, // Your Mail Service for sending email

//     ) { }

//     async validateUser(email: string, password: string): Promise<User> {
//         const user = await this.usersService.findByEmail(email);
//         if (user && (await bcrypt.compare(password, user.password))) {
//             return user;
//         }
//         throw new UnauthorizedException('Invalid credentials');
//     }

//     async login(user: User) {
//         const payload = { username: user.email, sub: user.id, role: user.role };
//         return {
//             access_token: this.jwtService.sign(payload),
//         };
//     }

//     async register(
//         email: string,
//         password: string,
//         role: any,
//     ): Promise<User> {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         return this.usersService.createUser(email, hashedPassword, role);
//     }


//     // async forgotPassword(email: string) {
//     //     const user = await this.usersService.findByEmail(email);
//     //     if (!user) {
//     //         throw new NotFoundException('User with this email does not exist');
//     //     }

//     //     const token = crypto.randomBytes(32).toString('hex'); // Generate a random reset token
//     //     const expireTime = new Date(Date.now() + 3600 * 1000); // Token valid for 1 hour

//     //     await this.usersService.saveResetToken(user.id, token, expireTime); // Save the token to the user

//     //     const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

//     //     // Send email to user with the reset URL
//     //     await this.mailService.sendEmail(
//     //         user.email,
//     //         'Password Reset',
//     //         `Click the link to reset your password: ${resetUrl}`
//     //     );

//     //     return { message: 'Password reset email sent' };
//     // }

//     // async resetPassword(token: string, newPassword: string) {
//     //     const user = await this.usersService.findByResetToken(token);

//     //     if (!user || user.resetTokenExpires < new Date()) {
//     //         throw new BadRequestException('Invalid or expired reset token');
//     //     }

//     //     user.password = await this.usersService.hashPassword(newPassword); // Update the password
//     //     user.resetToken = null; // Clear the token after successful reset
//     //     user.resetTokenExpires = null;
//     //     await this.usersService.save(user);

//     //     return { message: 'Password reset successful' };
//     // }
// }



// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as nodemailer from 'nodemailer';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async register(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.usersService.createUserreg(email, hashedPassword);
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async forgotPassword(email: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const token = this.jwtService.sign({ email: user.email }, { expiresIn: '1h' });
        await this.usersService.updateResetToken(user.id, token);

        // Send reset password email
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // You can use AWS SES or any other email provider
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-password',
            },
        });

        await transporter.sendMail({
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `You can reset your password using this link: http://localhost:3000/auth/reset-password/${token}`,
        });

        return { message: 'Password reset email sent' };
    }

    async resetPassword(token: string, newPassword: string) {
        const decoded = this.jwtService.verify(token);
        const user = await this.usersService.findByEmail(decoded.email);
        if (!user || user.resetToken !== token) {
            throw new Error('Invalid token');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.usersService.updatePassword(user.id, hashedPassword);
    }
}
