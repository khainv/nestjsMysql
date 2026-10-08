import { Test, TestingModule } from '@nestjs/testing';
import { AdminkController } from './admink.controller.js';

describe('AdminkController', () => {
  let controller: AdminkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminkController],
    }).compile();

    controller = module.get<AdminkController>(AdminkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
