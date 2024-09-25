import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './user.entity';
import { Book } from './book.entity';

@Entity({ name: 'order' })

export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @ManyToOne(() => Book)
    book: Book;

    @Column()
    purchaseDate: Date;
}
