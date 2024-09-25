import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'books' })
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column({ default: false })
    isApproved: boolean;

    @ManyToOne(() => User, (user) => user.books)
    createdBy: User;
}
