import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as mailgun from 'mailgun-js';


@Injectable()
export class MailService {

    private transporter;

    constructor(private readonly mailerService: MailerService) {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Replace with your SMTP host
            port: 587, // Replace with your SMTP port
            secure: false, // true for 465, false for other ports
            auth: {
                user: '@gmail.com', // Replace with your SMTP username
                pass: '@Surbhi@500', // Replace with your SMTP password
            },
        });
    }




    async sendEmailm(to: string, subject: string, text: string): Promise<void> {
        const data = {
            from: '',
            to,
            subject,
            text,
        };
        console.log("data", data)

        await this.transporter.messages().send(data);
    }

    //     service: "gamil",
    //     host: 'smtp-relay.brevo.com',

    //     port: 587,
    //     secure: true,
    //     logger: true,
    //     debug: true,
    //     secureConnection: false,
    //     
    //     tls: {
    //         rejectUnauthorized: false
    //     }
    // });



    private yy = nodemailer.createTransport({
        host: '***',
        port: "***",
        auth: {
            user: '****', // Replace with your SMTP username
            pass: '***', // Replace with your SMTP password
        },
    });
    async sendSuperAdminNotification(from: any, text: any, subject: any) {
        await this.yy.sendMail({
            from,
            to: "superadmin@yopmail.com", // to: 'sonalsingh77.90z@gmail.com',
            subject,
            text,
        });
    }
    async sendadminnotification(from: any, text: any, subject: any, to) {
        await this.yy.sendMail({
            from,
            to:
                subject,
            text,
        });
    }
    // async sendUserDetails(email: string, message: string) {
    //     await this.transporter.sendMail({
    //         from: '"Book Management" <noreply@bookmanagement.com>',
    //         to: email,
    //         subject: 'Account Created',
    //         text: message,
    //     });
    // }

    //
    // async sendEmail(to: string, subject: string, text: string): Promise<void> {
    //     await this.mailerService.sendMail({
    //         to, // Recipient's email
    //         subject, // Subject of the email
    //         text, // Plain text body of the email
    //         // You can also add HTML content, attachments, etc. if needed
    //     });
    // }
}
