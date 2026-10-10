import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminkController } from './admink.controller.js';
import { AdminkService } from './admink.service.js';
import { Admin } from '../../entities/admin.entity.js';
import { AuthModule } from '../auth/auth.module.js';
import { AdminToken } from '../../entities/admin.token.entity.js';

@Module({
  controllers: [AdminkController],
  providers: [AdminkService],
  imports: [
    TypeOrmModule.forFeature([Admin, AdminToken]),
    AuthModule,
    forwardRef(() => AuthModule), // 👈 Bọc AuthModule trong forwardRef như thế này],
  ],
  exports: [AdminkService],
})
export class AdminkModule {}
