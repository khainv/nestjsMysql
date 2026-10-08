import { Test, TestingModule } from '@nestjs/testing';
import { AdminkService } from './admink.service.js';

describe('AdminkService', () => {
  let service: AdminkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminkService],
    }).compile();

    service = module.get<AdminkService>(AdminkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
