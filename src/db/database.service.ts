import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  findAll() {
    return 'this is function findAll';
  }
}
