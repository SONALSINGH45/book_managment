// src/logging/user-activity.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserActivity } from 'src/entities/userActivity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserActivityService {
    constructor(
        @InjectRepository(UserActivity)
        private readonly userActivityRepository: Repository<UserActivity>,
    ) { }

    async logActivity(userId: number, action: string, endpoint: string, data?: any) {
        const userActivity = this.userActivityRepository.create({
            userId,
            action,
            endpoint,
            data: data ? JSON.stringify(data) : null,
        });
        await this.userActivityRepository.save(userActivity);
    }
}
