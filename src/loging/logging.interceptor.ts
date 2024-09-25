// src/logging/logging.interceptor.ts
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserActivityService } from 'src/useractivity/useractivity.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly userActivityService: UserActivityService) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const user = request.user; // Assumes user information is available in request
        const endpoint = request.url;
        const method = request.method;
        const payload = request.body;

        const action = `${method} ${endpoint}`;

        return next.handle().pipe(
            tap(async () => {
                if (user) {
                    await this.userActivityService.logActivity(
                        user.id, // Log user ID
                        action,
                        endpoint,
                        payload,
                    );
                }
            }),
        );
    }
}
