// src/entities/user-activity.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class UserActivity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number; // or string, depending on your user ID type

    @Column()
    action: string;

    @Column()
    endpoint: string;

    @Column('text', { nullable: true })
    data: string; // This can store the payload, if needed

    @CreateDateColumn()
    timestamp: Date;
}
