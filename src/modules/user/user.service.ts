import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../db/database.service.js';

@Injectable()
export class UserService {
  //dùng khi gọi từ 1 provider khác DatabaseService
  constructor(private readonly bd: DatabaseService) {}
  getUsers() {
    return 'list các uesers' + this.bd.findAll();
  }
}
