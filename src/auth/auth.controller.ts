// // src/auth/auth.controller.ts
import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() body: { email: string; password: string }) {
        return this.authService.register(body.email, body.password);
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        return this.authService.login(body.email, body.password);
    }

    @Post('forgot-password')
    async forgotPassword(@Body() body: { email: string }) {
        return this.authService.forgotPassword(body.email);
    }

    @Post('reset-password/:token')
    async resetPassword(
        @Param('token') token: string,
        @Body() body: { newPassword: string },
    ) {
        return this.authService.resetPassword(token, body.newPassword);
    }
}
