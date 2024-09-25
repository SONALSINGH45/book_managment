import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Book } from './book.entity';
import { Order } from './order.entity';


// export enum Role {
//     SUPER_ADMIN = 'super_admin',
//     ADMIN = 'admin',
//     USER = 'user',
// }

// @Entity()
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     email: string;

//     @Column()
//     password: string;

//     @Column({ type: 'enum', enum: Role, default: Role.USER })
//     role: Role;

//     @OneToMany(() => Book, (book) => book.createdBy)
//     books: Book[];

//     @OneToMany(() => Order, (order) => order.user)
//     orders: Order[];

//     @BeforeInsert()
//     async hashPassword() {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
// }



// src/entities/user.entity.ts
export enum Role {
    ADMIN = 'admin',
    USER = 'user',
    SUPER_ADMIN = 'super_admin',
}

@Entity({ name: 'users' })

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;
    @OneToMany(() => Book, (book) => book.createdBy)
    books: Book[];

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
    })
    role: Role;
    resetTokenExpires: Date;
    resetToken: string;
}

