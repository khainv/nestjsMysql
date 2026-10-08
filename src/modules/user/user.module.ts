import { Module } from '@nestjs/common';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';
import { DatabaseService } from '../../db/database.service.js';

@Module({
  controllers: [UserController],
  providers: [UserService, DatabaseService],
  exports: [UserService, DatabaseService],
})
export class UserModule {}
