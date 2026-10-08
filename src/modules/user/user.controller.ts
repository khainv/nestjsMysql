import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service.js';
import { DatabaseService } from '../../db/database.service.js';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly dbService: DatabaseService,
  ) {}
  @Get()
  index() {
    return this.userService.getUsers() + ' - ' + this.dbService.findAll();
  }
}
