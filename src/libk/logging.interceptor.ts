// logging.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class CentralizedLoggingInterceptor implements NestInterceptor {
  // Tạo logger instance với context là tên của Interceptor này
  private readonly logger = new Logger('CentralizedLogging');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const { method, originalUrl, ip } = request;
    // 1. Lấy Controller và Action từ NestJS ExecutionContext
    const controllerName = context.getClass().name;
    const actionName = context.getHandler().name;

    const startTime = Date.now();

    // Sử dụng 'tap' của RxJS để bắt sự kiện sau khi Controller xử lý xong và chuẩn bị trả response về
    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - startTime;
          const statusCode = response.statusCode;

          // Ghi log thành công (2xx)
          this.logger.log(
            `login knv in libk logging.interceptor.ts [${method}] ${originalUrl} ${statusCode} - ${duration}ms | Controller: ${controllerName} | Action: ${actionName} | IP: ${ip}`,
          );
        },
        error: (err) => {
          const duration = Date.now() - startTime;
          // Lấy status từ HttpError nếu có, mặc định là 500
          const statusCode = err.status || 500;

          // Ghi log lỗi (4xx, 5xx)
          this.logger.error(
            `[${method}] ${originalUrl} ${statusCode} - ${duration}ms | Controller: ${controllerName} | Action: ${actionName} | IP: ${ip} | Error: ${err.message}`,
            err.stack,
          );
        },
      }),
    );
  }
}
