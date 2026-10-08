import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { DataSource } from 'typeorm';
import { LoggingMiddleware } from './middlewares/logging/logging.middleware.js';
import { CentralizedLoggingInterceptor } from './libk/logging.interceptor.js';
import { AuthRedirectFilter } from './modules/auth/filter/auth-redirect.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  const dataSource = app.get(DataSource);
  //check connect database
  if (dataSource.isInitialized) {
    console.log('Database connected successfully! khainv');
  } else {
    console.log('Database connection failed! khainv');
  }
  //dang ky middleware global => không khuyên dung
  //app.use(new LoggingMiddleware().use);

  // Kích hoạt logging tập trung toàn hệ thống
  app.useGlobalInterceptors(new CentralizedLoggingInterceptor());

  // Áp dụng AuthRedirectFilter cho toàn bộ các route trong dự án
  app.useGlobalFilters(new AuthRedirectFilter());

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
